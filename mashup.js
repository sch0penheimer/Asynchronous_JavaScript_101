/* Initially a classic inistantly resolved promise, so the handler callback -> microtask Q */
Promise.resolve()
    .then(() => console.log(1));

/* Callback-based Web API, after 10 ms -> pushed to the Task Queue */
setTimeout(() => console.log(2), 10);

/* Explicit Micro Task queue push, 1st a basic console Log, then another MT Q push */
queueMicrotask(() => {
    console.log(3);
    queueMicrotask(() => console.log(4));
});

/* Synchronous console log */
console.log(5);

/** The order should be: 5, 1, 3, 4, 2 **/