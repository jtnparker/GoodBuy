/* global chrome */

import React from 'react';
import css from '../../dist/style.css';

import axios from 'axios';
// import ReviewList from './ReviewList.jsx'
import GoodBuyInstall from './GoodBuyInstall.jsx';
import ProductList from './ProductList.jsx';

class App extends React.Component {
    constructor(props){
      super(props);
      this.reviewRef = React.createRef();
      this.state = {
        product: [],
        productList: [],
        fairtrade: false,
        hrc: false,
        peta: false,
        averageScore: 0,
        indexStart: 0,
        indexEnd: 10,
        isPressed: false,
        popularButton: "jp-notClicked",
        newestButton: "jp-clicked",
        showPrevious: false,
        showFirst: false,
        showNext: true,
        domain: '',
        url: '',
        urlWords: [],
        hrcToggle: false,
        petaToggle: false,
        fairtradeToggle: false,
      
    }
    this.getList = this.getList.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getPreferences = this.getPreferences.bind(this);
    // this.next = this.next.bind(this);
    // this.newestList = this.newestList.bind(this);
    // this.popularList = this.popularList.bind(this);
    // this.previous = this.previous.bind(this);
    // this.first = this.first.bind(this);
    // this.scrollToRef = this.scrollToRef.bind(this);
  //   this.itemClickSelection = this.itemClickSelection.bind(this);
  //   this.postItem = this.postItem.bind(this);
  //   this.updateItem = this.updateItem.bind(this);
    
}
componentDidMount() {
  this.getPreferences();
    var domain;
    var productID;
    var url;
    var urlWords = [];
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        url = new URL(tabs[0].url);
        domain = url.hostname;
        url = JSON.stringify(url).toLowerCase();
        if (domain === "www.amazon.com") {
  
          url = url.split('s?k=');
          url = url[1].split('&');
          url = url[0];
          urlWords = url.split('+');
        }
        else {
          url = '';
        }
        this.setState({
          domain: domain,
          url: url,
          urlWords: urlWords
        });
        
        this.getList();
        
      });
     
    };
    
     
   
   
    
    // this.reviewRef.current.focus();
  
getList() {
  axios
  .get('http://54.176.64.219:3000/api')
  .then((data) => {
    let productCategoryNames = [];
    for (var i = 0; i < data.data.length; i++) {
      productCategoryNames.push(data.data[i].name.toLowerCase());
    };

    this.setState ({
      productList: productCategoryNames

    });
  })
  .then(() => {
    this.matchProduct();
    
  })
  .catch((err) => {
    console.error(err)
  })
}

matchProduct() {
  for (var i = 0; i < this.state.productList.length; i++) {
    for (var j = 0; j < this.state.urlWords.length; j++) {
      if (this.state.productList[i] === this.state.urlWords[j]) {
         this.getProduct(i+1);
       }
       else if (this.state.productList[i].includes(this.state.urlWords[j])) {
        if (this.state.productList[i] === this.state.urlWords[j] + this.state.urlWords[j+1]) {
          this.getProduct(i+1);
    }
  }
  }
}

}

getProduct(productID) {
  axios
  .get(`http://54.176.64.219:3000/api/${productID}`) 
  .then((data) => {
    let productNames = [];
    if (this.state.hrcToggle ===true && this.state.petaToggle ===true && this.state.fairtradeToggle ===true) {
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].avgscore = ((data.data[i].hrc + data.data[i].peta + data.data[i].fairtrade) / 3).toFixed(2) 
      };
    }
    else if (this.state.hrcToggle ===false && this.state.petaToggle ===false && this.state.fairtradeToggle ===false) {
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].avgscore = 0.00
      };
    }
    else if (this.state.hrcToggle ===true && this.state.petaToggle ===false && this.state.fairtradeToggle ===false) {
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].avgscore = (data.data[i].hrc)
      };
    }
    else if (this.state.hrcToggle ===true && this.state.petaToggle === true && this.state.fairtradeToggle ===false) {
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].avgscore = ((data.data[i].hrc + data.data[i].peta) / 2).toFixed(2)
      };
    }
    else if (this.state.hrcToggle ===false && this.state.petaToggle === true && this.state.fairtradeToggle ===false) {
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].avgscore = (data.data[i].peta) 
      };
    }
    else if (this.state.hrcToggle ===true && this.state.petaToggle === false && this.state.fairtradeToggle ===true) {
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].avgscore = ((data.data[i].hrc + data.data[i].fairtrade) / 2).toFixed(2)
      };
    }
    else if (this.state.hrcToggle ===false && this.state.petaToggle === false && this.state.fairtradeToggle ===true) {
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].avgscore = (data.data[i].fairtrade)
      };
    }
    else if (this.state.hrcToggle ===false && this.state.petaToggle === true && this.state.fairtradeToggle ===true) {
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].avgscore = ((data.data[i].peta + data.data[i].fairtrade) /2).toFixed(2)
      };
    };
    
    data.data.sort(function(a, b) {
       return b.avgscore - a.avgscore;
    });
    // for (var i = 0; i < data.data.length; i++) {
    //   productNames.push(data.data[i].name.toLowerCase());
    // };

    
    this.setState({
      product: data.data

    })

  });
}
getPreferences() {
  axios
  .get(`http://54.176.64.219:3000/api/pref/1`) 
  .then((data) => {
      this.setState({
        hrcToggle: data.data[0].hrc,
        petaToggle: data.data[0].peta,
        fairtradeToggle: data.data[0].fairtrade

    })
  })
}
updatePreferences(hrc, peta, fairtrade) {
  var update = {
    hrc: hrc,
    peta: peta,
    fairtrade: fairtrade
  }
  axios
  .put(`http://54.176.64.219:3000/api/pref/1`, update)
  .then(() => {
    this.getPreferences()
  })
  .then(() => {
    this.matchProduct()
  })

}
// handleInputChange(event) {
//   const target = event.target;
//   var value;
//   if (target.name ==='hrcToggle' || 'petaToggle' || 'fairtradeToggle') {
//     value = target.checked;
//   }
//   else {
//     value = target.value;
//   }
  
//   const name = target.name;

//   this.setState({
//     [name]: value
//   });
// }
handleInputChange(event) {
  const target = event.target;
  var value;
  if (target.name ==='hrcToggle') {
    value = target.checked;
    this.updatePreferences(value, this.state.petaToggle, this.state.fairtradeToggle)
  }
  else if (target.name ==='petaToggle') {
    value = target.checked;
    this.updatePreferences(this.state.hrcToggle, value, this.state.fairtradeToggle)
  }
  else if (target.name ==='fairtradeToggle') {
    value = target.checked;
    this.updatePreferences(this.state.hrcToggle, this.state.petaToggle, value)
  }
  else {
    value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  
  

  
}

  render() {
    return(
        <div className = "goodbuy-main">
          <div className = "goodbuy-title">
            GoodBuy's MVP
          </div>
          <GoodBuyInstall handleInputChange = {this.handleInputChange} 
          hrcToggle = {this.state.hrcToggle} 
          petaToggle ={this.state.petaToggle} 
          fairtradeToggle = {this.state.fairtradeToggle}/>
          {this.state.product.map((product) => (
            <ProductList product = {product}/>
            
          ))}
         
        
            </div>
    )
  }
}
export default App;