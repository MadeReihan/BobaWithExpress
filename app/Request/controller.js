const Request = require('./model')
const User = require('../User/model')
const Facility = require('../Facility/model')

module.exports={
    requestList: async(req,res)=>{
        try {
            const request = await Request.find().populate('facility').populate('user')
            res.render('Admin/Request/index',{
                request,
                session:req.session.user,
            })
        } catch (err) {
            console.log(err);
            res.redirect('/')
        }
    },
    viewCreate:async(req,res)=>{
        try {
            const facility = await Facility.find()
            res.render('Admin/Request/create',{facility,session:req.session.user,})
        } catch (err) {
            console.log(err);
            res.redirect('/')
        }
    },
    actionCreate:async(req,res)=>{
        try {
            const {facility,date,start_time,end_time} = req.body;
            const request =  await Request({facility,date,start_time,end_time})
            request.save();

            res.redirect('/request')
        } catch (err) {
            console.log(err);
            res.redirect('/')
        }
    }

}