const crypto = require('crypto');

module.exports.verifyPassword = function(dbPassword, givenPassword){
    if(dbPassword === givenPassword){
      return true;
    } else {
      return false;
    }
}
module.exports.setPassword = function(user){
  console.log("in 'setPassword, user = ", user);
  user.salt = crypto.randomBytes(16).toString('hex')
  user.hash = crypto.pbkdf2Sync(user.password, new Buffer.from(user.salt), 1000, 512, 'sha512').toString('base64'); 

  this.verifyPassword(user, user.password); // this is beging called here for dev purposes to ensure that upon creation, given the 'salt' the hash is being generated properly/the same hash every time
};

module.exports.verifyPassword = function(user, providedPassword) {
  const hash = crypto.pbkdf2Sync(providedPassword, new Buffer.from(user.salt), 1000, 512, 'sha512').toString('base64');
  console.log('user.hass === hash = ', user.hash === hash)
  return user.hash === hash;
};