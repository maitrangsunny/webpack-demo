import React, { Component } from 'react';
import './App.css';
import Menu from './../Menu/Menu';
import routes from '../../routers';
import { BrowserRouter as Router, HashRouter, Route, Switch } from 'react-router-dom';
class App extends Component {
	showContentMenu = (routes) => {
		var result = null;
		if(routes.length > 0) {
			result = routes.map((route,index)=>{
				return (<Route key={index} 
						exact={route.exact} 
						path = {route.path}
						component={route.main}/>
				)
			});
		}
		return <Switch>{result}</Switch>;
	}
 	render() {
		return (     
			<HashRouter>
				<div>
					<Menu/>
					<div className="container">				
						<div className="row">						
							{this.showContentMenu(routes)}
						</div>
					</div>
				</div>
			</HashRouter>
		);
  	}
}
export default App;
