require('../src/db/mangoose');
const User = require('../src/models/users');

User.findByIdAndUpdate("5d6b60b1525cba4a4ba4a5c9" , {age : 1}).then((user) => {
    console.log(user)
    User.countDocuments({age : 1})
}).then((result) => {
    console.log(result)
})
.catch((e) => {
    console.log(e)
})