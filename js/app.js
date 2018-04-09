
function getData(){
    fetch(`https://pokeapi.co/api/v2/pokemon-species`)
    .then(function(response) {
        response.json().then(
          function(data){
            const pokemons = data.results;
            paintPokemons(pokemons);
            $(document).on("click", ".icon_bullet", paintModal);
            $(document).on("click", ".icon_bullet", paintMoreDetails);
            document.getElementById("close-modal").addEventListener("click", cleanModal);
            
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
                        var frontImage = data.sprites.front_default;
                        var backImage = data.sprites.back_default;
                        let name = data.name.toUpperCase();
                        let height = data.height;
                        let weight = data.weight;
                        let types = data.types;
                        let abilities = data.abilities;
            
                        let typeTemplate = ``;
                        types.forEach(function (element){
                          let type = element.type.name;
                          typeTemplate += `*${type}`;
                        });
                        
            
                        let abilityTemplate = ``;
                        abilities.forEach(function (element){
                          let ability = element.ability.name;
                          abilityTemplate += `*${ability}`;
                        });
                        
                        // adding data to html
                        document.getElementById("image").style.backgroundImage = `url('${frontImage}')`;
                        document.getElementById("name").innerText = name;
                        document.getElementById("height").innerText = height;
                        document.getElementById("weight").innerText = weight;
                        document.getElementById("type").innerHTML = typeTemplate;
                        document.getElementById("ability").innerHTML = abilityTemplate;
                        
                        
                        //Function for changing the image of the pokemon
                        $(document).on("click", "#rotate-img", changeImage);

                        function changeImage(){
                          if(this.classList.contains("front")){
                            this.classList.add("back");
                            this.classList.remove("front");
                            document.getElementById("image").style.backgroundImage = `url('${backImage}')`;
                          }else if(this.classList.contains("back")){
                            this.classList.add("front");
                            this.classList.remove("back");
                            document.getElementById("image").style.backgroundImage = `url('${frontImage}')`;
                          }
                        }

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
            
            function cleanModal(){
              // Clean spaces
              document.getElementById("image").style.backgroundImage = "";
              document.getElementById("name").innerText = "";
              document.getElementById("height").innerText = "";
              document.getElementById("weight").innerText = "";
              document.getElementById("type").innerHTML = "";
              document.getElementById("ability").innerHTML = "";
              document.getElementById("description").innerHTML = "";
            }

          }
        );
    });
}
getData();

