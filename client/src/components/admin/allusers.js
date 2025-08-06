import React, { Component } from 'react';
import '../categorieslandingpages/graphicsanddesign.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Container, Table} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {ALL_USERS} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import { runInThisContext } from 'vm';
import { BACKEND_URL } from '../backendurl';
import ViewUser from './viewuser';

  class AdminPanel extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
userList: []
    };

    }

    componentDidMount() {
        axios.post(GRAPHQL_BASE_URL, {
            query: print(ALL_USERS)
        }).then((result) => {
            this.setState({userList: result.data.data.allUsers});
        }).catch(error => {
          console.log(error.response)
      });
  }


    render() {
        const userData = this.state.userList.map(user => {
            return <tr>
              <td style={{whiteSpace: 'nowrap'}}>{user.username}</td>
              <td style={{whiteSpace: 'nowrap'}}>{user.firstname}</td>
              <td style={{whiteSpace: 'nowrap'}}>{user.surname}</td>
              <td style={{whiteSpace: 'nowrap'}}>{user.usertype}</td>
              <ViewUser userid={user.id}/>
            </tr>
          });
      return (
        <div>
               <h6 style={{color: 'rebeccapurple'}}>All Users</h6>
               <Col style={{maxHeight: '450px', minHeight: '450px', overflowY: 'scroll'}}>
                        <Table className="mt-4">
            <thead>
            <tr>
        
              <th width="20%">Username</th>
              <th width="20%">Firstname</th>
              <th width="20%">Lastname</th>
              <th width="20%">Account Type</th>
              <th width="20%">Options</th>
            </tr>
            </thead>
            <tbody>
            {userData}
            </tbody>
          </Table>    
          </Col>      
        </div>
      );
    }

  };
  
  export default AdminPanel;