const Admin  =require('../../model/admin')
const jwt = require('jsonwebtoken');
const secretKey =process.env.SECRETKEY

exports.createAdmin =(req,res,next)=>{
   Admin.create({
       name:req.body.name,
       email:req.body.email,
       password:req.body.password,
       confirmpassword:req.body.confirmpassword
   })
   .then((admin)=>{
        res.status(201).json({
            message:'admin create Sucessfully',
            admin:admin
        })
   })
   .catch((err)=>{
       res.status(500).json({
           message:err.message
       })
   })
}
exports.login = async(req,res,next)=>{
    try{
        console.log(req.body)
       const admin = await Admin.findOne({email:req.body.email}).select('+password')
       const correct = await admin.correctPassword(req.body.password,admin.password)
       if(correct){
          const token =jwt.sign({
                 adimID:admin.id,
                 adminName:admin.name,
                 adminEmail:admin.email
             },secretKey, { expiresIn: '1h' })
           res.status(200).json({
            message:"User Login scucessfuly Login SucessFully",
              admin:admin,
              token:token
           })  
       }else{
           res.status(403).json({
               message:'Invalid Credentials'
           })
       }
   

    }catch(err){
       res.status(400).json({
           status:"fail",
           HowToCreateUsreSignup:req.requestTime,
           data:{
              err
            }
       })
    }

}