import React, { Component } from 'react';
import {InputGroup, InputGroupAddon, InputGroupText, Input, Col, Row, Form, Button, Label, Container} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {UPLOAD_SERVICE} from '../graphql/MutationResolver';
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
import UploadBidSignIn from './uploadbidsignin';
import UploadBidCompleteProfile from './uploadbidcompleteprofile';
import UploadBid from './uploadbid'
import { delay } from 'q';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);




  class BidValidateLogin extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
        userid: "",
        username: "",
        userDetails: {},
      };

       this.ValidateUpload = () =>{
        //////////////////////////////////////////////check if user is logged in
      if(this.state.userid==""){
        return <UploadBidSignIn/>
      }else{
        axios.post(GRAPHQL_BASE_URL, {
          query: print(GET_USER), variables: {id: localStorage.getItem('userId')}
      }).then((result) => {
          this.setState({userDetails: result.data.data.getUser});
      
      }).catch(error => {
        console.log(error.response)
      });
      //////////////////////////check if profile is complete
      if(this.state.userDetails.bio==""||this.state.userDetails.profilepicturepath==""||this.state.userDetails.skills==""||this.state.userDetails.responsetime==null){
        return<UploadBidCompleteProfile userid={this.state.userid}/>
      }else{
        return <UploadBid userid={this.state.userid}/>
      }
      
      
      
      }
      }
   

    }

    componentDidMount() {
      // this.setState({userid: ""})
      this.setState({userid: localStorage.getItem('userId')})

    }

  

    render() {


      
      return (
        <div >
         <this.ValidateUpload/>
        </div>
      );
    }

  };
  
  export default BidValidateLogin;