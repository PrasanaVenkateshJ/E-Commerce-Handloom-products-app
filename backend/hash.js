const bcrypt = require('bcryptjs');

bcrypt.hash("130306", 10).then((hash) => {
  console.log("Your hashed password:", hash);
});
