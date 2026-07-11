const validate = (schema) => (req, res, next) =>{
    const {error, value} = schema.validate(req.body, {
        abortEarly: false, // collect all errors
        stripUnknown: true // remove fields don't exist in schema
    })
    if(error) {
        const errors = error.details.map((detail) => detail.message) // extract error message text
        return res.status(400).json({message: "Validation failed", errors})
    }
    req.body = value
    next()
}

// Export
module.exports = validate