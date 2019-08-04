import React, { Component } from 'react';
import '../listings/viewservice.css';
import './profile.css'
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Container} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {GET_USER, GET_SERVICES_BY_USERID, GET_ORDERS_IN_QUEUE, GET_SELLER_RATING} from '../graphql/QueryResolver';
import {ADD_PROFILE_VIEW} from '../graphql/MutationResolver';
import axios from 'axios';
import {print} from 'graphql';
import StarRatings from 'react-star-ratings';
import { FaRegEnvelope, FaFly } from 'react-icons/fa';
import {BACKEND_URL} from '../backendurl';
import MessagePopup from '../listings/messagepopup';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import {FaMoneyBillAlt} from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';
import ReferAndEarn from '../images/referandearn3.png'
import moment from 'moment';
import Profile from './profile';

  class Ptest extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };
    constructor(props) {
      super(props);
  
      this.state = {
        
      };
    }

    componentDidMount() {
     
         
  }

    render() {
      return (
        // <Container>
        <div>
 <Profile id= {this.props.match.params.userid}/>
        </div>
        // </Container>
      );
    }

  };
  
  export default withCookies(Ptest);