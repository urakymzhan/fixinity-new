import React, { Component } from 'react'
import '../App.css';

class VIN extends Component {
    
    render() {
        return (
            <div className = 'names col'>
                <div  className = 'header'>VIN</div> 
                {this.props.data.map((card, ind) => {
                    return (
                        <div className = {'card'} key = {String(ind)}>
                            {card.vin}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default VIN;