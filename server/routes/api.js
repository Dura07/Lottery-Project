const express = require("express");
const router = express.Router();

const {
  createTicket,
  getAllTickets,
  getTicketById,
  buyTicket,
} = require("../controllers/ticketController");

const { verifyUserToken } = require("../middleware/authMiddleware");

// ----------------------------------------------------
// PUBLIC ROUTES
// ----------------------------------------------------

// Welcome / health-check
router.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Lottery API is running...",
  });
});

// Get all tickets (public)
router.get("/tickets", getAllTickets);

// Get a single ticket
router.get("/tickets/:id", getTicketById);

// ----------------------------------------------------
// PROTECTED USER ROUTES
// ----------------------------------------------------

// Buy ticket (requires user token)
router.post("/tickets/buy", verifyUserToken, buyTicket);

// Create ticket (admin but can exist here as user-level feature)
router.post("/tickets", verifyUserToken, createTicket);

module.exports = router;
