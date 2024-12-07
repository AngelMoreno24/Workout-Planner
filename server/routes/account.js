const express = require('express');
const { createAccount, loginAccount } = require("../controllers/accountController.js");
//import { verifyToken} from "../middleware/validateToken.js"

const router = express.Router();

router.post("/create", createAccount);

router.post("/login", loginAccount);



export default router;