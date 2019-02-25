import React, { Component } from 'react';
import '../categorieslandingpages/graphicsanddesign.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label, InputGroup} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {BACKEND_URL} from '../backendurl';
import {GET_SERVICES_BY_SUBCATEGORY, GET_USER, GET_BIDS_BY_SUBCATEGORY} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import { runInThisContext } from 'vm';
import Services from './services';
import Bids from './bids';

  class ServicesList extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
currentview: "services"
      };
      this.viewItem = this.viewItem.bind(this);
      /////////view
      this.CurrentView = () =>{
        if(this.state.currentview=="services"){
          return<Services subcategory={this.props.match.params.subcategory}/>
        }
        if(this.state.currentview=="bids"){
          return<Bids subcategory={this.props.match.params.subcategory}/>
        }
     
      }
///////buttons
      this.Buttons = () =>{
if(this.state.currentview=="services"){
  return   <Row>
    <Col>
    <Button id="services" onClick={this.viewItem} style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple', float: 'left'}}>Services</Button>
  <Button id="bids" onClick={this.viewItem} style={{backgroundColor: 'inherit', border: 'none', color: 'grey', float: 'left'}}>Bids</Button>
    </Col>
    <Col sm="4">
              <InputGroup style={{width: '50%', float: 'right', marginRight: '5%'}}>
        <select className="form-control" name="sortby" value={this.state.sortby} 
                   onChange={this.handleChange} style={{border: '1px solid rebeccapurple'}}>
                              <option id="none" key="none" value="">-----Default-----</option>
                      </select>
    </InputGroup>
    </Col>
</Row>
}
if(this.state.currentview=="bids"){
  return   <Row>
  <Col>
    <Button id="services" onClick={this.viewItem} style={{backgroundColor: 'inherit', border: 'none', color: 'grey', float: 'left'}}>Services</Button>
  <Button id="bids" onClick={this.viewItem} style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple', float: 'left'}}>Bids</Button>
    </Col>
    <Col sm="4">
              <InputGroup style={{width: '50%', float: 'right', marginRight: '5%'}}>
        <select className="form-control" name="sortby" value={this.state.sortby} 
                   onChange={this.handleChange} style={{border: '1px solid rebeccapurple'}}>
                              <option id="none" key="none" value="">-----Default-----</option>
                      </select>
    </InputGroup>
    </Col>
</Row>
}
      }
    }

    componentDidMount() {

 

  }
  viewItem(e) {
    this.setState({currentview: e.target.id});
  }

    render() {

      return (
        <div className="graphics">
        <h2 className="grapheading">{this.props.match.params.subcategory}</h2>
        <Row className="mainrow">

<Col className="leftsidebar" xs="3">
<h5 className="subcatmaincat">Filter</h5>
<h6 className="subcatrow">Delivery Time</h6>
<h6 className="subcatrow">Seller Rating</h6>
<h6 className="subcatrow">Price Range</h6>

</Col>
<Col className="subcategories">
<this.Buttons/>
<br/>
           <Row className="srvlst">
<this.CurrentView/>
           </Row>

        </Col>
        </Row>
        </div>
      );
    }

  };
  
  export default ServicesList;