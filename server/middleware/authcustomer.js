const jwt = require("jsonwebtoken");

const authCustomer = (req, res, next) => {
    try {
        const tokenID = req.cookies.tokenID;

        if (!tokenID) res.status(202).json("cookie not found");
        const verifiedToken = jwt.verify(tokenID, process.env.JWT_SECRET);
         const existingUserEmail = await User.findOne({ _id: verifiedToken.user } , (err, email) =>{
            try {
               console.log("email" ,existingUserEmail)
                 return email
            } catch (error) {
                throw error
            }
         });
         
        next();
    } catch (error) {
        res.status(500);
    }
};
module.exports = authCustomer;
