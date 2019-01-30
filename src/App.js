import React, { Component } from 'react';
import './App.css';
import Home from './components/home/home';
import Header from './components/header/header'
import Footer from './components/footer/footer'
import Graphics from './components/categorieslandingpages/graphicsanddesign'
import Digital from './components/categorieslandingpages/digitalmarketing'
import Programming from './components/categorieslandingpages/programmingandtech'
import Video from './components/categorieslandingpages/videoandanimation'
import Music from './components/categorieslandingpages/musicandaudio'
import Business from './components/categorieslandingpages/business'
import Fun from './components/categorieslandingpages/funandlifestyle'
import Writing from './components/categorieslandingpages/writingandtranslation'
import Services from './components/listings/serviceslist'
import ViewService from './components/listings/viewservice'
import Profile from './components/user/profile'
import Upload from './components/user/uploadservice'
import Registration from './components/user/registration'
import Login from './components/user/login'
import PostBid from './components/user/bidvalidatelogin'
import Messages from './components/user/messages'


import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Header/>
      <BrowserRouter>
                    <Switch>
                        <Route path='/' exact={true} component={Home}/>
                        <Route path='/graphicsanddesign/' exact={true} component={Graphics}/>
                        <Route path='/digitalmarketing/' exact={true} component={Digital}/>
                        <Route path='/programmingandtech/' exact={true} component={Programming}/>
                        <Route path='/videoandanimation/' exact={true} component={Video}/>
                        <Route path='/musicandaudio/' exact={true} component={Music}/>
                        <Route path='/business/' exact={true} component={Business}/>
                        <Route path='/funandlifestyle/' exact={true} component={Fun}/>
                        <Route path='/writingandtranslation/' exact={true} component={Writing}/>
                        <Route path='/graphicsanddesign/:subcategory' exact={true} component={Services}/>
                        <Route path='/digitalmarketing/:subcategory' exact={true} component={Services}/>
                        <Route path='/programmingandtech/:subcategory' exact={true} component={Services}/>
                        <Route path='/videoandanimation/:subcategory' exact={true} component={Services}/>
                        <Route path='/musicandaudio/:subcategory' exact={true} component={Services}/>
                        <Route path='/business/:subcategory' exact={true} component={Services}/>
                        <Route path='/funandlifestyle/:subcategory' exact={true} component={Services}/>
                        <Route path='/writingandtranslation/:subcategory' exact={true} component={Services}/>
                        <Route path='/:maincategory/:subcategory/:serviceid' exact={true} component={ViewService}/>
                        <Route path='/profile/:userid' exact={true} component={Profile}/>
                        <Route path='/upload/' exact={true} component={Upload}/>
                        <Route path='/registration/' exact={true} component={Registration}/>
                        <Route path='/login/' exact={true} component={Login}/>
                        <Route path='/postbid/' exact={true} component={PostBid}/>
                        <Route path='/messages/' exact={true} component={Messages}/>


                


                    </Switch>
                </BrowserRouter>
      <Footer/>
               

      </div>
    );
  }
}

export default App;
