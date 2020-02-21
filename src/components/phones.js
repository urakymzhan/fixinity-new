import React, { Component } from 'react';
import '../App.css';

class Phone extends Component {
    
render() {
    return(
        <div className = 'phones col'>
            <div  className = 'header'>Phone</div> 
                {this.props.data.map((card, ind) => {
                    return (
                        <div className = {'card'} key = {String(ind)}>
                            {card.phone}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Phone;