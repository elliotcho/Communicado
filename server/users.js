//import collection
const {User}= require('./dbschema');

//result is result of query, query is example User.findOne({})

exports.login=(req,res)=>{
    User.findOne({email:req.body.email}).then(result=>{

        if(result===null){res.json({msg:"Email is not registred with Communicado"});}

        else{

            if(result.password===req.body.password){

                res.json({...User});

            }

            else{res.json({msg:"incorrect password"});}
        }
    });
}