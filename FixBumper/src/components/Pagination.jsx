import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function Pagination(props) {

    let { start, end, currentPage, perPageValue } = props.data;
    let { handlePerPageValue, next } = props;
    let total = props.data.customers.length;
    if ( total < end) {
        end = total;
    }
    if (start > end ) {
        start = start - perPageValue;
    }
    // console.log(start, end, currentPage, total);
    // console.log(props.next)

    return  <div className="pagination">
                <span> Rows per page</span>
                <span className="pag-dropdown">
                <select style={{border: "none", appearance: "none"}} onChange={handlePerPageValue} >
                    <option value="5"> 5</option>
                    <option value="10">10 </option> 
                </select>
                </span>
                <span className="pag-start"> {start} </span> -
                <span className="pag-end"> {end} </span> of <span className="pag-total"> {total} </span> 
                <span className="pag-left" onClick={() => next("left")}> <FontAwesomeIcon icon={faChevronLeft}/> </span>
                <span className="pag-right" onClick={() => next("right")}> <FontAwesomeIcon icon={faChevronRight}/> </span>
            </div>
}

export default Pagination;