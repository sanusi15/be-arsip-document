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
    parentPath: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folders'
    },
    tags: {
        type: Array
    },
    dataCloud: {
        asset_id: {
            type: String
        },
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
        secureUrl: {
            type: String,
        },
    }
    
    
}, {timestamps: true})

module.exports =  mongoose.model('Files', fileSchema)