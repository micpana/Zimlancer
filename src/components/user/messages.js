import React, { Component } from 'react';
import {InputGroup, InputGroupAddon, InputGroupText, Nav, NavItem, NavLink,Input, Col, Row, Form, Button, Label, Container} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {SEND_MESSAGE} from '../graphql/MutationResolver';
import {GET_USER, GET_MESSAGES_BY_RECEIVER, GET_MESSAGES_BY_SENDER, RECEIVED_MESSAGES_BY_USERID, SENT_MESSAGES_BY_USERID, ALL_USERS_MIN_INFO} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import {FaTelegramPlane, FaSearch, FaCircle} from 'react-icons/fa';
import { FilePond, File, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import UploadBidSignIn from './uploadbidsignin';
import UploadBidCompleteProfile from './uploadbidcompleteprofile';
import UploadBid from './uploadbid'
import { delay } from 'q';
import { runInThisContext } from 'vm';
import {BACKEND_URL} from '../backendurl';
import moment from 'moment';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);




  class Messages extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
  };
    constructor(props) {
      super(props);
  
      this.state = {
        userid: "",
        username: "",
        userDetails: {},
        incomingMessages: [],
        outgoingMessages: [],
        message: "",
        senderDetails: {},
        sender: "",
        receiver: "",
        files: [],
        filenames:[null, null, null],
        receivedList: [],
        sentList: [],
        users: []
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleClick = this.handleClick.bind(this);

       this.MessageView = () =>{
        const { cookies } = this.props;
        //////////////////////////////////////////////check if user is logged in
      if(cookies.get('userId')==null){
        let port = (window.location.port ? ':' + window.location.port : '');
        window.location.href = '//' + window.location.hostname + port + '/login/';
      }else{
          
  /////////concatinating the two message arrays
  var incoming = this.state.incomingMessages
  var outgoing = this.state.outgoingMessages
  var chat = incoming.concat(outgoing)
  ///////// sorting allMessages array by date & time**********************************
  //////////////function 1
  var sortedMessages = chat.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  });
   /////////concatinating the two list arrays
   var sent = this.state.sentList
   var received = this.state.receivedList
   var contacts = sent.concat(received)
   ////show contact only once
   const finalOut2 = contacts.reduce((acc, cur) => acc.some(x=> (x.sender === cur.sender )) ? acc : acc.concat(cur), []) ////removed || x.receiver === cur.receiver after cur.sender
     //////////////sort contact list by date
  var contactList = finalOut2.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  });
