/** A new alternative for promise chaining is async/await, a basic syntactic "sugar-coat" for promises ! **/


/* -> First of all let's start with a basic Promise Chain, and then tackle its alternative using aync/await */

/* 1) Here we define a function that will use some sort of "async calls", imagine it like we are coding OUR OWN fetch(), so it will return a promise! */
function filterUser(user) {
    const p = new Promise((resolve, reject) => {
        console.log("Filtering User:", user);
        if (user.name == "Haitam") {
            resolve(user);
        }
        else {
            console.log("User is different than Haitam, cannot be passed !")
            reject(user);
        }
    })
    return p;
}

/* 2) Second async function, called only after the initial one is finished ( promise-chaining :) ) */
function queryBackend(user) {
    return new Promise((resolve, reject) => {
        resolve(user);
    })
}

/*---------------------*/

const user1 = {
    name: "Haitam",
    username: "sch0penheimer"
}, user2 = {
    name: "NotHaitam",
    username: "not_sch0penheimer"
}


/* Main resolved chain example */
filterUser(user1)
    .then(filteredUser => {
        console.log("User Succefully Validated! Now Querying the backend");
        return queryBackend(filteredUser)
    })
    .then(response => {
        console.log("Backend queried successfuly, response: ", response)
    })
    .catch(err => {
        console.log("User not valid ! Error: ", err);
    })

/* Second chain with a rejection example */
filterUser(user2)
    .then(filteredUser => {
        console.log("User Succefully Validated! Now Querying the backend");
        return queryBackend(filteredUser)
    })
    .then(response => {
        console.log("Backend queried successfuly, response: ", response)
    })
    .catch(err => {
        console.log("User not valid ! Error: ", err);
    })

/*
    The Execution Order should be:
        1) filterUser(user1) call
        2) synchronous console.log() with "Filtering User: Haitam"
        3) Resolved, so the .then() callback is passed as a Promise Reaction Fullfiled handler, and immediatly queued to the MicroTask Queue (1st)
        4) filterUser(user2) call
        5) synchronous console.log() with "Filtering User: NotHaitam"
        6) Didnt pass the condition, so first thing is the synchronous console.log() with "User is different than Haitam, cannot be passed !"
        7) Second thing is the Rejection, so the .catch() callback is passed as a Promise Reaction Rejected handler, and immediatly queued to the MicroTask Queue (2nd)
        8) Script ended, so the Call stack is empty
        9) Event Loop now dequeues frist MicroTask Queue element (console.log("User Succefully Validated! Now Querying the backend"); return queryBackend(filteredUser))
        10) results in sychronous console.log() with "User Succefully Validated! Now Querying the backend"
        11) pushes a second promise reaction hanlder to the Microtask queue due to the return queryBackend(filteredUser), that resolves the filteredUser's promise;
        12) Event Loop dequeues the second MicroTask Queue element (the .catch() callback: err => {console.log("User not valid ! Error: ", err);})
        13) Synchronous console.log() with "User not valid ! Error: " + err
        14) Event Loop dequeues the last MicroTask Queue element, which is the last callback from the second chained resolve.
        15) Synchronous console.log() with ""Backend queried successfuly, response: ", response"


    -> So the Order is :
            Filtering User: {name: "Haitam", username: "sch0penheimer"}
            Filtering User: {name: "NotHaitam", username: "not_sch0penheimer"}
            User is different than Haitam, cannot be passed !
            User Succefully Validated! Now Querying the backend
            User not valid ! Error: {name: "NotHaitam", username: "not_sch0penheimer"}
            Backend queried successfuly, response: {name: "Haitam", username: "sch0penheimer"}
*/