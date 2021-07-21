const router = require("express").Router();
const { fetchData, fetchOne } = require("../controllers/Fetch");
const { addData, delData } = require("../controllers/AddDel");

/* *                 ----Allowed Query Params----
 * empty - all data in DB will be included in response
 * select - fields that will be included in response
 * sort (time | tempx | humidx | lightx) - data will be sorted based on given value
 * x = 0 or 1 --> temp0 - oldest first | temp1 - newest first
 * limit - limits number of entries in response
 * */
router.get("/", fetchData);

/* *
 * fetches one entry (collection) with specified id or
 * if id param === last then fetches latest entry
 * */
router.get("/:id", fetchOne);

/* *
 * Adds data to database
 * Expects temp, humid, and light params
 * */
router.post("/add", addData);

/**
 * Deletes entry (collection) with specified id or
 * if id param === last then deletes latest entry
 */
router.delete("/:id", delData);

module.exports = router;
