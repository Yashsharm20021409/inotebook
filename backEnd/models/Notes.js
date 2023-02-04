const mongoose = require('mongoose');
const {Schema} = mongoose;

const NotesSchema = new Schema({
    // user eslye dala ki sb user apna apna data dhke (mtlb link krne k lie dono user or notes ko)
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"Genral"
    },
    timeStamp:{
        type:Date,
        default:Date.now
    }

});
  

module.exports = mongoose.model('Notes',NotesSchema);