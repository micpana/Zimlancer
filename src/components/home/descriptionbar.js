import React, { Component } from 'react';
import './descriptionbar.css';
import {Row, CardDeck, Col} from 'reactstrap';


  class DescriptionBar extends Component{
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
        <div>
        <Row>
        <Col >
            <h5 className="vl">
               <br/>Let Zimlancer be your go to when:
            </h5>
            </Col>
            <Col>
            <h6 className="vl">
               <br/>You have one off tasks you need done professionally
            </h6>
            </Col>
            <Col>
            <h6 className="vl">
            <br/>You need a team with specialized skills
            </h6>
            </Col>
            <Col>
            <h6 className="vl1">
            <br/>You need to expand your staff <br/>with a dedicated online team
            </h6>
            </Col>
        </Row>
        </div>
      );
    }

  };
  
  export default DescriptionBar;