function toggleDetails(elementId) {
    const element = document.getElementById(elementId);
    element.style.display = (element.style.display === 'block') ? 'none' : 'block';
}

// Zajištění, že všechny části začnou ve skrytém stavu
document.addEventListener("DOMContentLoaded", function() {
    const phaseDetails = document.querySelectorAll('.phase-details');
    const stepDetails = document.querySelectorAll('.step-details');
    phaseDetails.forEach(element => element.style.display = 'none');
    stepDetails.forEach(element => element.style.display = 'none');
});