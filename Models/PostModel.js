const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    name:{type:String},
    avatar:{type:String},
    description:{type:String,required:true},
    media:{type:String},
    likes:{type:Number},
    comments:{type:[String]}
})

const PostModel = mongoose.model('Post', postSchema)

module.exports = PostModel
