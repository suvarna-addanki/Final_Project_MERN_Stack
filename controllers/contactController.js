
const { validateContact, Contact } = require("../models/Contact");
const mongoose = require("mongoose");

const createcontact = async (req, res) => {
    const { error } = validateContact(req.body);
  
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  
    const { name, address, email, phone } = req.body;
  
    try {
      const newContact = new Contact({
        name,
        address,
        email,
        phone,
        postedBy: req.user._id,
      });
      const result = await newContact.save();
  
      return res.status(201).json({ ...result._doc });
    } catch (err) {
      console.log(err);
    }
  }

  const getallcontacts = async (req, res) => {
    try {
      const myContacts = await Contact.find({ postedBy: req.user._id }).populate(
        "postedBy",
        "-password"
      );
  
      return res.status(200).json({ contacts: myContacts.reverse() });
    } catch (err) {
      console.log(err);
    }
  }

  const updatecontact = async (req, res) => {
    const { id } = req.body;
  
    if (!id) return res.status(400).json({ error: "no id specified." });
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ error: "please enter a valid id" });
  
    try {
      const contact = await Contact.findOne({ _id: id });
  
      if (req.user._id.toString() !== contact.postedBy._id.toString())
        return res
          .status(401)
          .json({ error: "you can't edit other people contacts!" });
  
      const updatedData = { ...req.body, id: undefined };
      const result = await Contact.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
  
      return res.status(200).json({ ...result._doc });
    } catch (err) {
      console.log(err);
    }
  }

  const deletecontact =async (req, res) => {
    const { id } = req.params;
  
    if (!id) return res.status(400).json({ error: "no id specified." });
  
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ error: "please enter a valid id" });
    try {
      const contact = await Contact.findOne({ _id: id });
      if (!contact) return res.status(400).json({ error: "no contact found" });
  
      if (req.user._id.toString() !== contact.postedBy._id.toString())
        return res
          .status(401)
          .json({ error: "you can't delete other people contacts!" });
  
      const result = await Contact.deleteOne({ _id: id });
      const myContacts = await Contact.find({ postedBy: req.user._id }).populate(
        "postedBy",
        "-password"
      );
  
      return res
        .status(200)
        .json({ ...contact._doc, myContacts: myContacts.reverse() });
    } catch (err) {
      console.log(err);
    }
  }

  const getonecontact = async (req, res) => {
    const { id } = req.params;
  
    if (!id) return res.status(400).json({ error: "no id specified." });
  
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ error: "please enter a valid id" });
  
    try {
      const contact = await Contact.findOne({ _id: id });
  
      return res.status(200).json({ ...contact._doc });
    } catch (err) {
      console.log(err);
    }
  }

  module.exports ={createcontact, getallcontacts, updatecontact, deletecontact, getonecontact}

