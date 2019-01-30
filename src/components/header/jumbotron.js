import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import './jumbotron.css'

class Jumbotron1 extends Component{
  render(){
    return (
    <div>
      <Jumbotron>
        <h1 className="display-3">Expand your business horizon</h1>
        <p className="lead">Hire local talent to suit your business needs. Grow your business on Zimlancer.</p>
        <hr className="my-2" />
        <p>Find freelancers and businesses ready to get the job done</p>
        <p className="lead">
        <form className="jumbotronsearch" method="post">
  <input type="text" class="textbox" placeholder="Search e.g 'logo design' "/>
  <Button style={{backgroundColor:'#6552b8'}}>SEARCH</Button>
</form>
        
        </p>
      </Jumbotron>
    </div>
  );
};
}
export default Jumbotron1;