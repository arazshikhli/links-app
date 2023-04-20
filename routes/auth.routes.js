const {Router}=require('express');
const router=Router();
const User=require('../models/User')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const config=require('config');
const {body,validationResult}=require('express-validator');
const {loginValidation,registerValidation} =require('../validators/authValidate')
router.post('/register',
registerValidation,
async (req,res)=>{
try {
 console.log(req.body)
    const errors=validationResult(req)

    if(!errors.isEmpty()){
        console.log(errors)
        return res.status(400).json({
            errors:errors.array(),       
            message:"Некорректные данные при регистрации"
        })
    }
    
    // const salt=await bcrypt.genSalt(10);
    // const hash=await bcrypt.hash(password,salt);


    const {email,password}=req.body;
    const candidate=await User.findOne({email})
    if(candidate){
       return res.status(400).json({
            message:"Такой пользователь уже существует"
        })
    }
    const hashedPassword=await bcrypt.hash(password,12)
    const user=new User({
        email,password:hashedPassword
    })
    await user.save();

    res.status(201).json({message:"Пользователь создан"})

} catch (e) {
    console.log(e)
    res.status(500).json({
        message:"Что-то пошло не так, попробуйте снова"
        
    })
}
})

router.post('/login',
loginValidation,
async (req,res)=>{
    try {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:"Некорректные данные при входе в систему"
            })
        }
        // const {email,password}=req.body;
        const user=await User.findOne({email:req.body.email})

        if(!user){
            return res.status(400).json({
                message:"Пользователь не найден"
            })
        }
        const isMatch=await bcrypt.compare(req.body.password,user.password)
        console.log('real pass',user.password)
        console.log('test pass',req.body.password)
        if(!isMatch){
            return res.status(400).json({
                message:"Неверный пароль, попробуйте снова"
            })
        }
        const token=jwt.sign(
            {userId:user.id},
            config.get('jwtsecret'),
            {expiresIn:'1h'}
        )
            res.json({token,userId:user.id})

    } catch (e) {
        res.status(500).json({
            message:"Что-то пошло не так, попробуйте снова"
        })
    }
    })

router.get('/me',async(req,res)=>{
    try {
        const user=await User.findById(req.userId)
        if(!user){
            return res.status(404).json({
                message:"Пользователь не найден"
            })
        }
        
    } catch (error) {
        
    }
})
module.exports=router