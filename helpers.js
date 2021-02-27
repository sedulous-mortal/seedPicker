document.addEventListener("DOMContentLoaded", function () {
    // Handler when the DOM is fully loaded
    init();
});

var seeds = [];
var ownedSeeds = [];
var selectedSeedName = '';

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
    loadJSON(function (response) {
        // Parsing JSON string into object
        seeds = JSON.parse(response);
    });

    for (let i in ownedSeeds) {
        if (i <= ownedSeeds.length-1) {
            document.getElementsByTagName('ul')[0].insertAdjacentHTML('afterend', `<li onclick="showSeed(event)">${ownedSeeds[i].Name}</li>`)
        }
        i++;
    }
    // populate with 2 seeds to test
    ownedSeeds.push(seeds[0], seeds[1]);
    renderHome()
}

function showSeed(e) {
    seedName = e.target.outerText;
    let seedToRender = seeds.filter((seed) => {
        return seed.Name == seedName
    })[0];
    renderSeed(seedToRender);
}

function renderSeed(seed) {
    selectedSeedName = seed.Name;
    console.log(selectedSeedName);
    //hide jumbotron
    document.getElementsByClassName('jumbotron')[0].style.display = "none";
    // replace core content with seed info
    document.getElementsByClassName('content')[0].innerHTML = Seed(seed)
}

function goHome(){
    document.getElementsByClassName('jumbotron')[0].style.display = "block";
    renderHome()
}

// template literal definition of homepage as a dumb component
function renderHome(){
    document.getElementsByClassName('content')[0].innerHTML = `
    <p>Caleb Warnock sells seeds
            <a href="https://www.mcssl.com/store/calebwarnock/catalog/search">here</a>
            as a part of the Seed Renaissance movement he is leading, to ensure that our food supply remains in the
            public domain.
            Every seed he sells is guaranteed pure, NEVER hybrid, GMO, patented, or corporate owned. All of his seeds
            are 100% natural, grown without chemicals.
    </p>
    <p>SeedPicker allows gardeners to innovate on their planting calendar and optimize crop rotation, produce output, and seed stocking.</p>
    `
}

// template literal definition of seed as a dumb component
const Seed = (seed) => {return (`
<h1>${seed.Name}</h1>
<p>${seed.Desc}</p>
<p>${seed.NutritionInfo}</p>
<div class="seed-deets-wrapper">
    <div class="seed-image">
        <img src=${seed.Img}></img>
    <div>
    <div class="further-seed-info">
    <p>${seed.SeedCount} seeds for $${seed.Price}</p>
    </div>
</div>
`)} ;