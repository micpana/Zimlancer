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
import UploadSignIn from './uploadsignin';
import UploadCompleteProfile from './uploadcompleteprofile';
import Upload from './upload';
import { delay } from 'q';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);




  class UploadService extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };
    constructor(props) {
      super(props);
  
      this.state = {
        userid: "",
        username: "",
        userDetails: {},
      };

       this.ValidateUpload = () =>{
        const { cookies } = this.props;
        //////////////////////////////////////////////check if user is logged in
      if(this.state.userid==null){
        return <UploadSignIn/>
      }else{
        axios.post(GRAPHQL_BASE_URL, {
          query: print(GET_USER), variables: {id: cookies.get('userId')}
      }).then((result) => {
          this.setState({userDetails: result.data.data.getUser});
      
      }).catch(error => {
        console.log(error.response)
      });
      //////////////////////////check if profile is complete
      if(this.state.userDetails.bio==""||this.state.userDetails.profilepicturepath==""||this.state.userDetails.skills==""||this.state.userDetails.responsetime==null){
        return<UploadCompleteProfile userid={this.state.userid}/>
      }else{
        return <Upload userid={this.state.userid}/>
      }
      
      
      
      }
      }
   

    }

    componentDidMount() {
      const { cookies } = this.props;
      this.setState({userid: cookies.get('userId')})

    }

  

    render() {


      
      return (
        <div >
         <this.ValidateUpload/>
        </div>
      );
    }

  };
  
  export default withCookies(UploadService);