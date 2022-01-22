const Facility = require('./model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')
module.exports={
    FacilityList: async(req,res)=>{
        try {
            const facility = await Facility.find()
            res.render('Admin/facility/index',{
                facility
            })
        } catch (err) {
            console.log(err);
            res.redirect('/')
        }
    },
    viewCreate:async(req,res)=>{
        try {
            res.render('Admin/Facility/create');
        } catch (err) {
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
                        
                        res.redirect('/facility')
                    } catch (err) {
                        console.log(err);
                        res.redirect('/facility')
                    }
                })
            }else{
                const facility = new Facility({
                    name,body
                })
                await facility.save()
                
                res.redirect('/facility')
            }
        } catch (err) {
            console.log(err);
            res.redirect('/')
        }
    }
}