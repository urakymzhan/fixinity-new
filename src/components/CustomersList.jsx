// this should have 

// 1. Status
// 2. Action (how deep we want to go. We can simply put icon)
//     1. Edit
//     2. Delete

// components

import React, { Component } from 'react';
import '../App.css';


// const hStyle = {
//     width: "100px",
//     // float: "left",
//     padding: "20px",
//     background: "red",
//     overflow: "hidden"
// }

// const bStyle = {
//     width: "100px",
//     // float: "left",
//     padding: "20px",
//     background: "orange",
//     overflow: "hidden"
// }

// const mainStyle = {
//     width: "60%",
//     minHeight: "300px",
//     background: "gray",
//     margin: "200px auto",
//     textAlign: "center"
// }

// const nestedStyle = {
//     width: "100%",
//     display: "flex",
//     // justifyContent: "space-around",
//     flexWrap: "no-wrap",
// }

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
            <div className="customers-list-wrapper">
                <div className="thead">
                    {this.getHeader()}
                </div>
                {
                this.props.data.map((row) => {
                const { id, name, phone, zip, vin, status, action } = row;  
                console.log(row);
                    return ( 
                            <div className="tbody">
                                <div>{id}</div>
                                <div>{name}</div>
                                <div>{phone}</div>
                                <div>{zip}</div>
                                <div>{vin}</div>
                                <div>{status}</div>
                                <div>{action}</div>
                            </div>
                    )   
                })
                }                    
        </div>
        )
    }
}

export default CustomerList;
