const Account = require('../models/accountModel.js');
const bcrypt = require('bcrypt');

// Register Function
const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if email is already registered
        const accountAvailable = await Account.findOne({ email });
        if (accountAvailable) {
            return res.status(400).send({ message: "Email already registered" });
        }

        // Hash the password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create new account
        const newAccount = {
            firstName,
            lastName,
            email,
            password: encryptedPassword,
        };
        const account = await Account.create(newAccount);

        //console.log("added new account");
        // Send a success response
        return res.status(201).json(account);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
};


// Register Function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email is already registered
        const account = await Account.findOne({ email });

        //compare password with hashed password
        if(account && (await bcrypt.compare(password, account.password))){
            const accessToken = jwt.sign({
                account: {
                    username: account.username,
                    email: account.email,
                    id: account.id
                }
            }, process.env.ACCESS_TOKEN_SECRET,
    
        );
            return res.status(200).json({ accessToken });
        }else{
            res.status(401);
            throw new Error("Invalid email or password");
        }


        return res.status(201).json(account);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
};

module.exports = { register };