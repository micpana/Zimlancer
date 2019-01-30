import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, Button } from 'reactstrap';
  import './categoriesbar.css'



  class CategoriesBar extends Component{
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render() {
      return (
        <div className="catnav">
          <Navbar color="light" light expand="md" >
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="categoriesnav" navbar>
                <NavItem className="item1">
                  <NavLink style={{color: 'black'}} href="/graphicsanddesign/">Graphics & Design</NavLink>
                </NavItem>
                <NavItem className="item">
                  <NavLink style={{color: 'black'}} href="/digitalmarketing/">Digital Marketing</NavLink>
                </NavItem>
                <NavItem className="item"> 
                  <NavLink style={{color: 'black'}} href="/programmingandtech/">Programming & Tech</NavLink>
                </NavItem>
                <NavItem className="item">
                  <NavLink style={{color: 'black'}} href="/videoandanimation/">Video & Animation</NavLink>
                </NavItem>
                <NavItem className="item">
                  <NavLink style={{color: 'black'}} href="/musicandaudio/">Music & Audio</NavLink>
                </NavItem>
                <NavItem className="item">
                  <NavLink style={{color: 'black'}} href="/business/">Business</NavLink>
                </NavItem>
                <NavItem className="item">
                  <NavLink style={{color: 'black'}} href="/writingandtranslation/">Writing & Translation</NavLink>
                </NavItem>
                <NavItem className="item">
                  <NavLink style={{color: 'black'}} href="/funandlifestyle/">Fun & Lifestyle</NavLink>
                </NavItem>
                
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }

  };
  
  export default CategoriesBar;