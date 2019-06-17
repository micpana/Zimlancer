import React, { Component } from 'react';
import '../categorieslandingpages/graphicsanddesign.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Container, Table} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {GET_AMOUNT_SPENT, GET_USER_BALANCE} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import { runInThisContext } from 'vm';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

  class PaymentsHistory extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };
    constructor(props) {
      super(props);
  
      this.state = {
amountSpent: [],
amountReceived: []
      };
    
    }

    componentDidMount() {
      const { cookies } = this.props;
        ///////get amount spent
      axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_AMOUNT_SPENT), variables: {userid: cookies.get('userId')}
    }).then((result) => {
        this.setState({amountSpent: result.data.data.getAmountSpent});
    
    }).catch(error => {
      console.log(error.response)
    });
    axios.post(GRAPHQL_BASE_URL, {/////////get amount received
        query: print(GET_USER_BALANCE), variables: {sellerid: cookies.get('userId')}
    }).then((result) => {
        this.setState({amountReceived: result.data.data.getUserBalance});
    
    }).catch(error => {
      console.log(error.response)
    });
  }


    render() {
        const paymentsReceived = this.state.amountReceived.map(received => {
            return <tr>
              <td style={{whiteSpace: 'nowrap'}}>{received.username}</td>
              <td style={{whiteSpace: 'nowrap'}}>{received.servicename}</td>
              <td style={{whiteSpace: 'nowrap'}}>{received.date}</td>
              <td style={{whiteSpace: 'nowrap'}}>{received.price}</td>
            </tr>
          });
          const paymentsMade = this.state.amountSpent.map(made => {
            return <tr>
              <td style={{whiteSpace: 'nowrap'}}>{made.sellername}</td>
              <td style={{whiteSpace: 'nowrap'}}>{made.servicename}</td>
              <td style={{whiteSpace: 'nowrap'}}>{made.date}</td>
              <td style={{whiteSpace: 'nowrap'}}>{made.price}</td>
            </tr>
          });
      return (
        <div>
                        <h6>Payments History</h6><br/>
                        <Container>
                            <Row>
<Col style={{maxHeight: '350px',minHeight: '350px', overflowY: 'scroll'}}>
<h6 style={{color: 'rebeccapurple'}}>Payments Received</h6>
                        <Table>
            <thead>
            <tr>
        
              <th width="20%">From</th>
              <th width="20%">For</th>
              <th width="20%">Date</th>
              <th width="20%">Amount</th>
            </tr>
            </thead>
            <tbody>
            {paymentsReceived}
            </tbody>
          </Table>
</Col>
</Row>  
<br/>
<Row>
<Col style={{maxHeight: '350px', minHeight: '350px', overflowY: 'scroll'}}>
<h6 style={{color: 'rebeccapurple'}}>Payments Made</h6>
                        <Table>
            <thead>
            <tr>
        
              <th width="20%">To</th>
              <th width="20%">For</th>
              <th width="20%">Date</th>
              <th width="20%">Amount</th>
            </tr>
            </thead>
            <tbody>
            {paymentsMade}
            </tbody>
          </Table>
</Col>
</Row>
          </Container>
        </div>
      );
    }

  };
  
  export default withCookies(PaymentsHistory);