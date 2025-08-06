import React, { Component } from 'react';
import { Jumbotron, Input, InputGroup, InputGroupAddon, Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,UncontrolledDropdown,
  Button, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Form } from 'reactstrap';
import {SEARCH_BIDS, SEARCH_SERVICES} from '../graphql/QueryResolver';
import {CREATE_SEARCH} from '../graphql/MutationResolver';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import axios from 'axios';
import {print} from 'graphql'
import './jumbotron.css'

class Jumbotron1 extends Component{
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      servicesList:[],
        bidsList: [],
        allItems: []
    };
    this.SearchField = () =>{
      if(this.state.searchQuery==""){
        return<div>
          <Dropdown className="d-inline-block" isOpen={false} toggle={this.dtoggle2}>
        <DropdownToggle  style={{backgroundColor:  'inherit', border: 'none', fontSize: '13px'}}>
        <InputGroup style={{paddingLeft: 'auto', marginRight: 'auto'}}>
        <Input type="text"  name="search" id="search"  placeholder="Search e.g 'logo design' "  style={{color: 'rgba(0, 0, 0, 0.5)', display: 'inline-block', height:40,borderBottom:'1px solid',borderRight:'0px',borderLeft:'0px',borderTop:'0px ',outline:'none'}} 
          autocomplete="off"   value={this.state.searchQuery} onChange={(e)=>this.handleChange(e)}
            />
         <InputGroupAddon addonType="append" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}>
  <Button style={{backgroundColor:'#6552b8'}} onClick={e=>this.handleSubmit(e)}>SEARCH</Button>
  </InputGroupAddon>
   </InputGroup>
        </DropdownToggle>
        <DropdownMenu>
            {this.state.allItems.map((item, index) => 
           <DropdownItem key={item.name}>
           <a onClick={e=>this.handleRedirect(e)} id={item.index}  style={{color: 'rgba(0, 0, 0, 0.5)'}}>{item.name}</a>
           </DropdownItem>)}
        </DropdownMenu>
      </Dropdown>
           </div>
      }else{
        return<div>
        <Dropdown className="d-inline-block" isOpen={true} toggle={this.dtoggle2}>
      <DropdownToggle  style={{backgroundColor:  'inherit', border: 'none', fontSize: '13px'}}>
      <InputGroup style={{paddingLeft: 'auto', marginRight: 'auto'}}>
      <Input type="text"  name="search" id="search"  placeholder="Search e.g 'logo design' "  style={{color: 'rgba(0, 0, 0, 0.5)', display: 'inline-block', height:40,borderBottom:'1px solid',borderRight:'0px',borderLeft:'0px',borderTop:'0px ',outline:'none'}} 
        autocomplete="off"   value={this.state.searchQuery} onChange={(e)=>this.handleChange(e)}
          />
       <InputGroupAddon addonType="append" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}>
<Button style={{backgroundColor:'#6552b8'}} onClick={e=>this.handleSubmit(e)}>SEARCH</Button>
</InputGroupAddon>
 </InputGroup>
      </DropdownToggle>
      <DropdownMenu>
          {this.state.allItems.map((item, index) => 
           <DropdownItem key={item.name} onClick={e=>this.handleRedirect(e)} id={index}>
           <a  id={index} style={{color: 'rgba(0, 0, 0, 0.5)'}}>{item.name}</a>
         </DropdownItem>)}
      </DropdownMenu>
    </Dropdown>
         </div>
      }
      };
    this.dtoggle2 = this.dtoggle2.bind(this);
    this.handleRedirect=this.handleRedirect.bind(this);
    
  }
  handleChange(e) {
    this.setState({searchQuery: e.target.value});

    axios.all([
      axios.post(GRAPHQL_BASE_URL, {
          query: print(SEARCH_SERVICES), variables: {searchQuery: e.target.value}
      }),
        axios.post(GRAPHQL_BASE_URL, {
            query: print(SEARCH_BIDS), variables: {searchQuery: e.target.value}
        })] ).then(axios.spread((service, bid) => {
          let services = service.data.data.searchServices;
          let bids = bid.data.data.searchBids;
          services.map(s => s.isService = true)
          bids.map(b => b.isService = false)
            let array=services.concat(bids)
           
          this.setState({allItems:array});
    
      }));
  }
  handleSubmit(e) {
    var today = new Date();
    var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
    var dateTime = date+' '+time;
          const { cookies } = this.props;
axios.post(GRAPHQL_BASE_URL, {////////////save search
      query: print(CREATE_SEARCH), variables: {
        userid: cookies.get('userId'),
        searchitem: this.state.searchQuery,
        date: dateTime
      }
    }).then((result) => {
      this.setState({savedSearch: result.data.data.createSearches});
    
    }).catch(error => {
    console.log(error.response)
    });///////////////ends here
    let port = (window.location.port ? ':' + window.location.port : '');
    window.location.href = '//' + window.location.hostname + port + '/search/' + this.state.searchQuery;
};
handleRedirect (e) {/////////////when a search suggestion is clicked//////////////
  let index = e.target.id;
  let item = this.state.allItems[index];
  var today = new Date();
  var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
  var dateTime = date+' '+time;
        const { cookies } = this.props;
axios.post(GRAPHQL_BASE_URL, {////////////save search
    query: print(CREATE_SEARCH), variables: {
      userid: cookies.get('userId'),
      searchitem: this.state.searchQuery,
      date: dateTime
    }
  }).then((result) => {
    this.setState({savedSearch: result.data.data.createSearches});
  
  }).catch(error => {
  console.log(error.response)
  });///////////////ends here
  let port = (window.location.port ? ':' + window.location.port : '');

if(item.isService==true){////means search suggestion is a service/////////////////
  window.location.href = '//' + window.location.hostname + port + '/' + item.maincategory+ '/' + item.subcategory +  '/' + item.id;
}else{//////if its a bid
  window.location.href = '//' + window.location.hostname + port + '/bids/' + item.maincategory+ '/' + item.subcategory +  '/' + item.id;
}


};
dtoggle2() {
  this.setState(prevState => ({
    dropdownOpen2: !prevState.dropdownOpen2
  }));
}
  render(){
    return (
    <div>
      <Jumbotron>
        <h1 className="display-3">Expand your business horizon</h1>
        <p className="lead">Hire local talent to suit your business needs. Grow your business on Zimlancer.</p>
        <hr className="my-2" />
        <p>Find freelancers and businesses ready to get the job done</p>
        <p className="lead">
        {/* <InputGroup style={{marginLeft: 'auto', marginRight: 'auto'}}>
        <Input type="text"  name="search" id="search"  placeholder="Search e.g 'logo design' "  style={{color: 'rgba(0, 0, 0, 0.5)', display: 'inline-block', height:40,borderBottom:'1px solid',borderRight:'0px',borderLeft:'0px',borderTop:'0px ',outline:'none'}} 
          autocomplete="off"   value={this.state.searchQuery} onChange={(e)=>this.handleChange(e)}
            />
         <InputGroupAddon addonType="append" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}>
  <Button style={{backgroundColor:'#6552b8'}} onClick={e=>this.handleSubmit(e)}>SEARCH</Button>
  </InputGroupAddon>
   </InputGroup> */}
   <this.SearchField/>

        
        </p>
      </Jumbotron>
    </div>
  );
};
}
export default Jumbotron1;