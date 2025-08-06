import React, { Component } from 'react';
import {Row, CardDeck, Col, Container, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {TRANSACTION_FEES} from '../graphql/QueryResolver';
import {UPDATE_TRANSACTION_FEE} from '../graphql/MutationResolver';
import axios from 'axios';
import {print} from 'graphql';
import StarRatings from 'react-star-ratings';
import { FaRegEnvelope, FaFly } from 'react-icons/fa';
import Modal from 'react-responsive-modal';
import {FaTelegramPlane, FaSearch, FaCircle} from 'react-icons/fa';
import { runInThisContext } from 'vm';
import moment from 'moment';



  class TransactionFees extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
       transactionFees: [],
       fixedamount: "",
       percentage: ""

      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        axios.post(GRAPHQL_BASE_URL, {
          query: print(UPDATE_TRANSACTION_FEE), variables: {
id: this.state.transactionFees[0].id,
fixedamount: parseInt(this.state.fixedamount, 10),
percentage: parseInt(this.state.percentage, 10)
          }
      }).then((result) => {
        axios.post(GRAPHQL_BASE_URL, {
            query: print(TRANSACTION_FEES)
        }).then((result) => {
          this.setState({transactionFees: result.data.data.allTransactionFees});          
        }).catch(error => {
          console.log(error.response);
        });         
    alert('Fee structure has been updated succesfully.')
      }).catch(error => {
        console.log(error.response);
        alert('An error occured while trying to update the fee structure')
      });

      };

    componentDidMount() {
        axios.post(GRAPHQL_BASE_URL, {
            query: print(TRANSACTION_FEES)
        }).then((result) => {
          this.setState({transactionFees: result.data.data.allTransactionFees});
          this.setState({fixedamount: result.data.data.allTransactionFees[0].fixedamount});
          this.setState({percentage: result.data.data.allTransactionFees[0].percentage});
        }).catch(error => {
          console.log(error.response);
        }); 
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }


    render() {
        const currentStructure = this.state.transactionFees.map(fee => {
return<div>
    <Row>
        <Col>
        <Row>
<h6 style={{color: 'rebeccapurple', textAlign: 'left', fontWeight: 'bold'}}>Fixed Amount Set:</h6>
        </Row>
        <Row>
            <span style={{textAlign: 'left'}}>${fee.fixedamount}</span>
        </Row>
        </Col>
        <Col>
        <Row>
        <h6 style={{color: 'rebeccapurple', textAlign: 'left', fontWeight: 'bold'}}>Percentage Set:</h6>
        </Row>
        <Row>
        <span style={{textAlign: 'left'}}>{fee.percentage}%</span>
        </Row>
        </Col>
    </Row>
</div>
        });
        return(<div>
            <Container>
        <h6>Current Fee Structure</h6>
        <br/><br/>
{currentStructure}
  <br/>
   <Row>
       <Col>
       <h6>Update Fixed Amount</h6>
    <InputGroup>
<Input  placeholder="Enter fixed amount here" type="number" name="fixedamount" id="fixedamount" 
value={this.state.fixedamount} onChange={this.handleChange} />
         <InputGroupAddon addonType="append" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><Button onClick={this.handleSubmit} style={{backgroundColor: '#fff', border: 'none'}}><span style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Update</span></Button></InputGroupAddon>
   </InputGroup>
       </Col>
       <Col>
       <h6>Update Percentage</h6>
    <InputGroup>
<Input  placeholder="Enter percentage here" type="number" name="percentage" id="percentage" 
value={this.state.percentage} onChange={this.handleChange} />
         <InputGroupAddon addonType="append" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><Button onClick={this.handleSubmit} style={{backgroundColor: '#fff', border: 'none'}}><span style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Update</span></Button></InputGroupAddon>
   </InputGroup>
       </Col>
   </Row>
   <br/>
   </Container>
          </div>
        )
    }

  };
  
  export default TransactionFees;