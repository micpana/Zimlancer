import React, { Component } from 'react';
import {InputGroup, InputGroupAddon, InputGroupText, Input, Col, Row, Form, Button, Label, Container} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {UPLOAD_SERVICE} from '../graphql/MutationResolver';
import {USER_LOGIN} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import {FaRegClock, FaUserAlt, FaShippingFast, FaKey, FaClock} from 'react-icons/fa';
import { IoIosPerson, IoIosAddCircle, IoIosArrowDropdownCircle, IoMdListBox,IoIosAdd, IoMdBuild} from "react-icons/io";
import { FilePond, File, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import Loginpic from '../images/login.png'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

  class UploadBidSignIn extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };
    constructor(props) {
      super(props);
  
      this.state = {
        userid: "",
        username:"",
        password:""
        
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
   

  }

  handleChange(e) {
  this.setState({[e.target.name]: e.target.value});
}
handleSubmit(e) {
  const { cookies } = this.props;
    axios.post(GRAPHQL_BASE_URL, {
      query: print(USER_LOGIN), variables: {
      username: this.state.username,
      password: this.state.password
      }
  }).then((result) => {
    if(result.data.data.userLogin.length==1){
      cookies.set('userId', result.data.data.userLogin[0].id, { path: '/' });
    }else{
      alert('login failed')
    }
      
  }).catch(error => {
    console.log(error.response);
    alert('An error has occured while trying to log you in ');
  });
  };

    render() {
       
      return (
        <div >
  <Container style={{width:'100%'}}>
    <br/><br/>
    <Row style={{border:'1px solid rgba(102, 51, 153, 0.404)'}}>
      <Col >
      <img src={Loginpic} style={{width:'105.7%', marginLeft:'-15px'}}/>
      </Col>
      <Col style={{borderLeft:'1px solid rgba(102, 51, 153, 0.404)'}}>
      <Form onSubmit={this.handleSubmit}>
      <br/><br/>
      <h2>Login</h2>
    
    <h6 style={{color:'red'}}>You need to be logged in first in order to post a bid.</h6>
    <br/><br/>
    <Label for="username">Username</Label>
   <InputGroup>
        <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><FaUserAlt style={{margin:'10px'}}/></InputGroupAddon>
            <Input  placeholder="Username" type="text" name="username" id="username" 
            value={this.state.username} onChange={this.handleChange} />
    </InputGroup><br/> 
    <Label for="password">Password</Label>
    <InputGroup>
        <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><FaKey style={{margin:'10px'}}/></InputGroupAddon>
            <Input  placeholder="Password" type="password" name="password" id="password" 
            value={this.state.password} onChange={this.handleChange} />
    </InputGroup><br/> 



  <Button type="submit" style={{backgroundColor:'rgb(100, 82, 184)'}}>Login</Button>{' '}
            <Button color="secondary" href="/">Cancel</Button>
            <h6><br/>No account yet? <a href="/registration" style={{color:'rebeccapurple'}}>Click here</a> to create one.</h6>
            <h6><br/><a href="/registration" style={{color:'rebeccapurple'}}>Forgot Password?</a></h6>
<br/><br/>
    </Form>
      </Col>
    
    </Row>
    <br/><br/>
  </Container>
        </div>
      );
    }

  };
  
  export default withCookies(UploadBidSignIn);