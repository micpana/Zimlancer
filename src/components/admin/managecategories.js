import React, { Component } from 'react';
import '../categorieslandingpages/graphicsanddesign.css';
import {Row, CardDeck, Col,  Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardGroup, Container, Table} from 'reactstrap';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import {GET_ALL_CATEGORIES, GET_SUBCATEGORIES_BY_CATEGORY} from '../graphql/QueryResolver';
import axios from 'axios';
import {print} from 'graphql';
import { runInThisContext } from 'vm';
import { BACKEND_URL } from '../backendurl';
import AddCategory from './addcategory';
import SubCategory from './addsubcategory'
import AddSubCategory from './addsubcategory';

  class ManageCategories extends Component{
    constructor(props) {
      super(props);
  
      this.state = {
allCategories: [],
subCategories: [],
parentcategory: ""
    };
    this.loadSubcategories = this.loadSubcategories.bind(this);

    }

    componentDidMount() {
         ///////get all categories
         axios.post(GRAPHQL_BASE_URL, {
            query: print(GET_ALL_CATEGORIES)
        }).then((result) => {
            this.setState({allCategories: result.data.data.allCategories});
        
        }).catch(error => {
          console.log(error.response)
        });
  }

  loadSubcategories(e) {
    axios.post(GRAPHQL_BASE_URL, {//////////get subcategories
      query: print(GET_SUBCATEGORIES_BY_CATEGORY), variables: {parentcategory: e.target.id}
  }).then((result) => {
      this.setState({subCategories: result.data.data.getSubCategoryByCategory});  
  }).catch(error => {
    console.log(error.response)
  });
  this.setState({parentcategory: e.target.id})
  }

    render() {
        const Categories = this.state.allCategories.map(category => {
            return <tr>
              <td style={{whiteSpace: 'nowrap'}}>
              <Row>
              <Col>{category.category}</Col>            
              <Col><Button id={category.category} onClick={this.loadSubcategories} style={{backgroundColor: 'inherit', border: 'none', color: 'rebeccapurple'}}>View SubCategories</Button></Col>
              </Row>
</td>
            </tr>
          });
          const SubCategories = this.state.subCategories.map(subcategory => {
            return <tr>
              <td style={{whiteSpace: 'nowrap'}}>{subcategory.subcategory}</td>
            </tr>
          });


      return (
        <div>
                                 <h6>Manage Categories</h6>
                                 <br/>
                                 <Container>
<Row>
    <Col style={{maxHeight: '350px',minHeight: '350px', overflowY: 'scroll'}}>
    <Table className="mt-4">
            <thead>
            <tr>
        
              <th width="100%"  style={{color: 'rebeccapurple'}}>
              <Row>
<Col>
Category
</Col>
<Col>
<AddCategory/>
</Col>
              </Row>
              </th>
            </tr>
            </thead>
            <tbody>
            {Categories}
            </tbody>
          </Table>
    </Col>
    <Col style={{maxHeight: '350px',minHeight: '350px', overflowY: 'scroll'}}>
    <Table className="mt-4">
            <thead>
            <tr>
        
              <th width="100%"  style={{color: 'rebeccapurple'}}>
              <Row>
                <Col>
                SubCategories
                </Col>
                <Col>
                <AddSubCategory parentcategory={this.state.parentcategory}/>
                </Col>
              </Row>
              </th>
            </tr>
            </thead>
            <tbody>
            {SubCategories}
            </tbody>
          </Table>
    </Col>
</Row>
</Container>
        </div>
      );
    }

  };
  
  export default ManageCategories;