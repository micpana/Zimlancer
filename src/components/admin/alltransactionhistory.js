import React, { Component } from 'react';
import '../categorieslandingpages/graphicsanddesign.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Container, Table} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {ALL_TRANSACTION_HISTORY} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import { runInThisContext } from 'vm';
import ViewTransaction from './viewtransaction'

  class AllTransactionHistory extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
allTransactionHistory: []
      };
    
    }

    componentDidMount() {
        axios.post(GRAPHQL_BASE_URL, {/////get all transactions
            query: print(ALL_TRANSACTION_HISTORY)
        }).then((result) => {
            this.setState({allTransactionHistory: result.data.data.allPurchaseHistory});
        
        }).catch(error => {
          console.log(error.response)
        });
  }


    render() {
        const allTransactionHistory = this.state.allTransactionHistory.map(transaction => {
            return <tr>
              <td style={{whiteSpace: 'nowrap'}}>{transaction.userid}</td>
              <td style={{whiteSpace: 'nowrap'}}>{transaction.servicename}</td>
              <td style={{whiteSpace: 'nowrap'}}>{transaction.date}</td>
              <td style={{whiteSpace: 'nowrap'}}>{transaction.price}</td>
              <ViewTransaction id={transaction.id}/>
            </tr>
          });
      return (
        <div>
                        <h6>All Transaction History</h6><br/>
                        <Container>
<Col style={{maxHeight: '450px', minHeight: '450px', overflowY: 'scroll'}}>
                        <Table className="mt-4">
            <thead>
            <tr>
        
              <th width="20%">To</th>
              <th width="20%">For</th>
              <th width="20%">Date</th>
              <th width="20%">Amount</th>
              <th width="20%">Options</th>
            </tr>
            </thead>
            <tbody>
            {allTransactionHistory}
            </tbody>
          </Table>
</Col>
          </Container>
        </div>
      );
    }

  };
  
  export default AllTransactionHistory;