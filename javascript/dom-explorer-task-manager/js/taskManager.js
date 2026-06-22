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
        
        // Apply current active filters to the new task card
        applyFilters();

        // Update task counters (Phase 9)
        updateCounters();
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
                
                // Update counters after completion toggled
                updateCounters();
            } else if (btn.classList.contains('btn-edit')) {
                // Open Custom Edit Dialog instead of prompt() (Phase 9 Expansion)
                const editDialog = document.getElementById('edit-dialog');
                const editInput = document.getElementById('edit-task-title');
                if (editDialog && editInput) {
                    editInput.value = task.title;
                    editDialog.setAttribute('data-task-id', taskId);
                    editDialog.showModal();
                }
                console.log(`[Dialog Trigger] Opened edit modal for task: ${taskId}`);
            } else if (btn.classList.contains('btn-delete')) {
                // Delete Action
                tasks = tasks.filter(t => t.id !== taskId);
                card.remove();
                console.log(`[Delegation Delete] Task ${taskId} removed from memory and DOM`);
                
                // Update counters after task deleted
                updateCounters();
            }
        });
    }

    // Clear All Tasks Button Click Handler
    const clearAllBtn = document.getElementById('clear-all-btn');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', () => {
            if (tasks.length === 0) return; // Guard

            const confirmDialog = document.getElementById('confirm-clear-dialog');
            if (confirmDialog) {
                confirmDialog.showModal();
            }
        });
    }

    // Initialize task search and filtering functionality (Phase 9)
    initTaskFilters();
    
    // Initialize task counters (Phase 9)
    updateCounters();

    // Initialize custom dialog elements & events (Phase 9 Expansion)
    initCustomDialogs();
}

/**
 * Applies both search and category filters on all visible task cards in the DOM.
 */
export function applyFilters() {
    const searchInput = document.getElementById('task-search');
    const categoryFilter = document.getElementById('task-category-filter');

    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedCategory = categoryFilter ? categoryFilter.value : 'all';

    const taskCards = document.querySelectorAll('.task-card');

    taskCards.forEach(card => {
        const titleEl = card.querySelector('.task-title');
        // Read custom data-category attribute set during card creation
        const cardCategory = card.getAttribute('data-category');

        let matchesSearch = true;
        let matchesCategory = true;

        if (titleEl) {
            // PROPERTY vs ATTRIBUTE demonstration/use:
            // - titleEl.textContent is a live DOM property reflecting the current visible text node content.
            const titleText = titleEl.textContent.toLowerCase();
            matchesSearch = titleText.includes(query);
        }

        if (selectedCategory !== 'all') {
            matchesCategory = (cardCategory === selectedCategory);
        }

        // Only show if the task card matches both search and category filter criteria
        if (matchesSearch && matchesCategory) {
            card.classList.remove('is-hidden');
        } else {
            card.classList.add('is-hidden');
        }
    });

    console.log(`[Task Filter] Applied filters - Query: "${query}", Category: "${selectedCategory}"`);
}

/**
 * Initializes listeners for search input and category filter change events.
 */
export function initTaskFilters() {
    const searchInput = document.getElementById('task-search');
    const categoryFilter = document.getElementById('task-category-filter');

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
}

/**
 * Updates the pending and completed task counters in the UI.
 */
export function updateCounters() {
    const pendingCount = tasks.filter(t => t.status === 'pending').length;
    const completedCount = tasks.filter(t => t.status === 'completed').length;

    const pendingEl = document.getElementById('pending-count');
    const completedEl = document.getElementById('completed-count');

    if (pendingEl) {
        // Update DOM textContent property
        pendingEl.textContent = pendingCount;
    }
    if (completedEl) {
        // Update DOM textContent property
        completedEl.textContent = completedCount;
    }

    // Enable/disable Clear All button based on tasks length (replaces No Tasks Alert)
    const clearAllBtn = document.getElementById('clear-all-btn');
    if (clearAllBtn) {
        clearAllBtn.disabled = (tasks.length === 0);
    }

    console.log(`[Task Stats] Counters updated - Pending: ${pendingCount}, Completed: ${completedCount}`);
}

/**
 * Setup custom dialog forms and click event handlers (Phase 9 Expansion).
 */
export function initCustomDialogs() {
    const editDialog = document.getElementById('edit-dialog');
    const editForm = document.getElementById('edit-form');
    const editCancelBtn = document.getElementById('edit-cancel-btn');

    if (editForm && editDialog) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent standard browser dialog return behavior
            const taskId = editDialog.getAttribute('data-task-id');
            const editInput = document.getElementById('edit-task-title');
            if (!editInput) return;

            const trimmedTitle = editInput.value.trim();
            if (trimmedTitle === '') return;

            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.title = trimmedTitle;

                const card = document.querySelector(`.task-card[data-id="${taskId}"]`);
                if (card) {
                    const oldTitleEl = card.querySelector('.task-title');
                    if (oldTitleEl) {
                        const newTitleEl = document.createElement('h3');
                        newTitleEl.classList.add('task-title');
                        newTitleEl.appendChild(document.createTextNode(task.title));
                        oldTitleEl.replaceWith(newTitleEl);
                    }
                }
                console.log(`[Dialog Edit] Task ${taskId} updated to: ${task.title}`);
            }
            editDialog.close();
        });
    }

    if (editCancelBtn && editDialog) {
        editCancelBtn.addEventListener('click', () => {
            editDialog.close();
        });
    }

    const confirmDialog = document.getElementById('confirm-clear-dialog');
    const confirmForm = document.getElementById('confirm-clear-form');
    const confirmCancelBtn = document.getElementById('confirm-cancel-btn');

    if (confirmForm && confirmDialog) {
        confirmForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Clear the state array
            tasks = [];
            
            // Clear all child nodes from the DOM container (using modern replaceChildren API)
            const taskList = document.getElementById('task-list');
            if (taskList) {
                taskList.replaceChildren();
            }
            
            updateCounters();
            confirmDialog.close();
            console.log('[Dialog Clear] Wiped all task nodes and memory state.');
        });
    }

    if (confirmCancelBtn && confirmDialog) {
        confirmCancelBtn.addEventListener('click', () => {
            confirmDialog.close();
        });
    }

    // Light dismiss fallback for browsers lacking closedby="any" support (Safari compatibility)
    const dialogs = document.querySelectorAll('dialog[closedby="any"]');
    dialogs.forEach(dialog => {
        if (!('closedBy' in HTMLDialogElement.prototype)) {
            dialog.addEventListener('click', (event) => {
                if (event.target !== dialog) return;

                const rect = dialog.getBoundingClientRect();
                const isDialogContent = (
                    rect.top <= event.clientY &&
                    event.clientY <= rect.top + rect.height &&
                    rect.left <= event.clientX &&
                    event.clientX <= rect.left + rect.width
                );

                if (!isDialogContent) {
                    dialog.close();
                }
            });
        }
    });
}
