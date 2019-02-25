import React, { Component } from 'react';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Container, Button, CardGroup, Label, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {GET_SERVICES_BY_USERID, GET_WON_BIDS, GET_COMPLETED_ORDERS, GET_WITHDRAWAL_HISTORY_BY_USERID, GET_PROFILE_VIEWS_BY_USERID, GET_AMOUNT_SPENT, GET_BIDS_BY_USERID, GET_USER, GET_LISTING_VIEWS_BY_USERID, GET_USER_BALANCE} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import StarRatings from 'react-star-ratings';
import { FaRegEnvelope, FaFly } from 'react-icons/fa';
import Modal from 'react-responsive-modal';
import {FaTelegramPlane, FaSearch, FaCircle} from 'react-icons/fa';
import { runInThisContext } from 'vm';
import moment from 'moment';
import {FaRegClock, FaUserAlt, FaUsers, FaPhone, FaKey, FaUserLock, FaCalendarAlt, FaNewspaper, FaMapMarkerAlt, FaUserFriends, FaUserTie, FaMapMarkedAlt} from 'react-icons/fa';




  class ViewUser extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
        open: false,
        userDetails: {},
        userServices: [],
        userBids: [],
        listingViews: [],
        userBalance: [],
        profileViews: [],
        amountSpent: [],
        withdrawalHistory: [],
        completedOrders: [],
        wonBids: []
      };
    }
 

    componentDidMount() {
        axios.post(GRAPHQL_BASE_URL, {/////get user details
            query: print(GET_USER), variables: {id: this.props.userid}
        }).then((result) => {
            this.setState({userDetails: result.data.data.getUser});
        
        }).catch(error => {
          console.log(error.response)
        });
        axios.post(GRAPHQL_BASE_URL, {/////////get services
            query: print(GET_SERVICES_BY_USERID), variables: {id: this.props.userid}
        }).then((result) => {
            this.setState({userServices: result.data.data.getServicesByUserId});
    
        }).catch(error => {
          console.log(error.response)
      });
      axios.post(GRAPHQL_BASE_URL, {/////////get bids
        query: print(GET_BIDS_BY_USERID), variables: {userid: this.props.userid}
    }).then((result) => {
        this.setState({userBids: result.data.data.getServiceBidsByUserId});

    }).catch(error => {
      console.log(error.response)
  });
  axios.post(GRAPHQL_BASE_URL, {/////////get listing views
    query: print(GET_LISTING_VIEWS_BY_USERID), variables: {sellerid: this.props.userid}
}).then((result) => {
    this.setState({listingViews: result.data.data.getUserServiceViews});

}).catch(error => {
  console.log(error.response)
});
axios.post(GRAPHQL_BASE_URL, {/////////get amountreceived
    query: print(GET_USER_BALANCE), variables: {sellerid: this.props.userid}
}).then((result) => {
    this.setState({userBalance: result.data.data.getUserBalance});

}).catch(error => {
  console.log(error.response)
});
     ///////get profile views
     axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_PROFILE_VIEWS_BY_USERID), variables: {userid: this.props.userid}
    }).then((result) => {
        this.setState({profileViews: result.data.data.getProfilesViewsByUserId});
    
    }).catch(error => {
      console.log(error.response)
    });
      ///////get amount spent
      axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_AMOUNT_SPENT), variables: {userid: this.props.userid}
    }).then((result) => {
        this.setState({amountSpent: result.data.data.getAmountSpent});
    
    }).catch(error => {
      console.log(error.response)
    });
     ///////get Withdrawal history
     axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_WITHDRAWAL_HISTORY_BY_USERID), variables: {userid: this.props.userid}
    }).then((result) => {
        this.setState({withdrawalHistory: result.data.data.getWithdrawalHistoryByUserID});
    
    }).catch(error => {
      console.log(error.response)
    });
    //////////// get completed orders
    axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_COMPLETED_ORDERS), variables: {sellerid: this.props.userid, completed: "false"}
      }).then((result) => {
        this.setState({completedOrders: result.data.data.getCompletedJobs});
      
      }).catch(error => {
      console.log(error.response)
      });
         //////////// get won bids
    axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_WON_BIDS), variables: {wonby: this.props.userid}
      }).then((result) => {
        this.setState({wonBids: result.data.data.getWonBids});
      
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
      var user = this.state.userDetails;
      var amountreceived = 0
        const amntRec = this.state.userBalance.map((amountrc, index) => {/// total amount earned
        amountreceived=amountreceived+amountrc.price
        })
        var amountspent = 0
        const amountCal = this.state.amountSpent.map((amount, index) => {///total amount spent
        amountspent=amountspent+amount.price
        })
        var amountwithdrawn = 0
        const amountWithdrawn = this.state.withdrawalHistory.map((withdrawal, index) => {///get all amount received
        amountwithdrawn=amountwithdrawn+withdrawal.amount
        })
        var currentbalance=amountreceived-amountwithdrawn

        return(<div>

        <button onClick={this.onOpenModal} style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple'}}><h6 >View User</h6></button>
        <Modal open={open} onClose={this.onCloseModal} center>
        <br/>
        <h5 style={{color: 'rebeccapurple', textAlign: 'center'}}>{user.firstname + " " + user.surname}</h5>
        <h6 style={{color: 'grey', textAlign: 'center'}}>({user.username})</h6>
        <h6 style={{color: '#fff', textAlign: 'center', marginLeft: '-18px'}}>____________________________________________________________________________________</h6>

        <Container>
        <Col style={{maxHeight: '450px', minHeight: '450px', overflowY: 'scroll'}}>

       <Row>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Firstname:</h6></Row>
           <Row>{user.firstname}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Surname:</h6></Row>
           <Row>{user.surname}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Username:</h6></Row>
           <Row>{user.username}</Row>
           </Col>
       </Row>
       <br/>
       <Row>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Email address:</h6></Row>
           <Row>{user.emailaddress}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Phone Number:</h6></Row>
           <Row>{user.phonenumber}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Location:</h6></Row>
           <Row>{user.city + "," + user.country}</Row>
           </Col>
       </Row>
       <br/>
       <Row>
       <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Gender:</h6></Row>
           <Row>{user.gender}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Date of birth:</h6></Row>
           <Row>{user.dateofbirth}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Joined:</h6></Row>
           <Row>{user.datejoined}</Row>
           </Col>
       </Row>
       <br/>
       <Row>
       <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Bio:</h6></Row>
           <Row>{user.bio}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Skills:</h6></Row>
           <Row>{user.skills}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Account Type:</h6></Row>
           <Row>{user.usertype}</Row>
           </Col>
       </Row>
       <br/>
       <Row>
       <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Response Time:</h6></Row>
           <Row>{user.responsetime} Hours</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Newsletter:</h6></Row>
           <Row>{user.newsletter}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Active:</h6></Row>
           <Row>{user.active}</Row>
           </Col>
       </Row>
       <br/>
       <Row>
       <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Access Level:</h6></Row>
           <Row>{user.access}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Account Plan:</h6></Row>
           <Row>{user.plan}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>UserID:</h6></Row>
           <Row>{user.id}</Row>
           </Col>
       </Row>
       <br/>
       <Row>
       <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Services Listed:</h6></Row>
           <Row>{this.state.userServices.length}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Bids Listed:</h6></Row>
           <Row>{this.state.userBids.length}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Total Listing Views:</h6></Row>
           <Row>{this.state.listingViews.length}</Row>
           </Col>
       </Row>
       <br/>
       <Row>
       <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Current Balance:</h6></Row>
           <Row>${currentbalance}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Total Amount Spent:</h6></Row>
           <Row>${amountspent}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Total Amount Earned:</h6></Row>
           <Row>${amountreceived}</Row>
           </Col>
       </Row>
       <br/>
       <Row>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Total Amount Withdrew:</h6></Row>
           <Row>${amountwithdrawn}</Row>
           </Col>
       </Row>
       <br/>
       <Row>
       <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Profile Views:</h6></Row>
           <Row>{this.state.profileViews.length}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Completed Orders:</h6></Row>
           <Row>{this.state.completedOrders.length}</Row>
           </Col>
           <Col>
           <Row><h6 style={{color: 'rebeccapurple', fontWeight: 'bold'}}>Won Bids:</h6></Row>
           <Row>{this.state.wonBids.length}</Row>
           </Col>
       </Row>
       </Col>
        </Container>
        </Modal>
          </div>
        )
    }

  };
  
  export default ViewUser;