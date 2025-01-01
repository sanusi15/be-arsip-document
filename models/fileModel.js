const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title File is Required ']
    },
    size: {
        type: Number,
        required: [true, 'Size File is Required']
    },
    fileExt: {
        type: String,
        required: [true, 'Extension File is Required']
    },
    routePath: {
        type: String,
        required: [true, 'Path File is Required']
    },
    parentPath: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folders'
    },
    tags: {
        type: Array
    }
}, {timestamps: true})

module.exports =  mongoose.model('Files', fileSchema)