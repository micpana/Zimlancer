import React, { Component, useReducer } from 'react';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,UncontrolledDropdown,
 Button, Input, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Form} from "reactstrap";
  import logo from '../images/logo_transparent.png';
  import './navbar.css';
  import {FaSearch} from 'react-icons/fa';
  import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {GET_USER, SEARCH_BIDS, SEARCH_SERVICES, GET_NOTIFICATIONS_BY_USERID, RECEIVED_MESSAGES_BY_USERID} from '../graphql/QueryResolver';
import {UPDATE_NOTIFICATION, CREATE_SEARCH} from '../graphql/MutationResolver';
import axios from 'axios';
import {print} from 'graphql';
import { BACKEND_URL } from '../backendurl';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import {MdMessage, MdNotifications, MdAttachMoney, MdWork} from "react-icons/md";
import { randomFillSync } from 'crypto';




  class NavBar extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };
    constructor(props) { 
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false,
        userid: "",
        userDetails: {},
        dropdownOpen: false,
        dropdownOpen3: false,/////////////for the notifications dropdown
        dropdownOpen4: false,/////////////for the messages dropdown
        searchQuery: "",
        servicesList:[],
        bidsList: [],
        allItems: [],
        userNotifications: [],
        notificationAlert: "",
        messageAlert: "",
        receivedList: [],
        contactList: []
      };
      this.dtoggle = this.dtoggle.bind(this);
      this.onMouseEnter = this.onMouseEnter.bind(this);
      this.onMouseLeave = this.onMouseLeave.bind(this);
      this.dtoggle3 = this.dtoggle3.bind(this);
      this.onMouseEnter3 = this.onMouseEnter3.bind(this);
      this.onMouseLeave3 = this.onMouseLeave3.bind(this);
      this.dtoggle4 = this.dtoggle4.bind(this);
      this.onMouseEnter4 = this.onMouseEnter4.bind(this);
      this.onMouseLeave4 = this.onMouseLeave4.bind(this);
      this.dtoggle2 = this.dtoggle2.bind(this);
      this.handleRedirect=this.handleRedirect.bind(this);
      this.Logout = () =>{
        const { cookies } = this.props;
        cookies.remove('userId', { path: '/' });
        let port = (window.location.port ? ':' + window.location.port : '');
      window.location.href = '//' + window.location.hostname + port + '/login';
      };

this.getSenderUsername = (details) =>{////////////get sender username
var length=  details.senderid.length;
var total= length+ details.indexNum
  var random= 1+details.senderid[0]+length+details.senderid[2]+details.senderid+details.indexNum+details.senderid[1]+total
  axios.post(GRAPHQL_BASE_URL, {
    query: print(GET_USER), variables: {id: details.senderid}
  }).then((result) => {
    let username= result.data.data.getUser.username;
    localStorage.setItem(random, username)
  }).catch(error => {
  console.log(error.response)
  });
  var details= localStorage.getItem(random)
  return details
};/////////////////////////ends here

