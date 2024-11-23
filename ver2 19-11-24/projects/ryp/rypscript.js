function toggleDetails(elementId) {
    const element = document.getElementById(elementId);
    element.style.display = (element.style.display === 'none' || element.style.display === '') ? 'block' : 'none';
}

document.addEventListener("DOMContentLoaded", function() {
    const phaseDetails = document.querySelectorAll('.phase-details');
    const stepDetails = document.querySelectorAll('.step-details');
    phaseDetails.forEach(element => element.style.display = 'none');
    stepDetails.forEach(element => element.style.display = 'none');
});

document.querySelectorAll("h3").forEach(h3 => {
    h3.addEventListener("click", function(event) {
        const relatedH4s = h3.nextElementSibling.querySelectorAll("h4");
        relatedH4s.forEach(h4 => {
            h4.style.display = (h4.style.display === 'none' || h4.style.display === '') ? 'block' : 'none';
        });
    });
});

document.querySelectorAll("h4").forEach(h4 => {
    h4.addEventListener("click", function(event) {
        event.stopPropagation(); // Zabrání spuštění funkce na nadřazený <h3>
        const noteId = h4.getAttribute("data-id");
        showForm(noteId);
    });
});

const notesData = {}; // Objekt pro ukládání poznámek v aktuálním sezení
let sharedAdditionalNotes = ""; // Sdílená proměnná pro sekci "Další poznámky"

// Funkce pro zobrazení formuláře s konkrétním obsahem poznámek pro každou část
function showForm(noteId) {
    const noteContent = notesData[noteId] || { 
        bestPractices: "", 
        taskSteps: "" 
    };

    const noteTitle = document.querySelector(`[data-id="${noteId}"]`).textContent;
    document.getElementById("note-title").textContent = noteTitle;

    document.getElementById("best-practices").value = noteContent.bestPractices;
    document.getElementById("task-steps").value = noteContent.taskSteps;
    document.getElementById("additional-notes").value = sharedAdditionalNotes; // Sdílená poznámka

    document.getElementById("noteForm").style.display = "flex";
    document.getElementById("noteForm").setAttribute("data-id", noteId);
}

// Zavření formuláře
function closeForm() {
    document.getElementById("noteForm").style.display = "none";
}

// Uložení poznámek do objektu notesData pro konkrétní nadpis s jedinečnými a sdílenými sekcemi
function saveNote() {
    const noteId = document.getElementById("noteForm").getAttribute("data-id");
    const bestPractices = document.getElementById("best-practices").value;
    const taskSteps = document.getElementById("task-steps").value;
    
    // Uloží hodnotu sdílené sekce "Další poznámky"
    sharedAdditionalNotes = document.getElementById("additional-notes").value;

    // Uloží poznámky do notesData objektu
    notesData[noteId] = { bestPractices, taskSteps };
    console.log(`Poznámky uloženy pro ${noteId}:`, notesData[noteId]);
    console.log(`Sdílené poznámky:`, sharedAdditionalNotes);
    closeForm();
}
