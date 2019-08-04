import React, { Component } from 'react';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {SEND_MESSAGE} from '../graphql/MutationResolver';
import axios from 'axios';
import {print} from 'graphql';
import StarRatings from 'react-star-ratings';
import { FaRegEnvelope, FaFly } from 'react-icons/fa';
import Modal from 'react-responsive-modal';
import {FaTelegramPlane, FaSearch, FaCircle, FaMoneyBillAlt} from 'react-icons/fa';
import { runInThisContext } from 'vm';
import moment from 'moment';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import EcocashImg from '../images/ecocash.png'



  class BuyServicePopup extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };
    constructor(props) {
      super(props);
  
      this.state = {
        open: false,
        user: "",
        ecocash: "",
        serviceid: this.props.serviceid,
        servicename: this.props.servicename,
        userid: this.props.userid,
        price: this.props.price,
        paymentmethod: "",
        sellerid: this.props.sellerid,
        maincategory: this.props.maincategory,
        subcategory: this.props.subcategory,
        completed: "false",
        datecompleted: ""

      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      this.ValidateSignIn = () =>{
        const { cookies } = this.props
        const { open } = this.state;
if (cookies.get('userId')==null){
return<Modal open={open} onClose={this.onCloseModal} center>
<h6 style={{color: 'rebeccapurple'}}><br/><br/>You need to login first inorder to buy this service.<br/><br/></h6>
</Modal>
}else{
  if(cookies.get('userId')==this.props.seller){
    return<Modal open={open} onClose={this.onCloseModal} center>
    <h6 style={{color: 'rebeccapurple'}}><br/><br/>You cannot buy your own services.<br/><br/></h6>
    </Modal>  
  }else{
    return<Modal open={open} onClose={this.onCloseModal} center>
      <img src={EcocashImg} />
    <InputGroup>
<Input  placeholder="Enter Ecocash Number" type="number" name="ecocash" id="ecocash" 
value={this.state.ecocash} onChange={this.handleChange} />
         <InputGroupAddon addonType="append" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><Button onClick={this.handleSubmit} style={{backgroundColor: '#fff', border: 'none', color: 'rebeccapurple'}}>Complete Payment</Button></InputGroupAddon>
   </InputGroup>
  </Modal>
  }

}
      }


    }
    handleSubmit(e) {
            ///////get current date and time
var today = new Date();
var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
var dateTime = date+' '+time;
      e.preventDefault()
        axios.post(GRAPHQL_BASE_URL, {
          query: print(SEND_MESSAGE), variables: {
       
          }
      }).then((result) => {
       alert('Payment completed succesfully.')
          
      }).catch(error => {
        console.log(error.response);
        alert('An error occured while trying to complete your payment. Please try again');
      });
      };

    componentDidMount() {
      const { cookies } = this.props
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
<br/>
        <button onClick={this.onOpenModal} style={{backgroundColor: '#fff', border: '1px solid #fff'}}><h6 style={{}}><FaMoneyBillAlt color="rebeccapurple" size="20px"/> Order this package</h6></button>
        <this.ValidateSignIn/>
        </div>
        )
    }

  };
  
  export default withCookies(BuyServicePopup);