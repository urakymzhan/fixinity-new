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
      customers: [],
      newCustomer: {},
      currentIndex: 0
    }
  }
// for now backend is python. 
// Node is giving an error
  componentDidMount() {
    axios.get('/api/customers') 
        .then(res => {
        const apibody = res.data;
        // console.log(apibody)
        this.setState({
            customers: apibody,
        });
    })
    .catch(error => {
        console.log(error); 
    })
}

onStatusChange = (ind) => {
  const data=this.state.customers;
  if (data[ind].status==='Active') {
      data[ind].status='Progress'
  } else if(data[ind].status==='Progress') {
      data[ind].status='Inactive'
  } else {
      data[ind].status='Active'
  }
  this.setState({[this.state.customers]: data})
}
// combine this below 2 functions
handleChange = (e) => {
  let tmpCustomer = this.state.newCustomer;
  tmpCustomer[e.target.name] = e.target.value;
  this.setState({ newCustomer: tmpCustomer })
}
handleEditChange = (e, id) => {
  // console.log(id)
  let tmpCustomer = this.state.newCustomer;
  tmpCustomer[e.target.name] = e.target.value;
  this.setState({ newCustomer: tmpCustomer })
}
addNewCustomer = () => {
  const allCustomers = this.state.customers;
  const tmpCustomer = this.state.newCustomer;
  // TODO: figure out better way than adding id here
  tmpCustomer.id = allCustomers.length + 1
  if (Object.entries(tmpCustomer).length !== 0) {
    allCustomers.push(tmpCustomer);
  }
  console.group(allCustomers);
  this.setState({ newCustomer: {} })
}

editCustomer = (id) => {
  const allCustomers = this.state.customers;
  const theCurrentUser = this.state.customers[id-1];
  const tmpCustomer = this.state.newCustomer;
  if (Object.entries(tmpCustomer).length !== 0) {
    for (let key of Object.keys(tmpCustomer)) {
      theCurrentUser[key] = tmpCustomer[key];
      allCustomers[id-1] = theCurrentUser;
      this.setState({customers: allCustomers})
    }
  }
  this.setState({ newCustomer: {} })
}

  render() {
    if(this.state.customers.length > 0 ) {
      return(
        <Router>
            <Switch >
                <Route path="/" >
                    <CustomersList 
                      data={this.state}
                      onStatusChange={this.onStatusChange}
                      handleChange={this.handleChange}
                      addNewCustomer={this.addNewCustomer}
                      editCustomer={this.editCustomer}
                      handleEditChange={this.handleEditChange}
                    />
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


