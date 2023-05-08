import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard/'; // Make sure to create a Dashboard component
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage/'; // Make sure to create a LoginPage component

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