///////////validate if you have any messages*********************************************************
if (contacts.length==0){
   //////////////////////////messages window
 return<Container><br/><br/>
 <Row style={{border: '1px solid #ced4da'}}>
     <Col xs="3">
     <InputGroup style={{paddingTop: '10px'}}>
     <Input type="text"  name="search" id="search"  placeholder="Search in Messages"  style={{color: 'rgba(0, 0, 0, 0.5)', display: 'inline-block', height:20,borderBottom:'1px solid',borderRight:'0px',borderLeft:'0px',borderTop:'0px ',outline:'none', width:180}} />
     <a className="btn "  onClick={e=>this.onSubmit(e)} style={{backgroundColor:'white',outline:'none'}}><InputGroupAddon addonType="append"><FaSearch style={{color:'#6552b8'}}/></InputGroupAddon></a>
   </InputGroup>
     </Col>
     <Col>
     <h2 style={{marginLeft: '80%'}}>Messages</h2>
     </Col>
     <Col>

     </Col>
 </Row>
 <Row style={{minHeight: '300px', borderBottom: '1px solid rgba(102, 51, 153, 0.404)'}}>
     <Col style={{borderRight:'1px solid rgba(102, 51, 153, 0.404)', borderLeft:'1px solid #ced4da', overflowY: 'scroll'}} xs="3">
    {/* message sender row starts here */}
    <Row style={{borderBottom:'1px solid #ced4da'}}>
    <Col xs="3">
    <img src=""
    style={{width:'100%',borderRadius:'50%', paddingTop:'4px', paddingBottom: '4px'}}
    />
    </Col>
    <Col>
        <h6 style={{color: 'rebeccapurple', textAlign: 'left', paddingTop: '12px'}}>
       No contacts
       {/* <FaCircle color="rebeccapurple"/> */}
       </h6>
    </Col>
    </Row>
    {/* message sender row ends here */}
     </Col>
     <Col style={{borderRight:'1px solid #ced4da'}}>
     <Row style={{minHeight: '290px', overflowY: 'scroll'}}>
     <h5 style={{margin: 'auto', color: 'rebeccapurple'}}>You have no messages in your mailbox</h5>
     </Row>
     <Row>
     <InputGroup>
     <Input  placeholder="Enter message here" type="text" name="message" id="message" 
   value={this.state.message} onChange={this.handleChange} />
               <a href="/messages/"><InputGroupAddon addonType="append" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><FaTelegramPlane color="rebeccapurple" style={{margin:'10px'}}/></InputGroupAddon></a>
         </InputGroup>
         </Row>
     </Col>
     
 </Row>
</Container>
}else{
////////displaying messages with sent on the right and received on the left*********************
const MessageList = sortedMessages.map((message, index) => {

  const profileimage= BACKEND_URL+"images/profilepictures/"+this.state.userDetails.profilepicturepath
  var profilepic=""
  var username=""
const userList = this.state.users.map((user, index) => {
  const { cookies } = this.props;
if(message.sender==user.id){
profilepic=user.profilepicturepath
username=user.username
}
})
  if (message.sender==cookies.get('userId')){
    var today = new Date();
var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
var dateTime = date+' '+time;
    var duration = moment(message.date).from(dateTime)////////returns time passed
    return<div style={{ marginTop:'10px', marginLeft:'20%'}}>
            <Row style={{textAlign: 'left', color: 'rebeccapurple', fontSize:'10px'}}>
            <Col xs="1">
            You
            </Col>
            <Col>
            {duration}
            </Col>
            </Row>
      <Row>
    <Col xs="1">
    <img src={profileimage} style={{width: '100%', borderRadius: '50%'}}/>
    </Col>
    <Col style={{backgroundColor:'rgba(56, 98, 153, 0.137)', textAlign:'left', borderRadius: '15%'}}>
    {message.message}
    </Col>
      </Row></div>
  }else{
    var today = new Date();
    var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
    var dateTime = date+' '+time;
        var duration = moment(message.date).from(dateTime)////////returns time passed
    const profileimage= BACKEND_URL+"images/profilepictures/"+profilepic
    return<div style={{marginTop: '10px', marginRight:'20%'}}>
      <Row style={{textAlign: 'left', color: 'rebeccapurple', fontSize:'10px'}}>
            <Col xs="1">
            {username}
            </Col>
            <Col>
            {duration}
            </Col>
            </Row>
      <Row>
    <Col xs="1">
    <img src={profileimage} style={{width: '100%', borderRadius: '50%'}}/>
    </Col>
    <Col  style={{backgroundColor:'rgba(56, 98, 153, 0.137)', textAlign:'left', borderRadius: '15%'}}>
    {message.message}
    </Col>
      </Row>
      </div>
  }



});
/////////////////////////displaying contacts on the left panel***********
const SenderList = contactList.map((message, index) => {
  var profilepic=""
    var username=""
    const { cookies } = this.props;
    const userList = this.state.users.map((user, index) => {
if(message.sender==user.id){
  profilepic=user.profilepicturepath
  username=user.username
}
  })

  if (cookies.get('userId')==message.sender){
    const profileimage= BACKEND_URL+"images/profilepictures/"+this.state.userDetails.profilepicturepath
    return <Row  style={{borderBottom:'1px solid #ced4da', display: 'none'}}>
  <Col xs="3">
  <img src={profileimage} style={{width: '100%', paddingTop: '3px', paddingBottom: '3px', borderRadius: '50%'}}/>
  </Col>
  <Col>
  <Button id={message.receiver} onClick={this.handleClick} style={{color: 'rgba(0, 0, 0, 0.5)', fontSize: '15px', border: 'none', backgroundColor: '#fff'}}>You</Button>
  </Col> 
</Row>
  }else{
    const profileimage= BACKEND_URL+"images/profilepictures/"+profilepic
    return <Row  style={{borderBottom:'1px solid #ced4da'}}>
  <Col xs="3">
  <img src={profileimage} style={{width: '100%', paddingTop: '3px', paddingBottom: '3px', borderRadius: '50%'}}/>
  </Col>
  <Col>
  <Button id={message.sender} onClick={this.handleClick} style={{color: 'rgba(0, 0, 0, 0.9)', fontSize: '15px', border: 'none', backgroundColor: '#fff'}}>{username}</Button>
  </Col> 
</Row>
  }

});
 //////////////////////////messages window
 return<Container><br/><br/>
 <Row style={{border: '3px solid #ced4da'}}>
     <Col>
     {/* <Input type="text"  name="search" id="search"  placeholder="Search in Messages"  style={{color: 'rgba(0, 0, 0, 0.5)', display: 'inline-block', height:20,borderBottom:'1px solid #ced4da',borderRight:'0px',borderLeft:'0px',borderTop:'0px ',outline:'none', width:300}} />
   <button className="btn "  onClick={e=>this.onSubmit(e)} style={{backgroundColor:'white',outline:'none'}}><FaSearch style={{color:'#6552b8'}}/></button> */}
     </Col>
     <Col>
     <h2>Messages</h2>
     </Col>
     <Col>

     </Col>
 </Row>
 <Row style={{minHeight: '350px', borderBottom: '3px solid #ced4da'}}>
     <Col style={{borderRight:'3px solid #ced4da', borderLeft:'3px solid #ced4da', overflowY: 'scroll'}} xs="3">
    {/* message sender row starts here */}
    <Row>
    <Col style={{maxHeight: '350px'}}>
    <h6 style={{color: 'rebeccapurple', paddingTop: '10px', borderBottom: '1px solid #ced4da'}}>Contacts</h6>
        <h6 style={{color: 'rgba(0, 0, 0, 0.5)', textAlign: 'left'}}>
{SenderList}
       {/* <FaCircle color="rebeccapurple"/> */}
       </h6>
    </Col>
    </Row>
    {/* message sender row ends here */}
     </Col>
     <Col style={{borderRight:'3px solid #ced4da', maxHeight:'350px'}}>
     <h6 style={{color: 'rebeccapurple', paddingTop: '10px', borderBottom: '1px solid rgba(175, 133, 218, 0.404)'}}>Click on the left panel to view messages</h6>
     <h6 style={{color: 'rebeccapurple', fontSize:'13px', textAlign:'left'}}>(Newer messages appear here)</h6>
<Row id="messageview" style={{maxHeight:'250px', overflowY: 'scroll', minHeight:'250px'}}>
{MessageList}

</Row>

     <Row style={{}}>
     <InputGroup>
<Input  placeholder="Enter message here" type="text" name="message" id="message" 
value={this.state.message} onChange={this.handleChange} />
         <InputGroupAddon addonType="append" style={{backgroundColor:'#e9ecef', border:'1px solid #ced4da'}}><Button onClick={this.handleSubmit} style={{backgroundColor: '#fff', border: 'none'}}><FaTelegramPlane color="rebeccapurple" style={{margin:'4px'}}/></Button></InputGroupAddon>
   </InputGroup>
         </Row>
     </Col>
     
 </Row>
</Container>
}


      }
      }
   

    }

    componentDidMount() {
      const { cookies } = this.props;
      // this.setState({userid: ""})
      this.interval = setInterval(() => this.updateMessages(), 1000);///update messages evry 1 second
      this.setState({userid: cookies.get('userId')})
      if(cookies.get('userId')!=null){
        ///////get user details
        axios.post(GRAPHQL_BASE_URL, {
          query: print(GET_USER), variables: {id: cookies.get('userId')}
      }).then((result) => {
          this.setState({userDetails: result.data.data.getUser});
      
      }).catch(error => {
        console.log(error.response)
      });
      //get sent messages
      axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_MESSAGES_BY_SENDER), variables: {
          sender: cookies.get('userId'), 
          receiver: this.state.receiver
        }
    }).then((result) => {
        this.setState({outgoingMessages: result.data.data.getMessagesBySender});
    
    }).catch(error => {
      console.log(error.response)
    });
    ///////get received messages
    axios.post(GRAPHQL_BASE_URL, {
      query: print(GET_MESSAGES_BY_RECEIVER), variables: {
        receiver: cookies.get('userId'), 
        sender: this.state.sender
      }
  }).then((result) => {
      this.setState({incomingMessages: result.data.data.getMessagesByReceiver});
  
  }).catch(error => {
    console.log(error.response)
  });
