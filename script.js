/* javascript code  */
// defing buttons

const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
closeIcon = popupBox.querySelector("header i"),
addBtn = popupBox.querySelector("button"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea");

const months = ["Jan", "Fab", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

// getting localstorage notes if exist and parsing them 
// to js object else passing an empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

let isUpdate = false, updateId; 
addBox.addEventListener("click", ()=> {
    popupBox.classList.add("show");
})

closeIcon.addEventListener("click", ()=> {;
    isUpdate = false
    titleTag.value = "";
    descTag.value = "";
    addBtn.innerText = "Add New Note";
    document.querySelector(".popup-box .popup .content header p").innerText = "Add Note";
    popupBox.classList.remove("show");
})

// show notes 
function showNotes() {
    // remove duplicate note
    document.querySelectorAll(".note").forEach(note => note.remove());
    // loop through notes array or object 

    notes.forEach((note, index) => {
        let liTag = ` <li class="note">
                        <div class="title">${note.title}</div>
                        <span class="uil uil-dice-four">${note.date} </span>
                            <p class="details">
                            ${note.description}
                            </p>
                        <div class="settings">
                                    <div onclick="showMenu(this)" class="uil action uil-edit-alt">...</div>
                                    <div class="menu">
                                        <span onclick="updateNote(${index}, '${note.title}', '${note.description}')" class="uil uil-edit">Edit</span>
                                        <span onclick="deleteNote(${index})" class="uil uil-trash">Delete</span>
                                    </div>
                        </div>

                        </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
    })
}
showNotes();

// removeing show class form the settings menu on document click
function showMenu(elm) {
    elm.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target != elm) {
    elm.parentElement.classList.remove("show");
        }
    })
}

function updateNote(noteId, title, desc) {
    // console.log(noteId, title, desc);
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    addBtn.innerText = "Update Note";
    document.querySelector(".popup-box .popup .content header p").innerText = "Upate Note";
    titleTag.value = title;
    descTag.value = desc;
    
}

function deleteNote(noteId) {
    // console.log(noteId)
    notes.splice(noteId, 1); // removing selected note from array/tasks
    // saving updated notes to localstorage
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
} 
addBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    console.log("Add button clicked");

    let noteTitle = titleTag.value,
     noteDesc = descTag.value;
    if(noteTitle || noteDesc) {
        // console.log(noteTitle + " " + noteDesc);
        // getting month name from the array

        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle, description: noteDesc, date: `${month} ${day}, ${year}`
        }
        if(!isUpdate) {
            notes.push(noteInfo); // adding new note to notes
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo; // updating specific note
        }
            // console.log(noteInfo);
        // saving notes to localstorage
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes();

    }
})

