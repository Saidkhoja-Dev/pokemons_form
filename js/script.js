// Get Elements by HTML 
elForm = document.querySelector(".pokemons__form")
elPokemonsWrapper = document.querySelector(".pokemons__wrapper");
elPokemonsTemplate = document.querySelector(".pokemons__template").content;
elPokemonsImg = document.querySelector(".pokemons__img");
elPokemonsName = document.querySelector(".pokemons__name");
elPokemonsCategory = document.querySelector(".pokemons__type");
elPokemonsHeight = document.querySelector(".pokemons__height");
elPokemonsWeight = document.querySelector(".pokemons__weight");
elPokemonsInputWeight = document.querySelector(".pokemons__weight");
elPokemonsInputHeight = document.querySelector(".pokemons__height");
elPokemonsInputSorting = document.querySelector(".pokemons__input-sorting");
elPokemonsInputType = document.querySelector(".pokemons__input-type");

let pokemonsArray = pokemons.slice(0, 151);


// Normalized Array
let normalizedArray = pokemonsArray.map(item => {
    return {
        pokemonsImage: item.img,
        pokemonsName: item.name,
        pokemonsType: item.type,
        pokemonsHeight: item.height,
        pokemonsWeight: item.weight
    }
});


// Get Type Function
function getType(array) {
    newArray = [];

    for (const item of array) {

        let onePokemonType = item.pokemonsType;

        for (const item1 of onePokemonType) {
            if (!newArray.includes(item1)) {
                newArray.push(item1)
            }
        }
    }
    return newArray
}
let typeArray = getType(normalizedArray).sort();
console.log(typeArray);


// Pokemons Type Rendering 
function renderType(array, wrapper) {

    let fragment = document.createDocumentFragment();

    for (const item of array) {
        let newOption = document.createElement("option");

        newOption.textContent = item;
        newOption.value = item;

        fragment.appendChild(newOption);
    }

    wrapper.appendChild(fragment);
}
renderType(typeArray, elPokemonsInputType)


// Render Pokemons
function renderPokemons(array, wrapper) {
    wrapper.innerHTML = null;

    let fragment = document.createDocumentFragment();

    for (const item of array) {
        let pokemonsTemplate = elPokemonsTemplate.cloneNode(true);

        pokemonsTemplate.querySelector(".pokemons__img").src = item.pokemonsImage;
        pokemonsTemplate.querySelector(".pokemons__name").textContent = item.pokemonsName;
        pokemonsTemplate.querySelector(".pokemons__type").textContent = item.pokemonsType;
        pokemonsTemplate.querySelector(".pokemons__height").textContent = item.pokemonsHeight;
        pokemonsTemplate.querySelector(".pokemons__weight").textContent = item.pokemonsWeight;

        fragment.appendChild(pokemonsTemplate);
    }
    wrapper.appendChild(fragment);
}
console.log(renderPokemons(normalizedArray, elPokemonsWrapper));



elForm.addEventListener("submit", function (evt) {
    evt.preventDefault()

    let inputTypes = elPokemonsInputType.value.trim();
    let inputWeight = elPokemonsWeight.value.trim();
    let inputHeight = elPokemonsHeight.value.trim();
    let inputSort = elPokemonsInputSorting.value.trim();

    let filteredArray = normalizedArray.filter(function (item) {

        let isTrue = inputTypes == "all" ? true : item.pokemonsType.includes(inputTypes);

        let validation = item.pokemonsWeight >= Number(inputWeight) && item.pokemonsHeight >= Number(inputHeight) && isTrue;


        return validation;
    });

    if (inputSort == "weight-high-to_low") {
        filteredArray.sort((a, b) => {
            return b.pokemonsWeight - a.pokemonsWeight
        });
    }

    if (inputSort == "weight-low-to_high") {
        filteredArray.sort((a, b) => {
            return a.pokemonsWeight - b.pokemonsWeight
        });
    }

    if (inputSort == "heigh-high-to_low") {
        filteredArray.sort((a, b) => {
            return b.pokemonsHeight - a.pokemonsHeight
        });
    }

    if (inputSort == "heigh-low-to_high") {
        filteredArray.sort((a, b) => {
            return a.pokemonsHeight - b.pokemonsHeight
        });
    }

    if (inputSort == "a-z") {

        filteredArray.sort((a, b) => {
            return a === b ? 0 : (a.pokemonsName < b.pokemonsName) ? -1 : 1;
        })
    }

    if (inputSort == "z-a") {

        filteredArray.sort((a, b) =>{
        return a === b ? 0 : (b.pokemonsName < a.pokemonsName) ? -1 : 1;
    })
    }

    renderPokemons(filteredArray, elPokemonsWrapper)

});