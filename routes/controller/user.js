const db = require("../../models"); // models path depend on your structure
const moment = require('moment');
const { Op } = require('sequelize')

const User = db.User;

module.exports = {
    welcome: async function (req, res) {
      res.send("Welcome to home screen");
    },
    createUser: async function (req, res) {
        try {
            if (!req.body.name || !req.body.phoneNumber) {
                res.status(400).send({
                    status: false,
                    message: 'Fields cannot be empty'
                });
            } else {
                User.create({
                    name: req.body.name,
                    phoneNumber: req.body.phoneNumber
                }).then((user) => res.status(201).send(user)).catch((error) => {
                    console.log(error);
                    res.status(400).send(error);
                });
            }
            
        } catch (err) {
            return res.send({
                success : false,
                message : err.message
            })
        }
        
      },
      generateOTP: async function (req, res) {
        try {
            if (!req.body.phoneNumber) {
                res.status(400).send({
                    status: false,
                    message: 'Phone Number cannot be empty'
                });
            } else {
                
               let foundUser = await User.findOne({
                where: {
                    phoneNumber:req.body.phoneNumber
                  }
               });
               if(!foundUser){
                return res.status(200).send({
                    status: true,
                    message: 'No user found'
                    });
               }
               else{
                let OTP = Math.floor(1000 + Math.random() * 9000);
                foundUser.OTP = OTP;
                let nowTime = new Date();
                expiryTime = moment(nowTime).add(5, 'minutes');
                foundUser.OTPExpiry = expiryTime.format('YYYY-MM-DD HH:mm:ss');
                let userDetail = await foundUser.save();
                
                return res.status(200).send({
                    status: true,
                    message: userDetail
                });
               }
               
            }
        } catch (error) {
            res.status(400).send({
                status: false,
                message: error.message
            });
        }
      },
      verifyOTP: async function (req, res) {
        try {
            if (!req.params.userId) {
                res.status(400).send({
                    status: false,
                    message: 'user id is missing'
                });
            } else {
                
               let foundUser = await User.findOne({
                where: {
                    id:req.params.userId,
                    OTPExpiry: { [Op.gt]: Date.now() },
                  }
               });
               if(!foundUser){
                return res.status(200).send({
                    status: true,
                    message: 'No user found'
                    });
               }
               else{
                return res.status(200).send({
                    status: true,
                    foundUser
                    });
               }
               
            }
        } catch (error) {
            res.status(400).send({
                status: false,
                message: error.message
            });
        }
      },
}