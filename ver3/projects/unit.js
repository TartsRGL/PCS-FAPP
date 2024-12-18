// Funkce pro přepínání viditelnosti prvku na základě jeho ID
function toggleDetails(elementId) {
    const element = document.getElementById(elementId);
    // Nastaví styl display na 'block' nebo 'none' podle aktuálního stavu
    element.style.display = (element.style.display === 'none' || element.style.display === '') ? 'block' : 'none';
}

// Nastavení výchozího zobrazení po načtení dokumentu
document.addEventListener("DOMContentLoaded", function() {
    const phaseDetails = document.querySelectorAll('.phase-details'); // Skryje všechny sekce fáze
    const stepDetails = document.querySelectorAll('.step-details');   // Skryje všechny kroky
    phaseDetails.forEach(element => element.style.display = 'none');
    stepDetails.forEach(element => element.style.display = 'none');
});

// Kliknutí na h3 zobrazí/sbalí následující h4 prvky
document.querySelectorAll("h3").forEach(h3 => {
    h3.addEventListener("click", function(event) {
        const relatedH4s = h3.nextElementSibling.querySelectorAll("h4"); // Najde všechny podřízené h4
        relatedH4s.forEach(h4 => {
            // Přepne viditelnost každého h4 mezi 'block' a 'none'
            h4.style.display = (h4.style.display === 'none' || h4.style.display === '') ? 'block' : 'none';
        });
    });
});

// Kliknutí na h4 zobrazí formulář pro poznámky bez spuštění akce na nadřazený h3
document.querySelectorAll("h4").forEach(h4 => {
    h4.addEventListener("click", function(event) {
        event.stopPropagation(); // Zabrání spuštění funkce na nadřazený <h3>
        const noteId = h4.getAttribute("data-id"); // Získá data-id pro otevření poznámky
        showForm(noteId); // Otevře modální okno s formulářem
    });
});

// Objekt notesData uchovává poznámky pro každou část, sdílená proměnná pro "Další poznámky"
const notesData = {}; 
let sharedAdditionalNotes = ""; 

// Funkce showForm zobrazí formulář s existujícími poznámkami nebo prázdným formulářem
function showForm(noteId) {
    // Načte existující poznámky nebo vytvoří prázdné, pokud ještě nejsou uložené
    const noteContent = notesData[noteId] || { 
        bestPractices: "", 
        taskSteps: "" 
    };

    // Nastaví nadpis formuláře podle nadpisu <h4> (data-id)
    const noteTitle = document.querySelector(`[data-id="${noteId}"]`).textContent;
    document.getElementById("note-title").textContent = noteTitle;

    // Nastaví obsah formuláře na existující nebo prázdné poznámky
    document.getElementById("best-practices").value = noteContent.bestPractices;
    document.getElementById("task-steps").value = noteContent.taskSteps;
    document.getElementById("additional-notes").value = sharedAdditionalNotes; 

    // Zobrazí modální okno
    document.getElementById("noteForm").style.display = "flex";
    document.getElementById("noteForm").setAttribute("data-id", noteId);
}

// Zavře formulář pro poznámky
function closeForm() {
    document.getElementById("noteForm").style.display = "none";
}

// Uloží poznámky do objektu notesData a sdílenou poznámku
function saveNote() {
    const noteId = document.getElementById("noteForm").getAttribute("data-id");
    const bestPractices = document.getElementById("best-practices").value;
    const taskSteps = document.getElementById("task-steps").value;
    
    // Uloží sdílenou poznámku
    sharedAdditionalNotes = document.getElementById("additional-notes").value;

    // Uloží poznámky do notesData objektu
    notesData[noteId] = { bestPractices, taskSteps };
    console.log(`Poznámky uloženy pro ${noteId}:`, notesData[noteId]);
    console.log(`Sdílené poznámky:`, sharedAdditionalNotes);
    closeForm();
}
