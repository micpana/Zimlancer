import React, { Component } from 'react';
import '../categorieslandingpages/graphicsanddesign.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Container} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {GET_USER} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import { runInThisContext } from 'vm';
import { BACKEND_URL } from '../backendurl';
import ManageCategories from './managecategories';
import AllUsers from './allusers'
import AllTransactionHistory from './alltransactionhistory'
import AllWithdrawalHistory from './withdrawalhistory'
import TransactionFees from './transactionfees'
import FeaturedServices from './featuredservices'
import SiteSummary from './sitesummary'
import ReferralSystem from './referralprogram'
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

  class AdminPanel extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };
    constructor(props) {
      super(props);
  
      this.state = {
currentview: "sitesummary",
userDetails: {}
      };
      this.viewItem = this.viewItem.bind(this);

      ////////////selecting current view
      this.CurrentView = () =>{
if(this.state.currentview=="managecategories"){
  return<ManageCategories/>
}
if(this.state.currentview=="featuredservices"){
  return<FeaturedServices/>
}
if(this.state.currentview=="sitesummary"){
  return<SiteSummary/>
}
if(this.state.currentview=="sendmessages"){
  return<div>4</div>
}
if(this.state.currentview=="sendnotifications"){
  return<div>5</div>
}
if(this.state.currentview=="alltransactionhistory"){
  return<AllTransactionHistory/>
}
if(this.state.currentview=="transactionfees"){
  return<TransactionFees/>
}
if(this.state.currentview=="withdrawalhistory"){
    return<AllWithdrawalHistory/>
  }
if(this.state.currentview=="allusers"){
    return<AllUsers/>
  }
  if(this.state.currentview=="referralsystem"){
    return<ReferralSystem/>
  }
      }
      //////////////dashboard view
             this.ValidateLogin = () =>{
              const { cookies } = this.props;
                 if(cookies.get('userId')==null){
                    let port = (window.location.port ? ':' + window.location.port : '');
                    window.location.href = '//' + window.location.hostname + port + '/login/';
                 }else{
                  //  if(this.state.userDetails.access!="admin"){
                  //   let port = (window.location.port ? ':' + window.location.port : '');
                  //   window.location.href = '//' + window.location.hostname + port + '/login/';
                  //  }else{
                     return<div>
                       <Row>
                     <Container>
                     <Row style={{borderBottom: '1px solid grey'}}>
                     <Button id="sitesummary" onClick={this.viewItem}  style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple'}}>Site Summary</Button><br/>
                     <Button id="referralsystem" onClick={this.viewItem}  style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple'}}>Referral System</Button><br/>
                     <Button id="managecategories" onClick={this.viewItem} style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple'}}>Manage Categories</Button><br/>
                     <Button id="featuredservices" onClick={this.viewItem}  style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple'}}>Featured Services</Button><br/>
                     <Button id="sendmessages" onClick={this.viewItem}  style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple'}}>Send Messages</Button><br/>
                     <Button id="sendnotifications" onClick={this.viewItem}  style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple'}}>Send Notifications</Button><br/>
                     <Button id="alltransactionhistory" onClick={this.viewItem}  style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple'}}>All Transaction History</Button><br/>
                     <Button id="transactionfees" onClick={this.viewItem}  style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple'}}>Transaction Fees</Button><br/>
                     <Button id="withdrawalhistory" onClick={this.viewItem}  style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple'}}>Withdrawal History</Button><br/>
                     <Button id="allusers" onClick={this.viewItem}  style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple'}}>All Users</Button><br/>
                     </Row>
                     </Container>
                     <Col>
                     <br/>
 <this.CurrentView/>
                     </Col>
                     </Row>
     </div>
                 }
             }

    }

    componentDidMount() {
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
        <div style={{marginTop: '7px'}}>
                                 <h6>Admin Panel</h6>
       <this.ValidateLogin/>
        </div>
      );
    }

  };
  
  export default withCookies(AdminPanel);