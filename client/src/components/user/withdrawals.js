import React, { Component } from 'react';
import '../categorieslandingpages/graphicsanddesign.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Container, Table} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {GET_WITHDRAWAL_HISTORY_BY_USERID} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import { runInThisContext } from 'vm';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

  class Withdrawals extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };
    constructor(props) {
      super(props);
  
      this.state = {
withdrawalHistory: []
      };
    
    }

    componentDidMount() {
      const { cookies } = this.props;
        ///////get Withdrawal history
     axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_WITHDRAWAL_HISTORY_BY_USERID), variables: {userid: cookies.get('userId')}
    }).then((result) => {
        this.setState({withdrawalHistory: result.data.data.getWithdrawalHistoryByUserID});
    
    }).catch(error => {
      console.log(error.response)
    });
  }


    render() {
        const withdrawalHistory = this.state.withdrawalHistory.map(withdrawal => {
            return <tr>
              <td style={{whiteSpace: 'nowrap'}}>{withdrawal.amount}</td>
              <td style={{whiteSpace: 'nowrap'}}>{withdrawal.withdrawalmethod}</td>
              <td style={{whiteSpace: 'nowrap'}}>{withdrawal.date}</td>
            </tr>
          });
      return (
        <div>
                        <h6>Withdrawals</h6><br/>
                        <Container>
                        <Table className="mt-4">
            <thead>
            <tr>
        
              <th width="20%">Amount</th>
              <th width="20%">Withdrawal Method</th>
              <th width="20%">Date</th>
            </tr>
            </thead>
            <tbody>
            {withdrawalHistory}
            </tbody>
          </Table>     
          </Container>
        </div>
      );
    }

  };
  
  export default withCookies(Withdrawals);