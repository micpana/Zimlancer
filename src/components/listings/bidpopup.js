import React, { Component } from 'react';
import './viewservice.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {CREATE_BID_COMMENT} from '../graphql/MutationResolver';
import {GET_BID_COMMENTS} from '../graphql/QueryResolver';
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



  class BidPopup extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };
    constructor(props) {
      super(props);
  
      this.state = {
        open: false,
        seller: this.props.seller,
        bidname: this.props.bidname,
        bidid: this.props.bidid,
        user: "",
        bidcomment: "", 
        bidComments: []

      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.CheckComments = () =>{///////check if user has already sent proposal
        const { cookies } = this.props;
        const bidComments = this.state.bidComments.filter(comment => comment.userid === cookies.get('userId'));
if(bidComments.length==0){
  return <this.ValidateSignIn/>
}else{
  const { open } = this.state;
return<Modal open={open} onClose={this.onCloseModal} center>
<h6 style={{color: 'rebeccapurple'}}><br/><br/>You have already sent a proposal for this bid.<br/><br/></h6>
</Modal>
}
      };/////////check ends here
      this.ValidateSignIn = () =>{
        const { cookies } = this.props;
        const { open } = this.state;
if (this.state.user==null){
return<Modal open={open} onClose={this.onCloseModal} center>
<h6 style={{color: 'rebeccapurple'}}><br/><br/>You need to login first inorder to send proposals to bids listed.<br/><br/></h6>
</Modal>
}else{
  if(cookies.get('userId')==this.props.seller){
    return<Modal open={open} onClose={this.onCloseModal} center>
    <h6 style={{color: 'rebeccapurple'}}><br/><br/>You cannot send a proposal for your own bid.<br/><br/></h6>
    </Modal>  
  }else{
    var bidDetails= this.props.bidDetails;
    var today = new Date();
      var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
      var dateTime = date+' '+time;
    if(bidDetails.active=="false"&&bidDetails.wonby!=null){///////if the bid has been awarded to someone already
    return<Modal open={open} onClose={this.onCloseModal} center><br/><br/>
    <h6 style={{color: 'rebeccapurple'}}>Please note that this bid has already been awarded to someone and is no longer active.</h6>
    </Modal>
    }else{
        if(bidDetails.wonby==null&&bidDetails.expirationdate<dateTime){/////////if the bid has already expired without a winner
            return<Modal open={open} onClose={this.onCloseModal} center><br/><br/>
            <h6 style={{color: 'rebeccapurple'}}>Please note that this bid listing has already expired.</h6>
            </Modal>
            }else{///proceed to sending proposal
              return<Modal open={open} onClose={this.onCloseModal} center><br/><br/>
              <h5>Write a custom message to convience the seller as to why you should win this bid.</h5>
              <InputGroup>
          <Input  placeholder="Enter message here" type="text" name="bidcomment" id="bidcomment" 
          value={this.state.bidcomment} onChange={this.handleChange} />
                   <InputGroupAddon addonType="append" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><Button onClick={this.handleSubmit} style={{backgroundColor: '#fff', border: 'none'}}><FaTelegramPlane color="rebeccapurple" style={{margin:'4px'}}/></Button></InputGroupAddon>
             </InputGroup>
            </Modal>            
            }///ends here
    }/////ends here

  }

}
      }


    }
    handleSubmit(e) {
      const { cookies } = this.props;
            ///////get current date and time
var today = new Date();
var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
var dateTime = date+' '+time;
      // e.preventDefault();
      const bidComments = this.state.bidComments.filter(comment => comment.userid === cookies.get('userId'));
      if(bidComments.length!=0){/////////////////check if user has already sent a proposal
        alert('You have already sent a proposal for this bid.')
      }else{
        axios.post(GRAPHQL_BASE_URL, {////////////send bid comment
          query: print(CREATE_BID_COMMENT), variables: {
            userid: cookies.get('userId'),
            sellerid: this.props.seller,
            bidid: this.props.bidid,
            comment: this.state.bidcomment,
            datelisted: dateTime
          }
      }).then((result) => {
       alert('Your proposal has been sent successfully.')
       this.setState({bidcomment: ""});
       this.onCloseModal();
      }).catch(error => {
        console.log(error.response);
        alert('An error has occured while trying to send your proposal. Please try again.');
      });/////send bid comment
      }////////////////////////////checking ends here
  
      };

    componentDidMount() {
      this.interval = setInterval(() => 
      axios.post(GRAPHQL_BASE_URL, {//////get bid comments
        query: print(GET_BID_COMMENTS), variables: {
          bidid: this.props.bidid
        }
    }).then((result3) => {
        this.setState({bidComments: result3.data.data.getBidCommentsByBidId});

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

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }


    render() {
      const { open } = this.state;
      const { cookies } = this.props;

        return(<div>

        <button onClick={this.onOpenModal} style={{backgroundColor: '#fff', border: '1px solid #fff'}}><h6 style={{}}><FaRegEnvelope color="rebeccapurple" size="20px"/> Send proposal </h6></button>
        <this.CheckComments/>
        </div>
        )
    }

  };
  
  export default withCookies(BidPopup);