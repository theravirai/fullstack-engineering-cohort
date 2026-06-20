// js/taskManager.js

// In-memory tasks state array
let tasks = [];

/**
 * Creates a task card DOM element dynamically using native DOM APIs.
 * @param {Object} task - The task object.
 * @returns {HTMLElement} The constructed task card element.
 */
function createTaskCard(task) {
    // 1. Create the card container element using createElement
    const card = document.createElement('div');
    card.classList.add('task-card');

    // 2. Set custom data attributes using setAttribute()
    card.setAttribute('data-id', task.id);
    card.setAttribute('data-status', task.status);
    card.setAttribute('data-category', task.category);

    // DEMONSTRATION OF REQUIRED DOM ATTRIBUTE & PROPERTY APIs (Requirement 3):
    // - hasAttribute()
    if (card.hasAttribute('data-id')) {
        console.log(`[DOM API Demo] hasAttribute('data-id'): true`);
    }
    // - getAttribute()
    console.log(`[DOM API Demo] getAttribute('data-category'): ${card.getAttribute('data-category')}`);
    // - dataset property
    console.log(`[DOM API Demo] dataset.status: ${card.dataset.status}`);
    
    // - removeAttribute() demonstration
    card.setAttribute('data-temp', 'demo-to-be-removed');
    console.log(`[DOM API Demo] setAttribute('data-temp'): ${card.getAttribute('data-temp')}`);
    card.removeAttribute('data-temp');
    console.log(`[DOM API Demo] hasAttribute('data-temp') after removeAttribute(): ${card.hasAttribute('data-temp')}`);

    // 3. Construct Task Content Wrapper
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('task-content');

    // Create Title Element using createElement and createTextNode
    const titleEl = document.createElement('h3');
    titleEl.classList.add('task-title');
    const titleText = document.createTextNode(task.title);
    titleEl.appendChild(titleText);

    // Create Category Badge using createElement and createTextNode
    const categoryBadge = document.createElement('span');
    categoryBadge.className = `category-badge badge-${task.category}`;
    const categoryText = document.createTextNode(task.category);
    categoryBadge.appendChild(categoryText);

    // Append title and badge to the content container
    contentDiv.append(titleEl, categoryBadge);

    // 4. Construct Actions Wrapper (Complete, Edit, Delete button elements)
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('task-actions');

    const completeBtn = document.createElement('button');
    completeBtn.className = 'btn-icon btn-complete';
    completeBtn.setAttribute('aria-label', 'Complete task');
    completeBtn.appendChild(document.createTextNode('✓'));

    const editBtn = document.createElement('button');
    editBtn.className = 'btn-icon btn-edit';
    editBtn.setAttribute('aria-label', 'Edit task');
    editBtn.appendChild(document.createTextNode('✎'));

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-icon btn-delete';
    deleteBtn.setAttribute('aria-label', 'Delete task');
    deleteBtn.appendChild(document.createTextNode('🗑'));

    // Append buttons to the actions container using append
    actionsDiv.append(completeBtn, editBtn, deleteBtn);

    // 5. Assemble the final card
    card.append(contentDiv, actionsDiv);

    return card;
}

/**
 * Adds a new task to the in-memory array and renders it to the DOM container.
 * @param {string} title - The task title text.
 * @param {string} category - The task category value.
 * @returns {Object} The created task object.
 */
export function addTask(title, category) {
    const task = {
        id: Date.now().toString(),
        title: title,
        category: category,
        status: 'pending'
    };

    tasks.push(task);

    const taskList = document.getElementById('task-list');
    if (taskList) {
        const card = createTaskCard(task);
        // Add card to DOM using append()
        taskList.append(card);
    } else {
        console.warn('Task list container element (#task-list) not found in DOM.');
    }

    return task;
}

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

        // ATTRIBUTES VS PROPERTIES EXPLANATION:
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

        // Add task to state list and render it to the DOM
        addTask(title, category);

        // Reset form inputs (clears title input and resets select to default option)
        taskForm.reset();
    });

    // Centralized event listener on the parent task list container for Event Delegation
    const taskList = document.getElementById('task-list');
    if (taskList) {
        taskList.addEventListener('click', (e) => {
            // Find the closest button that matches our icon buttons
            const btn = e.target.closest('.btn-icon');
            if (!btn) return;

            // Find the closest parent task card container to read dataset metadata
            const card = btn.closest('.task-card');
            if (!card) return;

            const taskId = card.getAttribute('data-id');
            const task = tasks.find(t => t.id === taskId);
            if (!task) return;

            if (btn.classList.contains('btn-complete')) {
                // Complete Action
                task.status = task.status === 'pending' ? 'completed' : 'pending';
                card.setAttribute('data-status', task.status);
                console.log(`[Delegation Toggle] Task ${taskId} set to: ${task.status}`);
            } else if (btn.classList.contains('btn-edit')) {
                // Edit Action
                const newTitle = prompt('Edit task title:', task.title);
                if (newTitle === null) return;
                const trimmedTitle = newTitle.trim();
                if (trimmedTitle === '') {
                    alert('Task title cannot be empty.');
                    return;
                }
                task.title = trimmedTitle;

                const oldTitleEl = card.querySelector('.task-title');
                if (oldTitleEl) {
                    const newTitleEl = document.createElement('h3');
                    newTitleEl.classList.add('task-title');
                    newTitleEl.appendChild(document.createTextNode(task.title));
                    oldTitleEl.replaceWith(newTitleEl);
                }
                console.log(`[Delegation Edit] Task ${taskId} updated to: ${task.title}`);
            } else if (btn.classList.contains('btn-delete')) {
                // Delete Action
                tasks = tasks.filter(t => t.id !== taskId);
                card.remove();
                console.log(`[Delegation Delete] Task ${taskId} removed from memory and DOM`);
            }
        });
    }
}
