import React, { Component } from 'react';
import Pagination from './Pagination.jsx';
import Header from './Header.jsx';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faHome, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
    Switch,
    Route,
    Link,
    useHistory,
    useLocation,
    useParams
  } from "react-router-dom";
  import { withRouter } from "react-router";



class CustomersList extends Component {


    getHeader = () => {
        if(this.props.data) {
            // let headers = Object.keys(this.props.data.customers[0]);
            // console.log(headers);
            // slicing out id
            // let removedID = headers.splice(1, 1);
            // console.log(headers);
    // TODO: somehow API returning in different order : TODO
            // let first = headers.shift();
            // headers.push(first);
            // console.log(headers);
            let headers = ["name", "phone", "zip", "vin", "status", "action"];
            return headers.map((header, ind) => {
                return <div key={ind}>{header}</div>
            })
        }
    }

    render() {
        const { match, location, history, updateVals } = this.props;
        let background =  location.state && location.state.background;
        // console.log("background from Customers", background);
        // console.log("location From CustomerList: " , location);
        // console.log(history);

        // for pagination
        let { start, end, perPageValue } = this.props.data;
        let paginatedData = this.props.data.customers.slice(start-1, end);
        console.log("paginatedData outside ", paginatedData);
        if (paginatedData.length == 0) {
            paginatedData =  updateVals(this.props.data.customers);
            // start = start - perPageValue
            // end = end - perPageValue;
            // paginatedData = this.props.data.customers.slice(start-1, end);
            console.log("paginatedData inside ", paginatedData);
        }
       
        return (
            <div className="customers-page">
                < Header />
                <div className="add-customer">
                    <Link
                        to={{
                            pathname: "/add",
                            // Beware tricky! This link sets the `background` in location state (from CustomerList).
                            state: { background: location }
                            }}
                        >
                            Add New Customer
                        </Link>
                    <Switch>
                        { background && <Route path="/add" children={<AddCustomerForm data={this.props.data} 
                                                                            handleChange={this.props.handleChange}
                                                                            addNewCustomer ={this.props.addNewCustomer} />  } /> 
                        }  
                    </Switch>                  
                </div>
                <div className="customers-list-wrapper">
                    <div className="thead">
                        {this.getHeader()}
                    </div>
                    {
                        paginatedData.map((row ) => {
                            // destruction
                            const { name, phone, zip, vin, status, action, id } = row;  
                            return ( 
                                <div className="tbody" key={id}> 
                                    <div>{name}</div>
                                    <div>{phone}</div>
                                    <div>{zip}</div>
                                    <div>{vin}</div>
                                    <div>
                                        <input 
                                            id="status" 
                                            type="submit" 
                                            value={status} 
                                            onClick={() => this.props.onStatusChange(id)}
                                        />
                                    </div>
                                    <div id="action"> {action}
                                    <Edit 
                                            id={id}
                                            background={background} 
                                            location={location} 
                                            data={this.props.data}
                                            handleEditChange={this.props.handleEditChange} 
                                            editCustomer={this.props.editCustomer} />
                                        <span>
                                            <FontAwesomeIcon id="delete-customer" icon={faTrash} 
                                            onClick={() => this.props.deleteCustomer(id)}
                                            /> 
                                        </span>
                                    </div>  
                                </div>
                            )   
                        })

                    } 
                    <Pagination 
                      data = {this.props.data}
                      next = {this.props.next}
                      handlePerPageValue={this.props.handlePerPageValue}
                    />                 
                </div>
            </div>
        )
    }
}

