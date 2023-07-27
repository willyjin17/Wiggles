require("dotenv").config();
const jwt = require("jsonwebtoken");


module.exports.Login = async (req, res, next)=>{
    const email=req.body.email;
    const password=req.body.password;

    if(!email || !password ){
        return res.json({message:'All fields are required'})
    }

    User.findOne({email:email}, function(err, foundUser){
        if(err){
            console.log(err);
        }
        else if(foundUser){
            bcrypt.compare(password,foundUser.password,function(err,result){
                if(result==true){
                    const token=jwt.sign({
                        email: foundUser.email,
                    }, process.env.JWT_SECRET_KEY ,{
                        expiresIn: 3*24*60*60,
                    });
                    res.cookie("token", token, {
                        maxAge:1000*60*100, 
                        withCredentials: true,
                        httpOnly: false,
                    });

                    return res.json({status: 'ok', data: token})
                }
                else{
                    console.log("login failed");
                }
            })
        }
        else{
            console.log("User Not find");
        }
    });
};
