const express = require("express");
const router = express.Router();

// Since you don't have a ticketController file, 
// we define the functions right here for now to stop the crash.

const getAllTickets = (req, res) => {
  res.json({ status: "success", data: [] });
};

const getTicketById = (req, res) => {
  res.json({ status: "success", message: "Ticket details" });
};

const buyTicket = (req, res) => {
  res.json({ status: "success", message: "Ticket purchased!" });
};

const createTicket = (req, res) => {
  res.json({ status: "success", message: "Ticket created!" });
};

// Middleware - make sure this file exists at server/middleware/authMiddleware.js
// If it doesn't exist, comment out the line below and remove 'verifyUserToken' from routes
// const { verifyUserToken } = require("../middleware/authMiddleware");

// ----------------------------------------------------
// PUBLIC ROUTES
// ----------------------------------------------------

router.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Lottery API is running...",
  });
});

router.get("/tickets", getAllTickets);
router.get("/tickets/:id", getTicketById);

// ----------------------------------------------------
// PROTECTED USER ROUTES
// ----------------------------------------------------

router.post("/tickets/buy", verifyUserToken, buyTicket);
router.post("/tickets", verifyUserToken, createTicket);

module.exports = router;