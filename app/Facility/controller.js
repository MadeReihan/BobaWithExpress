const Facility = require('./model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')
module.exports={
    FacilityList: async(req,res)=>{
        try {
            const facility = await Facility.find()
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {message:alertMessage, status:alertStatus}
            res.render('Admin/facility/index',{
                facility,
                alert,
                session:req.session.user,
            })
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    },
    viewCreate:async(req,res)=>{
        try {
            res.render('Admin/Facility/create',{session:req.session.user,});
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    },
    actionCreate:async(req,res)=>{
        try {
            const {name,body} = req.body;

            if(req.file){
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length-1]
                let filename = req.file.filename+'.'+originalExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)
                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(target_path)
                src.pipe(dest)
                src.on('end',async()=>{
                    try {
                        const facility = new Facility({
                            name,body,thumbnail:filename
                        })
                        await facility.save()

                        req.flash('alertMessage', "Berhasil tambah facility")
                        req.flash('alertStatus', "success")
                        
                        res.redirect('/facility')
                    } catch (err) {
                        req.flash('alertMessage',`${err.message}`)
                        req.flash('alertStatus', 'error')
                        console.log(err);
                        res.redirect('/facility')
                    }
                })
            }else{
                const facility = new Facility({
                    name,body
                })
                await facility.save()
                req.flash('alertMessage', "Berhasil tambah facility")
                req.flash('alertStatus', "success")
                
                res.redirect('/facility')
            }
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    },
    viewDetail:async(req,res)=>{
        try {
            const {id} = req.params;
            const facility = await Facility.findOne({_id:id})
            res.render('Admin/Facility/detail',{facility,session:req.session.user,})
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    },
    viewEdit:async(req,res)=>{
        try {
            const {id} = req.params;
            const facility = await Facility.findOne({_id:id})
            res.render('Admin/Facility/edit',{facility,session:req.session.user,})
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/')
        }
    },
    actionEdit:async(req,res)=>{
        try {
            const{id} = req.params
            const {name,body} = req.body;
            if(req.file){
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length-1]
                let filename = req.file.filename+'.'+originalExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)
                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(target_path)
                src.pipe(dest)
                src.on('end',async()=>{
                    try {
                        const facility = await Facility.findOne({_id:id})
                        let currentImage = `${config.rootPath}/public/uploads/${facility.thumbnail}`;
                        if(fs.existsSync(currentImage)){
                            fs.unlinkSync(currentImage)
                        }
                        await Facility.findOneAndUpdate({
                            _id:id
                        },{
                            name,body,thumbnail:filename
                        })
                        await Facility.save()
                        req.flash('alertMessage', "Berhasil edit facility")
                        req.flash('alertStatus', "success")
                        
                        res.redirect('/facility')
                    } catch (err) {
                        req.flash('alertMessage',`${err.message}`)
                        req.flash('alertStatus', 'error')
                        console.log(err);
                        res.redirect('/facility')
                    }
                })
            }else{
                await Facility.findOneAndUpdate({
                    _id:id
                },{
                    name,body
                })
                req.flash('alertMessage', "Berhasil edit facility")
                req.flash('alertStatus', "success")
                
                res.redirect('/facility')
            }
        } catch (err) {
            req.flash('alertMessage',`${err.message}`)
            req.flash('alertStatus', 'error')
            console.log(err);
            res.redirect('/facility')
        }
    }
}