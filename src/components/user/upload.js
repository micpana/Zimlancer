import React, { Component } from 'react';
import {InputGroup, InputGroupAddon, InputGroupText, Input, Col, Row, Form, Button, Label, Container} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {UPLOAD_SERVICE} from '../graphql/MutationResolver';
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
import {BACKEND_URL} from '../backendurl';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

  class Upload extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
        name: "",
        userid: "",
        username: "",
        password:"",
        price: '',
        completiontime: '',
        description: "",
        datelisted: "",
        extras1: "",
        extras2: "",
        extras1price: '',
        extras2price: '',
        extras1additionaltime: '',
        extras2additionaltime: '',
        maincategory: "",
        subcategory: "",
        typeofdelivery: "",
        serviceDetails:{},
        files: [],
        filenames:[null, null, null],
        userDetails: {},
        allCategories: [],
        subcategories: []

        
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.loadSubcategories = this.loadSubcategories.bind(this);

    }

    componentDidMount() {
      this.setState({userid: this.props.userid})
      axios.post(GRAPHQL_BASE_URL, {//////////get user
        query: print(GET_USER), variables: {id: this.props.userid}
    }).then((result) => {
        this.setState({userDetails: result.data.data.getUser});
        // console.log(this.state)
    
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
      query: print(UPLOAD_SERVICE), variables: {
        name: this.state.name,
        userid: this.state.userid,
        username: this.state.userDetails.username,
        price: parseInt(this.state.price, 10),
        completiontime: parseInt(this.state.completiontime, 10),
        description: this.state.description,
        datelisted: dateTime,
        rating: 0,
        views: 0,
        datelisted: this.state.datelisted,
        extras1: this.state.extras1,
        extras2: this.state.extras2,
        extras1price: parseInt(this.state.extras1price, 10),
        extras2price: parseInt(this.state.extras2price, 10),
        extras1additionaltime: parseInt(this.state.extras1additionaltime, 10),
        extras2additionaltime: parseInt(this.state.extras2additionaltime, 10),
        imagepath1: this.state.filenames[0],
        imagepath2: this.state.filenames[1],
        imagepath3: this.state.filenames[2],
        maincategory: this.state.maincategory,
        subcategory: this.state.subcategory,
        typeofdelivery: this.state.typeofdelivery,
        
      }
  }).then((result) => {
      this.setState({serviceDetails: result.data.data.createService});
      // alert('Your listing: ' + this.state.name + ' has been saved.');
      let port = (window.location.port ? ':' + window.location.port : '');
      window.location.href = '//' + window.location.hostname + port + '/' + this.state.maincategory + '/' + this.state.subcategory + '/' + result.data.data.createService.id;
  }).catch(error => {
    console.log(error.response);
    alert('An error has occured while trying to save your listing: ' + this.state.name + '. Please try again.');
  });
  };

  loadSubcategories(e) {
    axios.post(GRAPHQL_BASE_URL, {//////////get subcategories
      query: print(GET_SUBCATEGORIES_BY_CATEGORY), variables: {parentcategory: e.target.id}
  }).then((result) => {
      this.setState({subcategories: result.data.data.getSubCategoryByCategory});  
  }).catch(error => {
    console.log(error.response)
  });
  }

    render() {
      return (
        <div ><br/>
  <Container style={{border:'1px solid rgba(102, 51, 153, 0.404)'}}>
  <Form onSubmit={this.handleSubmit}>
<br/>
<h2>Create Service Listing</h2>
<br/><br/>
  <Label for="name">Gig title</Label>
  <InputGroup>
        <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><IoIosPerson style={{margin:'10px'}}/></InputGroupAddon>
        <Input  placeholder="I will ..." type="text" name="name" id="name" 
            value={this.state.name} onChange={this.handleChange} />
    </InputGroup><br/> 
    <Label for="name">Gig Image(s) and/or Video(s)</Label>
    {/* Pass FilePond properties as attributes */}
    <FilePond allowMultiple={true} 
                          name={"file"}
                          maxFiles={3} 
                          server={BACKEND_URL+"serviceimage"}
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
  <Label for="price">Price</Label>
   <InputGroup>
        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
            <Input  placeholder="Enter the amount you charge for your services" type="number" name="price" id="price" 
            value={this.state.price} onChange={this.handleChange} />
            <InputGroupAddon addonType="append">.00</InputGroupAddon>
    </InputGroup><br/> 
  </Col>
  <Col>
  <Label for="completiontime">Completion time</Label>
   <InputGroup>
        <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><FaRegClock style={{margin:'10px'}}/></InputGroupAddon>
            <Input  placeholder="Estimate delivery time" type="number" name="completiontime" id="completiontime" 
            value={this.state.completiontime} onChange={this.handleChange} />
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
                   onChange={this.handleChange}>
                              <option key="none" value="">--Select an option--</option>
           {this.state.allCategories.map((maincategory) => 
           <option id={maincategory.category} key={maincategory.category} value={maincategory.category} onClick={this.loadSubcategories}>{maincategory.category}</option>)}
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

    <Label for="description">Gig description</Label>
    <InputGroup>
        <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><IoMdListBox style={{margin:'10px'}}/></InputGroupAddon>
        <Input  placeholder="Enter your gig's description here. Make sure you give 
            a well detailed description of what you're offering." type="text" name="description" id="description" 
            value={this.state.description} onChange={this.handleChange} />
    </InputGroup><br/>           
         <br/>   

   
   <br/>
     <h3>Extra Packages <span style={{color:'#495057', fontSize:'17px'}}>(Optional)</span></h3>
   <Row>
     <Col style={{border:'1px solid rgb(100, 82, 184)', marginRight:'2.5px', marginLeft:'5px'}}>
     <br/>
     <h5>Standard Package</h5>
     <Label for="extras1">Title</Label>
     <InputGroup>
        <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><IoIosAdd style={{margin:'10px'}}/></InputGroupAddon>
        <Input  placeholder="For an extra $... i will ...." type="text" name="extras1" id="extras1" 
            value={this.state.extras1} onChange={this.handleChange} />
    </InputGroup><br/>           

   <Label for="extras1price">Price</Label>
   <InputGroup>
        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
            <Input  placeholder="Enter the amount you charge for the Standard package" type="number" name="extras1price" id="extras1price" 
            value={this.state.extras1price} onChange={this.handleChange} />
            <InputGroupAddon addonType="append">.00</InputGroupAddon>
    </InputGroup><br/>  

    <Label for="extras1additionaltime">Completion time</Label>
   <InputGroup>
        <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><FaRegClock style={{margin:'10px'}}/></InputGroupAddon>
            <Input  placeholder="Estimate delivery time for the Standard package" type="number" name="extras1additionaltime" id="extras1additionaltime" 
            value={this.state.extras1additionaltime} onChange={this.handleChange} />
            <InputGroupAddon addonType="append">Days</InputGroupAddon>
    </InputGroup><br/>          
     </Col>

      <Col style={{border:'1px solid rgb(100, 82, 184)', marginLeft:'2.5px', marginRight:'5px'}}>
      <br/>
      <h5>Premium Package</h5>
     <Label for="extras2">Title</Label>
     <InputGroup>
        <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><IoIosAdd style={{margin:'10px'}}/></InputGroupAddon>
        <Input  placeholder="For an extra $... i will ...." type="text" name="extras2" id="extras2" 
            value={this.state.extras2} onChange={this.handleChange} />
    </InputGroup><br/>           

   <Label for="extras2price">Price</Label>
   <InputGroup>
        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
            <Input  placeholder="Enter the amount you charge for the Premium package" type="number" name="extras2price" id="extras2price" 
            value={this.state.extras2price} onChange={this.handleChange} />
            <InputGroupAddon addonType="append">.00</InputGroupAddon>
    </InputGroup><br/>  

    <Label for="extras2additionaltime">Completion time</Label>
   <InputGroup>
        <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><FaRegClock style={{margin:'10px'}}/></InputGroupAddon>
            <Input  placeholder="Estimate delivery time for Premium package" type="number" name="extras2additionaltime" id="extras2additionaltime" 
            value={this.state.extras2additionaltime} onChange={this.handleChange} />
            <InputGroupAddon addonType="append">Days</InputGroupAddon>
    </InputGroup><br/>          
     </Col>


   </Row>
  
  
  <br/>
  <Button type="submit" style={{backgroundColor:'rgb(100, 82, 184)'}}>Upload Gig</Button>{' '}
            <Button color="secondary" href="/">Cancel</Button><br/><br/>
  </Form>
     




</Container>
        </div>
      );
    }

  };
  
  export default Upload;