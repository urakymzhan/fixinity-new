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
            let headers = Object.keys(this.props.data[0]);
            //  console.log(headers);
            // slicing out id
            let headerExceptId = headers.slice(1);
            return headerExceptId.map((header, ind) => {
                return <div key={ind}>{header}</div>
            })
        }
    }

    render() {
        const { match, location, history } = this.props;
        let background =  location.state && location.state.background;
        console.log("background from Customers", background);
        console.log("location From CustomerList: " , location);
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
                        { background && <Route path="/add" children={<Modal />} /> }  
                    </Switch>                  
                </div>
                <div className="customers-list-wrapper">
                    <div className="thead">
                        {this.getHeader()}
                    </div>
                    {
                        this.props.data.map((row, ind) => {
                            // destruction
                            const { name, phone, zip, vin, status, action } = row;  
                            return ( 
                                <div className="tbody" key={ind}> 
                                    <div>{name}</div>
                                    <div>{phone}</div>
                                    <div>{zip}</div>
                                    <div>{vin}</div>
                                    <div><input id="status" type="submit" value={status} /></div>
                                    <div id="action">{action} <span><FontAwesomeIcon id="edit-customer" icon={faPencilAlt}/> </span> <span><FontAwesomeIcon id="delete-customer" icon={faTrash}/> </span></div>
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

function Modal() {
    let history = useHistory();
    // let { id } = useParams();
    console.log(history)
  
    let back = e => {
      e.stopPropagation();
      history.goBack();
    };
  
    return (  
      <div className="modal-bg" onClick={back}>
          {/* modal body */}
        <div className="modal">
            <div className="modal-body-wrapper">
                <div>
                    <button id="modal-header"type="button" >New Customer</button>
                </div>
                <div>
                    <input type="input" placeholder="Name" />
                    <input type="input" placeholder="Phone" />
                </div>
                <div>
                    <input type="input" placeholder="Email" />
                    <input type="input" placeholder="Vin" />
                </div>
                <div>
                    <input type="input" placeholder="Phone" />
                    <input type="input" placeholder="Address" />
                </div>
                <div>
                    <input type="input" placeholder="Zip Code" />
                    <span id="checkbox"> slider-icon | Active Customer </span>
                </div>
                <div className="add-cancel-row">
                    <button id="add" type="button" onClick={back}> Add</button>
                    <button id="cancel" type="button" onClick={back}> Cancel</button>
                </div>           
            </div>
        </div>
      </div>
    );
  }


export default withRouter(CustomersList);


// const AddCustomer = () => {
//     let location = useLocation();
//     let background =  location.state && location.state.background;
//     console.log(location);
//     console.log(background)
//         return (
//             <div>
//                 <Switch location={background || location}>
//                     <Route path="/" children={<Home />} />
//                 </Switch>
//             {background && <Route path="add" children={<Modal />} />}
//             </div>
//         )
// }

// function Home() {
//     let location = useLocation();
//     console.log("location From HOME: ", location)
  
//     return (
//         <div>
//           <Link
//             to={{
//               pathname: "/add",
//               // This is the trick! This link sets
//               // the `background` in location state.
//               state: { background: location }
//             }}
//           >
//               Open Modal
//           </Link>
//       </div>
//     );
//   }