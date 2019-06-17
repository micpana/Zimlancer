import React, { Component } from 'react';
import './viewservice.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {UPDATE_SERVICE_BID, CREATE_NOTIFICATION} from '../graphql/MutationResolver';
import {GET_BID_COMMENTS, GET_USER} from '../graphql/QueryResolver';
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
import {BACKEND_URL} from '../backendurl';



  class BidProposals extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };
    constructor(props) {
      super(props);
  
      this.state = {
        open: false,
        bidComments: []
      };

      this.showBidStatus = (e) =>{///////bid status(active or not)
var bidDetails= this.props.bidDetails;
var senderDetails={////get winner username
  userid: bidDetails.wonby
};
let userName=this.getSenderUsername(senderDetails);
if(bidDetails.wonby==""){////if there's no bid winner yet
return<h6 style={{color: 'red'}}>You haven't selected a winner for this bid yet, you can do so below.</h6>
}else{//////if the bid has a winner already
return<h6 style={{color: 'red'}}>You have already awarded this bid to {userName}.</h6>
}
      };/////////////ends here

      this.awardBidToUser = (e) =>{///////award bid to a user
        var winnerid= e.target.id;
        var winnerusername= e.target.value;
      var bidDetails= this.props.bidDetails;
      var today = new Date();
  var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
  var dateTime = date+' '+time;
  let port = (window.location.port ? ':' + window.location.port : '');
        axios.post(GRAPHQL_BASE_URL, {/////////////update bid
          query: print(UPDATE_SERVICE_BID), variables: {
            id: bidDetails.id,
            name: bidDetails.name,
            userid: bidDetails.userid,
            username: bidDetails.username,
            payout: parseInt(bidDetails.payout, 10),
            expectedcompletiontime: parseInt(bidDetails.expectedcompletiontime, 10),
            typeofdelivery: bidDetails.typeofdelivery,
            numberofbids: parseInt(bidDetails.numberofbids, 10),
            description: bidDetails.description,
            maincategory: bidDetails.maincategory,
            subcategory: bidDetails.subcategory,
            active: "false",
            datelisted: bidDetails.datelisted,
            expirationdate: bidDetails.expirationdate,
            bidimage: bidDetails.bidimage,
            wonby: winnerid

          }
      }).then((result) => {
          alert('You have awarded this bid to ' + winnerusername+ '. A notification has been sent to '+ winnerusername+ '.');
          axios.post(GRAPHQL_BASE_URL, {///////////////send notification to bid winner
            query: print(CREATE_NOTIFICATION), variables: {
              userid: winnerid,
              notification: "Dear "+winnerusername+", Congratulations! You've won a bid you proposed for. (Click to view)",
              date: dateTime,
              read: "false",
              href: '//' + window.location.hostname + port + '/' + "bids/" + bidDetails.maincategory + '/' + bidDetails.subcategory + '/' + bidDetails.id
            }
        }).then((result2) => {       
      
        }).catch(error => {
          console.log(error.response);
        });//////////////////ends here
          window.location.href = '//' + window.location.hostname + port + '/' + "bids/" + bidDetails.maincategory + '/' + bidDetails.subcategory + '/' + bidDetails.id;
      }).catch(error => {
        console.log(error.response);
        alert('An error has occured while trying to award this bid to: ' + winnerusername + '. Please try again.');
      });////////ends here
    };///////////////////////////////////////ends here

    this.getSenderUsername = (senderDetails) =>{//////////get get sender username
      var length=  senderDetails.userid.length;
var total= length+ senderDetails.indexNum
  var random= 798+'klh'+senderDetails.userid[0]+length+senderDetails.userid[2]+senderDetails.userid+senderDetails.indexNum+senderDetails.userid[1]+total
      axios.post(GRAPHQL_BASE_URL, {/////get sender username
        query: print(GET_USER), variables: {id: senderDetails.userid}
    }).then((result) => {
      let username= result.data.data.getUser.username;
        localStorage.setItem(random, username)
    }).catch(error => {
      console.log(error.response)
  });//ends here 
  return localStorage.getItem(random)
    };///////////ends here

    this.getSenderPicture = (senderDetails) =>{//////////get get sender profilepicture
      var length=  senderDetails.userid.length;
      var total= length+ senderDetails.indexNum
        var random= 694+'bdpro'+senderDetails.userid[0]+length+senderDetails.userid[2]+senderDetails.userid+senderDetails.indexNum+senderDetails.userid[1]+total      
      axios.post(GRAPHQL_BASE_URL, {/////get sender profile picture
        query: print(GET_USER), variables: {id: senderDetails.userid}
    }).then((result) => {
      let username= result.data.data.getUser.profilepicturepath;
        localStorage.setItem(random, username)
    }).catch(error => {
      console.log(error.response)
  });//ends here 
  return localStorage.getItem(random)
    };//////////////////////ends here
      
    }

    componentDidMount() {
      this.interval = setInterval(() => 
      axios.post(GRAPHQL_BASE_URL, {//////get bid proposals
        query: print(GET_BID_COMMENTS), variables: {
          bidid: this.props.bidid
        }
    }).then((result) => {
        this.setState({bidComments: result.data.data.getBidCommentsByBidId});

    }).catch(error => {
      console.log(error.response)
  })////////////////ends here
      , 1000);///update coments evry 1 second

    
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };



    render() {
      const { open } = this.state;
      const { cookies } = this.props;
      var today = new Date();
      var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
      var dateTime = date+' '+time;

      var bidComments = this.state.bidComments.map((comment, index) => {/////get bid proposals
        var senderDetails={
          userid: comment.userid,
          indexNum: index
        };
        let userName=this.getSenderUsername(senderDetails);
        let userImage=this.getSenderPicture(senderDetails);
        var profileimage= BACKEND_URL+"images/profilepictures/"+ userImage;
        var timePassedSinceProposalWasPosted = moment(comment.datelisted).from(dateTime)////////time since review was posted
        var bidDetails= this.props.bidDetails;

        if(bidDetails.wonby==""){//////////////if the bid has no winner yet
          return<div style={{width: '100%'}}>
          <Row style={{textAlign: 'left', color: 'grey'}}>
Posted: {timePassedSinceProposalWasPosted}
          </Row>
          <Row>
            <Col xs="1">
            <img src={profileimage} style={{borderRadius: '50%', width: '20px', height: '20px'}}/>
            </Col>
            <Col>
            <span style={{color: 'grey'}}>{userName}</span>
            </Col>
          </Row>
          <Row>
              {comment.comment}
          </Row>
          <Row>
          <Button id={comment.userid} value={userName} onClick={e=>this.awardBidToUser(e)} style={{backgroundColor: 'inherit', border: '1px solid #C0A3D8', color: 'rebeccapurple'}}>
Award Bid to User
 </Button>
          </Row>
          <br/>
</div>
        }else{///////if the bid has a winner already
          return<div style={{width: '100%'}}>
          <Row style={{textAlign: 'left', color: 'grey'}}>
Posted: {timePassedSinceProposalWasPosted}
          </Row>
          <Row>
            <Col xs="1">
            <img src={profileimage} style={{borderRadius: '50%', width: '20px', height: '20px'}}/>
            </Col>
            <Col>
            <span style={{color: 'grey'}}>{userName}</span>
            </Col>
          </Row>
          <Row>
              {comment.comment}
          </Row>
          <br/>
</div>
        }///ends here

      });////////////ends here
        return(<div>
 <Button id="viewproposals" onClick={this.onOpenModal} style={{backgroundColor: 'inherit', border: '1px solid #C0A3D8', color: 'grey'}}>
View Proposals<span style={{color: 'rebeccapurple', fontSize: '13px'}}>({this.state.bidComments.length})</span>
  </Button>
        <Modal open={open} onClose={this.onCloseModal} center>
        <br/>
        <h6 style={{color: 'rebeccapurple', textAlign: 'center'}}>Bid Proposals</h6>
        <this.showBidStatus/>
        <br/>
        {bidComments}
    </Modal>  
        </div>
        )
    }

  };
  
  export default withCookies(BidProposals);