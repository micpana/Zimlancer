import React, { Component, useReducer } from 'react';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,UncontrolledDropdown,
  DropdownToggle,DropdownMenu,DropdownItem, Button, Input, Row, Col} from "reactstrap";
  import logo from '../images/logo_transparent.png';
  import './navbar.css';
  import {FaSearch} from 'react-icons/fa';


  class NavBar extends Component{
    constructor(props) { 
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false,
        userid: ""
      };
      this.Logout = () =>{
        localStorage.setItem('userId', "");
      };
      this.ValidateLogin = () =>{
if(this.state.userid==""){
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
  return<div>
  <Row>
    <Col>
    <NavItem>
                  <NavLink href="/messages/">Messages</NavLink>
                </NavItem>
  </Col>
    <Col>
    <NavItem>
                  <NavLink href="/">Orders</NavLink>
                </NavItem> 
    </Col>
    <Col>
    <NavItem>
                  <NavLink href="/">Dashboard</NavLink>
                </NavItem> 
    </Col>
    <Col>
  <NavItem>
                  <NavLink onClick={this.Logout} href="/login/">Logout</NavLink>
                </NavItem>
    </Col>
            
                </Row>
  </div>
}
      }
    }

    componentDidMount() {
this.setState({userid: localStorage.getItem('userId')})
// //reload page once
// if( window.localStorage )
// {
//   if( !localStorage.getItem( 'firstLoad' ) )
//   {
//     localStorage[ 'firstLoad' ] = true;
//     window.location.reload();
//   }  

//   else
//     localStorage.removeItem( 'firstLoad' );
// }



  }


    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render() {
      return (
        <div >
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/"><img className="logo" src={logo}/> <span className="sitename"><span style={{color:'rgb(100, 82, 184)', fontWeight:'bold'}}>ZIM</span>LANCER</span></NavbarBrand>
            <span className="navsearch">
            <input type="text"  name="search" id="search"  placeholder="Search"  style={{color: 'rgba(0, 0, 0, 0.5)', display: 'inline-block', height:40,borderBottom:'1px solid',borderRight:'0px',borderLeft:'0px',borderTop:'0px ',outline:'none'}} />
            <button className="btn "  onClick={e=>this.onSubmit(e)} style={{backgroundColor:'white',outline:'none'}}><FaSearch style={{color:'#6552b8'}}/></button>
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
  
  export default NavBar;