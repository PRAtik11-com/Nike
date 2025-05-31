function CheckRole(req,res,next){
    const {role}=req.user

    if(!role){
        return res.status(401).json({message:"You can't have acces"})
    }
    
    next()
     
}

module.exports=CheckRole 