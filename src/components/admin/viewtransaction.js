import React, { Component } from 'react';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Container, Button, CardGroup, Label, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {VIEW_TRANSACTION} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import StarRatings from 'react-star-ratings';
import { FaRegEnvelope, FaFly } from 'react-icons/fa';
import Modal from 'react-responsive-modal';
import {FaTelegramPlane, FaSearch, FaCircle} from 'react-icons/fa';
import { runInThisContext } from 'vm';
import moment from 'moment';
import {FaRegClock, FaUserAlt, FaUsers, FaPhone, FaKey, FaUserLock, FaCalendarAlt, FaNewspaper, FaMapMarkerAlt, FaUserFriends, FaUserTie, FaMapMarkedAlt} from 'react-icons/fa';




  class ViewTransaction extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
        open: false,
        transactionDetails: {}
      };
    }
 

    componentDidMount() {
        axios.post(GRAPHQL_BASE_URL, {/////get all transactions
            query: print(VIEW_TRANSACTION), variables: {id: this.props.id}
        }).then((result) => {
            this.setState({transactionDetails: result.data.data.getPurchaseHistory});
        
        }).catch(error => {
          console.log(error.response)
        });
      
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };



    render() {
      const { open } = this.state;
      var transaction = this.state.transactionDetails;
     

        return(<div>

        <button onClick={this.onOpenModal} style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple'}}><h6 >View Transaction</h6></button>
        <Modal open={open} onClose={this.onCloseModal} center>
        <br/>
        <h5 style={{color: 'rebeccapurple', textAlign: 'center'}}>View Transaction</h5>
        <h6 style={{color: 'grey', textAlign: 'center'}}>({transaction.id})</h6>
        <h6 style={{color: '#fff', textAlign: 'center', marginLeft: '-18px'}}>____________________________________________________________________________________</h6>

        <Container>
        <Col style={{maxHeight: '450px', minHeight: '450px', overflowY: 'scroll'}}>

       <Row>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>To:</h6></Row>
           <Row>{transaction.sellerid}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>For:</h6></Row>
           <Row>{transaction.servicename}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Date:</h6></Row>
           <Row>{transaction.date}</Row>
           </Col>
       </Row>
       <br/>
       <Row>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Amount:</h6></Row>
           <Row>{transaction.price}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Paid By:</h6></Row>
           <Row>{transaction.userid}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Payment Method:</h6></Row>
           <Row>{transaction.paymentmethod}</Row>
           </Col>
       </Row>
       <br/>
       <Row>
       <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Main Category:</h6></Row>
           <Row>{transaction.maincategory}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Sub Category:</h6></Row>
           <Row>{transaction.subcategory}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Job Completion:</h6></Row>
           <Row>{transaction.completed}</Row>
           </Col>
       </Row>
       <br/>
       <Row>
       <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Job Completion Date:</h6></Row>
           <Row>{transaction.datecompleted}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>TransactionID:</h6></Row>
           <Row>{transaction.id}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Ordered Item ID:</h6></Row>
           <Row>{transaction.serviceid}</Row>
           </Col>
       </Row>
       </Col>
        </Container>
        </Modal>
          </div>
        )
    }

  };
  
  export default ViewTransaction;