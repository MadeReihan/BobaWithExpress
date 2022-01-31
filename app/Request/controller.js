const Request = require('./model')
const User = require('../User/model')
const Facility = require('../Facility/model')

module.exports={
    requestList: async(req,res)=>{
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            user_name = req.session.user
            const alert = {message:alertMessage, status:alertStatus}
            const request = await Request.find().populate('facility').populate('user')
            const request2 = await Request.find({user:user_name.name}).populate('user').populate('facility')

            console.log(request2);
            console.log(user_name.name);
            
            if(user_name.role == 'user'){
                console.log(true);
                res.render('Admin/Request/index_user',{
                    request2,
                    alert,
                    session:req.session.user,
                })
            }else{
                console.log(false);
                res.render('Admin/Request/index',{
                    request,
                    alert,
                    session:req.session.user,
                })
            }


        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            console.log(err);
            res.redirect('/')
        }
    },
    viewCreate:async(req,res)=>{
        try {
            const facility = await Facility.find()
            res.render('Admin/Request/create',{facility,session:req.session.user,})
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            console.log(err);
            res.redirect('/')
        }
    },
    actionCreate:async(req,res)=>{
        try {
            const {user,facility,date,start_time,end_time} = req.body;
            
            const request =  await Request({user,facility,date,start_time,end_time})
            req.flash('alertMessage', "Berhasil tambah request")
            req.flash('alertStatus', "success")
            request.save();

            res.redirect('/request')
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            console.log(err);
            res.redirect('/')
        }
    },
    actionStatus: async(req,res)=>{
        try {
            const{id} = req.params
            const {status} = req.query

            await Request.findOneAndUpdate({_id:id},{status})

            req.flash('alertMessage',`berhasil ubah status`)
            req.flash('alertStatus', 'success')
            res.redirect('/request')
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/request')
        }
    }

}