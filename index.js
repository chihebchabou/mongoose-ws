const mongoose = require("mongoose");
const connectDB = require("./config/db");

const date = new Date();
// Connect to data base
connectDB();

// Schema
const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  birthDate: {
    type: Number,
    default: date.getFullYear(),
  },
});

// Model
const Contact = mongoose.model("contact", contactSchema);

// Create contact (create a document)
const createContact = async () => {
  const contact = new Contact({
    fullName: "John Doe",
    email: "johndoe@gmail.com",
    phone: 5555555555,
    birthDate: 1960,
  });

  try {
    const result = await contact.save();
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};

const getContact = async () => {
  try {
    const contacts = await Contact.find()
      // .select({
      //   fullName: 1,
      // })
      .limit(10)
      .sort({ birthDate: -1 });
    console.log(contacts);
  } catch (err) {
    console.error(err.message);
  }
};

const getOneContact = async (id) => {
  try {
    const contact = await Contact.findById(id);
    console.log(contact);
  } catch (err) {
    console.error(err.message);
  }
};

// Update contact
const updateContact = async (id, birthDate) => {
  // Query first
  // try {
  //   const contact = await Contact.findById(id);
  //   contact.birthDate = birthDate;
  //   const result = await contact.save();
  //   console.log(result);
  // } catch (err) {
  //   console.error(err.message);
  // }

  // Update first
  // try {
  //   const result = await Contact.updateOne(
  //     { _id: id },
  //     { $set: { birthDate } }
  //   );

  //   const contact = await Contact.findById(id);
  //   console.log(contact);
  // } catch (err) {
  //   console.error(err.message);
  // }

  // Find and Update
  try {
    const contact = await Contact.findByIdAndUpdate(
      id,
      {
        $set: { birthDate },
      },
      { new: true }
    );
    console.log(contact);
  } catch (err) {
    console.error(err.message);
  }
};

// Delete contact
const removeContact = async (id) => {
  try {
    // const result = await Contact.deleteOne({ _id: id });
    const contact = await Contact.findByIdAndRemove(id);
    console.log(contact);
  } catch (err) {
    console.error(err.message);
  }
};

// createContact();
// getContact();
// getOneContact("61a0b3482e16137d45358348");
// updateContact("61a0b3482e16137d45358348", 2001);
removeContact("61a0b218cc847682ac24643f");
