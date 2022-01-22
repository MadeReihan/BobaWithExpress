module.exports={
    index: async(req,res)=>{
        try {
            res.render('index',{
                title: "made"
            })
        } catch (err) {
            console.log(err);
        }
    }
}