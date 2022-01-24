const User = require('../User/model')
const bcrypt = require('bcryptjs')
module.exports={
    viewSignin: async(req,res) => {
        try{
            if(req.session.user === null || req.session.user == undefined){
                res.render('Admin/Auth/login',{session:req.session.user,})
            }else{
                res.redirect('/')
            }

        }catch(err){
            res.redirect('/')
        }
    },
    viewRegister: async(req,res) => {
        try{
            if(req.session.user === null || req.session.user == undefined){
                res.render('Admin/Auth/register',{session:req.session.user,})
            }else{
                res.redirect('/')
            }

        }catch(err){
            res.redirect('/')
        }
    },

    actionSignin:async(req,res)=>{
        try {
            const {email,password} = req.body
            const check = await User.findOne({email:email})
            if(check){
                const checkPassword = await bcrypt.compare(password,check.password)
                if(checkPassword){
                    req.session.user={
                        id:check._id,
                        email:check.email,
                        role:check.role,
                        name:check.name
                    }
                    console.log("sukses login");
                    res.redirect('/')
                }else{
                    console.log("data salah");
                    res.redirect('/')
                }
            }else{
                console.log("data salah");
                res.redirect('/')
            }
        } catch (err) {
            console.log(err);
            res.redirect('/')
        }
    },
    actionRegister:async(req,res)=>{
        try {
            const {name,email,password,role} = req.body
            const check = await User.findOne({email:email})
            if(check){
                console.log("email sudah terdaftar silahakan ganti dengan yg lain");
                    res.redirect('/login')
            }else{
                const salt = await bcrypt.genSalt()
                    let user = await User({name,email,password,role})
                    user.password =  await bcrypt.hash(password,salt)
                    await user.save();
                    
                    res.redirect('/login')
            }
        } catch (err) {
            console.log(err);
            res.redirect('/')
        }
    },
    logOut:(req,res)=>{
        req.session.destroy();
        res.redirect('/')
    },

}