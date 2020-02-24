import React, { Component } from 'react';
import axios from 'axios';
import CustomersList from './components/CustomersList.jsx';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customers: []
    }
  }
// for now backend is python. 
// Node is giving error
  componentDidMount(){
    axios.get('/api/customers') 
        .then(res => {
        const apibody = res.data;
        console.log(apibody)
        this.setState({
            customers: apibody,
        });
    })
    .catch(error => {
        console.log(error); 
    })
}

  render() {
    if(this.state.customers.length > 0 ) {
      return(
        <Router>
            <Switch >
                <Route path="/" >
                    <CustomersList data = {this.state.customers}/>
                </Route>
            </Switch>
        </Router>
      )
    } else {
      return <h1>Loading ...</h1>
    }
  }
}

export default App;


