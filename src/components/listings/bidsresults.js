import React, { Component } from 'react';
import './viewservice.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, CardGroup, Label, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {SEARCH_BIDS, GET_USER} from '../graphql/QueryResolver';
import {BACKEND_URL} from '../backendurl';import axios from 'axios';
import {print} from 'graphql';
import StarRatings from 'react-star-ratings';
import { FaRegEnvelope, FaFly } from 'react-icons/fa';
import Modal from 'react-responsive-modal';
import {FaTelegramPlane, FaSearch, FaCircle} from 'react-icons/fa';
import { runInThisContext } from 'vm';
import moment from 'moment';



  class BidsResults extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
        bidsList: [],
        userDetails:{}
        

      };
            /////////for sorting and filtering
            this.finalDisplay = () =>{
              if(this.state.bidsList.length==0){
return<Row>
  <h6 style={{color: 'rebeccapurple', marginTop: '50px', paddingLeft: '45px'}}>No active bids matching <span style={{color: '#25292C'}}>{this.props.searchQuery}</span> have been found.</h6>
</Row>
              }else{
              if(this.props.sortBy=="default"){
                const bidsList = this.state.bidsList.map((bid, index) => {
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
       var payoutDescending = this.state.bidsList.sort(function(a,b){
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
       var payoutAscending = this.state.bidsList.sort(function(a,b){
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
   return  <Row>{bidsList}</Row>
      }
            }
          }
      
    }
 
    componentDidMount() {
        axios.post(GRAPHQL_BASE_URL, {
            query: print(SEARCH_BIDS), variables: {searchQuery: this.props.searchQuery}
        }).then((result) => {
            this.setState({bidsList: result.data.data.searchBids});
        }).catch(error => {
          console.log(error.response)
      });
  }
 


    render() {
        
      
        return(<div>
          <this.finalDisplay/>
        </div>
        )
    }

  };
  
  export default BidsResults;