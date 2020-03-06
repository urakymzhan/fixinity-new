// this should have 

// 1. Status
// 2. Action (depends how deep we want to go. We can simply put icon)
//     1. Edit
//     2. Delete


import React, { Component } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faHome, faPencilAlt, faTrash, faChevronRight, 
    faChevronLeft, faSortDown 
} from '@fortawesome/free-solid-svg-icons';
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
        const { match, location, history } = this.props;
        let background =  location.state && location.state.background;
        // console.log("background from Customers", background);
        // console.log("location From CustomerList: " , location);
        // console.log(history);
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
                        this.props.data.customers.map((row, ind) => {
                            // destruction
                            const { name, phone, zip, vin, status, action } = row;  

                            let id= this.props.data.customers[ind].id;

                            return ( 
                                <div className="tbody" key={ind}> 
                                    <div>{name}</div>
                                    <div>{phone}</div>
                                    <div>{zip}</div>
                                    <div>{vin}</div>
                                    <div>
                                        <input 
                                            id="status" 
                                            type="submit" 
                                            value={status} 
                                            onClick={() => this.props.onStatusChange(ind)}
                                        />
                                    </div>
                                    <div id="action"> {action}
                                    <Edit id={id}
                                            background={background} 
                                            location={location} 
                                            ind={ind}
                                            data={this.props.data}
                                            handleEditChange={this.props.handleEditChange} 
                                            editCustomer={this.props.editCustomer} />
                                        <span>
                                            <FontAwesomeIcon id="delete-customer" icon={faTrash}/> 
                                        </span>
                                    </div>  
                                </div>
                            )   
                        })

                    } 
                    <Pagination />                 
                </div>
            </div>
        )
    }
}

function Header() {
    return <div className="nav-header"><span className="fixinity-header"> Fixinity </span>
     | <span className="home-header"> <FontAwesomeIcon icon={faHome}/> </span> > <span className="customers-header"> Customers </span></div>
}

function Pagination() {
    return  <div className="pagination">
                <span> Rows per page</span>
                <span className="pag-dropdown"> 10 <FontAwesomeIcon icon={faSortDown}/></span>
                <span className="pag-start"> 1 </span> 
                -
                <span className="pag-end"> 10 </span>
                of 
                <span className="pag-total"> 68 </span>
                <span className="pag-left"> <FontAwesomeIcon icon={faChevronLeft}/> </span>
                <span className="pag-right"> <FontAwesomeIcon icon={faChevronRight}/> </span>
            </div>
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
    let { id, location, background, ind, handleEditChange, editCustomer, data } = props;
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
                    background && <Route path="/edit/:id" children={ < EditCustomerForm ind={ind} handleEditChange={handleEditChange} editCustomer={editCustomer} data={data}/> } /> 
                }  
            </Switch>           
        </span>  
    )
}

function EditCustomerForm (props) {
    let history = useHistory();
    const { id } = useParams();
    // console.log(id);
    let { ind, handleEditChange, data, editCustomer } = props;

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
                    <input type="input" placeholder="Name" name="name" onChange = {(e) => handleEditChange(e, id)} defaultValue={data.customers[id-1].name}/>
                    <input type="input" placeholder="Status" name="status" onChange = {(e) => handleEditChange(e, id)} defaultValue={data.customers[id-1].status}/>
                </div>
                <div>
                    <input type="input" placeholder="Email" name="email" onChange = {(e) => handleEditChange(e, id)} defaultValue={data.customers[id-1].email}/>
                    <input type="input" placeholder="Vin" name="vin" onChange = {(e) => handleEditChange(e, id)} defaultValue={data.customers[id-1].vin}/>
                </div>
                <div>
                    <input type="input" placeholder="Phone" name="phone" onChange = {(e) => handleEditChange(e, id)} defaultValue={data.customers[id-1].phone}/>
                    <input type="input" placeholder="Action" name="action" onChange = {(e) => handleEditChange(e, id)} defaultValue={data.customers[id-1].action} />
                </div>
                <div>
                    <input type="input" placeholder="Zip Code" name="zip" onChange = {(e) => handleEditChange(e, id)} defaultValue={data.customers[id-1].zip}/>
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

