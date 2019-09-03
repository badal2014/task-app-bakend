const mongoose = require('mongoose');
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true ,
    useCreateIndex :true ,
    useFindAndModify : false
})
// mongoose.connect('mongodb://127.0.0.1:27017/badal' , {useNewUrlParser: true})

// const Tasks  = mongoose.model('Tasks' , {
//     description : {
//         type : String,
//         required : true
//     },
//     completed :{
//         type : Boolean
//     }
// })
// const me = new Tasks({
//     description : "Completed AssetMint WorK",
//     completed : true
// })
// me.save()   