import React, { Component } from 'react';
import './viewservice.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {GET_SERVICES_BY_SUBCATEGORY, GET_USER, GET_BIDS_BY_SUBCATEGORY} from '../graphql/QueryResolver';
import {BACKEND_URL} from '../backendurl';
import axios from 'axios';
import {print} from 'graphql';
import StarRatings from 'react-star-ratings';
import { FaRegEnvelope, FaFly } from 'react-icons/fa';
import Modal from 'react-responsive-modal';
import {FaTelegramPlane, FaSearch, FaCircle} from 'react-icons/fa';
import { runInThisContext } from 'vm';
import moment from 'moment';



  class Services extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
        servicesList:[],
        userDetails:{}

      };

        this.finalDisplay = () =>{/////////////////////////////////for sorting and filtering
          if(this.state.servicesList.length==0){
return<Row>
<h6 style={{color: 'rebeccapurple', marginTop: '50px', paddingLeft: '45px'}}>No services have been posted in <span style={{color: '#25292C'}}>{this.props.subcategory}</span> yet. If you're skilled at <span style={{color: '#25292C'}}>{this.props.subcategory}</span> <a style={{color: 'blue'}} href="/upload/">Click here</a> to create a gig.</h6>
</Row>
          }else{
        if(this.props.sortBy=="default"){
          const servicesList = this.state.servicesList.map((service, index) => {

        var profileimage= BACKEND_URL+"images/profilepictures/"+service.profilepicturepath;
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
  var priceDescending = this.state.servicesList.sort(function(a,b){
    return new Date(b.price) - new Date(a.price);
  });
          const servicesList = priceDescending.map((service, index) => {
         
      var profileimage= BACKEND_URL+"images/profilepictures/"+service.profilepicturepath;
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
  var priceAscending = this.state.servicesList.sort(function(a,b){
    return new Date(a.price) - new Date(b.price);
  });
          const servicesList = priceAscending.map((service, index) => {
          
      var profileimage= BACKEND_URL+"images/profilepictures/"+service.profilepicturepath;
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
        } 
      }////////////////////////////////////////////////////////////////////////ends here
      
    }
 
    componentDidMount() {
      axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_SERVICES_BY_SUBCATEGORY), variables: {subcategory: this.props.subcategory}
    }).then((result) => {
        var services=result.data.data.getServicesBySubcategory

        services.map((service, index) => {/////////////////////////////////////map all services
let userid= service.userid;//get userid from service details

axios.post(GRAPHQL_BASE_URL, {///get service lister details
query: print(GET_USER), variables: {id: userid}
}).then((result2) => {

  services[index].profilepicturepath = result2.data.data.getUser.profilepicturepath//////set lister profile picture

}).catch(error => {
console.log(error.response)
});/////////////////////////////ends here
        });///////////////////////////////////////////////////////////////ends here

        this.setState({servicesList: services});
        this.interval = setInterval(() => this.setState({servicesList: services}), 1000);///update state every 1 second

    }).catch(error => {
      console.log(error.response)
  });    
  }
 


    render() {
       
      console.log('kkkkkkkkk', this.state.servicesList)
        return(<div>
        <this.finalDisplay/>
        </div>
        )
    }

  };
  
  export default Services;