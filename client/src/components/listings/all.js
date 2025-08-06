import React, { Component } from 'react';
import './viewservice.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {GET_SERVICES_BY_SUBCATEGORY, GET_USER, GET_BIDS_BY_SUBCATEGORY} from '../graphql/QueryResolver';
import {BACKEND_URL} from '../backendurl';import axios from 'axios';
import {print} from 'graphql';
import StarRatings from 'react-star-ratings';
import { FaRegEnvelope, FaFly } from 'react-icons/fa';
import Modal from 'react-responsive-modal';
import {FaTelegramPlane, FaSearch, FaCircle} from 'react-icons/fa';
import { runInThisContext } from 'vm';
import moment from 'moment';



  class All extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
        servicesList:[],
        bidsList: [],
        userDetails:{},
        allItems: []

      };
        /////////for sorting and filtering
        this.finalDisplay = () =>{

              

              var servicesAndBids = this.state.allItems.map((item, index) => {
              if(this.state.allItems.length==0){
                return<Row>
                <h6 style={{color: 'rebeccapurple', marginTop: '50px', paddingLeft: '45px'}}>Nothing has been posted in <span style={{color: '#25292C'}}>{this.props.subcategory}</span> yet. If you're skilled at <span style={{color: '#25292C'}}>{this.props.subcategory}</span> <a style={{color: 'blue'}} href="/upload/">Click here</a> to create a gig.</h6>
                </Row>
              }else{
///////////showing services/////////////////////////////////////////////////////////////////////////////////////////
  if(item.isService===true){
    if(this.props.sortBy=="default"){
        const servicesList = this.state.allItems.map((service, index) => {

          axios.post(GRAPHQL_BASE_URL, {
            query: print(GET_USER), variables: {id: service.userid}
        }).then((result) => {
            localStorage.setItem(index, result.data.data.getUser.profilepicturepath) 
        }).catch(error => {
          console.log(error.response)
      });
      const profileimage= BACKEND_URL+"images/profilepictures/"+localStorage.getItem(index)
    const serviceimage= BACKEND_URL+"images/services/"+service.imagepath1
    //////default price range
    if(this.props.minprice==""&&this.props.maxprice==""&&this.props.deliverytime==""||this.props.minprice==null&&this.props.maxprice==null&&this.props.deliverytime==null){
      return<Row><a className="lstlink" href={"/"+service.maincategory+"/"+service.subcategory+"/"+service.id}><Col className="cardcol">
      <Card className="mycard">
      <CardImg top width="100%" src={serviceimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
      <CardBody>
        <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {service.username}</CardTitle>
        <CardText className="servicetitle">{service.name}</CardText>
        <CardSubtitle className="pricing">{service.completiontime} Day delivery from: <span className="actualprice">${service.price}</span></CardSubtitle>
      </CardBody>
    </Card>
</Col></a>
      </Row>
    }
    //////all ranges
    if(this.props.minprice!=null&&this.props.maxprice!=null&&this.props.deliverytime!=null||this.props.minprice!=""&&this.props.maxprice!=""&&this.props.deliverytime!=""){
      while(service.price>=this.props.minprice&&service.price<=this.props.maxprice&&service.completiontime<=this.props.deliverytime){
        return<Row><a className="lstlink" href={"/"+service.maincategory+"/"+service.subcategory+"/"+service.id}><Col className="cardcol">
        <Card className="mycard">
        <CardImg top width="100%" src={serviceimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
        <CardBody>
          <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {service.username}</CardTitle>
          <CardText className="servicetitle">{service.name}</CardText>
          <CardSubtitle className="pricing">{service.completiontime} Day delivery from: <span className="actualprice">${service.price}</span></CardSubtitle>
        </CardBody>
      </Card>
</Col></a>
        </Row> 
      }
    }
    ////////just the delivery time
    if(this.props.minprice==null&&this.props.maxprice==null&&this.props.deliverytime!=null||this.props.minprice==""&&this.props.maxprice==""&&this.props.deliverytime!=""){
      while(service.completiontime<=this.props.deliverytime){
        return<Row><a className="lstlink" href={"/"+service.maincategory+"/"+service.subcategory+"/"+service.id}><Col className="cardcol">
        <Card className="mycard">
        <CardImg top width="100%" src={serviceimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
        <CardBody>
          <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {service.username}</CardTitle>
          <CardText className="servicetitle">{service.name}</CardText>
          <CardSubtitle className="pricing">{service.completiontime} Day delivery from: <span className="actualprice">${service.price}</span></CardSubtitle>
        </CardBody>
      </Card>
</Col></a>
        </Row> 
      }
      while(this.props.deliverytime==""){
        return<Row><a className="lstlink" href={"/"+service.maincategory+"/"+service.subcategory+"/"+service.id}><Col className="cardcol">
        <Card className="mycard">
        <CardImg top width="100%" src={serviceimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
        <CardBody>
          <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {service.username}</CardTitle>
          <CardText className="servicetitle">{service.name}</CardText>
          <CardSubtitle className="pricing">{service.completiontime} Day delivery from: <span className="actualprice">${service.price}</span></CardSubtitle>
        </CardBody>
      </Card>
</Col></a>
        </Row> 
      }
    }
    //////just the prices
    if(this.props.minprice!=null&&this.props.maxprice!=null&&this.props.deliverytime==null||this.props.minprice!=""&&this.props.maxprice!=""&&this.props.deliverytime==""){
      while(service.price>=this.props.minprice&&service.price<=this.props.maxprice){
        return<Row><a className="lstlink" href={"/"+service.maincategory+"/"+service.subcategory+"/"+service.id}><Col className="cardcol">
        <Card className="mycard">
        <CardImg top width="100%" src={serviceimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
        <CardBody>
          <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {service.username}</CardTitle>
          <CardText className="servicetitle">{service.name}</CardText>
          <CardSubtitle className="pricing">{service.completiontime} Day delivery from: <span className="actualprice">${service.price}</span></CardSubtitle>
        </CardBody>
      </Card>
</Col></a>
        </Row> 
      }
      while(this.props.minprice==""&&this.props.maxprice==""){
        return<Row><a className="lstlink" href={"/"+service.maincategory+"/"+service.subcategory+"/"+service.id}><Col className="cardcol">
        <Card className="mycard">
        <CardImg top width="100%" src={serviceimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
        <CardBody>
          <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {service.username}</CardTitle>
          <CardText className="servicetitle">{service.name}</CardText>
          <CardSubtitle className="pricing">{service.completiontime} Day delivery from: <span className="actualprice">${service.price}</span></CardSubtitle>
        </CardBody>
      </Card>
</Col></a>
        </Row> 
      }
    }           
        });
        return<Row>{servicesList}</Row>
      }

      if(this.props.sortBy=="pricedescending"){
         //////////////sort services by descending price
var priceDescending = this.state.allItems.sort(function(a,b){
  return new Date(b.price) - new Date(a.price);
});
        const servicesList = priceDescending.map((service, index) => {

          axios.post(GRAPHQL_BASE_URL, {
            query: print(GET_USER), variables: {id: service.userid}
        }).then((result) => {
localStorage.setItem(index, result.data.data.getUser.profilepicturepath)
        }).catch(error => {
          console.log(error.response)
      });
      const profileimage= BACKEND_URL+"images/profilepictures/"+localStorage.getItem(index)

    const serviceimage= BACKEND_URL+"images/services/"+service.imagepath1
        //////default price range
    if(this.props.minprice==""&&this.props.maxprice==""&&this.props.deliverytime==""||this.props.minprice==null&&this.props.maxprice==null&&this.props.deliverytime==null){
      return<Row><a className="lstlink" href={"/"+service.maincategory+"/"+service.subcategory+"/"+service.id}><Col className="cardcol">
      <Card className="mycard">
      <CardImg top width="100%" src={serviceimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
      <CardBody>
        <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {service.username}</CardTitle>
        <CardText className="servicetitle">{service.name}</CardText>
        <CardSubtitle className="pricing">{service.completiontime} Day delivery from: <span className="actualprice">${service.price}</span></CardSubtitle>
      </CardBody>
    </Card>
</Col></a>
      </Row>
    }
    //////all ranges
    if(this.props.minprice!=null&&this.props.maxprice!=null&&this.props.deliverytime!=null||this.props.minprice!=""&&this.props.maxprice!=""&&this.props.deliverytime!=""){
      while(service.price>=this.props.minprice&&service.price<=this.props.maxprice&&service.completiontime<=this.props.deliverytime){
        return<Row><a className="lstlink" href={"/"+service.maincategory+"/"+service.subcategory+"/"+service.id}><Col className="cardcol">
        <Card className="mycard">
        <CardImg top width="100%" src={serviceimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
        <CardBody>
          <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {service.username}</CardTitle>
          <CardText className="servicetitle">{service.name}</CardText>
          <CardSubtitle className="pricing">{service.completiontime} Day delivery from: <span className="actualprice">${service.price}</span></CardSubtitle>
        </CardBody>
      </Card>
</Col></a>
        </Row> 
      }
    }
    ////////just the delivery time
    if(this.props.minprice==null&&this.props.maxprice==null&&this.props.deliverytime!=null||this.props.minprice==""&&this.props.maxprice==""&&this.props.deliverytime!=""){
      while(service.completiontime<=this.props.deliverytime){
        return<Row><a className="lstlink" href={"/"+service.maincategory+"/"+service.subcategory+"/"+service.id}><Col className="cardcol">
        <Card className="mycard">
        <CardImg top width="100%" src={serviceimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
        <CardBody>
          <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {service.username}</CardTitle>
          <CardText className="servicetitle">{service.name}</CardText>
          <CardSubtitle className="pricing">{service.completiontime} Day delivery from: <span className="actualprice">${service.price}</span></CardSubtitle>
        </CardBody>
      </Card>
</Col></a>
        </Row> 
      }
      while(this.props.deliverytime==""){
        return<Row><a className="lstlink" href={"/"+service.maincategory+"/"+service.subcategory+"/"+service.id}><Col className="cardcol">
        <Card className="mycard">
        <CardImg top width="100%" src={serviceimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
        <CardBody>
          <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {service.username}</CardTitle>
          <CardText className="servicetitle">{service.name}</CardText>
          <CardSubtitle className="pricing">{service.completiontime} Day delivery from: <span className="actualprice">${service.price}</span></CardSubtitle>
        </CardBody>
      </Card>
</Col></a>
        </Row> 
      }
    }
    //////just the prices
    if(this.props.minprice!=null&&this.props.maxprice!=null&&this.props.deliverytime==null||this.props.minprice!=""&&this.props.maxprice!=""&&this.props.deliverytime==""){
      while(service.price>=this.props.minprice&&service.price<=this.props.maxprice){
        return<Row><a className="lstlink" href={"/"+service.maincategory+"/"+service.subcategory+"/"+service.id}><Col className="cardcol">
        <Card className="mycard">
        <CardImg top width="100%" src={serviceimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
        <CardBody>
          <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {service.username}</CardTitle>
          <CardText className="servicetitle">{service.name}</CardText>
          <CardSubtitle className="pricing">{service.completiontime} Day delivery from: <span className="actualprice">${service.price}</span></CardSubtitle>
        </CardBody>
      </Card>
</Col></a>
        </Row> 
      }
      while(this.props.minprice==""&&this.props.maxprice==""){
        return<Row><a className="lstlink" href={"/"+service.maincategory+"/"+service.subcategory+"/"+service.id}><Col className="cardcol">
        <Card className="mycard">
        <CardImg top width="100%" src={serviceimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
        <CardBody>
          <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {service.username}</CardTitle>
          <CardText className="servicetitle">{service.name}</CardText>
          <CardSubtitle className="pricing">{service.completiontime} Day delivery from: <span className="actualprice">${service.price}</span></CardSubtitle>
        </CardBody>
      </Card>
</Col></a>
        </Row> 
      }
    }          
        });
        return<Row>{servicesList}</Row>
      }
      if(this.props.sortBy=="priceascending"){
              //////////////sort services by asccending price
var priceAscending = this.state.allItems.sort(function(a,b){
  return new Date(a.price) - new Date(b.price);
});
        const servicesList = priceAscending.map((service, index) => {

          axios.post(GRAPHQL_BASE_URL, {
            query: print(GET_USER), variables: {id: service.userid}
        }).then((result) => {
            localStorage.setItem(index, result.data.data.getUser.profilepicturepath)
        }).catch(error => {
          console.log(error.response)
      });
      const profileimage= BACKEND_URL+"images/profilepictures/"+localStorage.getItem(index)

    const serviceimage= BACKEND_URL+"images/services/"+service.imagepath1
         //////default price range
    if(this.props.minprice==""&&this.props.maxprice==""&&this.props.deliverytime==""||this.props.minprice==null&&this.props.maxprice==null&&this.props.deliverytime==null){
      return<Row><a className="lstlink" href={"/"+service.maincategory+"/"+service.subcategory+"/"+service.id}><Col className="cardcol">
      <Card className="mycard">
      <CardImg top width="100%" src={serviceimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
      <CardBody>
        <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {service.username}</CardTitle>
        <CardText className="servicetitle">{service.name}</CardText>
        <CardSubtitle className="pricing">{service.completiontime} Day delivery from: <span className="actualprice">${service.price}</span></CardSubtitle>
      </CardBody>
    </Card>
</Col></a>
      </Row>
    }
    //////all ranges
    if(this.props.minprice!=null&&this.props.maxprice!=null&&this.props.deliverytime!=null||this.props.minprice!=""&&this.props.maxprice!=""&&this.props.deliverytime!=""){
      while(service.price>=this.props.minprice&&service.price<=this.props.maxprice&&service.completiontime<=this.props.deliverytime){
        return<Row><a className="lstlink" href={"/"+service.maincategory+"/"+service.subcategory+"/"+service.id}><Col className="cardcol">
        <Card className="mycard">
        <CardImg top width="100%" src={serviceimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
        <CardBody>
          <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {service.username}</CardTitle>
          <CardText className="servicetitle">{service.name}</CardText>
          <CardSubtitle className="pricing">{service.completiontime} Day delivery from: <span className="actualprice">${service.price}</span></CardSubtitle>
        </CardBody>
      </Card>
</Col></a>
        </Row> 
      }
    }
    ////////just the delivery time
    if(this.props.minprice==null&&this.props.maxprice==null&&this.props.deliverytime!=null||this.props.minprice==""&&this.props.maxprice==""&&this.props.deliverytime!=""){
      while(service.completiontime<=this.props.deliverytime){
        return<Row><a className="lstlink" href={"/"+service.maincategory+"/"+service.subcategory+"/"+service.id}><Col className="cardcol">
        <Card className="mycard">
        <CardImg top width="100%" src={serviceimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
        <CardBody>
          <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {service.username}</CardTitle>
          <CardText className="servicetitle">{service.name}</CardText>
          <CardSubtitle className="pricing">{service.completiontime} Day delivery from: <span className="actualprice">${service.price}</span></CardSubtitle>
        </CardBody>
      </Card>
</Col></a>
        </Row> 
      }
      while(this.props.deliverytime==""){
        return<Row><a className="lstlink" href={"/"+service.maincategory+"/"+service.subcategory+"/"+service.id}><Col className="cardcol">
        <Card className="mycard">
        <CardImg top width="100%" src={serviceimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
        <CardBody>
          <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {service.username}</CardTitle>
          <CardText className="servicetitle">{service.name}</CardText>
          <CardSubtitle className="pricing">{service.completiontime} Day delivery from: <span className="actualprice">${service.price}</span></CardSubtitle>
        </CardBody>
      </Card>
</Col></a>
        </Row> 
      }
    }
    //////just the prices
    if(this.props.minprice!=null&&this.props.maxprice!=null&&this.props.deliverytime==null||this.props.minprice!=""&&this.props.maxprice!=""&&this.props.deliverytime==""){
      while(service.price>=this.props.minprice&&service.price<=this.props.maxprice){
        return<Row><a className="lstlink" href={"/"+service.maincategory+"/"+service.subcategory+"/"+service.id}><Col className="cardcol">
        <Card className="mycard">
        <CardImg top width="100%" src={serviceimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
        <CardBody>
          <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {service.username}</CardTitle>
          <CardText className="servicetitle">{service.name}</CardText>
          <CardSubtitle className="pricing">{service.completiontime} Day delivery from: <span className="actualprice">${service.price}</span></CardSubtitle>
        </CardBody>
      </Card>
</Col></a>
        </Row> 
      }
      while(this.props.minprice==""&&this.props.maxprice==""){
        return<Row><a className="lstlink" href={"/"+service.maincategory+"/"+service.subcategory+"/"+service.id}><Col className="cardcol">
        <Card className="mycard">
        <CardImg top width="100%" src={serviceimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
        <CardBody>
          <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {service.username}</CardTitle>
          <CardText className="servicetitle">{service.name}</CardText>
          <CardSubtitle className="pricing">{service.completiontime} Day delivery from: <span className="actualprice">${service.price}</span></CardSubtitle>
        </CardBody>
      </Card>
</Col></a>
        </Row> 
      }
    }          
        });
        return{servicesList}
      }
  }////////displaying services ends here
//////////////displaying bids///////////////////////////////////////////////////////////////////////////////////////////////////
  if(item.isBid===true){
    if(this.props.sortBy=="default"){
        const bidsList = this.state.allItems.map((bid, index) => {
          axios.post(GRAPHQL_BASE_URL, {
            query: print(GET_USER), variables: {id: bid.userid}
        }).then((result) => {
            localStorage.setItem(index, result.data.data.getUser.profilepicturepath)    
        }).catch(error => {
          console.log(error.response)
      });
    
    const profileimage= BACKEND_URL+"images/profilepictures/"+localStorage.getItem(index)
    const bidimage= BACKEND_URL+"images/bids/"+bid.bidimage
          //////default price range
if(this.props.minprice==""&&this.props.maxprice==""&&this.props.deliverytime==""||this.props.minprice==null&&this.props.maxprice==null&&this.props.deliverytime==null){
return<Row><a className="lstlink" href={"/bids/"+bid.maincategory+"/"+bid.subcategory+"/"+bid.id}><Col className="cardcol">
<Card className="mycard">
<CardImg top width="100%" src={bidimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
<CardBody>
  <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {bid.username}</CardTitle>
  <CardText className="servicetitle">{bid.name}</CardText>
  <CardSubtitle className="pricing">Payout: <span className="actualprice">${bid.payout}</span></CardSubtitle>
</CardBody>
</Card>
</Col></a>
</Row>
}
   //////all ranges
   if(this.props.minprice!=null&&this.props.maxprice!=null&&this.props.deliverytime!=null||this.props.minprice!=""&&this.props.maxprice!=""&&this.props.deliverytime!=""){
    while(bid.payout>=this.props.minprice&&bid.payout<=this.props.maxprice&&bid.expectedcompletiontime<=this.props.deliverytime){
      return<Row><a className="lstlink" href={"/bids/"+bid.maincategory+"/"+bid.subcategory+"/"+bid.id}><Col className="cardcol">
<Card className="mycard">
<CardImg top width="100%" src={bidimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
<CardBody>
  <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {bid.username}</CardTitle>
  <CardText className="servicetitle">{bid.name}</CardText>
  <CardSubtitle className="pricing">Payout: <span className="actualprice">${bid.payout}</span></CardSubtitle>
</CardBody>
</Card>
</Col></a>
</Row>
    }
  }
        ////////just the delivery time
if(this.props.minprice==null&&this.props.maxprice==null&&this.props.deliverytime!=null||this.props.minprice==""&&this.props.maxprice==""&&this.props.deliverytime!=""){
while(bid.expectedcompletiontime<=this.props.deliverytime){
  return<Row><a className="lstlink" href={"/bids/"+bid.maincategory+"/"+bid.subcategory+"/"+bid.id}><Col className="cardcol">
  <Card className="mycard">
  <CardImg top width="100%" src={bidimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
  <CardBody>
    <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {bid.username}</CardTitle>
    <CardText className="servicetitle">{bid.name}</CardText>
    <CardSubtitle className="pricing">Payout: <span className="actualprice">${bid.payout}</span></CardSubtitle>
  </CardBody>
</Card>
</Col></a>
  </Row>
}
while(this.props.deliverytime==""){
  return<Row><a className="lstlink" href={"/bids/"+bid.maincategory+"/"+bid.subcategory+"/"+bid.id}><Col className="cardcol">
  <Card className="mycard">
  <CardImg top width="100%" src={bidimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
  <CardBody>
    <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {bid.username}</CardTitle>
    <CardText className="servicetitle">{bid.name}</CardText>
    <CardSubtitle className="pricing">Payout: <span className="actualprice">${bid.payout}</span></CardSubtitle>
  </CardBody>
</Card>
</Col></a>
  </Row> 
}
}
  //////just the prices
  if(this.props.minprice!=null&&this.props.maxprice!=null&&this.props.deliverytime==null||this.props.minprice!=""&&this.props.maxprice!=""&&this.props.deliverytime==""){
    while(bid.payout>=this.props.minprice&&bid.payout<=this.props.maxprice){
      return<Row><a className="lstlink" href={"/bids/"+bid.maincategory+"/"+bid.subcategory+"/"+bid.id}><Col className="cardcol">
      <Card className="mycard">
      <CardImg top width="100%" src={bidimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
      <CardBody>
        <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {bid.username}</CardTitle>
        <CardText className="servicetitle">{bid.name}</CardText>
        <CardSubtitle className="pricing">Payout: <span className="actualprice">${bid.payout}</span></CardSubtitle>
      </CardBody>
    </Card>
</Col></a>
      </Row> 
    }
    while(this.props.minprice==""&&this.props.maxprice==""){
      return<Row><a className="lstlink" href={"/bids/"+bid.maincategory+"/"+bid.subcategory+"/"+bid.id}><Col className="cardcol">
      <Card className="mycard">
      <CardImg top width="100%" src={bidimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
      <CardBody>
        <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {bid.username}</CardTitle>
        <CardText className="servicetitle">{bid.name}</CardText>
        <CardSubtitle className="pricing">Payout: <span className="actualprice">${bid.payout}</span></CardSubtitle>
      </CardBody>
    </Card>
</Col></a>
      </Row> 
    }
  }  
          
    
      });  
      return  <Row>{bidsList}</Row>

      }
      if(this.props.sortBy=="payoutdescending"){
        //////////////sort bids by descending payout
var payoutDescending = this.state.allItems.sort(function(a,b){
 return new Date(b.payout) - new Date(a.payout);
});
const bidsList = payoutDescending.map((bid, index) => {
axios.post(GRAPHQL_BASE_URL, {
  query: print(GET_USER), variables: {id: bid.userid}
}).then((result) => {
  localStorage.setItem(index, result.data.data.getUser.profilepicturepath)   
}).catch(error => {
console.log(error.response)
});

const profileimage= BACKEND_URL+"images/profilepictures/"+localStorage.getItem(index)
const bidimage= BACKEND_URL+"images/bids/"+bid.bidimage
                //////default price range
                if(this.props.minprice==""&&this.props.maxprice==""&&this.props.deliverytime==""||this.props.minprice==null&&this.props.maxprice==null&&this.props.deliverytime==null){
                  return<Row><a className="lstlink" href={"/bids/"+bid.maincategory+"/"+bid.subcategory+"/"+bid.id}><Col className="cardcol">
                  <Card className="mycard">
                  <CardImg top width="100%" src={bidimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
                  <CardBody>
                    <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {bid.username}</CardTitle>
                    <CardText className="servicetitle">{bid.name}</CardText>
                    <CardSubtitle className="pricing">Payout: <span className="actualprice">${bid.payout}</span></CardSubtitle>
                  </CardBody>
                </Card>
            </Col></a>
                  </Row>
                }
                     //////all ranges
                     if(this.props.minprice!=null&&this.props.maxprice!=null&&this.props.deliverytime!=null||this.props.minprice!=""&&this.props.maxprice!=""&&this.props.deliverytime!=""){
                      while(bid.payout>=this.props.minprice&&bid.payout<=this.props.maxprice&&bid.expectedcompletiontime<=this.props.deliverytime){
                        return<Row><a className="lstlink" href={"/bids/"+bid.maincategory+"/"+bid.subcategory+"/"+bid.id}><Col className="cardcol">
                  <Card className="mycard">
                  <CardImg top width="100%" src={bidimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
                  <CardBody>
                    <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {bid.username}</CardTitle>
                    <CardText className="servicetitle">{bid.name}</CardText>
                    <CardSubtitle className="pricing">Payout: <span className="actualprice">${bid.payout}</span></CardSubtitle>
                  </CardBody>
                </Card>
            </Col></a>
                  </Row>
                      }
                    }
                          ////////just the delivery time
                if(this.props.minprice==null&&this.props.maxprice==null&&this.props.deliverytime!=null||this.props.minprice==""&&this.props.maxprice==""&&this.props.deliverytime!=""){
                  while(bid.expectedcompletiontime<=this.props.deliverytime){
                    return<Row><a className="lstlink" href={"/bids/"+bid.maincategory+"/"+bid.subcategory+"/"+bid.id}><Col className="cardcol">
                    <Card className="mycard">
                    <CardImg top width="100%" src={bidimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
                    <CardBody>
                      <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {bid.username}</CardTitle>
                      <CardText className="servicetitle">{bid.name}</CardText>
                      <CardSubtitle className="pricing">Payout: <span className="actualprice">${bid.payout}</span></CardSubtitle>
                    </CardBody>
                  </Card>
              </Col></a>
                    </Row>
                  }
                  while(this.props.deliverytime==""){
                    return<Row><a className="lstlink" href={"/bids/"+bid.maincategory+"/"+bid.subcategory+"/"+bid.id}><Col className="cardcol">
                    <Card className="mycard">
                    <CardImg top width="100%" src={bidimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
                    <CardBody>
                      <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {bid.username}</CardTitle>
                      <CardText className="servicetitle">{bid.name}</CardText>
                      <CardSubtitle className="pricing">Payout: <span className="actualprice">${bid.payout}</span></CardSubtitle>
                    </CardBody>
                  </Card>
              </Col></a>
                    </Row> 
                  }
                }
                    //////just the prices
                    if(this.props.minprice!=null&&this.props.maxprice!=null&&this.props.deliverytime==null||this.props.minprice!=""&&this.props.maxprice!=""&&this.props.deliverytime==""){
                      while(bid.payout>=this.props.minprice&&bid.payout<=this.props.maxprice){
                        return<Row><a className="lstlink" href={"/bids/"+bid.maincategory+"/"+bid.subcategory+"/"+bid.id}><Col className="cardcol">
                        <Card className="mycard">
                        <CardImg top width="100%" src={bidimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
                        <CardBody>
                          <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {bid.username}</CardTitle>
                          <CardText className="servicetitle">{bid.name}</CardText>
                          <CardSubtitle className="pricing">Payout: <span className="actualprice">${bid.payout}</span></CardSubtitle>
                        </CardBody>
                      </Card>
                  </Col></a>
                        </Row> 
                      }
                      while(this.props.minprice==""&&this.props.maxprice==""){
                        return<Row><a className="lstlink" href={"/bids/"+bid.maincategory+"/"+bid.subcategory+"/"+bid.id}><Col className="cardcol">
                        <Card className="mycard">
                        <CardImg top width="100%" src={bidimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
                        <CardBody>
                          <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {bid.username}</CardTitle>
                          <CardText className="servicetitle">{bid.name}</CardText>
                          <CardSubtitle className="pricing">Payout: <span className="actualprice">${bid.payout}</span></CardSubtitle>
                        </CardBody>
                      </Card>
                  </Col></a>
                        </Row> 
                      }
                    } 

});  
return  <Row>{bidsList}</Row>
}
if(this.props.sortBy=="payoutascending"){
 //////////////sort bids by ascending payout
var payoutAscending = this.state.allItems.sort(function(a,b){
return new Date(a.payout) - new Date(b.payout);
});
const bidsList = payoutAscending.map((bid, index) => {
axios.post(GRAPHQL_BASE_URL, {
 query: print(GET_USER), variables: {id: bid.userid}
}).then((result) => {
 localStorage.setItem(index, result.data.data.getUser.profilepicturepath)    
}).catch(error => {
console.log(error.response)
});

const profileimage= BACKEND_URL+"images/profilepictures/"+localStorage.getItem(index)
const bidimage= BACKEND_URL+"images/bids/"+bid.bidimage
              //////default price range
              if(this.props.minprice==""&&this.props.maxprice==""&&this.props.deliverytime==""||this.props.minprice==null&&this.props.maxprice==null&&this.props.deliverytime==null){
                return<Row><a className="lstlink" href={"/bids/"+bid.maincategory+"/"+bid.subcategory+"/"+bid.id}><Col className="cardcol">
                <Card className="mycard">
                <CardImg top width="100%" src={bidimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
                <CardBody>
                  <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {bid.username}</CardTitle>
                  <CardText className="servicetitle">{bid.name}</CardText>
                  <CardSubtitle className="pricing">Payout: <span className="actualprice">${bid.payout}</span></CardSubtitle>
                </CardBody>
              </Card>
          </Col></a>
                </Row>
              }
                   //////all ranges
                   if(this.props.minprice!=null&&this.props.maxprice!=null&&this.props.deliverytime!=null||this.props.minprice!=""&&this.props.maxprice!=""&&this.props.deliverytime!=""){
                    while(bid.payout>=this.props.minprice&&bid.payout<=this.props.maxprice&&bid.expectedcompletiontime<=this.props.deliverytime){
                      return<Row><a className="lstlink" href={"/bids/"+bid.maincategory+"/"+bid.subcategory+"/"+bid.id}><Col className="cardcol">
                <Card className="mycard">
                <CardImg top width="100%" src={bidimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
                <CardBody>
                  <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {bid.username}</CardTitle>
                  <CardText className="servicetitle">{bid.name}</CardText>
                  <CardSubtitle className="pricing">Payout: <span className="actualprice">${bid.payout}</span></CardSubtitle>
                </CardBody>
              </Card>
          </Col></a>
                </Row>
                    }
                  }
                        ////////just the delivery time
              if(this.props.minprice==null&&this.props.maxprice==null&&this.props.deliverytime!=null||this.props.minprice==""&&this.props.maxprice==""&&this.props.deliverytime!=""){
                while(bid.expectedcompletiontime<=this.props.deliverytime){
                  return<Row><a className="lstlink" href={"/bids/"+bid.maincategory+"/"+bid.subcategory+"/"+bid.id}><Col className="cardcol">
                  <Card className="mycard">
                  <CardImg top width="100%" src={bidimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
                  <CardBody>
                    <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {bid.username}</CardTitle>
                    <CardText className="servicetitle">{bid.name}</CardText>
                    <CardSubtitle className="pricing">Payout: <span className="actualprice">${bid.payout}</span></CardSubtitle>
                  </CardBody>
                </Card>
            </Col></a>
                  </Row>
                }
                while(this.props.deliverytime==""){
                  return<Row><a className="lstlink" href={"/bids/"+bid.maincategory+"/"+bid.subcategory+"/"+bid.id}><Col className="cardcol">
                  <Card className="mycard">
                  <CardImg top width="100%" src={bidimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
                  <CardBody>
                    <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {bid.username}</CardTitle>
                    <CardText className="servicetitle">{bid.name}</CardText>
                    <CardSubtitle className="pricing">Payout: <span className="actualprice">${bid.payout}</span></CardSubtitle>
                  </CardBody>
                </Card>
            </Col></a>
                  </Row> 
                }
              }
                  //////just the prices
                  if(this.props.minprice!=null&&this.props.maxprice!=null&&this.props.deliverytime==null||this.props.minprice!=""&&this.props.maxprice!=""&&this.props.deliverytime==""){
                    while(bid.payout>=this.props.minprice&&bid.payout<=this.props.maxprice){
                      return<Row><a className="lstlink" href={"/bids/"+bid.maincategory+"/"+bid.subcategory+"/"+bid.id}><Col className="cardcol">
                      <Card className="mycard">
                      <CardImg top width="100%" src={bidimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
                      <CardBody>
                        <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {bid.username}</CardTitle>
                        <CardText className="servicetitle">{bid.name}</CardText>
                        <CardSubtitle className="pricing">Payout: <span className="actualprice">${bid.payout}</span></CardSubtitle>
                      </CardBody>
                    </Card>
                </Col></a>
                      </Row> 
                    }
                    while(this.props.minprice==""&&this.props.maxprice==""){
                      return<Row><a className="lstlink" href={"/bids/"+bid.maincategory+"/"+bid.subcategory+"/"+bid.id}><Col className="cardcol">
                      <Card className="mycard">
                      <CardImg top width="100%" src={bidimage} alt="Card image cap" style={{maxHeight: '130px'}}/>
                      <CardBody>
                        <CardTitle><img className="profpic" src={profileimage} style={{borderRadius:'50%', width: '30px', height: '30px'}}/>   {bid.username}</CardTitle>
                        <CardText className="servicetitle">{bid.name}</CardText>
                        <CardSubtitle className="pricing">Payout: <span className="actualprice">${bid.payout}</span></CardSubtitle>
                      </CardBody>
                    </Card>
                </Col></a>
                      </Row> 
                    }
                  } 

});  
return {bidsList}
}
  }////////displaying bids ends here
       }
          });
          return<Row>{servicesAndBids}</Row>
      }
      
    }
 
    componentDidMount() {
  axios.all([
    axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_SERVICES_BY_SUBCATEGORY), variables: {subcategory: this.props.subcategory}
    }),
      axios.post(GRAPHQL_BASE_URL, {
          query: print(GET_BIDS_BY_SUBCATEGORY), variables: {subcategory: this.props.subcategory}
      })] ).then(axios.spread((service, bid) => {



        let services = service.data.data.getServicesBySubcategory;
        let bids = bid.data.data.getServiceBidsBySubCategory;
        services.map(s => s.isService = true)
            bids.map(b => b.isBid = true)
          let array=services.concat(bids)
////shuffling the arrays using defined 'sortArray' function
        // let allItems = this.sortArray(services, bids);
////shuffling the arrays using defined 'shuffleArray' function
        let allItems = this.shuffleArray(array);
        this.setState({allItems: allItems});


    }));
  }
 //////function for shuffling items
  sortArray(array1,array2){



    for(let i=0,a=1; a<array1.length && i < array2.length ; a+=2,i++){

        array1.splice(a,0,array2[i])
    }
    return array1;


}
            ///////////The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle
            ///////shuffling the service&bid array
           shuffleArray(array) {
              var currentIndex = array.length, temporaryValue, randomIndex;
            
              // While there remain elements to shuffle...
              while (0 !== currentIndex) {
            
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
            
                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
              }
            
              return array;
            }


    render() {
        return(<div>
        <this.finalDisplay/>
        </div>
        )
    }

  };
  
  export default All;