import React, { Component } from 'react';
import './statisticsbar.css';
import {Row, CardDeck, Col} from 'reactstrap';
import {ALL_USERS, ALL_SERVICES, ALL_SERVICE_BIDS} from '../graphql/QueryResolver';
import {GRAPHQL_BASE_URL} from '../graphql/BaseUrlComponent';
import axios from 'axios';
import {print} from 'graphql';


  class StatisticsBar extends Component{
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false,
        users: [],
        services: [],
        bids: []
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    componentDidMount() {
      axios.post(GRAPHQL_BASE_URL, {
        query: print(ALL_USERS)
    }).then((result) => {
        this.setState({users: result.data.data.allUsers});

    }).catch(error => {
      console.log(error.response)
  });
  axios.post(GRAPHQL_BASE_URL, {
    query: print(ALL_SERVICES)
}).then((result) => {
    this.setState({services: result.data.data.allServices});

}).catch(error => {
  console.log(error.response)
});
axios.post(GRAPHQL_BASE_URL, {
  query: print(ALL_SERVICE_BIDS)
}).then((result) => {
  this.setState({bids: result.data.data.allServiceBids});

}).catch(error => {
console.log(error.response)
});
    };

    render() {
      return (
        <div className="statsbar">
        <Row>
            <Col>
        {/* stats1 */}
        <div className="chart">
<br/>
                        <div class="donut-chart-block block"> 
                    <div class="donut-chart">

      <div id="porcion1" class="recorte"><div class="quesito ios" data-rel="21"></div></div>
     <div id="porcion2" class="recorte"><div class="quesito mac" data-rel="39"></div></div>
     <div id="porcion3" class="recorte"><div class="quesito win" data-rel="31"></div></div>
     <div id="porcionFin" class="recorte"><div class="quesito linux" data-rel="9"></div></div>
                            <p class="center-date"><span className="numarea">{this.state.services.length}</span><br/><br/><span class="scnd-font-color">Services</span> <span className="numarea"></span></p>        
                    </div>
                </div>
                </div></Col>
                {/* stats2 */}
                <Col>
        <div className="chart">
<br/>
                        <div class="donut-chart-block block"> 
                    <div class="donut-chart">

      <div id="porcion1" class="recorte"><div class="quesito ios" data-rel="21"></div></div>
     <div id="porcion2" class="recorte"><div class="quesito mac" data-rel="39"></div></div>
     <div id="porcion3" class="recorte"><div class="quesito win" data-rel="31"></div></div>
     <div id="porcionFin" class="recorte"><div class="quesito linux" data-rel="9"></div></div>
                            <p class="center-date"><span className="numarea">{this.state.users.length}</span><br/><br/><span class="scnd-font-color">Users</span> <span className="numarea"></span></p>        
                    </div>
                </div>
                </div></Col>
                {/* stats3 */}<Col>
        <div className="chart">
<br/>
                        <div class="donut-chart-block block"> 
                    <div class="donut-chart">

      <div id="porcion1" class="recorte"><div class="quesito ios" data-rel="21"></div></div>
     <div id="porcion2" class="recorte"><div class="quesito mac" data-rel="39"></div></div>
     <div id="porcion3" class="recorte"><div class="quesito win" data-rel="31"></div></div>
     <div id="porcionFin" class="recorte"><div class="quesito linux" data-rel="9"></div></div>
                            <p class="center-date"><span className="numarea">{this.state.bids.length}</span><br/><br/><span class="scnd-font-color">Bids</span> <span className="numarea"></span></p>        
                    </div>
                </div>
                </div></Col>
                </Row>
        </div>
      );
    }

  };
  
  export default StatisticsBar;