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


class CustomerList extends Component {


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
        return (
            <div className="customers-page">
                < Header />
                <div className="add-customer"><button>Add New Customer</button></div>
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

export default CustomerList;
