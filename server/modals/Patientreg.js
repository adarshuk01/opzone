const mongoose=require('mongoose')
const Schema=mongoose.Schema

const patientschema=new Schema({
  logindetail:{type:Schema.Types.ObjectId,ref:"login",required:true},
  id:{type:String},
  fullname:{type:String},
  dateofbirth:{type:String},
  gender:{type:String},
  phoneno:{type:String},
  address:{type:String},
  place:{type:String},
  city:{type:String},
  username:{type:String},
  password:{type:String},
  email:{type:String},
  role:{type:String},

})

const  patient=mongoose.model('patient',patientschema)

module.exports={
    patient
}