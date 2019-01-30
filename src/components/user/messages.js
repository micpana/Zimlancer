import React, { Component } from 'react';
import {InputGroup, InputGroupAddon, InputGroupText, Nav, NavItem, NavLink,Input, Col, Row, Form, Button, Label, Container} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {UPLOAD_SERVICE} from '../graphql/MutationResolver';
import {GET_USER} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import {FaTelegramPlane, FaSearch, FaCircle} from 'react-icons/fa';
import { FilePond, File, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import UploadBidSignIn from './uploadbidsignin';
import UploadBidCompleteProfile from './uploadbidcompleteprofile';
import UploadBid from './uploadbid'
import { delay } from 'q';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);




  class Messages extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
        userid: "",
        username: "",
        userDetails: {},
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

       this.MessageView = () =>{
        //////////////////////////////////////////////check if user is logged in
      if(localStorage.getItem('userId')==""){
        let port = (window.location.port ? ':' + window.location.port : '');
        window.location.href = '//' + window.location.hostname + port + '/login/';
      }else{
          ///////get user details
        axios.post(GRAPHQL_BASE_URL, {
          query: print(GET_USER), variables: {id: localStorage.getItem('userId')}
      }).then((result) => {
          this.setState({userDetails: result.data.data.getUser});
      
      }).catch(error => {
        console.log(error.response)
      });
      //get user messages

      //////////////////////////messages
      return<Container><br/><br/>
          <Row style={{border: '1px solid rgba(102, 51, 153, 0.404)'}}>
              <Col>
              <Input type="text"  name="search" id="search"  placeholder="Search in Messages"  style={{color: 'rgba(0, 0, 0, 0.5)', display: 'inline-block', height:20,borderBottom:'1px solid',borderRight:'0px',borderLeft:'0px',borderTop:'0px ',outline:'none', width:300}} />
            <button className="btn "  onClick={e=>this.onSubmit(e)} style={{backgroundColor:'white',outline:'none'}}><FaSearch style={{color:'#6552b8'}}/></button>
              </Col>
              <Col>
              <h2>Messages</h2>
              </Col>
              <Col>

              </Col>
          </Row>
          <Row style={{minHeight: '300px', borderBottom: '1px solid rgba(102, 51, 153, 0.404)'}}>
              <Col style={{borderRight:'1px solid rgba(102, 51, 153, 0.404)', borderLeft:'1px solid rgba(102, 51, 153, 0.404)', overflowY: 'scroll'}} xs="3">
             {/* message sender row starts here */}
             <Row style={{borderBottom:'1px solid #d7d7c1'}}>
             <Col xs="3">
             <img src="http://localhost:3008/images/profilepictures/43283470_1586436078124986_2470765896499462144_n.jpg"
             style={{width:'100%',borderRadius:'50%', paddingTop:'4px', paddingBottom: '4px'}}
             />
             </Col>
             <Col>
                 <h6 style={{color: 'rgba(0, 0, 0, 0.5)', textAlign: 'left', paddingTop: '12px'}}>
                <a href="/messages/" style={{color:'rgba(0, 0, 0, 0.5)'}}>username </a>
                {/* <FaCircle color="rebeccapurple"/> */}
                </h6>
             </Col>
             </Row>
             {/* message sender row ends here */}
              </Col>
              <Col style={{borderRight:'1px solid rgba(102, 51, 153, 0.404)'}}>
              <Row style={{minHeight: '290px', overflowY: 'scroll'}}>

              </Row>
              <Row>
              <InputGroup>
              <Input  placeholder="Enter message here" type="text" name="message" id="message" 
            value={this.state.message} onChange={this.handleChange} />
                        <a href="/messages/"><InputGroupAddon addonType="append" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><FaTelegramPlane color="rebeccapurple" style={{margin:'10px'}}/></InputGroupAddon></a>
                  </InputGroup>
                  </Row>
              </Col>
              
          </Row>
      </Container>
      
      
      
      }
      }
   

    }

    componentDidMount() {
      // this.setState({userid: ""})
      this.setState({userid: localStorage.getItem('userId')})

    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
      }
      handleSubmit(e) {
        e.preventDefault()
          axios.post(GRAPHQL_BASE_URL, {
            query: print(UPLOAD_SERVICE), variables: {
              
              
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

  

    render() {


      
      return (
        <div >
         <this.MessageView/>
        </div>
      );
    }

  };
  
  export default Messages;