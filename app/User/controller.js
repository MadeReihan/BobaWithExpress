const User = require('./model')
const bcrypt = require('bcryptjs')
module.exports={
    UserList: async(req,res)=>{
        try {
            const user = await User.find()
            res.render('Admin/User/index',{
                user
            })
        } catch (err) {
            console.log(err);
            res.redirect('/')
        }
    },
    viewCreate:async(req,res) => {
        try {
            res.render('Admin/User/create')
        } catch (err) {
            res.redirect('/users')
        }
    },
    actionCreate:async(req,res)=>{
        try {
            const {name,email,password,role} = req.body;
            const salt = await bcrypt.genSalt()
            let user = await User({name,email,password,role})
            user.password =  await bcrypt.hash(password,salt)
            await user.save();

            res.redirect('/users')
        } catch (err) {
            res.redirect('/users')
        }
    }
}