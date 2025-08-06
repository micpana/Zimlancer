import React, { Component } from 'react';
import {InputGroup, InputGroupAddon, InputGroupText, Input, Col, Row, Form, Button, Label, Container} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {CREATE_SERVICE_BID} from '../graphql/MutationResolver';
import {GET_USER, GET_ALL_CATEGORIES, GET_SUBCATEGORIES_BY_CATEGORY} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import {FaRegClock, FaUserAlt, FaShippingFast, FaKey, FaClock} from 'react-icons/fa';
import { IoIosPerson, IoIosAddCircle, IoIosArrowDropdownCircle, IoMdListBox,IoIosAdd, IoMdBuild} from "react-icons/io";
import { FilePond, File, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { BACKEND_URL } from '../backendurl';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import DateTimePicker from 'react-datetime-picker';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

  class UploadBid extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };
    constructor(props) {
      super(props);
  
      this.state = {
        name: "",
        userid: "",
        payout: '',
        expectedcompletiontime: '',
        typeofdelivery: "",
        numberofbids: 0,
        description: "",
        maincategory: "",
        subcategory: "",
        active: "true",
        expirationdate: "",
        files: [],
        filenames:[null],
        userDetails: {},
        allCategories: [],
        subcategories: []
        
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.loadSubcategories = this.loadSubcategories.bind(this);

    }
    onSetDate = date => this.setState({ expirationdate: date });

    componentDidMount() {
      const { cookies } = this.props;
      this.setState({userid: cookies.get('userId')})
      axios.post(GRAPHQL_BASE_URL, {///////////get user
        query: print(GET_USER), variables: {id: cookies.get('userId')}
    }).then((result) => {
        this.setState({userDetails: result.data.data.getUser});
    
    }).catch(error => {
      console.log(error.response)
    });
    axios.post(GRAPHQL_BASE_URL, {//////////get categories
      query: print(GET_ALL_CATEGORIES)
  }).then((result) => {
      this.setState({allCategories: result.data.data.allCategories});
      // console.log(this.state)
  
  }).catch(error => {
    console.log(error.response)
  });
  }

  handleChange(e) {
  this.setState({[e.target.name]: e.target.value});
}
handleSubmit(e) {
  e.preventDefault()
  var today = new Date();
  var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
  var dateTime = date+' '+time;
    axios.post(GRAPHQL_BASE_URL, {
      query: print(CREATE_SERVICE_BID), variables: {
        name: this.state.name,
        userid: this.state.userid,
        username: this.state.userDetails.username,
        payout: parseInt(this.state.payout, 10),
        expectedcompletiontime: parseInt(this.state.expectedcompletiontime, 10),
        typeofdelivery: this.state.typeofdelivery,
        numberofbids: parseInt(this.state.numberofbids, 10),
        description: this.state.description,
        maincategory: this.state.maincategory,
        subcategory: this.state.subcategory,
        active: this.state.active,
        datelisted: dateTime,
        expirationdate: this.state.expirationdate,
        bidimage: this.state.filenames[0]

      }
  }).then((result) => {
      alert('Your bid: ' + this.state.name + ' has been saved.');
      let port = (window.location.port ? ':' + window.location.port : '');
      window.location.href = '//' + window.location.hostname + port + '/' + "bids/" + this.state.maincategory + '/' + this.state.subcategory + '/' + result.data.data.createServiceBid.id;
  }).catch(error => {
    console.log(error.response);
    alert('An error has occured while trying to save your bid: ' + this.state.name + '. Please try again.');
  });
  };

  loadSubcategories(e) {
    this.setState({[e.target.name]: e.target.value});
    axios.post(GRAPHQL_BASE_URL, {//////////get subcategories
      query: print(GET_SUBCATEGORIES_BY_CATEGORY), variables: {parentcategory: e.target.value}
  }).then((result) => {
      this.setState({subcategories: result.data.data.getSubCategoryByCategory});  
  }).catch(error => {
    console.log(error.response)
  });
  }

    render() {
      var today = new Date();
  var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
  var dateTime = date+' '+time;
      return (
        <div ><br/>
  <Container style={{border:'1px solid rgba(102, 51, 153, 0.404)'}}>
  <Form onSubmit={this.handleSubmit}>
<br/>
<h2>Create Bid Listing</h2>
<br/><br/>
  <Label for="name">Bid title</Label>
  <InputGroup>
        <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><IoIosPerson style={{margin:'10px'}}/></InputGroupAddon>
        <Input  placeholder="I want ..." type="text" name="name" id="name" 
            value={this.state.name} onChange={this.handleChange} />
    </InputGroup><br/> 
    <Label for="name">Bid Image</Label>
    {/* Pass FilePond properties as attributes */}
    <FilePond allowMultiple={true} 
                          name={"file"}
                          maxFiles={1} 
                          server={BACKEND_URL+"bidimage"}
                          onupdatefiles={(fileItems) => {
                              // Set current file objects to this.state
                              this.setState({
                                  files: fileItems.map(fileItem => fileItem.file)
                              });
                              this.setState({
                                filenames: fileItems.map(fileItem => fileItem.file.name)
                            });
                          }}>
                    
                    {/* Update current files  */}
                    {this.state.files.map(file => (
                        <File key={file} src={file} origin="local" />
                    ))}
                    
                </FilePond><br/>
        
<Row>
  <Col>
  <Label for="price">Payout</Label>
   <InputGroup>
        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
            <Input  placeholder="Enter the payout amount for the bid" type="number" name="payout" id="payout" 
            value={this.state.payout} onChange={this.handleChange} />
            <InputGroupAddon addonType="append">.00</InputGroupAddon>
    </InputGroup><br/> 
  </Col>
  <Col>
  <Label for="completiontime">Expected Completion Time</Label>
   <InputGroup>
        <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><FaRegClock style={{margin:'10px'}}/></InputGroupAddon>
            <Input  placeholder="Estimate delivery time" type="expectedcompletiontime" name="expectedcompletiontime" id="expectedcompletiontime" 
            value={this.state.expectedcompletiontime} onChange={this.handleChange} />
            <InputGroupAddon addonType="append">Days</InputGroupAddon>
    </InputGroup><br/>           

  </Col>
  <Col>
  <Label for="typeofdelivery">Type of delivery</Label>
   <InputGroup>
        <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><FaShippingFast style={{margin:'10px'}}/></InputGroupAddon>
        <select className="form-control" name="typeofdelivery" value={this.state.typeofdelivery} 
                   onChange={this.handleChange}>
           <option key="none3" value="">--Select an option--</option>
           <option key="Online" value="Online">Online</option>

           </select>
            {/* <InputGroupAddon addonType="append">Days</InputGroupAddon> */}
    </InputGroup><br/>           

  </Col>
</Row>
            <br/>
            <Row>
              <Col>
              <Label for="maincategory">Main category</Label> 
              <InputGroup>
        <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><IoIosAddCircle style={{margin:'10px'}}/></InputGroupAddon>
        <select className="form-control" name="maincategory" value={this.state.maincategory} 
                   onChange={this.loadSubcategories}>
                              <option key="none" value="">--Select an option--</option>
           {this.state.allCategories.map((maincategory) => 
           <option id={maincategory.category} key={maincategory.category} value={maincategory.category}>{maincategory.category}</option>)}
           </select>
    </InputGroup><br/> 
              </Col>
              <Col>
              <Label for="subcategory">Sub category</Label> 
              <InputGroup>
        <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><IoIosArrowDropdownCircle style={{margin:'10px'}}/></InputGroupAddon>
        <select className="form-control" name="subcategory" value={this.state.subcategory} 
                   onChange={this.handleChange}>
                   <option key="none2" value="">--Select an option--</option>
           {this.state.subcategories.map((subcategory) => 
           <option key={subcategory.subcategory} value={subcategory.subcategory}>{subcategory.subcategory}</option>)}
           </select>
    </InputGroup><br/> 
              </Col>
        
  
            </Row>

    <Label for="description">Bid description</Label>
    <InputGroup>
        <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><IoMdListBox style={{margin:'10px'}}/></InputGroupAddon>
        <Input  placeholder="Enter your bid's description here. Make sure you give 
            a well detailed description of what you want done." type="text" name="description" id="description" 
            value={this.state.description} onChange={this.handleChange} />
    </InputGroup><br/>           
         <br/>   

         <Label for="expirationdate" style={{float: 'left', marginLeft: '5%'}}>Bid expiry date & Time</Label>
    <InputGroup>
        <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><IoMdListBox style={{margin:'10px'}}/></InputGroupAddon>
                <DateTimePicker
          onChange={this.onSetDate}
          value={this.state.expirationdate}
        />
    </InputGroup><br/>           
         <br/>   

   
   
  
  <br/>
  <Button type="submit" style={{backgroundColor:'rgb(100, 82, 184)'}}>Create Bid</Button>{' '}
            <Button color="secondary" href="/">Cancel</Button><br/><br/>
  </Form>
     




</Container>
        </div>
      );
    }

  };
  
  export default withCookies(UploadBid);