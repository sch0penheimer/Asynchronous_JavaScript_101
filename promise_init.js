console.log(0);

/* Delegated to the Web API, and later callbacked to the Task Queue */
setTimeout(() => console.log(1), 0);

/* Executor function initially to Web API, then .then() registers the handler fulfill reaction, the web api callback returns the resolve() via the Task Queue, handled and switches the object state to fullfiled, then we push the .then() callback to the microtask queue */
const p = new Promise((resolve, reject) => {
    setTimeout(() => resolve(2), 0);
})
    .then(result => console.log(result));

console.log(3);

/* So the order should be 0, 3, 1, 2 */