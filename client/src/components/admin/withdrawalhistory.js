import React, { Component } from 'react';
import '../categorieslandingpages/graphicsanddesign.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Container, Table} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {ALL_WITHDRAWAL_HISTORY} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import { runInThisContext } from 'vm';

  class WithdrawalHistory extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
withdrawalHistory: []
      };
    
    }

    componentDidMount() {
        ///////get Withdrawal history
     axios.post(GRAPHQL_BASE_URL, {
        query: print(ALL_WITHDRAWAL_HISTORY)
    }).then((result) => {
        this.setState({withdrawalHistory: result.data.data.allWithdrawalHistory});
    
    }).catch(error => {
      console.log(error.response)
    });
  }


    render() {
        const withdrawalHistory = this.state.withdrawalHistory.map(withdrawal => {
            return <tr>
              <td style={{whiteSpace: 'nowrap'}}>{withdrawal.id}</td>
              <td style={{whiteSpace: 'nowrap'}}>{withdrawal.username}</td>
              <td style={{whiteSpace: 'nowrap'}}>{withdrawal.amount}</td>
              <td style={{whiteSpace: 'nowrap'}}>{withdrawal.withdrawalmethod}</td>
              <td style={{whiteSpace: 'nowrap'}}>{withdrawal.date}</td>
            </tr>
          });
      return (
        <div>
                        <h6>Withdrawals</h6><br/>
                        <Container>
                        <Col style={{maxHeight: '450px', minHeight: '450px', overflowY: 'scroll'}}>

                        <Table className="mt-4">
            <thead>
            <tr>
            <th width="20%">ID</th>
            <th width="20%">Username</th>
              <th width="20%">Amount</th>
              <th width="20%">Withdrawal Method</th>
              <th width="20%">Date</th>
            </tr>
            </thead>
            <tbody>
            {withdrawalHistory}
            </tbody>
          </Table>     
          </Col>
          </Container>
        </div>
      );
    }

  };
  
  export default WithdrawalHistory;