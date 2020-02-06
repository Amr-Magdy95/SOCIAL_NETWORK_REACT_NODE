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
