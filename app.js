var notes = [];

// Registering all the event handlers when the page loads
document.addEventListener("DOMContentLoaded", event => {
    renderNotes();

    document.querySelector("form").addEventListener("submit", event => {
        event.preventDefault();
        const note = document.querySelector("textarea").value;
        if (note.length==0) {
            alert("You didn't input any content");
        } else {
            notes.push(note);
            renderNotes();
            document.querySelector("textarea").value = "";
        }
    });

    document.querySelector("#btnLearn").addEventListener("click", event => {
        location.href = "https://frontendmasters.com";
    })

    // if(navigator.storage && navigator.storage.persist) {
    //     const granted = await navigator.storage.persist();
    //     track('storage-persist-request', granted);
    // }

    //chrome only for an install button before app is installed

    document.getElementById("btnInstall").addEventListener("click", event => {
       // navigator.app.install
       console.log('bipEvent', bipEvent)
       if(bipEvent){
        bipEvent.prompt();
       } else {
        alert("i'm sorry, do it manually");
       }
    });
    let bipEvent = null
    window.addEventListener('beforeinstallprompt', event => {
        document.querySelector("#btnInstall").disabled = false;
        event.preventDefault()
        bipEvent = event;
    });

})

// Render the notes on the DOM
function renderNotes() {
    const ul = document.querySelector("#notes");
    ul.innerHTML = "";
    notes.forEach( (note, index) => {
        // Create the note LI
        const li = document.createElement("li");
        li.innerHTML = note;
        // Delete element for each note
        const deleteButton = document.createElement("a");
        deleteButton.innerHTML = '<span class="icon">delete</span>';
        deleteButton.addEventListener("click", event => {
            if (confirm("Do you want to delete this note?")) {
                notes.splice(index, 1);
                renderNotes();
            }
        });
        li.appendChild(deleteButton);
        ul.appendChild(li);
    })
}
