// js/app.js
import { initTaskForm } from './taskManager.js';
import { initTheme } from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Explorer Task Manager module initialized.');
    initTheme();
    initTaskForm();
});