//////all contacts
axios.post(GRAPHQL_BASE_URL, {
  query: print(SENT_MESSAGES_BY_USERID), variables: {
    userid: cookies.get('userId')
  }
}).then((result) => {
  this.setState({sentList: result.data.data.sentMessagesByUserId});

}).catch(error => {
console.log(error.response)
});
axios.post(GRAPHQL_BASE_URL, {/////////////////////////////////////CONTACTS incoming msgs
  query: print(RECEIVED_MESSAGES_BY_USERID), variables: {
    userid: cookies.get('userId')
  }
}).then((result) => {
  this.setState({receivedList: result.data.data.receivedMessagesByUserId});

}).catch(error => {
console.log(error.response)
});
///////////all users minimum info
axios.post(GRAPHQL_BASE_URL, {
  query: print(ALL_USERS_MIN_INFO)
}).then((result) => {
  this.setState({users: result.data.data.allUsers});

}).catch(error => {
console.log(error.response)
});


      }

    }

    handleClick(e) {
      const { cookies } = this.props;
      this.setState({sender: e.target.id});
      this.setState({receiver: e.target.id});
      //get sent messages
      axios.post(GRAPHQL_BASE_URL, {
        query: print(GET_MESSAGES_BY_SENDER), variables: {
          sender: cookies.get('userId'), 
          receiver: e.target.id
        }
    }).then((result) => {
        this.setState({outgoingMessages: result.data.data.getMessagesBySender});
    
    }).catch(error => {
      console.log(error.response)
    });
    ///////get received messages
    axios.post(GRAPHQL_BASE_URL, {
      query: print(GET_MESSAGES_BY_RECEIVER), variables: {
        receiver: cookies.get('userId'), 
        sender: e.target.id
      }
  }).then((result) => {
      this.setState({incomingMessages: result.data.data.getMessagesByReceiver});
  
  }).catch(error => {
    console.log(error.response)
  });
    }

    handleChange(e) {
      this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e) {
      const { cookies } = this.props;
      ///////get current date and time
var today = new Date();
var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
var dateTime = date+' '+time;
e.preventDefault()///////////////////////////////avoid page reload ***********
///sending the message**************
  axios.post(GRAPHQL_BASE_URL, {
    query: print(SEND_MESSAGE), variables: {
      sender: cookies.get('userId'),
      receiver: this.state.receiver,
      message: this.state.message,
      date: dateTime,
      filepath1: this.state.filenames[0],
      filepath2: this.state.filenames[1],
      filepath3: this.state.filenames[2],
      read: "false"
    }
}).then((result) => {
//  alert('Your message has been sent successfully.')
//  let port = (window.location.port ? ':' + window.location.port : '');
//  window.location.href = '//' + window.location.hostname + port + '/messages/';
}).catch(error => {
  console.log(error.response);
  alert('An error has occured while trying to send your message. Please try again.');
});
////////////////////////////////refreshing states to update message window************
//get sent messages
axios.post(GRAPHQL_BASE_URL, {
  query: print(GET_MESSAGES_BY_SENDER), variables: {
    sender: cookies.get('userId'), 
    receiver: this.state.receiver
  }
}).then((result) => {
  this.setState({outgoingMessages: result.data.data.getMessagesBySender});

}).catch(error => {
console.log(error.response)
});
///////get received messages
axios.post(GRAPHQL_BASE_URL, {
query: print(GET_MESSAGES_BY_RECEIVER), variables: {
  receiver: cookies.get('userId'), 
  sender: this.state.sender
}
}).then((result) => {
this.setState({incomingMessages: result.data.data.getMessagesByReceiver});

}).catch(error => {
console.log(error.response)
});

this.setState({message: ""});
};

updateMessages(e) {
  const { cookies } = this.props;
  //get sent messages
  axios.post(GRAPHQL_BASE_URL, {
    query: print(GET_MESSAGES_BY_SENDER), variables: {
      sender: cookies.get('userId'), 
      receiver: this.state.receiver
    }
  }).then((result) => {
    this.setState({outgoingMessages: result.data.data.getMessagesBySender});
  
  }).catch(error => {
  console.log(error.response)
  });
  ///////get received messages
  axios.post(GRAPHQL_BASE_URL, {
  query: print(GET_MESSAGES_BY_RECEIVER), variables: {
    receiver: cookies.get('userId'), 
    sender: this.state.sender
  }
  }).then((result) => {
  this.setState({incomingMessages: result.data.data.getMessagesByReceiver});
  
  }).catch(error => {
  console.log(error.response)
  });
  }
  

    render() {


      return (
        <div >
         <this.MessageView/>
        </div>
      );
    }

  };
  
  export default withCookies(Messages);