import React, { Component } from 'react'
import '../App.css';

class ZIP extends Component {
    
    render() {
        return (
            <div className = 'names col'>
                <div  className = 'header'>ZIP</div> 
                {this.props.data.map((card, ind) => {
                    return (
                        <div className = {'card'} key = {String(ind)}>
                            {card.zip}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ZIP;