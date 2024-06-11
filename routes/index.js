const router = require("express").Router();
const users = require("./users");
const swagger = require("./swagger")
const temple = require('./temple');

router.use("/", swagger);
router.use("/users", users);
router.use('/temples', temple);


router.get('/', (req, res) => {
    res.send("Hello World");
});



module.exports = router;