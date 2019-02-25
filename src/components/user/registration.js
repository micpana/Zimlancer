import React, { Component } from 'react';
import {InputGroup, InputGroupAddon, InputGroupText, Input, Col, Row, Form, Button, Label, Container} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {CREATE_USER} from '../graphql/MutationResolver';
import axios from 'axios';
import {print} from 'graphql';
import {FaRegClock, FaUserAlt, FaUsers, FaPhone, FaKey, FaUserLock, FaCalendarAlt, FaNewspaper, FaMapMarkerAlt, FaUserFriends, FaUserTie, FaMapMarkedAlt} from 'react-icons/fa';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

  class Registration extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };
    constructor(props) {
      super(props);
  
      this.state = {
        firstname: "",
        surname: "",
        emailaddress: "",
        phonenumber: '',
        username: "",
        password: "",
        usertype: "",
        gender: "",
        country: "",
        city: "",
        dateofbirth: "",
        newsletter: "",
        profilepicturepath: "",
        skills: "",
        bio: "",
        responsetime: '',
        userDetails: {}

        
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
       ///check if user is logged in already
       this.ValidateLogin = () =>{
        const { cookies } = this.props;
        if(cookies.get('userId')!=null){
          let port = (window.location.port ? ':' + window.location.port : '');
          ////reloading page to home in 3 seconds
          this.interval = setInterval(() => window.location.href = '//' + window.location.hostname + port + '/', 3000);
  
          return<div>
                  <h6 style={{color: 'rebeccapurple', marginTop: '10%', marginBottom: '10%'}}>Oops! It seems like you're logged in already.<br/>Redirecting home...</h6>     
            </div>
        }else{
return  <Container style={{border:'1px solid rgba(102, 51, 153, 0.404)'}}>
<Form onSubmit={this.handleSubmit} >
<br/>
<h2>Account Registration</h2>
<br/><br/>
<Row>
  <Col>
  <Label for="firstname">Firstname</Label>
 <InputGroup>
      <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><FaUserAlt style={{margin:'10px'}}/></InputGroupAddon>
          <Input  placeholder="Firstname" type="text" name="firstname" id="firstname" 
          value={this.state.firstname} onChange={this.handleChange} />
  </InputGroup><br/> 
  </Col>
  <Col>
  <Label for="surname">Lastname</Label>
 <InputGroup>
      <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><FaUsers style={{margin:'10px'}}/></InputGroupAddon>
          <Input  placeholder="Lastname" type="text" name="surname" id="surname" 
          value={this.state.surname} onChange={this.handleChange} />
  </InputGroup><br/> 
  </Col>
</Row>

<Row>
  <Col>
  <Label for="emailaddress">Email</Label>
 <InputGroup>
      <InputGroupAddon addonType="prepend">@</InputGroupAddon>
          <Input  placeholder="Email Address" type="text" name="emailaddress" id="emailaddress" 
          value={this.state.emailaddress} onChange={this.handleChange} />
  </InputGroup><br/> 
  </Col>
  <Col>
  <Label for="phonenumber">Phone number</Label>
  <InputGroup>
      <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><FaPhone style={{margin:'10px'}}/></InputGroupAddon>
          <Input  placeholder="Phone number" type="number" name="phonenumber" id="phonenumber" 
          value={parseInt(this.state.phonenumber, 10)} onChange={this.handleChange} />
  </InputGroup><br/> 
  </Col>
</Row>

 <Row>
  <Col>
  <Label for="username">Username</Label>
  <InputGroup>
      <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><FaUserLock style={{margin:'10px'}}/></InputGroupAddon>
          <Input  placeholder="Username" type="text" name="username" id="username" 
          value={this.state.username} onChange={this.handleChange} />
  </InputGroup><br/> 
  </Col>
  <Col>
  <Label for="password">Password</Label>
  <InputGroup>
      <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><FaKey style={{margin:'10px'}}/></InputGroupAddon>
          <Input  placeholder="Password" type="password" name="password" id="password" 
          value={this.state.password} onChange={this.handleChange} />
  </InputGroup><br/> 
  </Col>
</Row>

  <Row>
  {/* <Col>
  <Label for="passwordconfirm">Confirm Password</Label>
  <InputGroup>
      <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><FaKey style={{margin:'10px'}}/></InputGroupAddon>
          <Input  placeholder="Confirm Password" type="password" name="passwordconfirm" id="passwordconfirm" 
          value={this.state.passwordconfirm} onChange={this.handleChange} />
  </InputGroup><br/>
  </Col> */}
  <Col>
  <Label for="usertype">Company / Individual</Label> 
  <InputGroup>
      <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><FaUserTie style={{margin:'10px'}}/></InputGroupAddon>
      <select className="form-control" name="usertype" value={this.state.usertype} 
                 onChange={this.handleChange}>
         <option key="none" value="">Select Account Type</option>
         <option key="individual" value="Individual">Individual</option>
         <option key="company" value="Company">Company</option>

         </select><br/>  
  </InputGroup><br/> 
  </Col>
</Row>

<Row>
  <Col>
  <Label for="gender">Gender</Label> 
  <InputGroup>
      <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><FaUserFriends style={{margin:'10px'}}/></InputGroupAddon>
      <select className="form-control" name="gender" value={this.state.gender} 
                 onChange={this.handleChange}>
         <option key="none" value="">Select Gender</option>
         <option key="male" value="Male">Male</option>
         <option key="female" value="Female">Female</option>

         </select><br/>  
  </InputGroup><br/> 

  </Col>
  <Col>
  <Label for="country">Country</Label> 
  <InputGroup>
      <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><FaMapMarkerAlt style={{margin:'10px'}}/></InputGroupAddon>
      <select className="form-control" name="country" value={this.state.country} 
                 onChange={this.handleChange}>
         <option key="none" value="">Select Country</option>
         <option key="zimbabwe" value="Zimbabwe">Zimbabwe</option>

         </select><br/>  
  </InputGroup><br/> 
         
  </Col>
  <Col>
  <Label for="city">City</Label> 
  <InputGroup>
      <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><FaMapMarkedAlt style={{margin:'10px'}}/></InputGroupAddon>
      <select className="form-control" name="city" value={this.state.city} 
                 onChange={this.handleChange}>
         <option key="none" value="">Select City</option>
         <option key="harare" value="Harare">Harare</option>

         </select><br/>   
  </InputGroup><br/> 
      
  </Col>
</Row>

 <Row>
  <Col>
  <Label for="dateofbirth">Date Of Birth</Label>
  <InputGroup>
      <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><FaCalendarAlt style={{margin:'10px'}}/></InputGroupAddon>
          <Input  placeholder="Date Of Birth" type="date" name="dateofbirth" id="dateofbirth" 
          value={this.state.dateofbirth} onChange={this.handleChange} />
  </InputGroup><br/> 
  </Col>
  <Col>
  <Label for="newsletter">Receive Newsletters</Label>
  <InputGroup>
      <InputGroupAddon addonType="prepend" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><FaNewspaper style={{margin:'10px'}}/></InputGroupAddon>
      <select className="form-control" name="newsletter" value={this.state.newsletter} 
                 onChange={this.handleChange}>
                 <option key="none" value="">Select Option</option>
         <option key="true" value="true">Yes</option>
         <option key="false" value="false">No</option>

         </select><br/>
  </InputGroup><br/> 
  </Col>
</Row>






<br/>
<Button type="submit" style={{backgroundColor:'rgb(100, 82, 184)'}}>Create Account</Button>{' '}
          <Button color="secondary" href="/">Cancel</Button><br/><br/><br/>
</Form>
   




</Container>
        }
      };

    }

    componentDidMount() {
   


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
    query: print(CREATE_USER), variables: {
      firstname: this.state.firstname,
      surname: this.state.surname,
      emailaddress: this.state.emailaddress,
      username: this.state.username,
      password: this.state.password,
      profilepicturepath: this.state.profilepicturepath,
      datejoined: dateTime,
      level: 0,
      skills: this.state.skills,
      country: this.state.country,
      city: this.state.city,
      bio: this.state.bio,
      balance: 0,
      gender: this.state.gender,
      dateofbirth: this.state.dateofbirth,
      newsletter: this.state.newsletter,
      usertype: this.state.usertype,
      phonenumber: parseInt(this.state.phonenumber, 10),
      plan: "free",
      active: "false",
      access: "user",
      responsetime: parseInt(this.state.responsetime, 10)
    }
}).then((result) => {
  this.setState({userDetails: result.data.data.createUser});
    alert('Your account: ' + this.state.username + ' has been registered successfully.');
    let port = (window.location.port ? ':' + window.location.port : '');
    window.location.href = '//' + window.location.hostname + port + '/login/';
}).catch(error => {
  console.log(error.response);
  alert('An error has occured while registering your account: ' + this.state.username + '. Please try again.');

});
}

    render() {
      return (
        <div ><br/>
         <this.ValidateLogin/>
        </div>
      );
    }

  };
  
  export default withCookies(Registration);