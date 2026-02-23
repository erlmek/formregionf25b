console.log("jeg er i formregionjson.js");

function createRegion() {
    const region = {}
    region.kode = "8789"
    region.navn = "KEAxxx"
    region.href = "http:kea"
    return region
}

const urlPostRegion = "http://localhost:8080/region"

async function postDataAsJson(url, obj) {
    const objectAsJsonString = JSON.stringify(obj);
    console.log(objectAsJsonString);
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: objectAsJsonString,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMesssage = await response.text();
        throw new Error(errorMesssage);
    }
    return response.json();
}

async function postRegion(region) {
    try {
        const nogetjson = await postDataAsJson(urlPostRegion, region);
        console.log(nogetjson);
    } catch (e) {
        console.log(e);
    }
}

const reg1 = createRegion();
console.log(reg1);
postRegion(reg1);






