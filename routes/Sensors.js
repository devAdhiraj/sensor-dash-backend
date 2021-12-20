const router = require("express").Router();
const { fetchData, fetchOne } = require("../controllers/Fetch");
const { addData, delData } = require("../controllers/AddDel");
const { login } = require("../controllers/AdminAuth");
/* *                 ----Allowed Query Params----
 * empty - all data in DB will be included in response
 * select - fields that will be included in response
 * sort - (updatedAtx | tempx | humidx | lightx) - data will be sorted based 
 * on given value x = 0 or 1 --> temp0 - lowest first | temp1 - highest first
 * limit - limits number of entries in response
 * skip - skips specified number of elements
 * rangeStart - min date range of entries returned (ISO String format)
 * rangeEnd - max date range of entries returned (ISO String format)
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
 * (Requires API Key)
 * */
router.post("/add", addData);

/**
 * Accepts array of ids and deletes all items
 * in array.
 * (Requires API Key)
 */
router.delete("/", delData);

/**
 * 
 */
router.post("/admin-login", login);


module.exports = router;
