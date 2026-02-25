console.log("jeg er i formkommune")

document.addEventListener('DOMContentLoaded', createFormEventListener);
//const formRegion;

const ddRegioner = document.getElementById("ddRegioner");
const urlGetRegioner = "http://localhost:8080/regioner"
const urlPostKommune = "http://localhost:8080/kommune"

function fetchAnyUrl(any) {
    return fetch(any).then(response => response.json());
}

function fillDropDown(reg) {
    const el = document.createElement("option");
    el.textContent = reg.navn
    el.value = reg.kode
    ddRegioner.appendChild(el);
}

async function fetchRegioner() {
    const regioner = await fetchAnyUrl(urlGetRegioner);
    ddRegioner.innerHTML = "";
    //kommuner.sort((a,b) => a.navn.localeCompare(b.navn))
    regioner.sort((a,b) => a.navn > b.navn ? 1 : -1)
    regioner.forEach(reg => fillDropDown(reg))
}

function createFormEventListener() {
    formKommune = document.getElementById("formKommune");
    formKommune.addEventListener("submit", handleFormSubmit);
    fetchRegioner();
}

async function postObjectAsJson(url, object, httpVerbum) {
    const objectAsJsonString = JSON.stringify(object);
    console.log(objectAsJsonString);
    const fetchOptions = {
        method: httpVerbum,
        headers: {
            "Content-Type": "application/json",
        },
        body: objectAsJsonString,
    };
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
        //throw new Error(errorMessage);
    }
    const data = await response.json();
    return data;
}

async function handleFormSubmit(event) {
    //Vi handler submitten her i stedet for default html behaviour
    event.preventDefault();
    try {
        const formData = new FormData(formKommune);
        console.log(formData);
        const plainFormData = Object.fromEntries(formData.entries());
        plainFormData.region = {}
        plainFormData.region.kode = plainFormData.regionKode
        const responseData = await postObjectAsJson(urlPostKommune, plainFormData, "POST");
        console.log(responseData);
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

