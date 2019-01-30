import React, {Component} from 'react';
import Descriptionbar from './descriptionbar'
import Homepagecategories from './homepagecategories'
import Paymentssafetybar from './paymentssafetybar'
import Howitworks from './howitworks'
import Jumbotron from '../header/jumbotron'
import Statisticsbar from '../header/statisticsbar'

class Home extends Component {
    render() {
//       //reload page once
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
        return (
          <div>
                 <Jumbotron/>
      <Statisticsbar/>
          <Descriptionbar/>
          <Homepagecategories/>
          <Paymentssafetybar/>
          <Howitworks/>
                   
          </div>
        );
      }

}

export default Home;



