// This does not have anything to do with a form
// This also needs some changing with the URL for when the node file is acutally deployed
fetch(url, {
    method: "POST",
    body: {
        id : id,
        name : name,
        date : date,
        sets : sets,
        reps : reps,
        other : other
    }
})

fetch(url, {
    method: "DELETE",
    body: {
        id : id
    }
})

fetch(url, {
    method: "GET",
    body: {
        name : name,
        date : date,
        sets : sets,
        reps : reps,
    }
})

fetch(url, {
    method: "PUT",
    body: {
        id : id,
        name : name,
        date : date,
        sets : sets,
        reps : reps,
        other : other
    }
})
