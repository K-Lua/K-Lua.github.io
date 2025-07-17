document.addEventListener('DOMContentLoaded', function() {
    const projectsContainer = document.getElementById('projects-container');
    const projects = ['project1', 'project2'];

    projects.forEach(function(project) {
        const projectLink = document.createElement('a');
        projectLink.href = `projects/${project}.html`;
        projectLink.textContent = project.charAt(0).toUpperCase() + project.slice(1);
        projectsContainer.appendChild(projectLink);
    });
});