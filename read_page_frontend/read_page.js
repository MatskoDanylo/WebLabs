let filteredPets = [];
let currentSortOption = null;  // Default sort option

window.addEventListener("load", function () {
    fetchItems(); // Fetch pets from the read_page_backend when the page loads
});

function fetchItems() {
    fetch('http://127.0.0.1:5000/items')
        .then(response => response.json())
        .then(data => {
            filteredPets = data;
            showElements(filteredPets); // Display the fetched pets in the DOM
        })
        .catch(error => console.error('Error fetching items:', error));
}


function search() {
    const textInput = document.getElementById("input_search").value.toLowerCase().replace(/\s+/g, '');
    fetch('http://127.0.0.1:5000/search_and_sort', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search_term: textInput, sort_option: currentSortOption })
    })
    .then(response => response.json())
    .then(data => {
        filteredPets = data;
        showElements(filteredPets);
        countPrice();  // Update price count after search
    })
    .catch(error => console.error('Error searching items:', error));
}



function showElements(petArray) {
    const container = document.getElementById("item-storage");
    const template = document.getElementById("item");
    container.innerHTML = ''; // Clear previous items
    for (let pet of petArray) {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".pet-id").innerText = pet.id;
        clone.querySelector(".item-image").src = pet.image || "default-image-url.jpg"; // Use a default image if none provided
        clone.querySelector(".name-item").innerText = pet.name;
        clone.querySelector(".description-item").innerText = pet.description;
        clone.querySelector(".age").innerText = pet.age;
        clone.querySelector(".price").innerText = pet.price;
        console.log(petArray);

        // Attach event listener to the edit button
        const editButton = clone.querySelector(".edit-item");
        editButton.addEventListener("click", function () {
            openPetModal(pet); // Open modal to edit the pet
        });

        // Attach event listener to the delete button
        const deleteButton = clone.querySelector(".delete-item");
        deleteButton.addEventListener("click", function () {
            deleteElement(pet.id); // Delete the pet
        });

        container.appendChild(clone); // Append the item to the container
    }
}

function countPrice() {
    const textInput = document.getElementById("input_search").value.toLowerCase().replace(/\s+/g, '');
    fetch('http://127.0.0.1:5000/count_price', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: textInput })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("total_price").innerText = data.total + "$";
    })
    .catch(error => console.error('Error counting price:', error));
}



function sortBy(sortOption) {
    currentSortOption = sortOption;  // Update the global sort option
    const textInput = document.getElementById("input_search").value.toLowerCase().replace(/\s+/g, '');
    fetch('http://127.0.0.1:5000/search_and_sort', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search_term: textInput, sort_option: sortOption })
    })
    .then(response => response.json())
    .then(data => {
        filteredPets = data;  // Update the filteredPets with sorted data
        showElements(filteredPets);  // Display the sorted pets
    })
    .catch(error => console.error('Error sorting items:', error));
}


function clearSearch() {
    document.getElementById("input_search").value = '';
    fetchItems(); // Reset filtered pets by re-fetching from the read_page_backend
    sortBy(currentSortOption);  // Re-sort the elements
}


function deleteElement(id) {
    fetch(`http://127.0.0.1:5000/items/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
        const textInput = document.getElementById("input_search").value.toLowerCase().replace(/\s+/g, '');
        fetch('http://127.0.0.1:5000/search_and_sort', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ search_term: textInput, sort_option: currentSortOption })
        })
        .then(response => response.json())
        .then(data => {
            filteredPets = data;
            showElements(filteredPets);
            countPrice();  // Update price count after deletion
        })
        .catch(error => console.error('Error sorting items:', error));
    })
    .catch(error => console.error('Error deleting item:', error));
}

const petModal = document.getElementById("petModal");
const errorModal = document.getElementById("errorModal");
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

function closeModal() {
    petModal.style.display = "none";
}

function submitForm(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', document.getElementById("petName").value.trim());
    formData.append('description', document.getElementById("petDescription").value.trim());
    formData.append('age', parseFloat(document.getElementById("petAge").value));
    formData.append('price', parseFloat(document.getElementById("petPrice").value));

    const imageInput = document.getElementById("petImage").files[0];
    formData.append('image', imageInput);  // Add file

    let url = 'http://127.0.0.1:5000/items';
    let method = 'POST';
    if (editingPet) {
        url = `http://127.0.0.1:5000/items/${editingPet.id}`;
        method = 'PUT';
    }

    fetch(url, {
        method: method,
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const textInput = document.getElementById("input_search").value.toLowerCase().replace(/\s+/g, '');
        fetch('http://127.0.0.1:5000/search_and_sort', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ search_term: textInput, sort_option: currentSortOption })
        })
        .then(response => response.json())
        .then(data => {
            filteredPets = data;
            showElements(filteredPets);
            countPrice();  // Update price count after adding/updating a pet
        })
        .catch(error => console.error('Error sorting items:', error));
    })
    .catch(error => console.error('Error submitting item:', error));

    closeModal(); // Close the modal after form submission
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
  
