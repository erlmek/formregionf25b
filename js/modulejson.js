function fetchAnyUrl(url) {
    return fetch(url).then(response => response.json())
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

export { fetchAnyUrl, postObjectAsJson }
