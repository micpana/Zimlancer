import React, { Component } from 'react';
import '../categorieslandingpages/graphicsanddesign.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {BACKEND_URL} from '../backendurl';
import {SEARCH_BIDS, SEARCH_SERVICES} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import { runInThisContext } from 'vm';
import ServicesResults from './servicesresults';
import BidsResults from './bidsresults';
import AllResults from './allresults'
import {FaMoneyBillAlt} from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';
import ReferAndEarn from '../images/referandearn.png'

  class ResultsList extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
        servicesList: [],
        bidsList: [],
currentview: "services",
ServicesSortBy: "default",
BidsSortBy: "default",
AllSortBy: "default",
minprice: null,
maxprice: null,
deliverytime: null
      };
      this.handleChange = this.handleChange.bind(this);
      this.bidsSortBy = this.bidsSortBy.bind(this);
      this.servicesSortBy = this.servicesSortBy.bind(this);
      this.allSortBy = this.allSortBy.bind(this);
      this.viewItem = this.viewItem.bind(this);
      /////////view
      this.CurrentView = () =>{
        if(this.state.currentview=="services"){
          return<ServicesResults searchQuery={this.props.match.params.searchQuery} sortBy={this.state.ServicesSortBy}
          minprice={this.state.minprice} maxprice={this.state.maxprice} deliverytime={this.state.deliverytime}
          />
        }
        if(this.state.currentview=="bids"){
          return<BidsResults searchQuery={this.props.match.params.searchQuery}  sortBy={this.state.BidsSortBy}
          minprice={this.state.minprice} maxprice={this.state.maxprice} deliverytime={this.state.deliverytime}
          />
        }
        if(this.state.currentview=="all"){
          return<AllResults searchQuery={this.props.match.params.searchQuery}  sortBy={this.state.AllSortBy}
         minprice={this.state.minprice} maxprice={this.state.maxprice} deliverytime={this.state.deliverytime}
          />
        }
     
      }
