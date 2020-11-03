import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import ScrollToTop from './components/Helpers/ScrollToTop';
import NotFound from './components/Helpers/NotFound';

import NavBar from './components/navbar';
import Index from './components/IndexPage';
import SignUp from './components/SignUp';
import ManageAccount from './components/ManageAccount';
import BuildProfile from './components/BuildProfile';
import ViewProfile from './components/ViewProfile';
import ViewHelpers from './components/ViewHelpers';
import CreateListing from './components/CreateListing';
import CreateBooking from './components/CreateBooking';
import Listings from './components/Listings';
import Bookings from './components/Bookings';
import Contact from './components/Contact';

function App({store}){

  return (
    <div className="App">
      <Provider store={store}>
      <Router>
        <ScrollToTop>
          <NavBar />
          <div className="main" style={{width: '100vw'}}>

            <Switch>
              <Route exact path='/' component={Index} />
              <Route exact path='/signup' component={SignUp} />
              <Route exact path='/settings' component={ManageAccount} />
              <Route exact path='/buildprofile' component={BuildProfile} />
              <Route exact path='/profile' component={ViewProfile} />
              <Route exact path='/profile/:id' component={ViewProfile} />
              <Route exact path='/helpers' component={ViewHelpers} />
              <Route exact path='/listings' component={Listings} />
              <Route exact path='/listings/new' component={CreateListing} />
              <Route exact path='/bookings' component={Bookings} />
              <Route exact path='/bookings/new' component={CreateBooking} />
              <Route exact path='/contact' component={Contact} />

              <Route component={NotFound} />
            </Switch>

          </div>
        </ScrollToTop>

      </Router>
      </Provider>
    </div>
  );
}

export default App;
