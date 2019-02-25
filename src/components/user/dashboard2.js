import React, { Component } from 'react';
import '../categorieslandingpages/graphicsanddesign.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {GET_USER} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import { runInThisContext } from 'vm';
import AccountSummary from './accountsummary'
import YourServiceListings from './yourservicelistings'
import YourBidListings from './yourbidlistings'
import PaymentsHistory from './paymentshistory'
import Orders from './orders'
import Withdrawals from './withdrawals'
import AdminPanel from '../admin/adminpanel'
import Referrals from './referrals'
import { BACKEND_URL } from '../backendurl';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

  class DashBoard2 extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };
    constructor(props) {
      super(props);
  
      this.state = {
userDetails:{},
currentview: "accountsummary"
      };
      this.viewItem = this.viewItem.bind(this);

      ////////////selecting current view
      this.CurrentView = () =>{
if(this.state.currentview=="accountsummary"){
  return<AccountSummary/>
}
if(this.state.currentview=="yourservices"){
  return<YourServiceListings/>
}
if(this.state.currentview=="yourbids"){
  return<YourBidListings/>
}
if(this.state.currentview=="paymentshistory"){
  return<PaymentsHistory/>
}
if(this.state.currentview=="orders"){
  return<Orders/>
}
if(this.state.currentview=="withdrawals"){
  return<Withdrawals/>
}
if(this.state.currentview=="referralsystem"){
  return<Referrals/>
}
if(this.state.currentview=="adminpanel"){
  return<AdminPanel/>
}
      }
         //////////////admin access
         this.AdminButton = () =>{
           if(this.state.userDetails.access!="admin"){///////disabled admin feature for now
            return<div>
            <Button id="adminpanel" onClick={this.viewItem} style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple'}}>Admin Panel</Button><br/>
</div>
           }else{
             return<div></div>
           }
        }
      //////////////dashboard view
             this.ValidateLogin = () =>{
              const { cookies } = this.props;
                 if(cookies.get('userId')==null){
                    let port = (window.location.port ? ':' + window.location.port : '');
                    window.location.href = '//' + window.location.hostname + port + '/login/';
                 }else{
                     var user=this.state.userDetails
                     var path=BACKEND_URL+"images/profilepictures/"+user.profilepicturepath
                     return<div>
                       <Row><Col style={{borderRight:'1px solid rgba(0, 0, 0, 0.5)'}} sm="2">
                     <img src={path} style={{width: '100px', borderRadius: '50%', height: '100px'}}/>
                     <h6 style={{borderBottom:'1px solid rgba(0, 0, 0, 0.5)'}}>{user.username}<br/><br/></h6>
                     <Button id="accountsummary" onClick={this.viewItem} style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple'}}>Account Summary</Button><br/>
                     <this.AdminButton/>
                     <Button id="referralsystem" onClick={this.viewItem}  style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple'}}>Referral System</Button><br/>
                     <Button id="orders" onClick={this.viewItem}  style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple'}}>Orders</Button><br/>
                     <Button id="yourservices" onClick={this.viewItem}  style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple'}}>Your Service Listings</Button><br/>
                     <Button id="yourbids" onClick={this.viewItem}  style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple'}}>Your Bid Listings</Button><br/>
                     <Button id="paymentshistory" onClick={this.viewItem}  style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple'}}>Payments History</Button><br/>
                     <Button id="withdrawals" onClick={this.viewItem}  style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple'}}>Withdrawals</Button><br/>
                     <br/>
                     </Col>
                     <Col>
 <this.CurrentView/>
                     </Col>
                     </Row>
     </div>
                 }
             }

    }

    componentDidMount() {
        this.setState({currentview: this.props.match.params.currentview})
      const { cookies } = this.props;
        axios.post(GRAPHQL_BASE_URL, {
            query: print(GET_USER), variables: {id: cookies.get('userId')}
        }).then((result) => {
            this.setState({userDetails: result.data.data.getUser});
        
        }).catch(error => {
          console.log(error.response)
        });
  }

  viewItem(e) {
    this.setState({currentview: e.target.id});
  }

    render() {

      return (
        <div style={{marginTop: '20px'}}>
       <this.ValidateLogin/>
        </div>
      );
    }

  };
  
  export default withCookies(DashBoard2);