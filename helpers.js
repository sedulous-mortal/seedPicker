document.addEventListener("DOMContentLoaded", function () {
    // Handler when the DOM is fully loaded
    init();
});

var seeds = [];
var ownedSeeds = [];
var selectedSeedName = '';

function init() {
     /*Nicholas Hazel's version */
     async function getJSON(path, callback) {
         return callback(await fetch(path).then(r => r.json()));
     }
     // here is Nicholas' self-instantiating anonymous function
     (async function () {
         // this line makes sure with await that we are getting ALL the seeds at once
         seeds = await getJSON('./data.json', data => data);
         // TIL that $ helps us denote seedList will be a dom node/element. THX Nicholas
         const $seedList = document.getElementById('seed-nav');
         for (let seed of seeds) {
             if(seed && seed.Name){
                $seedList.insertAdjacentHTML(
                    'beforeend',
                    `<li class="seed-name" onclick="showSeed(event)">${seed.Name}</li>`
                )
             } else if (seed) {
                $seedList.insertAdjacentHTML(
                    'beforeend',
                    `<li class="seed-name" onclick="showSeed(event)">Unidentified Seed</li>`
                )
             }
         }
         // this is here for testing
        // seeds = []
         // this has to happen in here, otherwise seeds is empty when it gets called because of async issues
         renderHome();
     })();
     
}

function showSeed(e) {
    seedName = e.target.outerText;
    let seedToRender;
    if(seedName !== "Unidentified Seed"){
        seedToRender = seeds.filter((seed) => {
        return seed.Name == seedName;
    })[0];
    }else seedToRender = { "Name": "Unidentified Seed"}
    renderSeed(seedToRender);
}

function renderSeed(seed) {
    selectedSeedName = seed.Name;
    //hide jumbotron
    document.getElementsByClassName('jumbotron')[0].style.display = "none";
    // replace core content with seed info
    document.getElementsByClassName('content')[0].innerHTML = Seed(seed)
}

function goHome() {
    document.getElementsByClassName('jumbotron')[0].style.display = "block";
    renderHome()
}

// template literal definition of homepage as a dumb component
function renderHome(){
    // if seeds is empty:
    if(seeds && seeds.length === 0){ 
        //  hide ul and instead show a message: you should get seeds
        document.getElementById('seed-nav').style.display = "none";
        document.getElementsByClassName('owned-seeds-list')[0].insertAdjacentHTML('beforeend', `<p id="no-seeds">You should get some seeds :) </p>`)
    }
    // hide the seeds menu entirely if no seeds are available in the array - not working
    // if(seeds && seeds.length > 0) { document.getElementByClassName('owned-seeds-list')[0].style.display = 'none' }
    document.getElementsByClassName('content')[0].innerHTML = `
    <p>Caleb Warnock sells seeds
            <a href="https://www.mcssl.com/store/calebwarnock/catalog/search">here</a>
            as a part of the Seed Renaissance movement he is leading, to ensure that our food supply remains in the public domain.
            Every seed he sells is guaranteed pure, NEVER hybrid, GMO, patented, or corporate owned. All of his seeds are 100% natural, grown without chemicals.
    </p>
    <p>SeedPicker allows gardeners to innovate on their planting calendar and optimize crop rotation, produce output, and seed stocking.</p>
    `
}

// template literal definition of seed as a dumb component
const Seed = (seed) => {
    return (`
<h1>${seed.Name && seed.Name !== "unknown" ? seed.Name : "Unidentified Seed"}</h1>
<h2>${seed.Name == "Unidentified Seed" ? "</br> Sorry, we couldn't find that seed. </br> </br> Click the tree in the top left to get home. " : ""}</h2>
<h2>${seed.BotanicalName && seed.BotanicalName!=="unknown" ? seed.BotanicalName : ""}</h2>
<p>${seed.Desc && seed.Desc !== "unknown" ? seed.Desc : ""}</p>
<p>${seed.NutritionInfo && seed.NutritionInfo!=="unknown" ? seed.NutritionInfo :  ""}</p>
<div class="seed-deets-wrapper">
    <div class="seed-image">
        ${seed.Img ? `<img src=${seed.Img}></img>` : seed.Name !== "Unidentified Seed" ? "No Image on File" : ""}
    <div>
    <div class="further-seed-info">
    ${`<p>${seed.SeedCount && seed.SeedCount!=="unknown" && seed.Price && seed.Price!==0 ? `${seed.SeedCount} seeds for $${seed.Price}</p>` : ""}`}
    </div>
</div>
`)} ;