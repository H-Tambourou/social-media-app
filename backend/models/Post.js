const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
    userId:{
        type:"string",
        required:true
    },
    desc:{
        type:"string",
        max:500
    },
    img:{
        type:"string"
    },
    likes:{
        type:Array,
        default:[]
    },
    },
    {timestamps: true }

);

module.exports = mongoose.model("Post", PostSchema);