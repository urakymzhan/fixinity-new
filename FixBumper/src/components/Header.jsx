import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons';

function Header() {
    return <div className="nav-header"><span className="fixinity-header"> Fixinity </span>
     | <span className="home-header"> <FontAwesomeIcon icon={faHome}/> </span> > <span className="customers-header"> Customers </span></div>
}

export default Header;