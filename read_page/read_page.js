class Pet {
    constructor(id, image, name, description, age, price) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.description = description;
        this.age = age;
        this.price = price;
    }
}

const pet1 = new Pet("1", "../assets/cat.jpg", "Felix", "A friendly cat", 2, 100);
const pet2 = new Pet("2", "../assets/dog.jpg", "Bobik", "A playful dog", 5, 300);
const pet3 = new Pet("3", "../assets/bird.jpg", "Birdie", "A small blue bird", 1, 50);
const pet4 = new Pet("4", "../assets/bird.jpg", "Birdie", "A small blue bird", 0.8, 50);

let petArray = [pet1, pet2, pet3, pet4];
let filteredPets = petArray;

let currentSortOption = null;

window.addEventListener("load", function() {
    showElements(petArray);
});

function search() {
    const textInput = document.getElementById("input_search").value.toLowerCase().replace(/\s+/g, '');

    filteredPets = petArray.filter(pet => pet.name.toLowerCase().replace(/\s+/g, '').includes(textInput));

    if (currentSortOption) {
        sortBy(currentSortOption);
    } else {
        clear();
        showElements(filteredPets);
    }
}

function showElements(petArray) {
    const container = document.getElementById("item-storage");
    const template = document.getElementById("item");

    for (let pet of petArray) {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".pet-id").innerText = pet.id;
        clone.querySelector(".item-image").src = pet.image;
        clone.querySelector(".name-item").innerText = pet.name;
        clone.querySelector(".description-item").innerText = pet.description;
        clone.querySelector(".age").innerText = pet.age;
        clone.querySelector(".price").innerText = pet.price;

        container.appendChild(clone);
    }
}

function countPrice() {
    const total = filteredPets.reduce((sum, pet) => sum + pet.price, 0);
    document.getElementById("total_price").innerText = total + "$";
}

function sortBy(sortValue) {
    currentSortOption = sortValue;

    if (sortValue === "age (low-high)") {
        filteredPets.sort((a, b) => a.age - b.age);
    } else if (sortValue === "age (high-low)") {
        filteredPets.sort((a, b) => b.age - a.age);
    } else if (sortValue === "price (low-high)") {
        filteredPets.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price (high-low)") {
        filteredPets.sort((a, b) => b.price - a.price);
    } else if (sortValue === "name (A-Z)") {
        filteredPets.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === "name (Z-A)") {
        filteredPets.sort((a, b) => b.name.localeCompare(a.name));
    }

    clear();
    showElements(filteredPets);
}

function clear() {
    document.getElementById("item-storage").innerHTML = '';
}

function clearSearch() {
    document.getElementById("input_search").value = '';

    filteredPets = petArray;

    clear();

    if (currentSortOption) {
        sortBy(currentSortOption);
    } else {
        showElements(filteredPets);
    }

}

function deleteElement(elem) {
    const element = elem.closest(".item");
    const id = element.querySelector(".pet-id").innerText;
    const petToDelete = petArray.find(pet => pet.id === id);

    if (petToDelete) {
        petArray.splice(petArray.indexOf(petToDelete), 1);
        filteredPets.splice(filteredPets.indexOf(petToDelete), 1);
        element.remove();
        countPrice();
    }
}
