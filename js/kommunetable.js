import {fetchAnyUrl, postObjectAsJson} from "./modulejson.js"

console.log("er i kommunetable")

const urlKommune = "http://localhost:8080/kommuner"
const pbCreateKommuneTable = document.getElementById("pbGetKommuner")
const tblKommuner = document.getElementById("tblKommuner")
console.log(tblKommuner)

function createTable(kommune) {
    let cellCount = 0
    let rowCount = tblKommuner.rows.length
    let row = tblKommuner.insertRow(rowCount)
    console.log(kommune)

    //console.log(kommune)
    let cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.kode

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.navn

    cell = row.insertCell(cellCount++)
    cell.innerHTML = kommune.href

}

async function fetchKommuner() {
    const kommuner = await fetchAnyUrl(urlKommune)
    kommuner.forEach(kommune => createTable(kommune))
}

function actionGetKommuner() {
    fetchKommuner()
}

pbCreateKommuneTable.addEventListener("click", actionGetKommuner)


