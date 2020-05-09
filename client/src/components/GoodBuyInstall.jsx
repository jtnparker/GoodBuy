import React from 'react';
import css from '../../dist/style.css';

import axios from 'axios';
// import ReviewList from './ReviewList.jsx'

class GoodBuyInstall extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        return(
            <div>
                <div className = "goodbuy-welcome">
                    Welcome to GoodBuy! Please select your Value Preferences! 
                </div>
                
                <div className = "goodbuy-options-wrapper">
                    <div className = "goodbuy-options-wrapper-column1"> 
                        <div className = "goodbuy-options-wrapper-column1-row1">HRC</div>
                        <div className = "goodbuy-options-wrapper-column1-row2">
                            <label className="switch">
                             <input name = "hrcToggle" type="checkbox" checked = {this.props.hrcToggle} onChange = {this.props.handleInputChange}/>
                             <span className="slider round"></span>
                              </label>
                        </div>
                    </div>

                    <div className = "goodbuy-options-wrapper-column1"> 
                        <div className = "goodbuy-options-wrapper-column1-row1">PETA</div>
                        <div className = "goodbuy-options-wrapper-column1-row2">
                            <label className="switch">
                             <input name = "petaToggle" type="checkbox" checked = {this.props.petaToggle} onChange = {this.props.handleInputChange}/>
                             <span className="slider round"></span>
                              </label>
                        </div>
                    </div>

                    <div className = "goodbuy-options-wrapper-column1"> 
                        <div className = "goodbuy-options-wrapper-column1-row1">Fair Trade</div>
                        <div className = "goodbuy-options-wrapper-column1-row2">
                            <label className="switch">
                             <input name = "fairtradeToggle" type="checkbox" checked = {this.props.fairtradeToggle} onChange = {this.props.handleInputChange}/>
                             <span className="slider round"></span>
                              </label>
                        </div>
                    </div>
                </div>
            
            </div>
        )
    }
}   
export default GoodBuyInstall;