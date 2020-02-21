import React, { Component } from 'react'
import '../App.css';

class Action extends Component {

    deleteItems(ind) {
            const theItem = this.props.data;
            theItem.splice([ind], 1);
            // console.log(theItem)
            this.setState({[this.props.data]: theItem})
        }

    render() {
        return (
            <div className='action col'>
                    <div className='header'>Action</div> 
                    {this.props.data.map((card, ind) => {
                        return (
                            <div className='card' key={String(ind)}>
                                {card.action}
                                <i className="fas fa-pen"></i>
                                <i className="fas fa-trash-alt" onClick = {() => this.deleteItems(ind)}></i>
                            </div>
                        )
                    })}
                </div>
        )
    }
}

export default Action;

