console.log("jeg er i formregion")

document.addEventListener('DOMContentLoaded', createFormEventListener);
//const formRegion;

function createFormEventListener() {
    formRegion = document.getElementById("formRegion");
    formRegion.addEventListener("submit", handleFormSubmit);
}

const urlPostRegion = "http://localhost:8080/region"

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
        const formData = new FormData(formRegion);
        console.log(formData);
        const plainFormData = Object.fromEntries(formData.entries());
        const responseData = await postObjectAsJson(urlPostRegion, plainFormData, "POST");
        console.log(responseData);
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}




