const mongoose = require('mongoose');


const voteSchema  = mongoose.Schema({

    ip:{required:true, type :String},
    option:{required:true, type :String}
});

const voteModel = mongoose.model('votes', voteSchema)


module.exports = voteModel