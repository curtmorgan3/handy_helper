import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import ScrollToTop from './components/Helpers/ScrollToTop';
import NotFound from './components/Helpers/NotFound';

import NavBar from './components/navbar';
import Index from './components/indexPage';
import SignUp from './components/SignUp';
import Settings from './components/Settings';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Router>
          <ScrollToTop>
            <NavBar />
            <div className="main">
  
              <Switch>
                <Route exact path='/' component={Index} />
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/settings' component={Settings} />
  
                <Route component={NotFound} />
              </Switch>
  
            </div>
          </ScrollToTop>
  
        </Router>
      </div>
    );
  }
}

export default App;
