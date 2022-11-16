
const auth = require("../middlewares/auth");

const mongoose = require("mongoose");
const { createcontact, getallcontacts, updatecontact, deletecontact, getonecontact } = require("../controllers/contactController");
const router = require("express").Router();

// create contact.
router.post("/contact", auth, createcontact );

// fetch contact.
router.get("/mycontacts", auth, getallcontacts);

// update contact.
router.put("/contact", auth, updatecontact);

// delete a contact.
router.delete("/delete/:id", auth, deletecontact );

// to get a single contact.
router.get("/contact/:id", auth, getonecontact);

module.exports = router;