let productList = [];

let getProductList = () => {
    const xhr = new XMLHttpRequest();
    let apiCall = "http://localhost:3000/api";
    xhr.open("GET", apiCall, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const response = JSON.parse(xhr.responseText);
          productList = [];
          for (var i = 0; i < response.length; i++) {
            productList.push(response[i].name.toLowerCase());
          };
        }
    }
    xhr.send();
};

chrome.runtime.onStartup.addListener(getProductList);
chrome.runtime.onInstalled.addListener(getProductList);

chrome.webNavigation.onCompleted.addListener(tab => {

    
    var domain = tab.url.match(/^[\w-]+:\/{2,}\[?([\w\.:-]+)\]?(?::[0-9]*)?/)[1];
    if (tab.frameId ===0 && domain === "www.amazon.com") {
          url = tab.url.toLowerCase();
          url = url.split('s?k=');
          url = url[1].split('&');
          url = url[0];
          urlWords = url.split('+');
          for (var i = 0; i < productList.length; i++) {
            for (var j = 0; j < urlWords.length; j++) {
              if (productList[i] === urlWords[j]) {
                chrome.tabs.query({active: true, currentWindow: true}, tabs => {
                    chrome.tabs.sendMessage(tabs[0].id, {type: 'goodBuySearch'});
                });
                 
                
               }
            }
          }


          
     
            }
    });