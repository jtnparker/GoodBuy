import React from 'react';
import css from '../../dist/style.css';

import axios from 'axios';
// import ReviewList from './ReviewList.jsx'

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return(
            <div>
                <div className = "goodbuy-product-wrapper">
                    <div className =    "goodbuy-product-wrapper-row1 link" onClick={() => {
                         window.open(this.props.product.link)}}>{this.props.product.name}   
                   </div>
                   <div className = "goodbuy-product-wrapper-row2">
                   {this.props.product.avgscore} %
                   </div>
                </div>
               
            
            </div>
        )
    }
}   
export default ProductList;