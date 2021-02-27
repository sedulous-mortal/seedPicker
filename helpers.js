// fs = require(fs);

var seeds = [];

// fs.readFile("./data.json").map((seed)=> {
//     seeds.push(seed);
// })

// from https://www.geekstrick.com/load-json-file-locally-using-pure-javascript/
function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true); 
    
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
 /* The function above will create a new instance of an XMLHttpRequest and load asynchronously the contents of data.json. Author has gone with asynchronous but we can change the argument to false if we want a synchronous load. */

 function init() {
    loadJSON(function(response) {
     // Parsing JSON string into object
       seeds = JSON.parse(response);
    });
   }

init();

function showSeed(e){
    console.log(e)
    console.log(e.target.outerText)
    seedName = e.target.outerText;
    console.log(seeds)
    console.log(seeds.filter((seed)=> {return seed.Name == seedName})[0])
}