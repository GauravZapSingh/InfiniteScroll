import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './pages/Login';
import ContactList from './pages/ContactList';
import './App.css';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/users">
					<ContactList />
				</Route>
				<Route path="/">
					<Login />
				</Route>
			</Switch>
		</Router>
	)
}

export default App;
