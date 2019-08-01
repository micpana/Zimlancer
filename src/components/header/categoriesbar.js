import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
  import './categoriesbar.css'
  import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {UPLOAD_SERVICE} from '../graphql/MutationResolver';
import {GET_SUBCATEGORIES_BY_CATEGORY} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';



  class CategoriesBar extends Component{
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false,
        dropdownOpen: false,
        isOpen2: false,
        dropdownOpen2: false,
        isOpen3: false,
        dropdownOpen3: false,
        isOpen4: false,
        dropdownOpen4: false,
        isOpen5: false,
        dropdownOpen5: false,
        isOpen6: false,
        dropdownOpen6: false,
        isOpen7: false,
        dropdownOpen7: false,
        isOpen8: false,
        dropdownOpen8: false,
        subcategories: [],
        category: ""
      };
      this.dtoggle = this.dtoggle.bind(this);
      this.onMouseEnter = this.onMouseEnter.bind(this);
      this.onMouseLeave = this.onMouseLeave.bind(this);

      this.dtoggle2 = this.dtoggle2.bind(this);
      this.onMouseEnter2 = this.onMouseEnter2.bind(this);
      this.onMouseLeave2 = this.onMouseLeave2.bind(this);

      this.dtoggle3 = this.dtoggle3.bind(this);
      this.onMouseEnter3 = this.onMouseEnter3.bind(this);
      this.onMouseLeave3 = this.onMouseLeave3.bind(this);

      this.dtoggle4 = this.dtoggle4.bind(this);
      this.onMouseEnter4 = this.onMouseEnter4.bind(this);
      this.onMouseLeave4 = this.onMouseLeave4.bind(this);

      this.dtoggle5 = this.dtoggle5.bind(this);
      this.onMouseEnter5 = this.onMouseEnter5.bind(this);
      this.onMouseLeave5 = this.onMouseLeave5.bind(this);

      this.dtoggle6 = this.dtoggle6.bind(this);
      this.onMouseEnter6 = this.onMouseEnter6.bind(this);
      this.onMouseLeave6 = this.onMouseLeave6.bind(this);

      this.dtoggle7 = this.dtoggle7.bind(this);
      this.onMouseEnter7 = this.onMouseEnter7.bind(this);
      this.onMouseLeave7 = this.onMouseLeave7.bind(this);

      this.dtoggle8 = this.dtoggle8.bind(this);
      this.onMouseEnter8 = this.onMouseEnter8.bind(this);
      this.onMouseLeave8 = this.onMouseLeave8.bind(this);
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
  
    onMouseEnter(e) {
      if(e.target.id!=""){
        this.setState({category: e.target.id})
        axios.post(GRAPHQL_BASE_URL, {//////////get subcategories
          query: print(GET_SUBCATEGORIES_BY_CATEGORY), variables: {parentcategory: e.target.id}
      }).then((result) => {
          this.setState({subcategories: result.data.data.getSubCategoryByCategory});  
      }).catch(error => {
        console.log(error.response)
      });
      }else{
        axios.post(GRAPHQL_BASE_URL, {//////////get subcategories
          query: print(GET_SUBCATEGORIES_BY_CATEGORY), variables: {parentcategory: this.state.category}
      }).then((result) => {
          this.setState({subcategories: result.data.data.getSubCategoryByCategory});  
      }).catch(error => {
        console.log(error.response)
      });
      }
   
    this.setState({dropdownOpen: true});
    }
  
    onMouseLeave() {
      this.setState({dropdownOpen: false});
      this.setState({subcategories: []});  
    }

    dtoggle2() {
      this.setState(prevState => ({
        dropdownOpen2: !prevState.dropdownOpen2
      }));
    }
  
    onMouseEnter2(e) {
      if(e.target.id!=""){
        this.setState({category: e.target.id})
        axios.post(GRAPHQL_BASE_URL, {//////////get subcategories
          query: print(GET_SUBCATEGORIES_BY_CATEGORY), variables: {parentcategory: e.target.id}
      }).then((result) => {
          this.setState({subcategories: result.data.data.getSubCategoryByCategory});  
      }).catch(error => {
        console.log(error.response)
      });
      }else{
        axios.post(GRAPHQL_BASE_URL, {//////////get subcategories
          query: print(GET_SUBCATEGORIES_BY_CATEGORY), variables: {parentcategory: this.state.category}
      }).then((result) => {
          this.setState({subcategories: result.data.data.getSubCategoryByCategory});  
      }).catch(error => {
        console.log(error.response)
      });
      }
   
    this.setState({dropdownOpen2: true});
    }
  
    onMouseLeave2() {
      this.setState({dropdownOpen2: false});
      this.setState({subcategories: []});  
    }

    dtoggle3() {
      this.setState(prevState => ({
        dropdownOpen3: !prevState.dropdownOpen
      }));
    }
  
    onMouseEnter3(e) {
      if(e.target.id!=""){
        this.setState({category: e.target.id})
        axios.post(GRAPHQL_BASE_URL, {//////////get subcategories
          query: print(GET_SUBCATEGORIES_BY_CATEGORY), variables: {parentcategory: e.target.id}
      }).then((result) => {
          this.setState({subcategories: result.data.data.getSubCategoryByCategory});  
      }).catch(error => {
        console.log(error.response)
      });
      }else{
        axios.post(GRAPHQL_BASE_URL, {//////////get subcategories
          query: print(GET_SUBCATEGORIES_BY_CATEGORY), variables: {parentcategory: this.state.category}
      }).then((result) => {
          this.setState({subcategories: result.data.data.getSubCategoryByCategory});  
      }).catch(error => {
        console.log(error.response)
      });
      }
   
    this.setState({dropdownOpen3: true});
    }
  
    onMouseLeave3() {
      this.setState({dropdownOpen3: false});
      this.setState({subcategories: []});  
    }

    dtoggle4() {
      this.setState(prevState => ({
        dropdownOpen4: !prevState.dropdownOpen4
      }));
    }
  
    onMouseEnter4(e) {
      if(e.target.id!=""){
        this.setState({category: e.target.id})
        axios.post(GRAPHQL_BASE_URL, {//////////get subcategories
          query: print(GET_SUBCATEGORIES_BY_CATEGORY), variables: {parentcategory: e.target.id}
      }).then((result) => {
          this.setState({subcategories: result.data.data.getSubCategoryByCategory});  
      }).catch(error => {
        console.log(error.response)
      });
      }else{
        axios.post(GRAPHQL_BASE_URL, {//////////get subcategories
          query: print(GET_SUBCATEGORIES_BY_CATEGORY), variables: {parentcategory: this.state.category}
      }).then((result) => {
          this.setState({subcategories: result.data.data.getSubCategoryByCategory});  
      }).catch(error => {
        console.log(error.response)
      });
      }
   
    this.setState({dropdownOpen4: true});
    }
  
    onMouseLeave4() {
      this.setState({dropdownOpen4: false});
      this.setState({subcategories: []});  
    }

    dtoggle5() {
      this.setState(prevState => ({
        dropdownOpen5: !prevState.dropdownOpen5
      }));
    }
  
    onMouseEnter5(e) {
      if(e.target.id!=""){
        this.setState({category: e.target.id})
        axios.post(GRAPHQL_BASE_URL, {//////////get subcategories
          query: print(GET_SUBCATEGORIES_BY_CATEGORY), variables: {parentcategory: e.target.id}
      }).then((result) => {
          this.setState({subcategories: result.data.data.getSubCategoryByCategory});  
      }).catch(error => {
        console.log(error.response)
      });
      }else{
        axios.post(GRAPHQL_BASE_URL, {//////////get subcategories
          query: print(GET_SUBCATEGORIES_BY_CATEGORY), variables: {parentcategory: this.state.category}
      }).then((result) => {
          this.setState({subcategories: result.data.data.getSubCategoryByCategory});  
      }).catch(error => {
        console.log(error.response)
      });
      }
   
    this.setState({dropdownOpen5: true});
    }
  
    onMouseLeave5() {
      this.setState({dropdownOpen5: false});
      this.setState({subcategories: []});  
    }
    dtoggle6() {
      this.setState(prevState => ({
        dropdownOpen6: !prevState.dropdownOpen6
      }));
    }
  
    onMouseEnter6(e) {
      if(e.target.id!=""){
        this.setState({category: e.target.id})
        axios.post(GRAPHQL_BASE_URL, {//////////get subcategories
          query: print(GET_SUBCATEGORIES_BY_CATEGORY), variables: {parentcategory: e.target.id}
      }).then((result) => {
          this.setState({subcategories: result.data.data.getSubCategoryByCategory});  
      }).catch(error => {
        console.log(error.response)
      });
      }else{
        axios.post(GRAPHQL_BASE_URL, {//////////get subcategories
          query: print(GET_SUBCATEGORIES_BY_CATEGORY), variables: {parentcategory: this.state.category}
      }).then((result) => {
          this.setState({subcategories: result.data.data.getSubCategoryByCategory});  
      }).catch(error => {
        console.log(error.response)
      });
      }
   
    this.setState({dropdownOpen6: true});
    }
  
    onMouseLeave6() {
      this.setState({dropdownOpen6: false});
      this.setState({subcategories: []});  
    }
    dtoggle7() {
      this.setState(prevState => ({
        dropdownOpen7: !prevState.dropdownOpen7
      }));
    }
  
    onMouseEnter7(e) {
      if(e.target.id!=""){
        this.setState({category: e.target.id})
        axios.post(GRAPHQL_BASE_URL, {//////////get subcategories
          query: print(GET_SUBCATEGORIES_BY_CATEGORY), variables: {parentcategory: e.target.id}
      }).then((result) => {
          this.setState({subcategories: result.data.data.getSubCategoryByCategory});  
      }).catch(error => {
        console.log(error.response)
      });
      }else{
        axios.post(GRAPHQL_BASE_URL, {//////////get subcategories
          query: print(GET_SUBCATEGORIES_BY_CATEGORY), variables: {parentcategory: this.state.category}
      }).then((result) => {
          this.setState({subcategories: result.data.data.getSubCategoryByCategory});  
      }).catch(error => {
        console.log(error.response)
      });
      }
   
    this.setState({dropdownOpen7: true});
    }
  
    onMouseLeave7() {
      this.setState({dropdownOpen7: false});
      this.setState({subcategories: []});  
    }
    dtoggle8() {
      this.setState(prevState => ({
        dropdownOpen8: !prevState.dropdownOpen8
      }));
    }
  
    onMouseEnter8(e) {
      if(e.target.id!=""){
        this.setState({category: e.target.id})
        axios.post(GRAPHQL_BASE_URL, {//////////get subcategories
          query: print(GET_SUBCATEGORIES_BY_CATEGORY), variables: {parentcategory: e.target.id}
      }).then((result) => {
          this.setState({subcategories: result.data.data.getSubCategoryByCategory});  
      }).catch(error => {
        console.log(error.response)
      });
      }else{
        axios.post(GRAPHQL_BASE_URL, {//////////get subcategories
          query: print(GET_SUBCATEGORIES_BY_CATEGORY), variables: {parentcategory: this.state.category}
      }).then((result) => {
          this.setState({subcategories: result.data.data.getSubCategoryByCategory});  
      }).catch(error => {
        console.log(error.response)
      });
      }
   
    this.setState({dropdownOpen8: true});
    }
  
    onMouseLeave8() {
      this.setState({dropdownOpen8: false});
      this.setState({subcategories: []});  
    }
    render() {
      return (
        // <div className="catnav">
          <Navbar color="light" light expand="md" sticky="top">
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="categoriesnav" navbar>

              <Dropdown id="Graphics & Design" className="d-inline-block" onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.dtoggle}>
        <DropdownToggle id="Graphics & Design" href="/graphicsanddesign/" style={{backgroundColor:  'inherit', border: 'none', fontSize: '13px'}}>
        <NavItem id="Graphics & Design" className="item1">
                  <NavLink id="Graphics & Design" style={{color: 'black'}}>Graphics & Design</NavLink>
                </NavItem>
        </DropdownToggle>
        <DropdownMenu style={{marginTop: '95%'}}>
            {this.state.subcategories.map((subcategory, index) => 
           <DropdownItem key={subcategory.subcategory}  href={"/graphicsanddesign/"+ subcategory.subcategory}>
           <a style={{color: 'rgba(0, 0, 0, 0.5)'}}>{subcategory.subcategory}</a>
           </DropdownItem>)}
        </DropdownMenu>
      </Dropdown>

                <Dropdown id="Digital Marketing" className="d-inline-block" onMouseOver={this.onMouseEnter2} onMouseLeave={this.onMouseLeave2} isOpen={this.state.dropdownOpen2} toggle={this.dtoggle2}>
        <DropdownToggle id="Digital Marketing" href="/digitalmarketing/"  style={{backgroundColor:  'inherit', border: 'none', fontSize: '13px'}}>
        <NavItem id="Digital Marketing" className="item1">
                  <NavLink id="Digital Marketing" style={{color: 'black'}}>Digital Marketing</NavLink>
                </NavItem>
        </DropdownToggle>
        <DropdownMenu>
            {this.state.subcategories.map((subcategory, index) => 
           <DropdownItem key={subcategory.subcategory} href={"/digitalmarketing/"+ subcategory.subcategory}>
           <a style={{color: 'rgba(0, 0, 0, 0.5)'}}>{subcategory.subcategory}</a>
           </DropdownItem>)}
        </DropdownMenu>
      </Dropdown>
         
                <Dropdown id="Programming & Tech" className="d-inline-block" onMouseOver={this.onMouseEnter3} onMouseLeave={this.onMouseLeave3} isOpen={this.state.dropdownOpen3} toggle={this.dtoggle3}>
        <DropdownToggle id="Programming & Tech" href="/programmingandtech/"  style={{backgroundColor:  'inherit', border: 'none', fontSize: '13px'}}>
        <NavItem id="Programming & Tech" className="item1">
                  <NavLink id="Programming & Tech" style={{color: 'black'}}>Programming & Tech</NavLink>
                </NavItem>
        </DropdownToggle>
        <DropdownMenu>
            {this.state.subcategories.map((subcategory, index) => 
           <DropdownItem key={subcategory.subcategory} href={"/programmingandtech/"+ subcategory.subcategory}>
           <a style={{color: 'rgba(0, 0, 0, 0.5)'}}>{subcategory.subcategory}</a>
           </DropdownItem>)}
        </DropdownMenu>
      </Dropdown>
              
                <Dropdown id="Video & Animation" className="d-inline-block" onMouseOver={this.onMouseEnter4} onMouseLeave={this.onMouseLeave4} isOpen={this.state.dropdownOpen4} toggle={this.dtoggle4}>
        <DropdownToggle id="Video & Animation" href="/videoandanimation/" style={{backgroundColor:  'inherit', border: 'none', fontSize: '13px'}}>
        <NavItem id="Video & Animation" className="item1">
                  <NavLink id="Video & Animation" style={{color: 'black'}}>Video & Animation</NavLink>
                </NavItem>
        </DropdownToggle>
        <DropdownMenu>
            {this.state.subcategories.map((subcategory, index) => 
           <DropdownItem key={subcategory.subcategory} href={"/videoandanimation/"+ subcategory.subcategory}>
           <a style={{color: 'rgba(0, 0, 0, 0.5)'}}>{subcategory.subcategory}</a>
           </DropdownItem>)}
        </DropdownMenu>
      </Dropdown>
             
                <Dropdown id="Music & Audio" className="d-inline-block" onMouseOver={this.onMouseEnter5} onMouseLeave={this.onMouseLeave5} isOpen={this.state.dropdownOpen5} toggle={this.dtoggle5}>
        <DropdownToggle id="Music & Audio" href="/musicandaudio/" style={{backgroundColor:  'inherit', border: 'none', fontSize: '13px'}}>
        <NavItem id="Music & Audio" className="item1">
                  <NavLink id="Music & Audio" style={{color: 'black'}}>Music & Audio</NavLink>
                </NavItem>
        </DropdownToggle>
        <DropdownMenu>
            {this.state.subcategories.map((subcategory, index) => 
           <DropdownItem key={subcategory.subcategory} href={"/musicandaudio/"+ subcategory.subcategory}>
           <a style={{color: 'rgba(0, 0, 0, 0.5)'}}>{subcategory.subcategory}</a>
           </DropdownItem>)}
        </DropdownMenu>
      </Dropdown>
              
                <Dropdown id="Business" className="d-inline-block" onMouseOver={this.onMouseEnter6} onMouseLeave={this.onMouseLeave6} isOpen={this.state.dropdownOpen6} toggle={this.dtoggle6}>
        <DropdownToggle id="Business" href="/business/" style={{backgroundColor:  'inherit', border: 'none', fontSize: '13px'}}>
        <NavItem id="Business" className="item1">
                  <NavLink id="Business" style={{color: 'black'}}>Business</NavLink>
                </NavItem>
        </DropdownToggle>
        <DropdownMenu>
            {this.state.subcategories.map((subcategory, index) => 
           <DropdownItem key={subcategory.subcategory} href={"/business/"+ subcategory.subcategory}>
           <a style={{color: 'rgba(0, 0, 0, 0.5)'}}>{subcategory.subcategory}</a>
           </DropdownItem>)}
        </DropdownMenu>
      </Dropdown>
             
                <Dropdown id="Writing & Translation" className="d-inline-block" onMouseOver={this.onMouseEnter7} onMouseLeave={this.onMouseLeave7} isOpen={this.state.dropdownOpen7} toggle={this.dtoggle7}>
        <DropdownToggle id="Writing & Translation" href="/writingandtranslation/"  style={{backgroundColor:  'inherit', border: 'none', fontSize: '13px'}}>
        <NavItem id="Writing & Translation" className="item1">
                  <NavLink id="Writing & Translation" style={{color: 'black'}}>Writing & Translation</NavLink>
                </NavItem>
        </DropdownToggle>
        <DropdownMenu>
            {this.state.subcategories.map((subcategory, index) => 
           <DropdownItem key={subcategory.subcategory} href={"/writingandtranslation/"+ subcategory.subcategory}>
           <a style={{color: 'rgba(0, 0, 0, 0.5)'}}>{subcategory.subcategory}</a>
           </DropdownItem>)}
        </DropdownMenu>
      </Dropdown>

                <Dropdown id="Fun & Lifestyle" className="d-inline-block" onMouseOver={this.onMouseEnter8} onMouseLeave={this.onMouseLeave8} isOpen={this.state.dropdownOpen8} toggle={this.dtoggle8}>
        <DropdownToggle id="Fun & Lifestyle"  href="/funandlifestyle/" style={{backgroundColor:  'inherit', border: 'none', fontSize: '13px'}}>
        <NavItem id="Fun & Lifestyle" className="item1">
                  <NavLink id="Fun & Lifestyle" style={{color: 'black'}}>Fun & Lifestyle</NavLink>
                </NavItem>
        </DropdownToggle>
        <DropdownMenu>
            {this.state.subcategories.map((subcategory, index) => 
           <DropdownItem key={subcategory.subcategory} href={"/funandlifestyle/"+ subcategory.subcategory}>
           <a style={{color: 'rgba(0, 0, 0, 0.5)'}}>{subcategory.subcategory}</a>
           </DropdownItem>)}
        </DropdownMenu>
      </Dropdown>
              </Nav>
            </Collapse>
          </Navbar>
        // </div>
      );
    }

  };
  
  export default CategoriesBar;