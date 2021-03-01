Vue.config.productionTip=false;
Vue.config.devtools = false;

function postData(url, data) {
    // Default options are marked with *
    return fetch(url, {
      body: JSON.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
    .then(response => response.json()) // 輸出成 json
  }
  

let vm = new Vue({
    el: "#app",
    created(){
        console.log("QQ")
    },
    data: {
        url: "",
        finishShorten: false,
    },
    computed: {

    },
    watch: {

    },
    filters: {
        
    },
    methods: {
        shorten(e){
            console.log("Shorten", e)
            console.log(vm.url)

            if(vm.url == ""){
                alert("Invalid URL")
                return 0
            }

            //check url is valid
            postData('https://backend.pyurl.cc/api/post/shorten_url/', {url: vm.url})
            .then(data => {
                console.log(data)

                if(data.message.includes("invalid")){
                    alert("Invalid URL!");
                    return 0
                }else if(data.message.includes("fail")){
                    alert("Fail, please try another one.");
                    return 0
                }

                vm.url = data.shorten_url
                vm.finishShorten = true;
                $("#copy-button")[0].style["display"]=""
                $("#finish-msg")[0].style["display"]=""
            }) // JSON from `response.json()` call
            .catch(error => {
                console.error(error)
                alert("Fail, server unavaliable.")
            })
        },
        copyTextToClipboard(e){
            text = vm.url
            var textArea = document.createElement("textarea");
            textArea.value = text;
            
            // Avoid scrolling to bottom
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";
          
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
          
            try {
              var successful = document.execCommand('copy');
              var msg = successful ? 'successful' : 'unsuccessful';

              $("#copy-button").html("Copied")
              setInterval(function(){$("#copy-button").html("Copy")},1000);

              console.log('Fallback: Copying text command was ' + msg);
            } catch (err) {
              console.error('Fallback: Oops, unable to copy', err);
            }
          
            document.body.removeChild(textArea);

        }
    }
})
