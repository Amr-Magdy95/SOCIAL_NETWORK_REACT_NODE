exports.createPostValidator = (req, res, next) =>{
  // title
  req.check('title', 'Write a title').notEmpty()
  req.check('title', 'Title must be between 4 to 150 characters').isLength({
    min: 4,
    max: 150
  })

  // body
  req.check('body', 'Write a body').notEmpty()
  req.check('body', 'Body must be between 4 to 2000 characters').isLength({
    min: 4,
    max: 2000
  })

  // Check for errors
  const errors = req.validationErrors();
  // if error, then show the first one
  if(errors){
    console.log(errors)
    const firstError = errors[0].msg;
    return res.status(400).json({ error: firstError })
  }

  // proceed to next middleware
  next();
}

exports.userSignupValidator = (req, res, next) =>{
  // name must not be null - name is between 4~10 characters
  req.check('name', 'Name is required').notEmpty();
  req.check('name', 'Name must be between 4~10 characters').isLength({
    min: 4,
    max: 10
  })

  // check for password
  req.check('password', "Password Field is required").notEmpty();
  req.check('password', "Password must be between 6~32").isLength({
    min: 6,
    max: 32
  })
  req.check('password', "password must contain at least one number").matches(/\d+/)

  // check for email
  req.check('email', 'Email is required').notEmpty();
  req.check('email', 'Email must be between 12~32 characters').isLength({
    min: 12,
    max: 32
  })
  req.check('email', 'Should follow the format of example1@email.com').matches(/.+\@.+\..+/)

  // check for errors
  const errors = req.validationErrors();
  // if error, then show the first one
  if(errors){
    console.log(errors)
    const firstError = errors[0].msg;
    return res.status(400).json({ error: firstError })
  }
  // proceed to the next middlware
  next();
}
