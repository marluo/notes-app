'use strict'


// add a dom element between the title and body input empty (span)
// set the text value last edited 4 hours agpo
const titleInput = document.querySelector('#note-title')
const noteInput = document.querySelector('#body')
const removeNoteButton = document.querySelector('#remove-button')
const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#body')
let spanElement = document.querySelector('#spanEdit')

const noteId = location.hash.substring(1)
console.log(noteId)
let notes = getNotes()
let note = notes.find((note) => note.id === noteId)


if (!note) /*if there is no note  */ {
    location.assign('/index.html')
}

spanElement.textContent = updateEdited(note.editedAt)

titleInput.value = note.title
noteInput.value = note.body
//sparar body o title från samma objekt vi klickade på då vi pushar i dess objekt hash.

titleInput.addEventListener('input', (e) => {
    const time = moment().valueOf()
    //skapar ny tid vid "moment" som vi gör ny input
    note.editedAt = time
    //sparar den i en variabel för att göra koden lättare att läsa (för mig)
    note.title = e.target.value
    //sparar ny värdet från target (input) i title i indexen som vi har i notes.
    spanElement.textContent = updateEdited(note.editedAt)
    //updaterar texten när den senast blev editerad och passar in den nya tiden i en funktion för att kunna skriva ut det.
    console.log(note)
    saveNotes()

})

noteInput.addEventListener('input', (e) => {
    const time = moment().valueOf()
    note.editedAt = time
    note.body = e.target.value
    spanElement.textContent = updateEdited(note.editedAt)
    console.log(note)
    saveNotes()

})

removeNoteButton.addEventListener('click', (e) => {
    removeNote(noteId)
    saveNotes()
    location.assign('/index.html')
})
//key is object name



//detta är till för att man ska kunna uppdatera sidor om storage ändras. Te.x så ändras storage så körs denna funktion. 
window.addEventListener('storage',(e) => {
    if (e.key === "notes") {
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => note.id === noteId)
    }

    if (!note) {
        location.assign('/index.html')
    }

    //om den hittar note i objektet utifrån id:t i hashen sparas det i note.
    titleInput.value = note.title
    noteInput.value = note.body
    spanElement.textContent = updateEdited(note.editedAt)
    
})

    //om den hittar note i objektet utifrån id:t i hashen sparas det i note.


