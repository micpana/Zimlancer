import React, { Component } from 'react';
import '../categorieslandingpages/graphicsanddesign.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Container, Table} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {GET_COMPLETED_ORDERS, GET_ORDERED_JOBS} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import { runInThisContext } from 'vm';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

  class Orders extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };
    constructor(props) {
      super(props);
  
      this.state = {
completedOrders: [],
yourCompletedOrders: [],
pendingOrders: [],
yourPendingOrders: []
      };
    
    }

    componentDidMount() {
      const { cookies } = this.props;
     //////////// get completed orders
    axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_COMPLETED_ORDERS), variables: {sellerid: cookies.get('userId'), completed: "true"}
      }).then((result) => {
        this.setState({completedOrders: result.data.data.getCompletedJobs});
      
      }).catch(error => {
      console.log(error.response)
      });
      //////////// get orders made and completed
    axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_ORDERED_JOBS), variables: {userid: cookies.get('userId'), completed: "true"}
      }).then((result) => {
        this.setState({yourCompletedOrders: result.data.data.getOrderedJobs});
      
      }).catch(error => {
      console.log(error.response)
      });
         //////////// get pending orders
    axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_COMPLETED_ORDERS), variables: {sellerid: cookies.get('userId'), completed: "false"}
      }).then((result) => {
        this.setState({pendingOrders: result.data.data.getCompletedJobs});
      
      }).catch(error => {
      console.log(error.response)
      });
      //////////// get orders made and still pending
    axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_ORDERED_JOBS), variables: {userid: cookies.get('userId'), completed: "false"}
      }).then((result) => {
        this.setState({yourPendingOrders: result.data.data.getOrderedJobs});
      
      }).catch(error => {
      console.log(error.response)
      });
  }


    render() {
        const completedOrders = this.state.completedOrders.map(order => {
            return <tr>
              <td style={{whiteSpace: 'nowrap'}}>{order.servicename}</td>
              <td style={{whiteSpace: 'nowrap'}}>{order.price}</td>
              <td style={{whiteSpace: 'nowrap'}}>{order.date}</td>
              <td style={{whiteSpace: 'nowrap'}}>{order.sellerid}</td>
            </tr>
          });
          const yourCompletedOrders = this.state.yourCompletedOrders.map(order => {
            return <tr>
              <td style={{whiteSpace: 'nowrap'}}>{order.servicename}</td>
              <td style={{whiteSpace: 'nowrap'}}>{order.price}</td>
              <td style={{whiteSpace: 'nowrap'}}>{order.date}</td>
              <td style={{whiteSpace: 'nowrap'}}>{order.userid}</td>
            </tr>
          });
          const yourPendingOrders = this.state.yourPendingOrders.map(order => {
            return <tr>
              <td style={{whiteSpace: 'nowrap'}}>{order.servicename}</td>
              <td style={{whiteSpace: 'nowrap'}}>{order.price}</td>
              <td style={{whiteSpace: 'nowrap'}}>{order.date}</td>
              <td style={{whiteSpace: 'nowrap'}}>{order.userid}</td>
            </tr>
          });
          const pendingOrders = this.state.pendingOrders.map(order => {
            return <tr>
              <td style={{whiteSpace: 'nowrap'}}>{order.servicename}</td>
              <td style={{whiteSpace: 'nowrap'}}>{order.price}</td>
              <td style={{whiteSpace: 'nowrap'}}>{order.date}</td>
              <td style={{whiteSpace: 'nowrap'}}>{order.sellerid}</td>
            </tr>
          });
      return (
        <div>
                        <h6>Orders</h6><br/>
                        <Container>
                            <Row>
<Col>
<h6 style={{color: 'rebeccapurple'}}>From Your Sales</h6>
<h6 style={{color: 'grey', textAlign: 'left'}}>Pending Orders</h6>
<Row style={{maxHeight: '200px',minHeight: '200px', overflowY: 'scroll'}}>
<Table className="mt-4">
            <thead>
            <tr>
        
              <th width="20%">Package</th>
              <th width="20%">Price</th>
              <th width="20%">Date Ordered</th>
              <th width="20%">Buyer</th>
            </tr>
            </thead>
            <tbody>
            {pendingOrders}
            </tbody>
          </Table>
</Row><br/><br/>
<h6 style={{color: 'grey', textAlign: 'left'}}>Completed Orders</h6>
<Row style={{maxHeight: '200px',minHeight: '200px', overflowY: 'scroll'}}>
<Table className="mt-4">
            <thead>
            <tr>
        
              <th width="20%">Package</th>
              <th width="20%">Price</th>
              <th width="20%">Date Ordered</th>
              <th width="20%">Buyer</th>
            </tr>
            </thead>
            <tbody>
            {completedOrders}
            </tbody>
          </Table> 
</Row>
</Col>
<Col>
<h6 style={{color: 'rebeccapurple'}}>From Your Shopping</h6>
<h6 style={{color: 'grey', textAlign: 'left'}}>Pending Orders</h6>
<Row style={{maxHeight: '200px',minHeight: '200px', overflowY: 'scroll'}}>
<Table className="mt-4">
            <thead>
            <tr>
        
              <th width="20%">Package</th>
              <th width="20%">Price</th>
              <th width="20%">Date Ordered</th>
              <th width="20%">Seller</th>
            </tr>
            </thead>
            <tbody>
            {yourPendingOrders}
            </tbody>
          </Table>
</Row><br/><br/>
<h6 style={{color: 'grey', textAlign: 'left'}}>Completed Orders</h6>
<Row style={{maxHeight: '200px',minHeight: '200px', overflowY: 'scroll'}}>
<Table className="mt-4">
            <thead>
            <tr>
        
              <th width="20%">Package</th>
              <th width="20%">Price</th>
              <th width="20%">Date Ordered</th>
              <th width="20%">Seller</th>
            </tr>
            </thead>
            <tbody>
            {yourCompletedOrders}
            </tbody>
          </Table> 
</Row>
</Col>
</Row>             
          </Container>
        </div>
      );
    }

  };
  
  export default withCookies(Orders);