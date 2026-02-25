import {fetchAnyUrl, postObjectAsJson, restDelete, fetchRegioner} from "./modulejson.js"

console.log("er i kommunetable")

const urlKommune = "http://localhost:8080/kommuner"
const pbCreateKommuneTable = document.getElementById("pbGetKommuner")
const tblKommuner = document.getElementById("tblKommuner")

const dlgUpdateKommune = document.getElementById("dlgUpdateKommune")
const frmUpdateKommune = document.getElementById("frmUpdateKommune")
const btnUpdateCancel = document.getElementById("btnUpdateCancel")

let currentKommune = {}

function createTable(kommune) {
    let cellCount = 0
    let rowCount = tblKommuner.rows.length
    let row = tblKommuner.insertRow(rowCount)
    //console.log(kommune)

    row.id = kommune.navn //sætter id som vi kan bruge i feks delete

    //console.log(kommune)
    let cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.kode
    cell.style.width = "10%"

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.navn
    cell.style.width = "25%"

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.href
    cell.style.width = "30%"

    cell = row.insertCell(cellCount++)
    let img = document.createElement("img")
    img.setAttribute("src", kommune.hrefPhoto)
    img.setAttribute("alt", "hej")
    img.setAttribute("width", 150)
    img.setAttribute("height", 150)
    cell.appendChild(img)

    //cell = row.insertCell(cellCount++)
    //cell.innerHTML = kommune.region.kode
    //cell.style.width = "10%"

    //cell = row.insertCell(cellCount++)
    //cell.innerHTML = kommune.region.navn
    //cell.style.width = "25%"

    //Add region dropdown
    cell = row.insertCell(cellCount++)
    const dropdown = document.createElement('select');
    regmap.forEach(reg => {
        const element = document.createElement('option');
        element.textContent = reg.navn
        element.value = reg.kode
        element.kommune = reg
        dropdown.append(element);
    })
    cell.append(dropdown)

    cell = row.insertCell(cellCount++)
    const pbUpdate = document.createElement("input");
    pbUpdate.type = "button";
    pbUpdate.setAttribute("value", "Opdater");
    pbUpdate.className = "btn1"
    cell.appendChild(pbUpdate);

    pbUpdate.onclick = function() {
        currentKommune = kommune
        showUpdateDialog(kommune)
    }

    cell = row.insertCell(cellCount++)
    const pbDelete = document.createElement("input");
    pbDelete.type = "button";
    pbDelete.setAttribute("value", "Slet kommune");
    cell.appendChild(pbDelete);
    pbDelete.className = "btn1"

    pbDelete.onclick = function() {
        document.getElementById(kommune.navn).remove();
    }
}

function showUpdateDialog(kommune) {
    frmUpdateKommune.elements['txtKode'].value = kommune.kode
    frmUpdateKommune.elements['txtNavn'].value = kommune.navn
    frmUpdateKommune.elements['txtHref'].value = kommune.href
    frmUpdateKommune.elements['txtPhoto'].value = kommune.hrefPhoto
    dlgUpdateKommune.showModal()
}

btnUpdateCancel.onclick = function() {
    dlgUpdateKommune.close()
}

frmUpdateKommune.onsubmit = async function(event) {
    event.preventDefault()
    const updatedKommune = {
        kode: frmUpdateKommune.elements['txtKode'].value,
        navn: frmUpdateKommune.elements['txtNavn'].value,
        href: frmUpdateKommune.elements['txtHref'].value,
        hrefPhoto: frmUpdateKommune.elements['txtPhoto'].value
    }
    const updateUrl = urlKommune + "/" + updatedKommune.kode
    try {
        const response = await postObjectAsJson(updateUrl, updatedKommune, "PUT")
        console.log("Updated:", response)
        dlgUpdateKommune.close()
        // Refresh table or update row
        actionGetKommuner()
    } catch (error) {
        alert("Fejl ved opdatering: " + error.message)
        console.error(error)
    }
}

function mysort(kommuner) {
    return kommuner.sort((kom1,kom2) => {
        if (kom1.region.kode>kom2.region.kode) {return 1}
        else if (kom2.region.kode > kom1.region.kode) {return -1}
        else {return (kom1.navn > kom2.navn) ? 1 : -1}
    })
}

let kommuner = []
let regmap = new Map()

async function fetchKommuner() {
    tblKommuner.innerHTML = "" // Clear table before fetching (except header)
    const header = tblKommuner.insertRow(0)
    header.innerHTML = "<th>Kode</th><th>Navn</th><th>Href</th><th>Photo</th><th>Region</th><th>Opdater</th><th>Slet</th>"
    regmap = await fetchRegioner()
    kommuner = await fetchAnyUrl(urlKommune)
    if (kommuner.length > 2) {
        kommuner = mysort(kommuner)
        kommuner.forEach(createTable)
    } else {
        alert("Fejl i fetch kommuner")
    }
    //kommuner.forEach(kommune => createTable(kommune))
}

function actionGetKommuner() {
    fetchKommuner()
}

pbCreateKommuneTable.addEventListener("click", actionGetKommuner)


