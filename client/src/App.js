import React from 'react';
import NavBar from './components/navbar';
import Index from './components/indexPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="main">
        <Index />
      </div>
    </div>
  );
}

export default App;
