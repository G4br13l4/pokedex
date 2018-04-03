function getData(){
    fetch(`https://pokeapi.co/api/v2/pokemon-species`)
    .then(function(response) {
        response.json().then(
          function(data){
            const pokemons = data.results;
            paintPokemons(pokemons);
            $(document).on("click", ".icon_bullet", paintModal);
            $(document).on("click", ".icon_bullet", paintMoreDetails);
          }
        );
    });
}
getData();

function paintPokemons(pokemons){
  let template = ``;
  pokemons.forEach(function (element,index){
    let id = index + 1;
    let name = element.name;
    let firstLetter = name[0].toUpperCase();
    let otherLetter = name.slice(1,name.length);
    name = firstLetter + otherLetter;

    template += `
    <div class="pokemon-box text-center col-lg-3 col-xs-6">
     <img src="assets/images/pokeball_bullet.png" class="icon_bullet" 
     data-toggle="modal" data-target=".pokemonModal" 
     id="${id}">
     <p>${name}<p>
    </div>
    `;
    
  });
  document.getElementById("pokemon-container").innerHTML = template;
}

function paintModal(){
  let id = event.target.id;
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(function(response) {
        response.json().then(
          function(data){
            
            // obtaining data
            let frontImage = data.sprites.front_default;
            let name = data.name.toUpperCase();
            let height = data.height;
            let weight = data.weight;
            let types = data.types;

            let typeTemplate = ``;
            types.forEach(function (element){
              let type = element.type.name;
              typeTemplate += `*${type}`;
            });
            document.getElementById("type").innerHTML = typeTemplate;
            
            // adding data to html
            document.getElementById("f-image").style.backgroundImage = `url('${frontImage}')`;
            document.getElementById("name").innerText = name;
            document.getElementById("height").innerText = height;
            document.getElementById("weight").innerText = weight;
            
          }
        );
    });
}

function paintMoreDetails(){
  let id = event.target.id;

  fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then(function(response) {
        response.json().then(
          function(data){

            // Obtaining data
            let bios = data.flavor_text_entries;
           
            let firstBio = bios.find(function(element) {
              return element.language.name == "en";
            });

            let description = firstBio.flavor_text;
            //Adding data to HTML
            document.getElementById("description").innerHTML = description;
          });
      })
  
}