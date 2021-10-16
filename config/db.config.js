module.exports = {

    HOST: "localhost",
    
    USER: "root",
    
    PASSWORD: "User$123",
    
    DB: "productbox",
    
    dialect: "mysql",
    
    pool: {
    
    max: 5,
    
    min: 0,
    
    acquire: 30000,
    
    idle: 10000
    
    }
    
    };