///////buttons
      this.Buttons = () =>{
        var all=this.state.servicesList.length+this.state.bidsList.length;
        var services=this.state.servicesList.length;
        var bids=this.state.bidsList.length;
if(this.state.currentview=="services"){
  return   <Row>
    <Col>
    {/* <Button id="all" onClick={this.viewItem} style={{backgroundColor: 'inherit', border: 'none', color: 'grey', float: 'left'}}>All
    ({all})
    </Button> */}
    <Button id="services" onClick={this.viewItem} style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple', float: 'left'}}>Services 
    ({services})
    </Button>
  <Button id="bids" onClick={this.viewItem} style={{backgroundColor: 'inherit', border: 'none', color: 'grey', float: 'left'}}>Bids
 ({bids})
  </Button>
    </Col>
    <Col sm="4">
              <InputGroup style={{width: '50%', float: 'right', marginRight: '5%'}}>
        <select className="form-control" name="ServicesSortBy" value={this.state.ServicesSortBy} 
                   onChange={this.servicesSortBy} style={{border: '1px solid rebeccapurple'}}>
                              <option id="default" key="default" value="default">Default</option>
                              <option id="pricedescending" value="pricedescending">$High to $Low</option>
                              <option id="priceascending" value="priceascending">$Low to $High</option>
                      </select>
    </InputGroup>
    </Col>
</Row>
}
if(this.state.currentview=="bids"){
  return   <Row>
 <Col>
    {/* <Button id="all" onClick={this.viewItem} style={{backgroundColor: 'inherit', border: 'none', color: 'grey', float: 'left'}}>All
    ({all})
    </Button> */}
    <Button id="services" onClick={this.viewItem} style={{backgroundColor: 'inherit', border: 'none', color: 'grey', float: 'left'}}>Services 
   ({services})
    </Button>
  <Button id="bids" onClick={this.viewItem} style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple', float: 'left'}}>Bids
  ({bids})
  </Button>
    </Col>
    <Col sm="4">
              <InputGroup style={{width: '50%', float: 'right', marginRight: '5%'}}>
        <select className="form-control" name="sortby" value={this.state.BidsSortBy} 
                   onChange={this.bidsSortBy} style={{border: '1px solid rebeccapurple'}}>
                              <option id="default" key="default" value="default">Default</option>
                              <option id="payoutdescending" value="payoutdescending">$High to $Low</option>
                              <option id="payoutascending" value="payoutascending">$Low to $High</option>
                      </select>
    </InputGroup>
    </Col>
</Row>
}
if(this.state.currentview=="all"){
  return   <Row>
  <Col>
    {/* <Button id="all" onClick={this.viewItem} style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple', float: 'left'}}>All
   ({all})
    </Button> */}
    <Button id="services" onClick={this.viewItem} style={{backgroundColor: 'inherit', border: 'none', color: 'grey', float: 'left'}}>Services 
   ({services})
    </Button>
  <Button id="bids" onClick={this.viewItem} style={{backgroundColor: 'inherit', border: 'none', color: 'grey', float: 'left'}}>Bids
   ({bids})
  </Button>
    </Col>
    <Col sm="4">
              <InputGroup style={{width: '50%', float: 'right', marginRight: '5%'}}>
        <select className="form-control" name="sortby" value={this.state.AllSortBy} 
                   onChange={this.allSortBy} style={{border: '1px solid rebeccapurple'}}>
                              <option id="default" key="default" value="default">Default</option>
                              <option id="payoutdescending" value="payoutdescending">$High to $Low</option>
                              <option id="payoutascending" value="payoutascending">$Low to $High</option>
                      </select>
    </InputGroup>
    </Col>
</Row>
}
      }
    }

    componentDidMount() {
        axios.all([
            axios.post(GRAPHQL_BASE_URL, {
                query: print(SEARCH_SERVICES), variables: {searchQuery: this.props.match.params.searchQuery}
            }),
              axios.post(GRAPHQL_BASE_URL, {
                  query: print(SEARCH_BIDS), variables: {searchQuery: this.props.match.params.searchQuery}
              })] ).then(axios.spread((service, bid) => {
        
            this.setState({servicesList:  service.data.data.searchServices})
            this.setState({bidsList:  bid.data.data.searchBids})
        
        
            }));
 

  }
  viewItem(e) {
    this.setState({currentview: e.target.id});
  }

  servicesSortBy(e) {
    this.setState({ServicesSortBy: e.target.value});
  }
  bidsSortBy(e) {
    this.setState({BidsSortBy: e.target.value});
  }
  allSortBy(e) {
    this.setState({AllSortBy: e.target.value});
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

    render() {

      return (
        <div className="graphics">
        <Row style={{marginTop: '25px'}}>
          <Col>
          <h6 style={{color: 'rebeccapurple', textAlign: 'left', marginLeft: '6%'}}>Follow us on social media</h6>
          <Row style={{marginLeft: '2%'}}>
            <Col xs="1">
            <SocialIcon url="https://www.instagram.com/zimlancer" style={{ height: 25, width: 25 }}/>
            </Col>
            <Col xs="1">
            <SocialIcon url="https://www.facebook.com/zimlancerZW/" style={{ height: 25, width: 25 }}/>
            </Col>
            <Col xs="1">
            <SocialIcon url="https://twitter.com/zimlancer" style={{ height: 25, width: 25 }}/>
            </Col>
            <Col xs="1">
            <SocialIcon url="https://plus.google.com/101601834693120746253" style={{ height: 25, width: 25 }}/>
            </Col>
          </Row>
          </Col>
          <Col>
          <h2 className="grapheading">Search Results for: <br/><h5 style={{color: 'rebeccapurple'}}>"{this.props.match.params.searchQuery}"</h5></h2>
          </Col>
          <Col>
          <a href="/dashboard/referralsystem"><h6 style={{color: 'rebeccapurple', marginTop: '10px', float: 'right', paddingRight: '15px'}}><FaMoneyBillAlt color="rebeccapurple" size="30px"/> Refer and earn</h6></a>
          </Col>
        </Row>
        <Row className="mainrow">

<Col className="leftsidebar" xs="3">
<h5 className="subcatmaincat">Filter</h5>
<h6 className="subcatrow">Price Range <span style={{color: 'rebeccapurple'}}>(RTGS$)</span></h6>
<Row>
  <Col>
  <InputGroup style={{ marginLeft: '10%'}}>
<Input  placeholder="min" type="number" name="minprice" id="minprice" 
value={this.state.minprice} onChange={this.handleChange} />
   </InputGroup>
  </Col>
<Col>
<InputGroup>
<Input  placeholder="max" type="number" name="maxprice" id="maxprice" 
value={this.state.maxprice} onChange={this.handleChange} />
   </InputGroup>
</Col>
   </Row>
   <br/>
<h6 className="subcatrow">Delivers in:</h6>
<Col>
<InputGroup>
<Input  placeholder="max time in days" type="number" name="deliverytime" id="deliverytime" 
value={this.state.deliverytime} onChange={this.handleChange} />
   </InputGroup>
</Col>
<br/>
<a href="/dashboard/referralsystem"><img src={ReferAndEarn} style={{width: '90%'}}/></a>
</Col>
<Col className="subcategories">
<this.Buttons/>
<br/>
           <Row className="srvlst">
<this.CurrentView/>
           </Row>

        </Col>
        </Row>
        </div>
      );
    }

  };
  
  export default ResultsList;