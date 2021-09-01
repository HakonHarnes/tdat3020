const crypto = require('crypto');
/*
   Class used as bearer access token 
   Mainly time-based 
 */
class Token {
   constructor(id, group){
      this.id = id;  
      this.group = group; 
      this.date = new Date(); 
      this.salt = crypto.randomBytes(16).toString('base64');
   }

   // Checks validity of token 
   validate(){
      return ((new Date()) - this.date) < (15 * 1000); // Valid for 15 seconds 
   }

   // Returns token as a string 
   toString(){
      return this.id + '' + this.group + '' + this.date.toISOString().replace(/[^0-9]/g, "").substring(0, 14) + '' + this.salt; 
   }
}

module.exports = Token