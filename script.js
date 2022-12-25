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
const notes = JSON.parse(localStorage.getItem("notes")|| "[]");

addBox.addEventListener("click", ()=> {
    popupBox.classList.add("show");
})

closeIcon.addEventListener("click", ()=> {
    popupBox.classList.remove("show");
})

// show notes 
function showNotes(){
    notes.forEach(note => {
    
    });
}
showNotes();
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
            // console.log(noteInfo);
            notes.push(noteInfo); // adding new note to notes
        // saving notes to localstorage
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
    }
})

