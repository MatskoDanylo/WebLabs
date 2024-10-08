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
const pet3 = new Pet("3", "../assets/bird.jpg", "Birdiee", "A small blue bird", 1, 50);
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

    // Clear previous items
    container.innerHTML = '';

    for (let pet of petArray) {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".pet-id").innerText = pet.id;
        clone.querySelector(".item-image").src = pet.image || "default-image-url.jpg"; // Use a default image if none provided
        clone.querySelector(".name-item").innerText = pet.name;
        clone.querySelector(".description-item").innerText = pet.description;
        clone.querySelector(".age").innerText = pet.age;
        clone.querySelector(".price").innerText = pet.price;

        // Attach event listener to the edit button
        const editButton = clone.querySelector(".edit-item");
        editButton.addEventListener("click", function () {
            openPetModal(pet);
        });

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

const petModal = document.getElementById("petModal");
const errorModal = document.getElementById("errorModal");

const closeBtns = document.querySelectorAll(".close");
closeBtns.forEach(btn => btn.onclick = () => closeModal(btn));

let editingPet = null;

function openPetModal(pet = null) {
    if (pet) {
        document.getElementById("modal-title").innerText = "Edit Pet";
        document.getElementById("petName").value = pet.name;
        document.getElementById("petDescription").value = pet.description;
        document.getElementById("petAge").value = pet.age;
        document.getElementById("petPrice").value = pet.price;
        document.getElementById("petId").value = pet.id;
        editingPet = pet;
    } else {
        document.getElementById("modal-title").innerText = "Add a Pet";
        document.getElementById("petForm").reset();
        editingPet = null;
    }
    petModal.style.display = "block";
}


function closeModal(button) {
    if (button.closest(".modal") === petModal) {
        petModal.style.display = "none";
    } else {
        errorModal.style.display = "none";
    }
}

function submitForm(event) {
    event.preventDefault();

    const name = document.getElementById("petName").value.trim();
    const description = document.getElementById("petDescription").value.trim();
    const age = parseFloat(document.getElementById("petAge").value);
    const price = parseFloat(document.getElementById("petPrice").value);
    const imageInput = document.getElementById("petImage");
    const id = document.getElementById("petId").value || Date.now().toString(); // Generate unique id if adding


    const isDuplicateName = petArray.some(pet => pet.name.toLowerCase() === name.toLowerCase() && (!editingPet || pet.id !== editingPet.id));

    if (isDuplicateName) {
        showError("A pet with the same name already exists.");
        return;
    }

    // Validate the form before proceeding
    if (!validateForm(name, description, age, price, imageInput.files[0])) {
        return;
    }

    // Read the image file if a file is uploaded
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const image = e.target.result; // Base64 image data

            if (editingPet) {
                // Update existing pet
                const petIndex = petArray.findIndex(pet => pet.id === editingPet.id);
                if (petIndex > -1) {
                    petArray[petIndex] = { id: editingPet.id, name, description, age, price, image };
                }
                const filteredPetIndex = filteredPets.findIndex(pet => pet.id === editingPet.id);
                if (filteredPetIndex > -1) {
                    filteredPets[filteredPetIndex] = { id: editingPet.id, name, description, age, price, image };
                }
            } else {
                // Add new pet
                const newPet = new Pet(id, image, name, description, age, price); // Use uploaded image
                petArray.push(newPet);
                filteredPets = [...petArray];
            }

            closeModal({ closest: () => petModal });

            if (currentSortOption) {
                sortBy(currentSortOption);
            } else {
                clear();
                showElements(filteredPets);
            }
        };

        reader.readAsDataURL(imageInput.files[0]); // Convert image to Base64
    }
}


function validateForm(name, description, age, price, imageFile) {
    const nameHasNumbers = /\d/;

    if (name.length < 3 || name.length > 50) {
        showError("Name must be between 3 and 50 characters.");
        return false;
    }
    if (nameHasNumbers.test(name)) {
        showError("Name must not contain numbers.");
        return false;
    }
    if (description.length < 10 || description.length > 200) {
        showError("Description must be between 10 and 200 characters.");
        return false;
    }
    if (age <= 0 || age > 100) {
        showError("Age must be between 0.1 and 100 years.");
        return false;
    }
    if (price <= 0 || price > 10000) {
        showError("Price must be between 1 and 10000.");
        return false;
    }
    if (!imageFile) {
        showError("You must upload an image.");
        return false;
    }
    return true;
}

function showError(message) {
    document.getElementById("errorMessage").innerText = message;
    errorModal.style.display = "block";
}

document.querySelector(".create a").addEventListener("click", () => openPetModal());