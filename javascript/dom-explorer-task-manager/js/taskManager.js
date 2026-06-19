// js/taskManager.js

/**
 * Initializes the task creation form event listeners and handles form submission.
 */
export function initTaskForm() {
    const taskForm = document.getElementById('task-form');
    if (!taskForm) {
        console.warn('Task form element not found in DOM.');
        return;
    }

    taskForm.addEventListener('submit', (e) => {
        // Prevent default browser behavior of submitting the form and reloading the page.
        e.preventDefault();

        const titleInput = document.getElementById('task-title');
        const categorySelect = document.getElementById('task-category');

        if (!titleInput || !categorySelect) {
            console.error('Task form inputs could not be found.');
            return;
        }

        // Retrieve the current values using the elements' value property
        const title = titleInput.value;
        const category = categorySelect.value;

        // ATTRIBUTES VS PROPERTIES EXPLANATION (Required by assignment rules):
        // 
        // 1. PROPERTY (e.g., titleInput.value):
        //    - Represents the dynamic, current state of the DOM element as it exists in the active browser page.
        //    - Changes in real-time as the user types or interacts with the page.
        //
        // 2. ATTRIBUTE (e.g., titleInput.getAttribute("value")):
        //    - Represents the initial/default value written in the HTML source code when the page first parsed.
        //    - Does not automatically update when a user types into the input box.
        //
        // Demo logging:
        console.log('Dynamic PROPERTY (titleInput.value):', title);
        console.log('Static ATTRIBUTE (titleInput.getAttribute("value")):', titleInput.getAttribute('value'));
        console.log('Task Category Selected:', category);

        // Reset form inputs (clears title input and resets select to default option)
        taskForm.reset();
    });
}