function AddCustomerForm (props) {
    let history = useHistory();
    // console.log(history);
    // console.log(props);
  
    let back = e => {
      e.stopPropagation();

      history.goBack();
    };

    return (  
      <div className="modal-bg">
          {/* modal body */}
        <div className="modal">
            <div className="modal-body-wrapper">
                <div>
                    <button id="modal-header"type="button" >New Customer</button>
                </div>
                {/* for now status is required to be Active || Inactive || Progress. And action is disabled. Becuase it should always be empty in our case */}
                <div>
                    <input type="input" placeholder="Name" name="name" onChange = {props.handleChange}/>
                    <input type="input" placeholder="Status" name="status" onChange = {props.handleChange} />
                </div>
                <div>
                    <input type="input" placeholder="Email" name="email" onChange = {props.handleChange}/>
                    <input type="input" placeholder="Vin" name="vin" onChange = {props.handleChange}/>
                </div>
                <div>
                    <input type="input" placeholder="Phone" name="phone" onChange = {props.handleChange}/>
                    <input type="input" placeholder="Action" name="action" onChange = {props.handleChange} disabled />
                </div>
                <div>
                    <input type="input" placeholder="Zip Code" name="zip" onChange = {props.handleChange}/>
                    <span id="checkbox"> slider-icon | Active Customer </span>
                </div>
                <div className="add-cancel-row">
                    <button id="add" type="button" onClick={(e) => { props.addNewCustomer(); back(e)}}> Add</button>
                    <button id="cancel" type="button" onClick={back}> Cancel</button>
                </div>           
            </div>
        </div>
      </div>
    );
}

function Edit(props) {
    let { id, location, background, handleEditChange, editCustomer, data } = props;
    return (
        <span>      
            <Link
                to={{
                    pathname: `/edit/${id}`,
                    // Beware tricky! This link sets the `background` in location state (from CustomerList).
                    state: { background: location }
                    }}
                >
                    <FontAwesomeIcon id="edit-customer" icon={faPencilAlt}/>
            </Link>
            <Switch>
                { 
                    background && <Route path="/edit/:id" children={ < EditCustomerForm handleEditChange={handleEditChange} editCustomer={editCustomer} data={data}/> } /> 
                }  
            </Switch>           
        </span>  
    )
}

function EditCustomerForm (props) {
    let history = useHistory();
    const { id } = useParams();
    // console.log(id);
    let { handleEditChange, data, editCustomer } = props;

    var defaultVal  = {};
    data.customers.map((customer) => {
        if(customer.id == id) {
            defaultVal = customer;
        }
    })
    // console.log("defaultVal: ", defaultVal)

    let back = e => {
      e.stopPropagation();

      history.goBack();
    };

    return (  
      <div className="modal-bg">
          {/* modal body */}
        <div className="modal">
            <div className="modal-body-wrapper">
                <div>
                    <button id="modal-header"type="button" >Edit Customer</button>
                </div>
                <div>
                    {/*  TODO: figure out better way than id-1 */}
                    <input type="input" placeholder="Name" name="name" onChange = {(e) => handleEditChange(e, id)} defaultValue={defaultVal.name}/>
                    <input type="input" placeholder="Status" name="status" onChange = {(e) => handleEditChange(e, id)} defaultValue={defaultVal.status}/>
                </div>
                <div>
                    <input type="input" placeholder="Email" name="email" onChange = {(e) => handleEditChange(e, id)} defaultValue={defaultVal.email}/>
                    <input type="input" placeholder="Vin" name="vin" onChange = {(e) => handleEditChange(e, id)} defaultValue={defaultVal.vin}/>
                </div>
                <div>
                    <input type="input" placeholder="Phone" name="phone" onChange = {(e) => handleEditChange(e, id)} defaultValue={defaultVal.phone}/>
                    <input type="input" placeholder="Action" name="action" onChange = {(e) => handleEditChange(e, id)} defaultValue={defaultVal.action} />
                </div>
                <div>
                    <input type="input" placeholder="Zip Code" name="zip" onChange = {(e) => handleEditChange(e, id)} defaultValue={defaultVal.zip}/>
                    <span id="checkbox"> slider-icon | Active Customer </span>
                </div>
                <div className="add-cancel-row">
                    <button id="add" type="button" onClick={(e) => { editCustomer(id); back(e)}} > Submit</button>
                    <button id="cancel" type="button" onClick={back}> Cancel</button>
                </div>   
            </div>
        </div>
      </div>
    );
  }


export default withRouter(CustomersList);

