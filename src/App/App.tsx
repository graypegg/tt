import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Contact } from './Contact';
import { Contacts } from './Contacts'
import { hydrateContacts } from '../state/contacts';

import './App.css'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(hydrateContacts())
	}, [dispatch])

	return (
		<div className="app">
			<Router>
				<Switch>
					<Route path="/" exact>
						<Contacts />
					</Route>
					<Route path="/:id" exact>
						<Contact />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
