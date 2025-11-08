const p = new Promise((resolve, reject) => {
    /* Notice how the promise is immediately resolved, so its fulfilled, with a result == 1 */
    resolve(1);
})
    /* First Promise Raction RETURNS a new result, so CREATES ANOTHER PROMISE, RESOLVED, with result == 2 */
    .then(result => {console.log(result); return result * 2})
    /* Also RETURNS a new result, so CREATES ANOTHER PROMISE, RESOLVED, with result == 4 */
    .then(result => {console.log(result); return result * 2})
    /* Last promise does not return, so it has an undefined result, but the promise object itself is fulfilled so we see logged 4 */
    .then(result => console.log(result))

console.log("FINALLY")

/* since everything is queued in the microtask queue BUT the last log, we should see: FINALLY, 1, 2, 4 */

/** 
 * This Promise chaining is useful in multi-chained async scenarios, let's take the example of fetching some user data, that we need to go through until get to a specific comment of one of his posts :
 * (that means multiple chained async backend call: getUser -> getUserPosts -> getUserComments)
 * fetch("https://mainAPIUrl:443/getUser/?user=myUser")
 *  .then((user) => {
 *      console.log("User Id:", user.id);
 *      return fetchUserPosts(user.id);
 * })
 * .then((posts) => {
 *      console.log("User Posts:", posts);
 *      return fetchPostComments(posts[0].id);
 * })
 * .then((comments) => {
 *      console.log("User comments:", comments);
 * })
 */