this.getSenderProfilePicture = (details) =>{////////////get sender profile picture
  var length=  details.senderid.length;
var total= length+ details.indexNum
  var random= 2+details.senderid[2]+length+details.senderid[1]+details.senderid+details.indexNum+details.senderid[0]+total
  axios.post(GRAPHQL_BASE_URL, {
    query: print(GET_USER), variables: {id: details.senderid}
  }).then((result) => {
    let username= result.data.data.getUser.profilepicturepath;
    localStorage.setItem(random, username)
  }).catch(error => {
  console.log(error.response)
  });
  var details= localStorage.getItem(random)
  return details
};/////////////////////////ends here

      this.updateMessages = (e) =>{///////////////update messages
        const { cookies } = this.props;
        
        axios.post(GRAPHQL_BASE_URL, {/////////////////////////////////////CONTACTS incoming msgs
          query: print(RECEIVED_MESSAGES_BY_USERID), variables: {
            userid: cookies.get('userId')
          }
        }).then((result) => {
          this.setState({receivedList: result.data.data.receivedMessagesByUserId});
        
        }).catch(error => {
        console.log(error.response)
        });////////ends here

           ////show contact only once
var notRead= this.state.receivedList.filter(message => message.read=== "false");//////get unread messages
if(notRead.length!=0){/////for showing alert if there are unread messages
  this.setState({messageAlert: '('+notRead.length+')'})
}else{
  this.setState({messageAlert: ""})
}////ends here

let contactList = this.state.receivedList.reduce((acc, cur) => acc.some(x=> (x.sender === cur.sender )) ? acc : acc.concat(cur), []) ////removed || x.receiver === cur.receiver after cur.sender
var sortedContactList = contactList.sort(function(a,b){/////sort contact list by date
  return new Date(b.date) - new Date(a.date);
});///////ends here

this.setState({contactList: sortedContactList});/////set state for message dropdown use
      };/////////////////////////////////////////////////////////////////////////ends here

      this.onMessageClick = (e) =>{////////////action when a notification is clicked
        e.preventDefault();
           let port = (window.location.port ? ':' + window.location.port : '');
 window.location.href = '//' + window.location.hostname + port + '/messages/'+ e.target.id;
              };/////////ends here

      this.onNotificationClick = (e) =>{////////////action when a notification is clicked
e.preventDefault();
        if(e.target.id!=""){////////if href isn't null
          window.location.href = e.target.id;
        }
      };/////////ends here

      this.updateNotifications = () =>{///////////showing notification alert
        const { cookies } = this.props;
        if(cookies.get('userId')!=null){
          axios.post(GRAPHQL_BASE_URL, {////////////////get notifications every 1 second
            query: print(GET_NOTIFICATIONS_BY_USERID), variables: {userid: cookies.get('userId')}
          }).then((result) => {
            this.setState({userNotifications: result.data.data.getNotificationsByUserid});
          
          }).catch(error => {
          console.log(error.response)
          
          })////////////////////////////////////////////ends here
        }
      };//////////////////////ends here
      this.NotificationColorChange = () =>{///////////showing notification alert
        var notRead = this.state.userNotifications.filter(notification => notification.read === "false");
        if(notRead.length>0){
         this.setState({notificationAlert: '('+notRead.length+')'})
        }else{
          this.setState({notificationAlert: ''})
        }
      };//////////////////////ends here
 
      this.SearchField = () =>{
      if(this.state.searchQuery==""){
        return<div><Dropdown className="d-inline-block" isOpen={false} toggle={this.dtoggle2}>
        <DropdownToggle  style={{backgroundColor:  'inherit', border: 'none', fontSize: '13px'}}>
        <NavItem className="item1">
        <input type="text"  name="search" id="search"  placeholder="Search"  style={{color: 'rgba(0, 0, 0, 0.5)', display: 'inline-block', height:40,borderBottom:'1px solid',borderRight:'0px',borderLeft:'0px',borderTop:'0px ',outline:'none'}} 
            autocomplete="off" value={this.state.searchQuery} onChange={(e)=>this.handleChange(e)}
            />
         </NavItem>
        </DropdownToggle>
        <DropdownMenu>
            {this.state.allItems.map((item, index) => 
           <DropdownItem key={item.name}>
           <a onClick={e=>this.handleRedirect(e)} id={index}  style={{color: 'rgba(0, 0, 0, 0.5)'}}>{item.name}</a>
           </DropdownItem>)}
        </DropdownMenu>
      </Dropdown>
           <button className="btn "  onClick={e=>this.handleSubmit(e)} style={{backgroundColor:'white',outline:'none'}}><FaSearch style={{color:'#6552b8'}}/></button>
           </div>
      }else{
        return<div><Dropdown className="d-inline-block" isOpen={this.state.dropdownOpen2} toggle={this.dtoggle2}>
        <DropdownToggle  style={{backgroundColor:  'inherit', border: 'none', fontSize: '13px'}}>
        <NavItem className="item1">
        <input type="text"  name="search" id="search"  placeholder="Search"  style={{color: 'rgba(0, 0, 0, 0.5)', display: 'inline-block', height:40,borderBottom:'1px solid',borderRight:'0px',borderLeft:'0px',borderTop:'0px ',outline:'none'}} 
            autocomplete="off" value={this.state.searchQuery} onChange={(e)=>this.handleChange(e)}
            />
         </NavItem>
        </DropdownToggle>
        <DropdownMenu>
            {this.state.allItems.map((item, index) => 
           <DropdownItem key={item.name} onClick={e=>this.handleRedirect(e)} id={index}>
           <a  id={index} style={{color: 'rgba(0, 0, 0, 0.5)'}}>{item.name}</a>
           </DropdownItem>)}
        </DropdownMenu>
      </Dropdown>
            <button className="btn "  onClick={e=>this.handleSubmit(e)} style={{backgroundColor:'white',outline:'none'}}><FaSearch style={{color:'#6552b8'}}/></button>
</div>
      }
      }

      this.ValidateLogin = () =>{
if(this.state.userid==null){
  return<div>
    <Row>
      <Col >
      <NavItem>
                  <NavLink href="/login/">LOG IN</NavLink>
                </NavItem>
      </Col>
      <Col>
      <NavItem>
                  <NavLink href="/registration/">SIGNUP</NavLink>
                </NavItem> 
      </Col>
    </Row>
                
  </div>   
}else{
  var sortedNotifications = this.state.userNotifications.sort(function(a,b){//////sort notifications by date&time
    return new Date(b.date) - new Date(a.date);
  });
  const profileimage= BACKEND_URL+"images/profilepictures/"+this.state.userDetails.profilepicturepath
    const userNotifications = sortedNotifications.map((notification, index) => {////////notifications dropdown
return<DropdownItem id={notification.href} onClick={e=>this.onNotificationClick(e)} style={{color: 'rgba(0, 0, 0, 0.5)', fontSize: '13px'}}>
{notification.notification}
</DropdownItem>
    })/////////////ends here

const userMessages = this.state.contactList.map((message, index) => {/////message dropdown
      var details= {//for passing to functions
        senderid: message.sender,
        indexNum: index
      };//ends here
      var userName=this.getSenderUsername(details);
      var profilePicture=BACKEND_URL+"images/profilepictures/"+this.getSenderProfilePicture(details);
      var notRead= this.state.receivedList.filter(messages => messages.read=== "false"&& message.sender===messages.sender);//////get unread messages
var messageAlert;
if(notRead.length!=0){////////for unread message alert
  messageAlert = '('+notRead.length+')'
}else{
  messageAlert= ""
}///////////////////ends here

return<DropdownItem id={message.sender} onClick={e=>this.onMessageClick(e)} style={{color: 'rgba(0, 0, 0, 0.5)', fontSize: '13px'}}>
      <img src={profilePicture} onError={this.userIcon} style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '5px'}}/>
{userName}<span style={{color: 'rebeccapurple', fontSize: '10px'}}>{messageAlert}</span>
      </DropdownItem>
          })//////////////////////////ends here

  return<div>
  <Row>
  <Col>
  <Dropdown className="d-inline-block" onMouseOver={this.onMouseEnter4} onMouseLeave={this.onMouseLeave4} isOpen={this.state.dropdownOpen4} toggle={this.dtoggle4}>
        <DropdownToggle  href="/messages/" style={{backgroundColor:  'inherit', border: 'none'}}>
        <NavItem className="item1" style={{marginTop: '-10%'}}>
        <NavLink>
                  <MdMessage style={{color: 'rebeccapurple'}}/><br/>
                  <span style={{fontSize: '10px'}}>Messages<span style={{color: 'rebeccapurple'}}>{this.state.messageAlert}</span></span>
                  </NavLink>
                                  </NavItem>
        </DropdownToggle>
        <DropdownMenu style={{maxHeight: '300px', overflowY: 'scroll'}}>
            {userMessages}
        </DropdownMenu>
      </Dropdown>
  </Col>
  <Col>
  <Dropdown className="d-inline-block" onMouseOver={this.onMouseEnter3} onMouseLeave={this.onMouseLeave3} isOpen={this.state.dropdownOpen3} toggle={this.dtoggle3}>
        <DropdownToggle  style={{backgroundColor:  'inherit', border: 'none'}}>
        <NavItem className="item1" style={{marginTop: '-10%'}}>
        <NavLink>
                  <MdNotifications style={{color: 'rebeccapurple'}}/><br/>
                  <span style={{fontSize: '10px'}}>Notifications<span style={{color: 'rebeccapurple'}}>{this.state.notificationAlert}</span></span>
                  </NavLink>
                                  </NavItem>
        </DropdownToggle>
        <DropdownMenu style={{maxHeight: '300px', overflowY: 'scroll'}}>
            {userNotifications}
        </DropdownMenu>
      </Dropdown>
  </Col>
    <Col>
    <NavItem>
                  <NavLink href="/dashboard/orders">
                  <MdAttachMoney style={{color: 'rebeccapurple'}}/><br/>
                  <span style={{fontSize: '10px'}}>Orders</span>
                  </NavLink>
                </NavItem> 
    </Col>
    <Col>
    <NavItem>
                  <NavLink href="/dashboard/">
                  <MdWork style={{color: 'rebeccapurple'}}/><br/>
                  <span style={{fontSize: '10px'}}>Dashboard</span>
                  </NavLink>
                </NavItem> 
    </Col>
    <Col>
  <NavItem>
              
                  <Dropdown className="d-inline-block" onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.dtoggle}>
        <DropdownToggle  style={{backgroundColor:  'inherit', border: 'none', color: 'rgba(0, 0, 0, 0.5)'}}>
        <img src={profileimage} onError={this.userIcon} style={{borderRadius: '50%', width: '20px', height: '20px'}}/><br/>
                  <span style={{fontSize: '10px'}}>{this.state.userDetails.username}</span>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>My account</DropdownItem>
          <DropdownItem divider />
          <DropdownItem href={"/profile/"+this.state.userDetails.id}>My Profile</DropdownItem>
          {/* <DropdownItem>Account Settings</DropdownItem> */}
          <DropdownItem divider />
          <DropdownItem  onClick={this.Logout}>
          <NavLink>
                  Logout
                  </NavLink>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
                </NavItem>
    </Col>
            
                </Row>
  </div>
}
      }
    }

    componentDidMount() {
      const { cookies } = this.props;
      this.setState({userid: cookies.get('userId')})
axios.post(GRAPHQL_BASE_URL, {
  query: print(GET_USER), variables: {id: cookies.get('userId')}
}).then((result) => {
  this.setState({userDetails: result.data.data.getUser});

}).catch(error => {
console.log(error.response)

});

this.interval = setInterval(() => 
this.updateNotifications()
, 1000);///update notifications every 1 second

this.interval = setInterval(() => ////////////////notifications alert
this.NotificationColorChange()
, 1000);///updates every 1 second

this.interval = setInterval(() => ////////////////messages alert
this.updateMessages()
, 1000);///updates every 1 second
  }


    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    dtoggle() {
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
      }));
    }
    dtoggle2() {
      this.setState(prevState => ({
        dropdownOpen2: !prevState.dropdownOpen2
      }));
    }
    onMouseEnter() {
      this.setState({dropdownOpen: true});
    }
  
    onMouseLeave() {
      this.setState({dropdownOpen: false});
    }
    dtoggle3() {//////////////////////handling the notifications dropdown
      this.setState(prevState => ({
        dropdownOpen3: !prevState.dropdownOpen3
      }));
    }
    onMouseEnter3() {
      this.setState({dropdownOpen3: true});
    }
  
    onMouseLeave3() {
      this.setState({dropdownOpen3: false});
      var notRead = this.state.userNotifications.filter(notification => notification.read === "false");
      if(notRead.length!=0){////check if array has items
       notRead.map((notification, index) => {//////////////mark notifications as read
          axios.post(GRAPHQL_BASE_URL, {//////////////posting the changes
            query: print(UPDATE_NOTIFICATION), variables: {
              id: notification.id,
              userid: notification.userid,
              notification: notification.notification,
              date: notification.date,
              read: "true"
            }
        }).then((result) => {
        var confirmation= result.data.data.updateNotification
        }).catch(error => {
          console.log(error.response);
        });////////posting ends here
          })////////////////////////////////////////////////////ends here
      }/////////////array length validation ends here

    }/////////////////////////////////ends here

    dtoggle4() {///////////////////////////////handling the messages dropdown
      this.setState(prevState => ({
        dropdownOpen4: !prevState.dropdownOpen4
      }));
    }
    onMouseEnter4() {
      this.setState({dropdownOpen4: true});
    }
  
    onMouseLeave4() {
      this.setState({dropdownOpen4: false});
    }////////////////////////////////////////////ends here

    handleChange(e) {
      this.setState({searchQuery: e.target.value});

          axios.all([
            axios.post(GRAPHQL_BASE_URL, {
                query: print(SEARCH_SERVICES), variables: {searchQuery: e.target.value}
            }),
              axios.post(GRAPHQL_BASE_URL, {
                  query: print(SEARCH_BIDS), variables: {searchQuery: e.target.value}
              })] ).then(axios.spread((service, bid) => {
                let services = service.data.data.searchServices;
                let bids = bid.data.data.searchBids;
                services.map(s => s.isService = true)
                bids.map(b => b.isService = false)
                  let array=services.concat(bids)
                 
                this.setState({allItems:array});
          
            }));
    }
    handleSubmit(e) {
      var today = new Date();
      var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
      var dateTime = date+' '+time;
            const { cookies } = this.props;
axios.post(GRAPHQL_BASE_URL, {////////////save search
        query: print(CREATE_SEARCH), variables: {
          userid: cookies.get('userId'),
          searchitem: this.state.searchQuery,
          date: dateTime
        }
      }).then((result) => {
        this.setState({savedSearch: result.data.data.createSearches});
      
      }).catch(error => {
      console.log(error.response)
      });///////////////ends here
      let port = (window.location.port ? ':' + window.location.port : '');
      window.location.href = '//' + window.location.hostname + port + '/search/' + this.state.searchQuery;
     
};
handleRedirect (e) {/////////////when a search suggestion is clicked//////////////
  let index = e.target.id;
  let item = this.state.allItems[index];
  let port = (window.location.port ? ':' + window.location.port : '');
  var today = new Date();
  var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
  var dateTime = date+' '+time;
        const { cookies } = this.props;
axios.post(GRAPHQL_BASE_URL, {////////////save search
    query: print(CREATE_SEARCH), variables: {
      userid: cookies.get('userId'),
      searchitem: this.state.searchQuery,
      date: dateTime
    }
  }).then((result) => {
    this.setState({savedSearch: result.data.data.createSearches});
  
  }).catch(error => {
  console.log(error.response)
  });///////////////ends here
if(item.isService==true){////means search suggestion is a service/////////////////
  window.location.href = '//' + window.location.hostname + port + '/' + item.maincategory+ '/' + item.subcategory +  '/' + item.id;
}else{//////if its a bid
  window.location.href = '//' + window.location.hostname + port + '/bids/' + item.maincategory+ '/' + item.subcategory +  '/' + item.id;
}


};
userIcon=(e)=>{
  e.target.src=require("../images/usericon.png")
};
    render() {
      
      return (
        <div >
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/"><img className="logo" src={logo}/>
            </NavbarBrand>
            <a href="/" className="sitename"><span style={{color:'#40356F', fontWeight:'bold'}}>ZIM</span>LANCER</a>
            <span className="navsearch"> 
            <this.SearchField/>

              </span>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
               <this.ValidateLogin/>
                <NavItem>
                <NavLink></NavLink>
                </NavItem>
                <NavItem>
                  <Button style={{ backgroundColor: '#6452b8' }} href={"/upload/"}>POST A JOB</Button>
                </NavItem>
                <NavItem>
                <NavLink></NavLink>
                </NavItem>
                <NavItem>
                  <Button style={{ backgroundColor: '#6452b8' }} href="/postbid/">POST A BID</Button>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }

  };
  
  export default withCookies(NavBar);