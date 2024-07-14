const mongoose=require('mongoose')
const Schema=mongoose.Schema
const bookSchema=new Schema({
    id:{type:String},
    doctorid:{type:Schema.Types.ObjectId,ref:"Doctordetails",required:true},
    patientid:{type:Schema.Types.ObjectId,ref:"Patientreg",required:true},
    doctorName:{type:String},
    patientName:{type:String},
    email:{type:String},
    phone:{type:String},
    age:{type:String},
    gender:{type:String},
    healthissue:{type:String},
    appointmentDate:{type:String},
    timeSlot:{type:String},
    status: {type:String},
    prescription: {type:String},
    token: {type:String}
    
})

const  book=mongoose.model('bookAppoint',bookSchema)

module.exports={
    book
}