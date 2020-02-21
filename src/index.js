import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const info = [
      {id: 1, name: 'Azamat', phone: '5718894220', zip: '94330', vin: '5346543654641', status: 'Active', action: ''},
      {id: 2, name: 'Kuttubek', phone: '5718894220', zip: '94330', vin: '5346543654641', status: 'Inactive', action: ''},
      {id: 3, name: 'Aibek', phone: '5718894220', zip: '94330', vin: '5346543654641', status: 'Progress', action: ''},
      {id: 4, name: 'Tolon', phone: '5718894220', zip: '94330', vin: '5346543654641', status: 'Active', action: ''},
      {id: 5, name: 'Kanat', phone: '5718894220', zip: '94330', vin: '5346543654641', status: 'Inactive', action: ''},
      {id: 6, name: 'Zamir', phone: '5718894220', zip: '94330', vin: '5346543654641', status: 'Active', action: ''},
      {id: 7, name: 'David', phone: '5718894220', zip: '94330', vin: '5346543654641', status: 'Inactive', action: ''}
    ]

ReactDOM.render(<App data = {info}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
