const mongoose=require('mongoose')
const Schema=mongoose.Schema

const hospitalschema=new Schema({
    logindetail:{type:Schema.Types.ObjectId,ref:"login",required:true},
    id:{type:String},
    staffname:{type:String},
    staffpic:{type:String},
    dateofbirth:{type:String},
    gender:{type:String},
    role:{type:String,
        default:"opstaff"},
    hospitalname:{type:String},
    city:{type:String},
    place:{type:String},
    address:{type:String},
    emailid:{type:String},
    profilepic:{type:String}


})
const  hospital=mongoose.model('hospitaldel',hospitalschema)

module.exports={
    hospital
}