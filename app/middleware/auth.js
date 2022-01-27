

module.exports ={
    isLoginAdmin:(req,res,next)=>{
        if(req.session.user === null || req.session.user == undefined){
            req.flash('alertMessage',`session telah habis silahkan login lagi`)
            req.flash('alertStatus', 'eror')
            res.redirect('/')
        }else{
            next()
        }
    }
}