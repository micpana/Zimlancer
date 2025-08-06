import React, { Component } from 'react';
import {InputGroup, InputGroupAddon, InputGroupText, Input, Col, Row, Form, Button, Label, Container} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {UPDATE_USER} from '../graphql/MutationResolver';
import {GET_USER} from '../graphql/QueryResolver';
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
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

  class UploadBidCompleteProfile extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };
    constructor(props) {
      super(props);
  
      this.state = {
        userid:"",
        bio:"",
        skills:"",
        responsetime:'',
        files: [],
        filenames:[null],
        userDetails:{}

        
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
      const { cookies } = this.props;
      this.setState({userid: cookies.get('userId')})
      axios.post(GRAPHQL_BASE_URL, {
       query: print(GET_USER), variables: {id: this.props.userid}
   }).then((result) => {
       this.setState({userDetails: result.data.data.getUser});
       this.setState({bio: result.data.data.getUser.bio});
       this.setState({skills: result.data.data.getUser.skills});
       this.setState({responsetime: result.data.data.getUser.responsetime});

   console.log(this.state.userDetails)
   }).catch(error => {
     console.log(error.response)
   });

  }

  handleChange(e) {
  this.setState({[e.target.name]: e.target.value});
}
handleSubmit(e) {  
  e.preventDefault();
  // alert('hold up')
  // console.log(this.state)
    axios.post(GRAPHQL_BASE_URL, {
      query: print(UPDATE_USER), variables: {
        id: this.props.userid,
        firstname: this.state.userDetails.firstname,
        surname: this.state.userDetails.surname,
        emailaddress: this.state.userDetails.emailaddress,
        username: this.state.userDetails.username,
        password: this.state.userDetails.password,
        profilepicturepath: this.state.filenames[0],
        datejoined: this.state.userDetails.datejoined,
        level: parseInt(this.state.userDetails.level, 10),
        skills: this.state.skills,
        country: this.state.userDetails.country,
        city: this.state.userDetails.city,
        bio: this.state.bio,
        balance: parseInt(this.state.userDetails.balance, 10),
        gender: this.state.userDetails.gender,
        dateofbirth: this.state.userDetails.dateofbirth,
        newsletter: this.state.userDetails.newsletter,
        usertype: this.state.userDetails.usertype,
        phonenumber: parseInt(this.state.userDetails.phonenumber, 10),
        plan: this.state.userDetails.plan,
        active: this.state.userDetails.active,
        access: this.state.userDetails.access,
        responsetime: parseInt(this.state.responsetime, 10)
        
      }
  }).then((result) => {
      alert('Your profile is now complete');
  }).catch(error => {
    console.log(error.response);
    alert('An error has occured while trying to update your profile.');
  });
  };

    render() {
      return (
        <div ><br/>
  <Container style={{border:'1px solid rgba(102, 51, 153, 0.404)'}}>
   
   <Form onSubmit={this.handleSubmit}>
       <br/><br/>
       <h2>Complete your profile</h2>
       <br/>
       <h6 style={{color:'rebeccapurple'}}>Before you can post a bid, please provide the following
         information inorder to populate your profile and let our freelancers know what you're all about.
       </h6>
       <br/><br/>
       <Label for="name">Upload profile picture</Label>
    {/* Pass FilePond properties as attributes */}
    <FilePond allowMultiple={true} 
                          name={"file"}
                          maxFiles={1} 
                          server={BACKEND_URL+"profileimage"}
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
        
       <Label for="bio">Bio</Label>
      <InputGroup>
           <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><FaUserAlt style={{margin:'10px'}}/></InputGroupAddon>
               <Input  placeholder="Let your buyers know who you are" type="text" name="bio" id="bio" 
               value={this.state.bio} onChange={this.handleChange} />
       </InputGroup><br/> 
   
       <Label for="skills">Skills <span style={{fontSize:'15px'}}>(separate with commas)</span></Label>
      <InputGroup>
           <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><IoMdBuild style={{margin:'10px'}}/></InputGroupAddon>
               <Input  placeholder="List the skills you can offer to buyers" type="text" name="skills" id="skills" 
               value={this.state.skills} onChange={this.handleChange} />
       </InputGroup><br/>
       <Label for="responsetime">Average Response Time</Label>
       <InputGroup>
           <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><FaClock style={{margin:'10px'}}/></InputGroupAddon>
               <Input  placeholder="Average response time to a order placement or enquiry by buyer" type="number" name="responsetime" id="responsetime" 
               value={parseInt(this.state.responsetime, 10)} onChange={this.handleChange} />
                           <InputGroupAddon addonType="append">Hours</InputGroupAddon>
       </InputGroup><br/> 
   
   
   
    <br/>
     <Button type="submit" style={{backgroundColor:'rgb(100, 82, 184)'}}>Complete profile</Button>{' '}
               <Button color="secondary" href="/">Cancel</Button><br/><br/>
   </Form>
   
   
   
     </Container>
        </div>
      );
    }

  };
  
  export default withCookies(UploadBidCompleteProfile);