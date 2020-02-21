import React, { Component } from 'react';
import '../App.css';

class Status extends Component {

    changeStatus(ind) {
        const theStatus=this.props.data;
        if (theStatus[ind].status==='Active') {
            theStatus[ind].status='Progress'
        } else if(theStatus[ind].status==='Progress') {
            theStatus[ind].status='Inactive'
        } else {
            theStatus[ind].status='Active'
        }
        this.setState({[this.props.data]: theStatus})
}
    
    render() {
        return (
            <div className='status col'>
                <div  className='header'>Status</div> 
                {this.props.data.map((card, ind) => {
                    return (
                        <div className={'card'+' '+this.props.data[ind].status.toLowerCase()} key={String(ind)} onClick = {()=>this.changeStatus(ind)}>
                            <button>{card.status}</button>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Status;

