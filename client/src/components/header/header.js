import React, {Component} from 'react';
import Navbar from './navbar'
import Categoriesbar from './categoriesbar'

class Header extends Component {
    render() {
        return (
          <div>
         <Navbar/>
      <Categoriesbar/>
                   
          </div>
        );
      }

}

export default Header;



