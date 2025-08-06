import React, { Component } from 'react';
import './paymentssafetybar.css';
import {Row, CardDeck, Col} from 'reactstrap';

  class PaymentsSafetyBar extends Component{
    constructor(props) {
      super(props);
  
      this.state = {

      };
    }
   
    render() {
      return (
        <div className="paymentssafetybar">
        <h2 className="payheading">Buyer & Seller safety</h2>
        <h6 className="subheading">Get work done with confidence</h6>
        <Row className="payrow">
            <Col>
<h5 className="paytitle">Guarenteed Payment Protection</h5>
<span className="paydescr">Payment is released to the freelancer after the job has been completed and you approve the work you get.</span>
            </Col>
            <Col>
            <h5 className="paytitle">Know The Price Upfront</h5>
            <span className="paydescr">Find any service you want within minutes and know the exact amount you’ll pay. No hourly rates, just a fixed price.</span>

            </Col>
            <Col>
            <h5 className="paytitle">Pay for bids after you find a winner</h5>
            <span className="paydescr">Only pay for you bids after you find a freelancer with a profile you're pleased with and with the skills that suit your needs.</span>

            </Col>
        </Row>
        </div>
      );
    }

  };
  
  export default PaymentsSafetyBar;