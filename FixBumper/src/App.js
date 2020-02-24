import React, { Component } from 'react';
import CustomersList from './components/CustomersList.jsx';
// import AddCustomer from './components/AddCustomer.jsx';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const data = [
  {id: 1, name: 'Azamat', phone: '5718894220', zip: '94330', vin: '5346543654641', status:'Active', action: ''},
  {id: 2, name: 'Kuttubek', phone: '5718894220', zip: '94330', vin: '5346543654641', status: 'Inactive', action: ''},
  {id: 3, name: 'Aibek', phone: '5718894220', zip: '94330', vin: '5346543654641', status: 'Progress', action: ''},
  {id: 4, name: 'Tolon', phone: '5718894220', zip: '94330', vin: '5346543654641', status: 'Active', action: ''},
  {id: 5, name: 'Kanat', phone: '5718894220', zip: '94330', vin: '5346543654641', status: 'Inactive', action: ''},
  {id: 6, name: 'Zamir', phone: '5718894220', zip: '94330', vin: '5346543654641', status: 'Active', action: ''},
  {id: 7, name: 'David', phone: '5718894220', zip: '94330', vin: '5346543654641', status: 'Inactive', action: ''}
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customers: []
    }
  }

  //  TODO: later i will get this data from api 
  componentDidMount = () => {
      if(data.length > 0) {
        this.setState({
          customers: data
        })
      }
  }

  render() {
    if(this.state.customers.length > 0 ) {
      return(
        <Router>
            <Switch >
                {/* <Route path="/add">
                    <AddCustomer />
                </Route> */}
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


