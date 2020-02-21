// this should have 

// 1. Status
// 2. Action (how deep we want to go. We can simply put icon)
//     1. Edit
//     2. Delete

// components

import React, { Component } from 'react';
import '../App.css';


const hStyle = {
    width: "12%",
    float: "left",
    padding: "10px",
    background: "red",
    overflow: "hidden"
}

const bStyle = {
    width: "12%",
    float: "left",
    padding: "10px",
    background: "orange",
}

const mainStyle = {
    width: "60%",
    height: "300px",
    background: "gray",
    margin: "200px auto",
    textAlign: "center"
}

const nestedStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    clear: "both"
}

class CustomerList extends Component {


    getHeader = () => {
        if(this.props.data) {
            let headers = Object.keys(this.props.data[0]);
             console.log(headers);
            return headers.map((header) => {
                return <div style={hStyle}>{header}</div>
            })
        }
    }

    render() {
        return (
            <div className="customers-list-wrapper" style={mainStyle}>
                <div className="head" style={nestedStyle}>
                    {this.getHeader()}
                </div>
                {
                this.props.data.map((row) => {
                const { id, name, phone, zip, vin, status, action } = row;  
                    return ( 
                            <div className="body" style={nestedStyle}>
                                <div style={bStyle} >{id}</div>
                                <div style={bStyle}>{name}</div>
                                <div style={bStyle}>{phone}</div>
                                <div style={bStyle}>{zip}</div>
                                <div style={bStyle}>{vin}</div>
                                <div style={bStyle}>{status}</div>
                                <div style={bStyle}>{action}</div>
                            </div>
                    )   
                })
                }                    
        </div>
        )
    }
}

export default CustomerList;
