import React, { Component } from 'react';
import './viewservice.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {SEND_MESSAGE} from '../graphql/MutationResolver';
import axios from 'axios';
import {print} from 'graphql';
import StarRatings from 'react-star-ratings';
import { FaRegEnvelope, FaFly } from 'react-icons/fa';
import Modal from 'react-responsive-modal';
import {FaTelegramPlane, FaSearch, FaCircle} from 'react-icons/fa';
import { runInThisContext } from 'vm';
import moment from 'moment';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';



  class AddReviewPopup extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };
    constructor(props) {
      super(props);
  
      this.state = {
        open: false,
      };
    }
  
  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };


    render() {
      const { open } = this.state;
        return(<div>
<Modal open={open} onClose={this.onCloseModal} center>
<h6 style={{color: 'rebeccapurple'}}><br/><br/>You need to login first inorder to start posting reviews.<br/><br/></h6>
</Modal>
        </div>
        )
    }

  };
  
  export default withCookies(AddReviewPopup);