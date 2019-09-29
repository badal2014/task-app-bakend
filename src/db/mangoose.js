const mongoose = require('mongoose');
const validator = require('validator')

// mongoose.connect('mongodb+srv://taskapp:goldmetal@cluster0-eb281.mongodb.net/test?retryWrites=true&w=majority', {
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true ,
    useCreateIndex :true ,
    // useFindAndModify : true
})
