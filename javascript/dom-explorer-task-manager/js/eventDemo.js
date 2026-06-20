// js/eventDemo.js

/**
 * Event Propagation Demonstration module.
 * 
 * BUBBLING vs CAPTURING:
 * - Event Capturing (Trickling): The event starts from the window and trickles down 
 *   the DOM tree to the target element (outermost -> innermost).
 * - Event Bubbling: The event bubbles up from the target element to the window (innermost -> outermost).
 * 
 * Target Phase: The phase when the event reaches the actual element that was clicked (e.target).
 * 
 * useCapture parameter:
 * - In element.addEventListener(type, listener, useCapture), if useCapture is set to true,
 *   the listener is registered for the capturing phase. If false or omitted, it is registered for bubbling.
 */
export function initEventDemo() {
    const grandparent = document.getElementById('grandparent-box');
    const parent = document.getElementById('parent-box');
    const child = document.getElementById('child-button');

    if (!grandparent || !parent || !child) {
        console.warn('Event propagation demo elements not found.');
        return;
    }

    // Helper logger to make console outputs readable
    const logEvent = (phase, element, e) => {
        // e.target represents the element that triggered/dispatched the event (where the click actually occurred).
        // e.currentTarget represents the element currently handling the event (where the listener is attached).
        console.log(
            `%c[${phase}] %cHandler: ${element} %c| Target: ${e.target.id} | CurrentTarget: ${e.currentTarget.id}`,
            phase === 'CAPTURING' ? 'color: #3b82f6; font-weight: bold;' : 'color: #10b981; font-weight: bold;',
            'font-weight: bold; color: inherit;',
            'color: #6b7280;'
        );
    };

    // ----------------------------------------------------
    // 1. CAPTURING LISTENERS (Third argument is true)
    // ----------------------------------------------------
    grandparent.addEventListener('click', (e) => {
        logEvent('CAPTURING', 'Grandparent', e);
    }, true);

    parent.addEventListener('click', (e) => {
        logEvent('CAPTURING', 'Parent', e);
    }, true);

    child.addEventListener('click', (e) => {
        logEvent('CAPTURING', 'Child Button', e);
    }, true);

    // ----------------------------------------------------
    // 2. BUBBLING LISTENERS (Third argument is false/omitted)
    // ----------------------------------------------------
    grandparent.addEventListener('click', (e) => {
        logEvent('BUBBLING', 'Grandparent', e);
    }, false);

    parent.addEventListener('click', (e) => {
        logEvent('BUBBLING', 'Parent', e);
    }, false);

    child.addEventListener('click', (e) => {
        logEvent('BUBBLING', 'Child Button', e);
    }, false);
}
