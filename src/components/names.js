import React, { Component } from 'react'
import '../App.css';

class Name extends Component {
    
    render() {
        return (
            <div className = 'names col'>
                <div  className = 'header'>Name</div> 
                {this.props.data.map((card, ind) => {
                    return (
                        <div className = {'card'} key = {String(ind)}>
                            {card.name}
                        </div>  
                    )
                })}
            </div>
        )
    }
}

export default Name;