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
      currentIndex: 0,
      currentPage: 1,
      start: 1,
      end: 5,
      perPageValue: 5,
      // will add later
      arrowColor: ""
    }
  }
// currently backend is python. 
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

onStatusChange = (id) => {
  const allCustomers = this.state.customers;
  allCustomers.map((customer) => {
    if (customer.id == id) {
      if (customer.status==='Active') {
        customer.status='Progress'
      } else if(customer.status==='Progress') {
        customer.status='Inactive'
      } else {
        customer.status='Active'
      }
    }
    this.setState({[this.state.customers]: allCustomers})
  })
}
// combine this below 2 functions
handleChange = (e) => {
  let tmpCustomer = this.state.newCustomer;
  tmpCustomer[e.target.name] = e.target.value;
  this.setState({ newCustomer: tmpCustomer })
}
handleEditChange = (e, id) => {
  // console.log(id)
  let newCustomer = this.state.newCustomer;
  console.log("newCustomer", newCustomer);
  newCustomer[e.target.name] = e.target.value;
  this.setState({ newCustomer: newCustomer })
}
addNewCustomer = () => {
  const allCustomers = this.state.customers;
  const tmpCustomer = this.state.newCustomer;
  // TODO: figure out better way 
  tmpCustomer.id = allCustomers.length + 1;
  if (Object.entries(tmpCustomer).length !== 0) {
    allCustomers.push(tmpCustomer);
  }
  this.setState({ newCustomer: {} })
}

editCustomer = (id) => {
  const allCustomers = this.state.customers;
  const newCustomer = this.state.newCustomer;
  allCustomers.map((customer) => {
      if (Object.entries(newCustomer).length !== 0) {
        // id is string, customer.id is number of type
        if (customer.id == id) {
          for (let key of Object.keys(newCustomer)) {
            customer[key] = newCustomer[key]
            console.log("newCustomer: ", newCustomer)
            let indexToEdit = allCustomers.indexOf(customer);
            console.log(indexToEdit);
            allCustomers[indexToEdit] = customer;
            this.setState({customers: allCustomers})
          }
        }
      }
      this.setState({ newCustomer: {} })
  })
}
deleteCustomer = (id) => {
  const allCustomers = this.state.customers;
  var indexToDeleteArray = allCustomers.map((customer) => {
    // id is string, customer.id is number of type
    if (customer.id == id) {
      return allCustomers.indexOf(customer);
    }
  })
  indexToDeleteArray.forEach((indexToDelete) => {
    if(indexToDelete !== undefined ) {
      allCustomers.splice(indexToDelete, 1);
      this.setState({ customers: allCustomers })
    }
  })
}

// pagination
next = (arrow) => {
  let start = this.state.start;
  let end = this.state.end;
  let total = this.state.customers.length;

  let perPageValue = this.state.perPageValue;

  if ( arrow === "right" && end < total) {
    this.setState({
      start: start + perPageValue,
      end: end + perPageValue
    })
  } else if (arrow === "left" && end > perPageValue){
    this.setState({
      start: start - perPageValue,
      end: end - perPageValue
    })
  }
  // console.log("start", start);
  // console.log("end", end);
}

handlePerPageValue = (e) => {
  let newValue = Number(e.target.value);
  // console.log(e.target.value)
  // console.log(this.state.perPageValue);
  this.setState({
    perPageValue: newValue,
    end: newValue,
    start: 1
  })
}

updateVals = (data) => {
  console.log("data", data);
  let start = this.state.start; 
  let end = this.state.end; 
  let perPageValue = this.state.perPageValue;
  start = start - perPageValue;
  end = end - perPageValue;
  console.log(start);
  console.log(end)
  let paginatedData = data.slice(start-1, end);
  this.setState ( {
    start: start,
    end: end
  })
  return paginatedData;

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
                      next={this.next}
                      handlePerPageValue={this.handlePerPageValue}
                      deleteCustomer={this.deleteCustomer}
                      updateVals={this.updateVals}
                    />
                </Route>
            </Switch>
        </Router>
      )
    } else {
      return <h1 style={{textAlign: "center", marginTop: "100px"}}>Loading ...</h1>
    }
  }
}

export default App;


