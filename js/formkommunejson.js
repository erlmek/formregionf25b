
function createkommune() {
    const kommune = {}
    kommune.kode = "2233"
    kommune.navn = "EKxxx"
    kommune.href = "http:ek"
    kommune.region = {}
    kommune.region.kode = "8789"
    return kommune
}

const urlPostkommune = "http://localhost:8080/kommune"

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

async function postkommune(kommune) {
    try {
        const nogetjson = await postDataAsJson(urlPostkommune, kommune);
        console.log(nogetjson);
    } catch (e) {
        console.log(e);
    }
}

const reg1 = createkommune();
console.log(reg1);
postkommune(reg1);


