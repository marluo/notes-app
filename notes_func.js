'use strict'


const getNotes = () => {
    const notesJSON = localStorage.getItem('notes') //reads notes

    try {
        return notesJSON ? JSON.parse(notesJSON) : []

    } catch (e) {
        return []

    }

}

//savesNotes
const saveNotes = (note) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}


//Ta bort en note från listan. Vi skickar in ID i detta fall, för att jämföra och se om den finns i listan. hittar den en match tar den bort den.
const removeNote = (id) => {
    //passar in ID från objektet 
    const noteIndex = notes.findIndex((note) => note.id === id)



    if(noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}



// Generate the DOM structure for a note

const generateDOM = (note) => {
    const noteEl = document.createElement('a')
    const anchor = document.createElement('p')
    const button = document.createElement('button')
    const status = document.createElement('p')



    // anchor.href = `/edit.html#${note.id}`
    // setup the remove note button 
    /*button.textContent = 'x'
    noteEl.appendChild(button)
    button.addEventListener('click',(e) => { //när man klickar på X
        console.log(note)
        removeNote(note.id) //eftersom att den skapar upp alla IDS när siten refreshas så fungerar detta.
        saveNotes(notes) //saves to localstorage
        renderNotes(notes, filters)
    })*/


    //setup the note title text
    if (note.title.length > 0) {
        //om note.title i objektet är länge än 0 i objektet notes == true
        anchor.innerText = note.title
        //spara note.title från objektet i html elementet noteEL

    } else {
        anchor.innerText = "anchor"
        //sparar i noteEl.textContet element (HTML) = 'Unnamed Note'.
    }

    anchor.classList.add('list-item_title')
    noteEl.appendChild(anchor)


    //Setup the link
    noteEl.href = `/edit.html#${note.id}`
    noteEl.classList.add('list-item')

    status.textContent = updateEdited(note.editedAt)
    status.classList.add('list-item__subtitle')
    noteEl.appendChild(status)

    return noteEl
    //returnera noteEL från det som sparades

}

//sort your notes by one of three ways
const sortLastEdited = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        //sortBy sparas ner i filters ifall vi ändrar valuen på den, och därför
        return notes.sort((compareOne, compareTwo) => {
            if (compareOne.editedAt > compareTwo.editedAt) {
                return -1

            } else if (compareOne.editedAt < compareTwo.editedAt) {
                return 1

            } else {
                return 0
            }
        })
    } else if (sortBy ==='byCreated') {
        console.log(notes)
        return notes.sort((compareOne, compareTwo) => {
            if (compareOne.createdAt > compareTwo.createdAt) {
                return -1

            } else if (compareOne.createdAt < compareTwo.createdAt) {
                return 1

            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetical') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1

            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1

            } else {
                return 0
            }
        })
    } else {
        return notes
    }

    "Funktion när jag väljer drodpown - > Passa in strängen till objektet och createdAt"


}


// render application notes
const renderNotes = (notes, filters) => {
    //create renderNotes takes all the notes and the filters and passes it in.
    notes = sortLastEdited(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase())
        //filters the notes array
        
        //filters and returns it to the array of filteredNotes

    )

    document.querySelector("#notes").innerHTML = ''

    if(filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            //forEacha filteredNotes (varje property)
            const noteEl = generateDOM(note)
            //kör funktionen generateDOM(note) och spara i noteEL
            document.querySelector('#notes').appendChild(noteEl)
        })

    } else {
        const empty = document.createElement('p')
        empty.textContent ="Nothing"
        empty.classList.add('empty-message')
        document.querySelector('#notes').appendChild(empty)
    }


}

const updateEdited = (timeEdited) => `Last Edited: ${moment(timeEdited).fromNow()}`