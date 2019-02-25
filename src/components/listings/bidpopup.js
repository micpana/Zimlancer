import React, { Component } from 'react';
import './viewservice.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {SEND_MESSAGE} from '../graphql/MutationResolver';
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
        comment: ""

      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      this.ValidateSignIn = () =>{
        const { cookies } = this.props;
        const { open } = this.state;
if (this.state.user==null){
return<Modal open={open} onClose={this.onCloseModal} center>
<h6 style={{color: 'rebeccapurple'}}><br/><br/>You need to login first inorder to place bids on projects.<br/><br/></h6>
</Modal>
}else{
  if(cookies.get('userId')==this.props.seller){
    return<Modal open={open} onClose={this.onCloseModal} center>
    <h6 style={{color: 'rebeccapurple'}}><br/><br/>You cannot post a bid on your own listing.<br/><br/></h6>
    </Modal>  
  }else{
    return<Modal open={open} onClose={this.onCloseModal} center><br/><br/>
    <h5>Write a custom message to convience the seller as to why you should win this bid.</h5>
    <InputGroup>
<Input  placeholder="Enter message here" type="text" name="message" id="message" 
value={this.state.message} onChange={this.handleChange} />
         <InputGroupAddon addonType="append" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><Button onClick={this.handleSubmit} style={{backgroundColor: '#fff', border: 'none'}}><FaTelegramPlane color="rebeccapurple" style={{margin:'4px'}}/></Button></InputGroupAddon>
   </InputGroup>
  </Modal>
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
      e.preventDefault()
        axios.post(GRAPHQL_BASE_URL, {
          query: print(SEND_MESSAGE), variables: {
            sender: cookies.get('userId'),
            receiver: this.props.seller,
            message: this.state.message,
            date: dateTime,
            filepath1: this.state.filenames[0],
            filepath2: this.state.filenames[1],
            filepath3: this.state.filenames[2],
            read: "false"
          }
      }).then((result) => {
       alert('Your message has been sent successfully.')
          
      }).catch(error => {
        console.log(error.response);
        alert('An error has occured while trying to send your message. Please try again.');
      });
      };

    componentDidMount() {
      const { cookies } = this.props;
          this.setState({user: cookies.get('userId')})
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
        return(<div>

        <button onClick={this.onOpenModal} style={{backgroundColor: '#fff', border: '1px solid #fff'}}><h6 style={{}}><FaRegEnvelope color="rebeccapurple" size="20px"/> Place bid </h6></button>
        <this.ValidateSignIn/>
        </div>
        )
    }

  };
  
  export default withCookies(BidPopup);