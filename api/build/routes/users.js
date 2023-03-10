"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deteleUser_1 = require("../routes/usersCRUD/deteleUser");
const postUser_1 = require("./usersCRUD/postUser");
const putUser_1 = require("./usersCRUD/putUser");
const getUser_1 = require("../routes/usersCRUD/getUser");
const logicDeleteUser_1 = require("./usersCRUD/logicDeleteUser");
const desBanUser_1 = require("./usersCRUD/desBanUser");
const getBanned_1 = require("./usersCRUD/getBanned");
const router = (0, express_1.Router)();
router.post("/register", postUser_1.signUp);
router.post("/registerDB", postUser_1.signUpDB);
router.post("/fake", postUser_1.fakeSignUp);
router.post("/recover", postUser_1.recoverPassword);
router.put("/updateemail", putUser_1.updateUserEmail);
router.put("/updateusername", putUser_1.updateUserProfile);
router.put("/updateUserRol", putUser_1.updateUserRol);
router.put("/updateCart", putUser_1.updateCart);
router.put("/ban", logicDeleteUser_1.deleteLogicUser);
router.put("/pardon", desBanUser_1.desBanUser);
router.get("/banned", getBanned_1.getBanned);
router.get("/usersInfo", getUser_1.getUsersInfo);
router.delete("/deletecurrentuser", deteleUser_1.deleteCurrentUser);
module.exports = router;
