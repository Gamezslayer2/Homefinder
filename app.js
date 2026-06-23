// ================================
// HOMEFINDER KENYA - APP.JS
// ================================

// Sample Property Data
const properties = [
{
    id: 1,
    title: "2 Bedroom Apartment",
    rent: 25000,
    deposit: 25000,
    location: "Thika",
    type: "2 Bedroom"
},
{
    id: 2,
    title: "1 Bedroom House",
    rent: 15000,
    deposit: 15000,
    location: "Ruiru",
    type: "1 Bedroom"
},
{
    id: 3,
    title: "Bedsitter",
    rent: 8000,
    deposit: 8000,
    location: "Juja",
    type: "Bedsitter"
}
];

// Search Function
function searchProperties() {

    const locationInput =
    document.querySelector(
    'input[placeholder="Location"]'
    );

    const rentInput =
    document.querySelector(
    'input[placeholder="Maximum Rent"]'
    );

    const typeSelect =
    document.querySelector('select');

    const location =
    locationInput.value.toLowerCase();

    const maxRent =
    parseInt(rentInput.value) || Infinity;

    const houseType =
    typeSelect.value;

    const results =
    properties.filter(property => {

        const locationMatch =
        property.location
        .toLowerCase()
        .includes(location);

        const rentMatch =
        property.rent <= maxRent;

        const typeMatch =
        houseType === "House Type" ||
        property.type === houseType;

        return (
            locationMatch &&
            rentMatch &&
            typeMatch
        );
    });

    displayResults(results);
}

// Display Results
function displayResults(results) {

    const listingContainer =
    document.querySelector(".listings");

    if (!listingContainer) return;

    listingContainer.innerHTML = "";

    if(results.length === 0){

        listingContainer.innerHTML = `
        <h2 style="
        text-align:center;
        width:100%;
        ">
        No vacancies found.
        </h2>
        `;

        return;
    }

    results.forEach(property => {

        listingContainer.innerHTML += `
        <div class="card">

            <img src="https://picsum.photos/400/250?random=${property.id}" alt="House">

            <div class="card-content">

                <h3>${property.title}</h3>

                <p class="price">
                KSh ${property.rent.toLocaleString()}
                / Month
                </p>

                <p class="deposit">
                Deposit:
                KSh ${property.deposit.toLocaleString()}
                </p>

                <p class="location">
                📍 ${property.location}
                </p>

                <a href="#"
                class="view-btn">
                View Details
                </a>

            </div>

        </div>
        `;
    });
}

// Post Vacancy Feature
function saveVacancy(event){

    event.preventDefault();

    const title =
    document.getElementById("title").value;

    const rent =
    document.getElementById("rent").value;

    const deposit =
    document.getElementById("deposit").value;

    const location =
    document.getElementById("location").value;

    const type =
    document.getElementById("type").value;

    const vacancy = {
        title,
        rent,
        deposit,
        location,
        type
    };

    let vacancies =
    JSON.parse(
        localStorage.getItem("vacancies")
    ) || [];

    vacancies.push(vacancy);

    localStorage.setItem(
        "vacancies",
        JSON.stringify(vacancies)
    );

    alert(
    "Vacancy published successfully!"
    );

    document
    .getElementById("vacancyForm")
    .reset();
}

// Load Posted Vacancies
function loadVacancies(){

    const vacancies =
    JSON.parse(
        localStorage.getItem("vacancies")
    ) || [];

    const listingContainer =
    document.querySelector(".listings");

    if(!listingContainer) return;

    vacancies.forEach((vacancy,index)=>{

        listingContainer.innerHTML += `
        <div class="card">

        <img src="
        https://picsum.photos/400/250?random=${index+10}
        ">

        <div class="card-content">

        <h3>${vacancy.title}</h3>

        <p class="price">
        KSh ${Number(vacancy.rent)
        .toLocaleString()}
        </p>

        <p class="deposit">
        Deposit:
        KSh ${Number(vacancy.deposit)
        .toLocaleString()}
        </p>

        <p class="location">
        📍 ${vacancy.location}
        </p>

        <a href="#"
        class="view-btn">
        View Details
        </a>

        </div>

        </div>
        `;
    });
}

// Search Button Event
document.addEventListener(
"DOMContentLoaded",
function(){

    const searchBtn =
    document.querySelector(".search-btn");

    if(searchBtn){
        searchBtn.addEventListener(
        "click",
        searchProperties
        );
    }

    const vacancyForm =
    document.getElementById(
    "vacancyForm"
    );

    if(vacancyForm){
        vacancyForm.addEventListener(
        "submit",
        saveVacancy
        );
    }

    loadVacancies();
});