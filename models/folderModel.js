const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Folder Name is Required']
  },
  parentPath: {
    type: String,
    default: null
  },
  routePath: {
    type: String,
    required: [true, 'Folder Route is Required'],
    default: '/',
  },
  slugPath: {
    type: String,
    required: [true, 'Folder Slug is Required'],
  },
  typeExt: {
    type: String,
    default: 'folder'
  },
  userAccess: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
            accessType: { type: [String], required: true } 
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model('Folders', folderSchema)
