const jwt =require('jsonwebtoken')
const seceretKey =process.env.SECERTKEY


const IsAuthenctication =(req,res,next)=>{
     try{
         // console.log(req.header("x-auth-token"))
        const token = req.headers.authorization
  
         if(!token){
              res.status(401).json({message:'that admin is Not Autharized'})
         } 
        const  verified =jwt.verify(token.split(' ')[1],seceretKey)
          if(!verified){
               res.status(401).json({
                   message:'Authentication faild'
               })
          }
          req.user =verified
          next()
     }catch(error){
         res.status(500).json({err:error.message})
     }
}



module.exports  = IsAuthenctication