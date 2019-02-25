import React, { Component } from 'react';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {ADD_SUBCATEGORY} from '../graphql/MutationResolver';
import axios from 'axios';
import {print} from 'graphql';
import StarRatings from 'react-star-ratings';
import { FaRegEnvelope, FaFly } from 'react-icons/fa';
import Modal from 'react-responsive-modal';
import {FaTelegramPlane, FaSearch, FaCircle} from 'react-icons/fa';
import { runInThisContext } from 'vm';
import moment from 'moment';



  class AddSubCategory extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
        open: false,
        subcategory: ""

      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.ValidateCategorySelect = () =>{
      if(this.props.parentcategory==""){
        const { open } = this.state;
          return<Modal open={open} onClose={this.onCloseModal} center>
        <br/>
        <h6 style={{color: 'rebeccapurple'}}>Please select a parent category first.</h6>
        </Modal>
      }else{
        const { open } = this.state;
          return   <Modal open={open} onClose={this.onCloseModal} center>
          <h5>Add SubCategory</h5>
          <InputGroup>
      <Input  placeholder="Enter subcategory name here" type="text" name="subcategory" id="subcategory" 
      value={this.state.subcategory} onChange={this.handleChange} />
               <InputGroupAddon addonType="append" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><Button onClick={this.handleSubmit} style={{backgroundColor: '#fff', border: 'none'}}><span style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Add</span></Button></InputGroupAddon>
         </InputGroup>
        </Modal>
      }
    }
    }
    handleSubmit(e) {
        axios.post(GRAPHQL_BASE_URL, {
          query: print(ADD_SUBCATEGORY), variables: {
            parentcategory: this.props.parentcategory,
            subcategory: this.state.subcategory
          }
      }).then((result) => {
       alert('SubCategory Succesfully Added.')
       this.setState({ open: false })
      }).catch(error => {
        console.log(error.response);
        alert('An error has occured while trying to save this subcategory Please try again.');
      });
      };

    componentDidMount() {
          
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }


    render() {
      const { open } = this.state;
        return(<div>

        <button onClick={this.onOpenModal} style={{backgroundColor: 'inherit', border: 'none', color: 'rgba(0, 0, 0, 0.9)'}}><h6 >Add SubCategory</h6></button>
     <this.ValidateCategorySelect/>
          </div>
        )
    }

  };
  
  export default AddSubCategory;