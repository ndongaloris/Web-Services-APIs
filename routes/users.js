const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const validator = require("../middleware/contactValidate")

router.get("/", userController.getAll);
router.get("/:id",userController.getSingle);
router.post("/", validator.saveContact, userController.createUser);
router.put("/id-to-modify/:id",validator.updateContact, userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;