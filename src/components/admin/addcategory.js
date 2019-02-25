import React, { Component } from 'react';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {ADD_CATEGORY} from '../graphql/MutationResolver';
import axios from 'axios';
import {print} from 'graphql';
import StarRatings from 'react-star-ratings';
import { FaRegEnvelope, FaFly } from 'react-icons/fa';
import Modal from 'react-responsive-modal';
import {FaTelegramPlane, FaSearch, FaCircle} from 'react-icons/fa';
import { runInThisContext } from 'vm';
import moment from 'moment';



  class AddCategory extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
        open: false,
        category: ""

      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleSubmit(e) {
        axios.post(GRAPHQL_BASE_URL, {
          query: print(ADD_CATEGORY), variables: {
            category: this.state.category
          }
      }).then((result) => {
       alert('Category Succesfully Added.')
          
      }).catch(error => {
        console.log(error.response);
        alert('An error has occured while trying to save this category Please try again.');
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

        <button onClick={this.onOpenModal} style={{backgroundColor: 'inherit', border: 'none', color: 'rgba(0, 0, 0, 0.9)'}}><h6 >Add Category</h6></button>
        <Modal open={open} onClose={this.onCloseModal} center>
    <h5>Add Category</h5>
    <InputGroup>
<Input  placeholder="Enter category name here" type="text" name="category" id="category" 
value={this.state.category} onChange={this.handleChange} />
         <InputGroupAddon addonType="append" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><Button onClick={this.handleSubmit} style={{backgroundColor: '#fff', border: 'none'}}><span style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Add</span></Button></InputGroupAddon>
   </InputGroup>
  </Modal>
          </div>
        )
    }

  };
  
  export default AddCategory;