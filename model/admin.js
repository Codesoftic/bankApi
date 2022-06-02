const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const AdminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name should be required']
    },
    email:{
         type:String,
         required:[true,'email should be required'],
         unique:[true,'email shold be unique'],
         trim:true
    },
    password:{
        type:String,
        required:[true,'password should be required'],
        select: false,
    },
    confirmpassword:{
        type:String,
        required:[true,'confirmpassword should be required']
    },
    createdAt:{
        type: Date,
        default:Date.now(),
      }
})


AdminSchema.pre('save',async function(){
    if (!this.isModified("password")) {
        next();
      }
    // hash the password with codt 10  
   this.password =await bcrypt.hash(this.password,10)

   //delete the  password
   this.confirmpassword =undefined
})




//Compase the Password
AdminSchema.methods.correctPassword = async function(
    candidatePassword,userpassword
    ){
        console.log(candidatePassword,userpassword)
    return await bcrypt.compare(candidatePassword,userpassword)
}


const Admin =mongoose.model('Admin',AdminSchema)

module.exports =Admin



