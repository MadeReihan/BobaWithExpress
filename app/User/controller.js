const User = require('./model')
const bcrypt = require('bcryptjs')
module.exports={
    UserList: async(req,res)=>{
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {message:alertMessage, status:alertStatus}
            const user = await User.find()
            res.render('Admin/User/index',{
                user,
                alert,
                session:req.session.user,
            })
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            console.log(err);
            res.redirect('/')
        }
    },
    viewCreate:async(req,res) => {
        try {
            res.render('Admin/User/create',{session:req.session.user,})
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
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
            req.flash('alertMessage', "Berhasil tambah user")
            req.flash('alertStatus', "success")

            res.redirect('/users')
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/users')
        }
    },
    viewEdit:async(req,res)=>{
        try {
            const {id} = req.params
            const user = await User.findOne({_id:id})
            res.render('Admin/User/edit',{user,session:req.session.user,})
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
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
            req.flash('alertMessage', "Berhasil edit user")
            req.flash('alertStatus', "success")

            res.redirect('/users');
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/users')
        }
    },
    actionDelete:async(req,res)=>{
        try {
            const{id} = req.params;
            const user = await User.findOneAndRemove({
                _id:id
            });
            req.flash('alertMessage', "Berhasil hapus user")
            req.flash('alertStatus', "success")
            res.redirect('/users')
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/users')
        }
    }
}