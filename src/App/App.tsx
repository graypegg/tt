import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Contacts } from './Contacts'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <Contacts />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
