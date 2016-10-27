var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'ntombi';
const someOtherPlaintextPassword = 'beauty';

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
        myPlaintextPassword = hash;
        console.log(hash);
    });
});

// Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, myPlaintextPassword, function(err, res) {
    res == true
    console.log(res);
});

bcrypt.compare(someOtherPlaintextPassword, myPlaintextPassword, hash, function(err, res) {
    res == false
});
