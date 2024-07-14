const mongoose=require('mongoose')
const Schema=mongoose.Schema

const doctorshema=new Schema({
    logindetail:{type:Schema.Types.ObjectId,ref:"login",required:true},
    id:{type:String},
    fullname:{type:String},
    photo:{type:String},
    dateofbirth:{type:String},
    gender:{type:String},
    role:{type:String,
        default:"doctor"},
    hospitalname:{type:String},
    qualification:{type:String},
    institute:{type:String},
    Specialization:{type:String},
    emailid:{type:String},
    certificate:{type:String},
    exp:{type:String},
    scheduleStatus:{type:Schema.Types.String,ref:"DoctorSchedule"}


})
const  doctor=mongoose.model('doctor',doctorshema)

module.exports={
    doctor
}