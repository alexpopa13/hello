function insertUser(data, table) {
    var item = {username: data.name, email: data.email};
    table.where({
        email: data.email
    }).read().done(function (results) {
        if (results.length > 0) {
            console.log("User already exists !");
        } else {
            console.log("User inserted !");
            table.insert(item);
        }
    }, function (err) {
        console.log("Error: " + err);
    });
}