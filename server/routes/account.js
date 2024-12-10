const express = require('express');
const { register, login } = require("../controllers/accountController.js");
//import { verifyToken} from "../middleware/validateToken.js"

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

//router.post("/login", loginAccount);



module.exports = router; 