
chrome.runtime.onMessage.addListener(request => {
    if (request.type === 'goodBuySearch') {
      const modal = document.createElement('dialog');
      modal.setAttribute("style", "height: 40%; width: 18%; position: absolute; top: 10%; left: 80%; z-index: 10000000;");
      modal.innerHTML = `<iframe id="headlineFetcher"style="height:100%"></iframe>
          <div style="position:absolute; top:0px; left:5px;">  
              <button>x</button>
          </div>`;
      document.body.appendChild(modal);
      const dialog = document.querySelector("dialog");
      dialog.show();
      const iframe = document.getElementById("headlineFetcher");  
      iframe.src = chrome.extension.getURL("./index.html");
      iframe.frameBorder = 0;
      dialog.querySelector("button").addEventListener("click", () => {
          dialog.close();
       });
    }
  });