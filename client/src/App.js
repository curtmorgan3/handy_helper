import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import ScrollToTop from './components/Helpers/ScrollToTop';
import NotFound from './components/Helpers/NotFound';

import NavBar from './components/navbar';
import Index from './components/indexPage';
import SignUp from './components/SignUp';
import Settings from './components/Settings';
import BuildProfile from './components/buildProfilePage';

function App({store}){

  return (
    <div className="App">
      <Provider store={store}>
      <Router>
        <ScrollToTop>
          <NavBar />
          <div className="main">

            <Switch>
              <Route exact path='/' component={Index} />
              <Route exact path='/signup' component={SignUp} />
              <Route exact path='/settings' component={Settings} />
              <Route exact path='/buildprofile' component={BuildProfile} />

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
