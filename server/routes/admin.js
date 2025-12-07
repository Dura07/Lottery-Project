const express = require("express");
const router = express.Router();

const {
  adminLogin,
  adminCreate,
  getAllUsers,
  deleteUser,
} = require("../controllers/adminController");

const {
  createTicket,
  deleteTicket,
  updateTicket,
  getAllTicketsAdmin,
} = require("../controllers/ticketController");

const { verifyAdminToken } = require("../middleware/authMiddleware");

// ----------------------------------------------------
// PUBLIC ADMIN ROUTES
// ----------------------------------------------------

// Admin login
router.post("/login", adminLogin);

// Create first admin (optional for MVP)
// Disable this endpoint in production
router.post("/create", adminCreate);

// ----------------------------------------------------
// PROTECTED ADMIN ROUTES
// ----------------------------------------------------

// Ticket Management
router.post("/tickets", verifyAdminToken, createTicket);
router.get("/tickets", verifyAdminToken, getAllTicketsAdmin);
router.put("/tickets/:id", verifyAdminToken, updateTicket);
router.delete("/tickets/:id", verifyAdminToken, deleteTicket);

// Users Management
router.get("/users", verifyAdminToken, getAllUsers);
router.delete("/users/:id", verifyAdminToken, deleteUser);

// Admin dashboard check
router.get("/dashboard", verifyAdminToken, (req, res) => {
  res.json({
    status: "OK",
    admin: req.admin,
    message: "Admin dashboard access granted",
  });
});

module.exports = router;
