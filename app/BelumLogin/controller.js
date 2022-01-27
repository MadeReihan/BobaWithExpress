const Facility = require('../Facility/model')
module.exports={
    index: async(req,res)=>{
        try {
            const facility = await Facility.find()
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {message:alertMessage, status:alertStatus}
            res.render('index',{
                session:req.session.user,
                facility,
                alert
            })
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
        }
    }
}