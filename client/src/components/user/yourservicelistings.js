import React, { Component } from 'react';
import '../categorieslandingpages/graphicsanddesign.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Container} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {GET_SERVICES_BY_USERID, GET_USER} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import { runInThisContext } from 'vm';
import { BACKEND_URL } from '../backendurl';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

  class YourServiceListings extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };
    constructor(props) {
      super(props);
  
      this.state = {
userServices: [],
userDetails: []
      };
      this.ValidateContent = () =>{
if(this.state.userServices==""){
    return<h6 style={{color: 'rebeccapurple', textAlign: 'center'}}>You haven't posted any services yet.</h6>
}else{
    const userServices = this.state.userServices.map((service, index) => {
        const profileimage= BACKEND_URL+"images/profilepictures/"+ this.state.userDetails.profilepicturepath
        const serviceimage= BACKEND_URL+"images/services/"+service.imagepath1
                return<Row><a className="lstlink" href={"/"+service.maincategory+"/"+service.subcategory+"/"+service.id}><Col className="cardcol">
                <Card className="mycard">
                <CardImg top width="100%" src={serviceimage} alt="Card image cap" style={{maxHeight: '130px', minHeight: '130px'}}/>
                <CardBody>
                  <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {service.username}</CardTitle>
                  <CardText className="servicetitle">{service.name}</CardText>
                  <CardSubtitle className="pricing">Starting at: <span className="actualprice">${service.price}</span></CardSubtitle>
                </CardBody>
              </Card>
        </Col></a>
                </Row>
        
        
            });
  return (
    <div>
        <Container><Row>{userServices}</Row></Container>
        
    </div>
  );
}
      }
    }

    componentDidMount() {
      const { cookies } = this.props;
        axios.post(GRAPHQL_BASE_URL, { /////get user services
            query: print(GET_SERVICES_BY_USERID), variables: {id: cookies.get('userId')}
        }).then((result) => {
            this.setState({userServices: result.data.data.getServicesByUserId});
    
        }).catch(error => {
          console.log(error.response)
      });
      axios.post(GRAPHQL_BASE_URL, { //////get user details
        query: print(GET_USER), variables: {id: cookies.get('userId')}
    }).then((result) => {
        this.setState({userDetails: result.data.data.getUser});

    }).catch(error => {
      console.log(error.response)
  });
  }


    render() {
      return (
        <div>
                        <h6>Your Services</h6><br/>
<this.ValidateContent/>            
        </div>
      );
    }

  };
  
  export default withCookies(YourServiceListings);