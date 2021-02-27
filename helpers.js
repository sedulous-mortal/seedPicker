document.addEventListener("DOMContentLoaded", function () {
    // Handler when the DOM is fully loaded
    init();
});

var seeds = [];
var ownedSeeds = [];
var selectedSeedName = '';

function init() {
     /*Nicholas' version */
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
             $seedList.insertAdjacentHTML(
                 'afterend',
                 `<li onclick="showSeed(event)">${seed.Name}</li>`
             )
         }
     })();
     renderHome();
    }

     function showSeed(e) {
         seedName = e.target.outerText;
         let seedToRender = seeds.filter((seed) => {
             console.log('seed', seed) // this never comes out, probably cuz we're in a filter 
             return seed.Name == seedName
         })[0];
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