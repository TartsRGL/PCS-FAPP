function toggleDetails(projectId) {
    const projectDetails = document.getElementById(projectId);
    if (projectDetails.style.display === "none" || projectDetails.style.display === "") {
        projectDetails.style.display = "block";
    } else {
        projectDetails.style.display = "none";
    }
}
