import React, { Component } from 'react';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label, InputGroup, InputGroupAddon, Input, Container} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {ALL_USERS_MIN_INFO, ALL_COMMISSIONS, ALL_SITE_REFERRALS, ALL_SERVICES, ALL_BIDS, ALL_TRANSACTIONS, ALL_WITHDRAWAL_HISTORY} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import StarRatings from 'react-star-ratings';
import { FaRegEnvelope, FaFly } from 'react-icons/fa';
import Modal from 'react-responsive-modal';
import {FaTelegramPlane, FaSearch, FaCircle} from 'react-icons/fa';
import { runInThisContext } from 'vm';
import moment from 'moment'



  class SiteSummary extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
      users: [],
      services: [],
      bids: [],
      allTransactions: [],
      allWithdrawals: [],
      allReferrals: [],
      allCommissionsEarned: []

      };


    }

    componentDidMount() {
        axios.post(GRAPHQL_BASE_URL, {/////////all users
            query: print(ALL_USERS_MIN_INFO)
        }).then((result) => {
            this.setState({users: result.data.data.allUsers});
    
        }).catch(error => {
          console.log(error.response)
      });
      axios.post(GRAPHQL_BASE_URL, {/////////all services
        query: print(ALL_SERVICES)
    }).then((result) => {
        this.setState({services: result.data.data.allServices});

    }).catch(error => {
      console.log(error.response)
  });
  axios.post(GRAPHQL_BASE_URL, {/////////all bids
    query: print(ALL_BIDS)
}).then((result) => {
    this.setState({bids: result.data.data.allServiceBids});

}).catch(error => {
  console.log(error.response)
});
axios.post(GRAPHQL_BASE_URL, {/////////all transactions
    query: print(ALL_TRANSACTIONS)
}).then((result) => {
    this.setState({allTransactions: result.data.data.allPurchaseHistory});

}).catch(error => {
  console.log(error.response)
});
axios.post(GRAPHQL_BASE_URL, {/////////all withdrawals
    query: print(ALL_WITHDRAWAL_HISTORY)
}).then((result) => {
    this.setState({allWithdrawals: result.data.data.allWithdrawalHistory});

}).catch(error => {
  console.log(error.response)
});
axios.post(GRAPHQL_BASE_URL, {/////////all users who joined through the referral program
    query: print(ALL_SITE_REFERRALS)
}).then((result) => {
    this.setState({allReferrals: result.data.data.allReferrals});

}).catch(error => {
  console.log(error.response)
});
axios.post(GRAPHQL_BASE_URL, {/////////all commissions earned
    query: print(ALL_COMMISSIONS)
}).then((result) => {
    this.setState({allCommissionsEarned: result.data.data.allCommissionsEarned});

}).catch(error => {
  console.log(error.response)
});

  }



    render() {
        const amounttransacted = this.state.allTransactions.reduce((acc, amount) => acc + amount.price, 0);
        const withdrawalsmade = this.state.allWithdrawals.reduce((acc, amount) => acc + amount.amount, 0);
        const commissionsearned = this.state.allCommissionsEarned.reduce((acc, amount) => acc + amount.commission, 0);

       var currentbalance=amounttransacted-withdrawalsmade
        return(<div>
            <h6>Site Summary</h6><br/>
            <Container>
                <Row>
                    <Col>
                        <Row>
                            <div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
                            <div style={{marginTop: '30px'}}>{this.state.users.length}<br/>Registered Users</div>
                            </div>
                        </Row>
                    </Col>
                    <Col>
                    <Row>
                            <div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
                            <div style={{marginTop: '30px'}}>{this.state.allReferrals.length}<br/>Referred Users</div>
                            </div>
                        </Row>
                    </Col>
                    <Col>
                    <Row>
                            <div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
                            <div style={{marginTop: '30px'}}>{this.state.services.length}<br/>Services Listed</div>
                            </div>
                        </Row>
                    </Col>
                    <Col>
                    <Row>
                            <div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
                            <div style={{marginTop: '30px'}}>{this.state.bids.length}<br/>Bids Listed</div>
                            </div>
                        </Row>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Row>
                            <div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
                            <div style={{marginTop: '30px'}}>${currentbalance}<br/>Current Balance</div>
                            </div>
                        </Row>
                    </Col>
                    <Col>
                    <Row>
                            <div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
                            <div style={{marginTop: '30px'}}>${withdrawalsmade}<br/>Withdrawals Made</div>
                            </div>
                        </Row>
                    </Col>
                    <Col>
                    <Row>
                            <div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
                            <div style={{marginTop: '30px'}}>${amounttransacted}<br/>Total Amount Transacted</div>
                            </div>
                        </Row>
                    </Col>
                    <Col>
                    <Row>
                            <div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
                            <div style={{marginTop: '30px'}}>${commissionsearned}<br/>Earned Commissions</div>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }

  };
  
  export default SiteSummary;