import React, { Component } from 'react';
import '../categorieslandingpages/graphicsanddesign.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Container} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {GET_BIDS_BY_USERID, GET_USER} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import { runInThisContext } from 'vm';
import { BACKEND_URL } from '../backendurl';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

  class YourBidListings extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };
    constructor(props) {
      super(props);
  
      this.state = {
userBids: [],
userDetails: {}
      };
      this.ValidateContent = () =>{
if(this.state.userBids==""){
    return<h6 style={{color: 'rebeccapurple', textAlign: 'center'}}>You haven't posted any bids yet.</h6>
}else{
    const userBids = this.state.userBids.map((bid, index) => {
        const profileimage= BACKEND_URL+"images/profilepictures/"+ this.state.userDetails.profilepicturepath
        const bidimage=BACKEND_URL+"images/bids/"+bid.bidimage
                return<Row><a className="lstlink" href={"/bids/"+bid.maincategory+"/"+bid.subcategory+"/"+bid.id}><Col className="cardcol">
                <Card className="mycard">
                <CardImg top width="100%" src={bidimage} alt="Card image cap" style={{maxHeight: '130px', minHeight: '130px'}}/>
                <CardBody>
                  <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {this.state.userDetails.username}</CardTitle>
                  <CardText className="servicetitle">{bid.name}</CardText>
                  <CardSubtitle className="pricing">Payout: <span className="actualprice">${bid.payout}</span></CardSubtitle>
                </CardBody>
              </Card>
        </Col></a>
                </Row>
        
        
            });
  return (
    <div>
        <Container><Row>{userBids}</Row></Container>
        
    </div>
  );
}
      }
    }

    componentDidMount() {
      const { cookies } = this.props;
        axios.post(GRAPHQL_BASE_URL, { /////get user bids
            query: print(GET_BIDS_BY_USERID), variables: {userid: cookies.get('userId')}
        }).then((result) => {
            this.setState({userBids: result.data.data.getServiceBidsByUserId});
    
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
                        <h6>Your Bids</h6><br/>
<this.ValidateContent/>            
        </div>
      );
    }

  };
  
  export default withCookies(YourBidListings);