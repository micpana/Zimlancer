import React, { Component } from 'react';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label, InputGroup, InputGroupAddon, Input, Container} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {GET_SERVICES_BY_USERID, GET_REFERRALS_BY_USERNAME, GET_COMMISSIONS_BY_USERID, GET_WON_BIDS, GET_COMPLETED_ORDERS, GET_WITHDRAWAL_HISTORY_BY_USERID, GET_PROFILE_VIEWS_BY_USERID, GET_AMOUNT_SPENT, GET_BIDS_BY_USERID, GET_USER, GET_LISTING_VIEWS_BY_USERID, GET_USER_BALANCE} from '../graphql/QueryResolver';
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



  class AccountSummary extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
      super(props);
  
      this.state = {
        user: "",
        userServices: [],
        userBids: [],
        listingViews: [],
        userBalance: [],
        userDetails: {},
        profileViews: [],
        amountSpent: [],
        withdrawalHistory: [],
        completedOrders: [],
        wonBids: [],
        earnedCommissions: [],
        getReferralsByUsername: []

      };


    }

    componentDidMount() {
        const { cookies } = this.props;
        this.setState({user: cookies.get('userId')})
        axios.post(GRAPHQL_BASE_URL, {/////////get services
            query: print(GET_SERVICES_BY_USERID), variables: {id: cookies.get('userId')}
        }).then((result) => {
            this.setState({userServices: result.data.data.getServicesByUserId});
    
        }).catch(error => {
          console.log(error.response)
      });
      axios.post(GRAPHQL_BASE_URL, {/////////get bids
        query: print(GET_BIDS_BY_USERID), variables: {userid: cookies.get('userId')}
    }).then((result) => {
        this.setState({userBids: result.data.data.getServiceBidsByUserId});

    }).catch(error => {
      console.log(error.response)
  });
  axios.post(GRAPHQL_BASE_URL, {/////////get listing views
    query: print(GET_LISTING_VIEWS_BY_USERID), variables: {sellerid: cookies.get('userId')}
}).then((result) => {
    this.setState({listingViews: result.data.data.getUserServiceViews});

}).catch(error => {
  console.log(error.response)
});
axios.post(GRAPHQL_BASE_URL, {/////////get amountreceived
    query: print(GET_USER_BALANCE), variables: {sellerid: cookies.get('userId')}
}).then((result) => {
    this.setState({userBalance: result.data.data.getUserBalance});

}).catch(error => {
  console.log(error.response)
});
     ///////get user details
     axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_USER), variables: {id: cookies.get('userId')}
    }).then((result) => {
        this.setState({userDetails: result.data.data.getUser});
        axios.post(GRAPHQL_BASE_URL, {//////get referrals
            query: print(GET_REFERRALS_BY_USERNAME), variables: {
                referredby: result.data.data.getUser.username
            }
        }).then((result) => {
          this.setState({getReferralsByUsername: result.data.data.getReferralsByUsername});
        }).catch(error => {
          console.log(error.response);
        }); 
    }).catch(error => {
      console.log(error.response)
    });
     ///////get profile views
     axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_PROFILE_VIEWS_BY_USERID), variables: {userid: cookies.get('userId')}
    }).then((result) => {
        this.setState({profileViews: result.data.data.getProfilesViewsByUserId});
    
    }).catch(error => {
      console.log(error.response)
    });
      ///////get amount spent
      axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_AMOUNT_SPENT), variables: {userid: cookies.get('userId')}
    }).then((result) => {
        this.setState({amountSpent: result.data.data.getAmountSpent});
    
    }).catch(error => {
      console.log(error.response)
    });
     ///////get Withdrawal history
     axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_WITHDRAWAL_HISTORY_BY_USERID), variables: {userid: cookies.get('userId')}
    }).then((result) => {
        this.setState({withdrawalHistory: result.data.data.getWithdrawalHistoryByUserID});
    
    }).catch(error => {
      console.log(error.response)
    });
    //////////// get completed orders
    axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_COMPLETED_ORDERS), variables: {sellerid: cookies.get('userId'), completed: "false"}
      }).then((result) => {
        this.setState({completedOrders: result.data.data.getCompletedJobs});
      
      }).catch(error => {
      console.log(error.response)
      });
         //////////// get won bids
    axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_WON_BIDS), variables: {wonby: cookies.get('userId')}
      }).then((result) => {
        this.setState({wonBids: result.data.data.getWonBids});
      
      }).catch(error => {
      console.log(error.response)
      });
          //////////// get earned commissions
    axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_COMMISSIONS_BY_USERID), variables: {userid: cookies.get('userId')}
      }).then((result) => {
        this.setState({earnedCommissions: result.data.data.getCommissionsByUserId});
      
      }).catch(error => {
      console.log(error.response)
      });

  }



    render() {
        var user = this.state.userDetails
        const amountreceivedinsales = this.state.userBalance.reduce((acc, amount) => acc + amount.price, 0);
        const amountspent = this.state.amountSpent.reduce((acc, amount) => acc + amount.price, 0);
        const amountwithdrawn = this.state.withdrawalHistory.reduce((acc, amount) => acc + amount.amount, 0);
        const earnedcommissions = this.state.earnedCommissions.reduce((acc, amount) => acc + amount.commission, 0);
    const totalEarned= amountreceivedinsales + earnedcommissions;
        var currentbalance=totalEarned-amountwithdrawn

        var today = new Date();
    var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
    var dateTime = date+' '+time;
    var duration = moment(user.datejoined).from(dateTime)////////time since user joined
        return(<div>
            <h6>Account Summary</h6><br/>
            <Container>
                <Row>
                <Col>
            <div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
<div style={{marginTop: '30px'}}>{this.state.userServices.length}<br/>Service(s) Listed</div>
</div><br/><br/>
<div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
<div style={{marginTop: '30px'}}>{this.state.listingViews.length}<br/> Total Listing Views</div>
</div>
</Col>
<Col>
<div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
<div style={{marginTop: '30px'}}>{this.state.userBids.length}<br/>Bid(s) Listed</div>
</div><br/><br/>
<div style={{border: '3px solid rgba(102, 51, 153, 0.404)', borderRadius: '50%', width: '120px', height: '120px'}}>
<div style={{marginTop: '30px'}}>${currentbalance}<br/>Current Balance</div>
</div>
</Col>
<Col style={{border: '3px solid rgba(102, 51, 153, 0.404)', marginRight: '14px'}}>
<Row style={{marginTop: '30px'}}>
    <Col style={{textAlign: 'left'}}>
    <h6>Company/Individual:</h6>
    </Col>
    <Col style={{textAlign: 'right'}}>
    {user.usertype}
    </Col>
</Row>
<Row>
    <Col style={{textAlign: 'left'}}>
    <h6>Joined:</h6>
    </Col>
    <Col style={{textAlign: 'right'}}>
    {duration}
    </Col>
</Row>
<Row>
    <Col style={{textAlign: 'left'}}>
    <h6>Profile Views:</h6>
    </Col>
    <Col style={{textAlign: 'right'}}>
    {this.state.profileViews.length}
    </Col>
</Row>
<Row>
    <Col style={{textAlign: 'left'}}>
    <h6>Total Amount Spent:</h6>
    </Col>
    <Col style={{textAlign: 'right'}} xs="2">
    ${amountspent}
    </Col>
</Row>
<Row>
    <Col style={{textAlign: 'left'}}>
    <h6>Total Amount Earned In Sales:</h6>
    </Col>
    <Col style={{textAlign: 'right'}} xs="2">
    ${amountreceivedinsales}
    </Col>
</Row>
<Row>
    <Col style={{textAlign: 'left'}}>
    <h6>Earned In Referral Commissions:</h6>
    </Col>
    <Col style={{textAlign: 'right'}} xs="2">
    ${earnedcommissions}
    </Col>
</Row>
<Row>
    <Col style={{textAlign: 'left'}}>
    <h6>Total Amount Withdrew:</h6>
    </Col>
    <Col style={{textAlign: 'right'}} xs="2">
    ${amountwithdrawn}
    </Col>
</Row>
<Row>
    <Col style={{textAlign: 'left'}}>
    <h6>Jobs Completed:</h6>
    </Col>
    <Col style={{textAlign: 'right'}} xs="2">
    {this.state.completedOrders.length}
    </Col>
</Row>
<Row>
    <Col style={{textAlign: 'left'}}>
    <h6>Bids Won:</h6>
    </Col>
    <Col style={{textAlign: 'right'}} xs="2">
    {this.state.wonBids.length}
    </Col>
</Row>
<Row>
    <Col style={{textAlign: 'left'}}>
    <h6>Your Registered Referrals:</h6>
    </Col>
    <Col style={{textAlign: 'right'}} xs="2">
    {this.state.getReferralsByUsername.length}
    </Col>
</Row>
</Col>
</Row>
            </Container>



        </div>
        )
    }

  };
  
  export default withCookies(AccountSummary);