const mongoose=require('mongoose')
const Schema=mongoose.Schema
const sheduleShema=new Schema({
    id:{type:String},
    doctorid:{type:Schema.Types.ObjectId,ref:"Doctordetails",required:true},
    selectedDays:{type:Array},
    startTime:{type:String},
    endTime:{type:String},
    currentDateTime:{type:String},
    scheduleStatus:{type:String,default:"inactive"}
})

const  schedule=mongoose.model('doctorSchedule',sheduleShema)

module.exports={
    schedule
}