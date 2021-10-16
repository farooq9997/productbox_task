

module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define("user", {
    
    name: {
    
    type: Sequelize.STRING
    
    },
    
    OTP: {
    
    type: Sequelize.STRING
    
    },
    
    OTPExpiry: {
    
    type: Sequelize.DATE
    
    },
    phoneNumber: {
    
        type: Sequelize.STRING
        
        }
    
    });
    
    
    return User;
    
    };