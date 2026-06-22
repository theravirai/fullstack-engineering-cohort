# DOM Explorer: Task Manager

An interactive, responsive Task Manager built using native browser DOM APIs and Vanilla JavaScript. This application serves as a demonstration of core web browser rendering workflows, event handling mechanics, and DOM attributes vs object properties.

## Features
- **Dynamic Task Card Management**: Add, edit, toggle, and delete task cards dynamically without page reloads.
- **Coordinated Filter System**: Search tasks by title and filter them by category concurrently.
- **Custom Dialog Modals**: Elegant native HTML5 `<dialog>` implementations with backdrop blur replacing `alert`, `prompt`, and `confirm` dialogs.
- **Dynamic Stats Counter**: Real-time indicators of pending and completed tasks.
- **Responsive Premium Theme System**: An interface matching system light/dark choices, toggled smoothly via multiple DOM APIs, and persisted via `localStorage`.
- **Event Propagation Playground**: Interactive grandparent-parent-child setup illustrating Event Capturing and Event Bubbling flows.
- **Interactive Browser Rendering Guide**: A visual explanation of browser layout and painting sequences.

---

## Technical Concept Deep Dive

### 1. HTML Attributes vs DOM Properties
A common source of confusion in client-side development is the difference between attributes and properties.

| Feature | HTML Attributes | DOM Properties |
| :--- | :--- | :--- |
| **Definition** | Declared in the HTML source code markup. | Created as key-value pairs on JavaScript objects in DOM memory. |
| **Initial vs Live** | Represents the *initial* state of the element on load. | Represents the *live*, dynamic state of the element. |
| **API Access** | `element.getAttribute('value')`, `element.setAttribute()` | `element.value`, `element.textContent`, `element.disabled` |
| **Case Sensitivity** | Case-insensitive. | Case-sensitive. |

#### Code Demonstration
```javascript
const titleInput = document.getElementById('task-title');

// User types "Review Code" in the textbox
console.log(titleInput.value); 
// Output: "Review Code" (Live property reflects current state)

console.log(titleInput.getAttribute('value')); 
// Output: null (Initial HTML markup attribute remains unchanged)
```
In the task list cards, custom metadata is managed using custom attributes (`data-id`, `data-status`, `data-category`) and read via the `card.getAttribute()` API or the `card.dataset` DOM property object wrapper.

---

### 2. Event Delegation
To avoid attaching separate click event listeners to every task card (which decreases performance and requires manual binding on newly created cards), we employ **Event Delegation**.

#### How it Works
A single event listener is attached to the parent container (`#task-list`). When any child button (Complete, Edit, Delete) is clicked, the event bubbles up to the parent. The parent checks the target element to resolve the action:
```javascript
const taskList = document.getElementById('task-list');

taskList.addEventListener('click', (e) => {
    // Find the closest button that has class 'btn-icon'
    const btn = e.target.closest('.btn-icon');
    if (!btn) return;

    // Find the task card container to read attribute data
    const card = btn.closest('.task-card');
    const taskId = card.getAttribute('data-id');
    
    if (btn.classList.contains('btn-complete')) {
        // Handle completion
    } else if (btn.classList.contains('btn-edit')) {
        // Handle edit modal open
    } else if (btn.classList.contains('btn-delete')) {
        // Handle deletion
    }
});
```

---

### 3. Event Propagation: Capturing vs Bubbling
Events travel through the DOM tree in three distinct phases when triggered:
1. **Capture Phase**: The event descends from the `window` down to the target element (Outside-In).
2. **Target Phase**: The event reaches the target element.
3. **Bubble Phase**: The event ascends from the target back to the `window` (Inside-Out).

```
   Window (Event starts here in Capture Phase, ends here in Bubble Phase)
     │   ▲
     ▼   │
   Grandparent (Capturing listener triggers / Bubbling listener triggers)
     │   ▲
     ▼   │
    Parent (Capturing listener triggers / Bubbling listener triggers)
     │   ▲
     ▼   │
     Target (Child Button clicked)
```

In [js/eventDemo.js], Listeners are registered on both capturing and bubbling phases to log propagation:
- Bubbling (default): `element.addEventListener('click', handler)` or `element.addEventListener('click', handler, false)`
- Capturing: `element.addEventListener('click', handler, true)` or `element.addEventListener('click', handler, { capture: true })`

---

### 4. Browser Rendering Pipeline
When drawing elements to the screen, the rendering engine follows this sequence:
1. **Decode HTML bytes**: Converts network stream characters.
2. **Tokenization**: Parses characters into discrete HTML start/end tags, attributes, and text tokens.
3. **DOM Tree construction**: Links tokens together in a tree representing document structure.
4. **CSSOM Tree construction**: Parsed stylesheets establish a hierarchical tree of rules.
5. **Render Tree building**: Combines DOM and CSSOM trees, filtering out items that are not displayed (e.g. `<head>`, elements with `display: none`).
6. **Layout**: Computes dimensions, absolute coordinates, and grid layouts on the viewport.
7. **Paint**: Fills in vector layouts with physical display pixels (rasterization).

---
