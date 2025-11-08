console.log(0);

/* Delegated to the Web API, so the callbacks are pushed to the Task Queue, and the event loop waits for the call stack to be empty */
setTimeout(() => console.log(1), 0);

setTimeout(() => console.log(2), 0);

/* Synchronous tasks, pushed normally to the call stack */
console.log(3);
console.log(4);
console.log(5);

/* Order should be: 0, 3, 4, 5, 1, 2 */