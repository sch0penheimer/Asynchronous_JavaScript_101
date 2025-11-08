/** A new alternative for promise chaining is async/await, a basic syntactic "sugar-coat" for promises ! **/


/* First of all let's start with a basic Promise Chain, and then tackle its alternative using aync/await */

/* Here we define a function that will use some sort of async calls, imagine it like we are coding OUR OWN fetch(), so we will return a promise! */
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

/* Second async function, called only after the initial one is finished ( promise-chaining :) ) */
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


filterUser(user1)
    .then(filteredUser => {
        console.log("User Succefully Validated! Now Querying the backend");
        return queryBackend(filteredUser)
    })
    .then(response => {
        console.log("Backend queried successfuly, response: ", response)
    })
    .catch(err => {
        console.err("User not valid ! Error: ", err)
    })


filterUser(user2)
    .then(filteredUser => {
        console.log("User Succefully Validated! Now Querying the backend");
        return queryBackend(filteredUser)
    })
    .then(response => {
        console.log("Backend queried successfuly, response: ", response)
    })
    .catch(err => {
        console.err("User not valid !")
    })
