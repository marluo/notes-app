'use strict'

let notes = getNotes()

const filters = {
    searchText: '',
    sortBy: 'ByEdited'
}

renderNotes(notes, filters)


document.querySelector('#create-note').addEventListener('click', (e, note) => {
    const savedID = uuidv4()
    const time = moment().valueOf()
    notes.push({
        id: savedID,
        title: '',
        body: '',
        createdAt: time,
        editedAt: time,

    })
    console.log(savedID)
    location.assign(`edit.html#${savedID}`)
    saveNotes(notes)
    
    //sparar arrayen i localstorage
})

/*document.querySelector('#remove-all').addEventListener('click', function () {
    document.querySelectorAll('.notes').forEach(function(note) {
        note.remove()
    })
})*/

document.querySelector("#search-text").addEventListener('input', (e) =>  {
    //selects the search text field and adds a input event listener.
    filters.searchText = e.target.value
    //saves the target value (textfield) in SearchText
    renderNotes(notes, filters)
})


document.querySelector('#filterDropDown').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener('storage', (e) => {
    if (e.key === "notes") {
        notes = JSON.parse(e.newValue)
        renderNotes(notes,filters)
        
    }


    //om den hittar note i objektet utifrån id:t i hashen sparas det i note.
})


//Unix Epoch January 1st 1970 00:00:00
//-6000

/*const now = moment()
now.subtract(1, 'week').subtract(20, 'days')
//now.minute(1)
console.log(now.format('MMMM Do, YYYY'))
//November 3rd, 2003
console.log(now.fromNow())

const nowTimeStamp = now.valueOf()

console.log(moment(nowTimeStamp).toString())
console.log("------------------")

const newBirthday = moment().set('year', 1990).set('Month', 11).set('Date', 6)
console.log(newBirthday.format('MMM D, YYYY'))*/





/*document.querySelector("#name-form").addEventListener('submit', function (e) {
    e.preventDefault()
    console.log(e.target.elements.firstName.value)
    //dom element in the form
    e.target.elements.firstName.value = ''

})*/





/*const ps = document.querySelectorAll('p') //returns array


ps.forEach(function (p) {
    //p.remove()
    ps.remove()
    //changes value
})*/

/*const newParagraph = document.createElement('p')
newParagraph.textContent = 'This is a new element from Javascript'
document.querySelector('body').appendChild(newParagraph) //put last to.*/