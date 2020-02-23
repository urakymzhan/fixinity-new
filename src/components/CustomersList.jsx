// this should have 

// 1. Status
// 2. Action (how deep we want to go. We can simply put icon)
//     1. Edit
//     2. Delete

// components

import React, { Component } from 'react';
import '../App.css';


class CustomerList extends Component {


    getHeader = () => {
        if(this.props.data) {
            let headers = Object.keys(this.props.data[0]);
            //  console.log(headers);
            return headers.map((header) => {
                return <div>{header}</div>
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
                        this.props.data.map((row) => {
                            // destruction
                        const { id, name, phone, zip, vin, status, action } = row;  
                            return ( 
                                <div className="tbody">
                                    <div>{id}</div>
                                    <div>{name}</div>
                                    <div>{phone}</div>
                                    <div>{zip}</div>
                                    <div>{vin}</div>
                                    <div>{status}</div>
                                    <div>{action} <span>edit</span> | <span>delete</span></div>
                                </div>
                            )   
                        })
                    }                    
                </div>
            </div>
        )
    }
}

function Header() {
    return <div className="nav-header"><span className="fixinity-header"> Fixinity </span>
     | <span className="home-header"> HOME </span> > <span className="customers-header"> Customers </span></div>
}
export default CustomerList;
