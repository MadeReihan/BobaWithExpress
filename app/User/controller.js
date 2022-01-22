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
    },
    viewEdit:async(req,res)=>{
        try {
            const {id} = req.params
            const user = await User.findOne({_id:id})
            res.render('Admin/User/edit',{user})
        } catch (err) {
            res.redirect('/users')
        }
    },
    actionEdit:async(req,res)=>{
        try {
            const {id} = req.params
            const {name,email,password,role} = req.body
            const user = await User.findOneAndUpdate({
                _id:id
            },{name,email,password,role});
            
            res.redirect('/users');
        } catch (err) {
            res.redirect('/users')
        }
    },
    actionDelete:async(req,res)=>{
        try {
            const{id} = req.params;
            const user = await User.findOneAndRemove({
                _id:id
            });
            res.redirect('/users')
        } catch (err) {
            res.redirect('/users')
        }
    }
}