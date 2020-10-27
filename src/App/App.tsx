import React from 'react'
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { store } from '../state';
import { Contacts } from './Contacts'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/">
              <Contacts />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
