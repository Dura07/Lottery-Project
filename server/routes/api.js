const express = require("express");
const router = express.Router();

// ----------------------------------------------------
// DUMMY HANDLERS (Since controller files are missing)
// ----------------------------------------------------
const getAllTickets = (req, res) => res.json({ status: "success", data: [] });
const getTicketById = (req, res) => res.json({ status: "success", message: "Ticket details" });
const buyTicket = (req, res) => res.json({ status: "success", message: "Ticket purchased!" });
const createTicket = (req, res) => res.json({ status: "success", message: "Ticket created!" });

// ----------------------------------------------------
// DUMMY MIDDLEWARE (Fixes the "verifyUserToken is not defined" error)
// ----------------------------------------------------
const verifyUserToken = (req, res, next) => {
  // This is a temporary bypass so your server starts.
  // In a real app, you would check the JWT token here.
  console.log("Auth Check: Temporary Bypass Active");
  next(); 
};

// ----------------------------------------------------
// PUBLIC ROUTES
// ----------------------------------------------------
router.get("/", (req, res) => {
  res.json({ status: "OK", message: "Lottery API is running..." });
});

router.get("/tickets", getAllTickets);
router.get("/tickets/:id", getTicketById);

// ----------------------------------------------------
// PROTECTED USER ROUTES
// ----------------------------------------------------
router.post("/tickets/buy", verifyUserToken, buyTicket);
router.post("/tickets", verifyUserToken, createTicket);

module.exports = router;