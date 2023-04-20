const {body,check}=require ('express-validator')

 const registerValidation=[
    check('email',"Неверный формат почты").isEmail(),
    check('password',"Пароль слишком короткий").isLength({min:6})
    // body('email',"Неверный формат почты").isEmail(),
    // body('password',"Пароль слишком короткий").isLength({min:8}),

];

 const loginValidation=[
    check('email',"Неверный формат почты").isEmail(),
    check('password',"Пароль слишком короткий").isLength({min:6})
]

module.exports={
    loginValidation,
    registerValidation
}