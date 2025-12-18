document.addEventListener("DOMContentLoaded", () => {
  const mobileIcon = document.getElementById("mobileMenuIcon");
  const mobileNav = document.getElementById("mobileNav");

  mobileIcon.addEventListener("click", () => {
    mobileNav.classList.toggle("show");
  });
});

// ================= TAB SWITCHING =================
const tabs = document.querySelectorAll(".cat-tab");
const boxes = document.querySelectorAll(".game-box");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(btn => btn.classList.remove("active"));
    boxes.forEach(box => box.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.target).classList.add("active");
  });
});

// ================= PRICES =================
const ticketPrices = {
  supreme: 1000,
  lite: 500,
  instant: 300
};

// ================= STORAGE =================
let selectedTickets = [];
let activeTicketInput = null;
let poolSelectedTickets = [];
let ticketBoxVault = [];

// ================= INIT TICKET VAULT =================
// Create 50 tickets per category
["supreme", "lite", "instant"].forEach(category => {
  for (let i = 0; i < 50; i++) {
    ticketBoxVault.push({
      code: generateTicketCode(),
      category: category,
      price: ticketPrices[category],
      purchased: false
    });
  }
});

// ================= TICKET GENERATOR =================
function generateTicketCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = Math.floor(100 + Math.random() * 900);
  const letter1 = letters[Math.floor(Math.random() * letters.length)];
  const letter2 = letters[Math.floor(Math.random() * letters.length)];
  return `${numbers}${letter1}${letter2}`;
}

// ================= SHUFFLE =================
function shuffleTicket(inputId) {
  activeTicketInput = inputId;

  const grid = document.getElementById("ticketPoolGrid");

  poolSelectedTickets = [];
  generatedPoolTickets = [];
  grid.innerHTML = "";

  while (generatedPoolTickets.length < 6) {
    const code = generateTicketCode();
    if (!generatedPoolTickets.includes(code) && !isTicketPurchased(code)) {
      generatedPoolTickets.push(code);
    }
  }

  generatedPoolTickets.forEach(code => {
    const div = document.createElement("div");
    div.className = "pool-ticket";
    div.textContent = code;
    div.dataset.code = code;
    div.addEventListener("click", togglePoolSelection);
    grid.appendChild(div);
  });

  // Show modal
  document.getElementById("ticketPoolModal").style.display = "block";
}

// Close modal function
function closePoolModal() {
  document.getElementById("ticketPoolModal").style.display = "none";
}

// Confirm pool selection
function confirmPoolSelection() {
  if (poolSelectedTickets.length === 0) {
    alert("Select at least one ticket.");
    return;
  }

  const category = activeTicketInput.replace("Ticket", "");

  poolSelectedTickets.forEach(code => {
    selectedTickets.push({
      category,
      code,
      price: ticketPrices[category]
    });
  });

  renderTickets();
  updateTotal();

  // Clear selections & close modal
  poolSelectedTickets = [];
  closePoolModal();
}

// OPTIONAL: prevent duplicate ticket picks (already in checkout)
function isTicketPurchased(code) {
  return selectedTickets.some(t => t.code === code);
}




// ================= MULTI-SELECT =================
function togglePoolSelection(e) {
  e.stopPropagation();
  const ticketEl = e.currentTarget;
  const code = ticketEl.dataset.code;

  if (ticketEl.classList.contains("selected")) {
    ticketEl.classList.remove("selected");
    poolSelectedTickets = poolSelectedTickets.filter(t => t !== code);
  } else {
    ticketEl.classList.add("selected");
    poolSelectedTickets.push(code);
  }
}

// ================= CONFIRM POOL =================
function confirmPoolSelection() {
  if (poolSelectedTickets.length === 0) {
    alert("Select at least one ticket.");
    return;
  }

  const category = activeTicketInput.replace("Ticket", "");

  poolSelectedTickets.forEach(code => {
    selectedTickets.push({
      category,
      code,
      price: ticketPrices[category]
    });

    // Mark as purchased in vault to prevent re-selection
    const ticket = ticketBoxVault.find(t => t.code === code);
    if (ticket) ticket.purchased = true;
  });

  renderTickets();
  updateTotal();

  document.getElementById("ticketPool").classList.remove("active");
  poolSelectedTickets = [];
}

// ================= RENDER CHECKOUT =================
function renderTickets() {
  const container = document.getElementById("ticketsList");
  container.innerHTML = "";

  selectedTickets.forEach((ticket, index) => {
    const div = document.createElement("div");
    div.className = "ticket-item";
    div.innerHTML = `
      <span>${ticket.code} — ₦${ticket.price}</span>
      <button onclick="removeTicket(${index})">Remove</button>
    `;
    container.appendChild(div);
  });
}

// ================= REMOVE =================
function removeTicket(index) {
  const ticket = selectedTickets[index];

  // Mark ticket as not purchased in vault
  const vaultTicket = ticketBoxVault.find(t => t.code === ticket.code);
  if (vaultTicket) vaultTicket.purchased = false;

  selectedTickets.splice(index, 1);
  renderTickets();
  updateTotal();
}

// ================= TOTAL =================
function updateTotal() {
  const total = selectedTickets.reduce((sum, t) => sum + t.price, 0);
  document.getElementById("totalAmount").textContent = "₦" + total;
}

// ================= FINAL PURCHASE =================
function finalPurchase() {
  if (selectedTickets.length === 0) {
    alert("No tickets selected!");
    return;
  }

  alert("Processing payment...");
  selectedTickets = [];
  renderTickets();
  updateTotal();
}



// -------------------------------------------
// TAB SWITCHING SYSTEM (kept for your UI)
// -------------------------------------------
document.querySelectorAll(".cat-tab").forEach(btn => {
  btn.addEventListener("click", function() {
    document.querySelector(".cat-tab.active")?.classList.remove("active");
    this.classList.add("active");

    let target = this.getAttribute("data-target");

    document.querySelector(".game-box.active")?.classList.remove("active");
    document.getElementById(target).classList.add("active");
  });
});









  // INFO SECTION BTN

  // How to Play button
document.getElementById("howToPlayBtn").addEventListener("click", () => {
  alert("Redirecting to How to Play section...");
  // Example: Scroll to How to Play section
  // document.getElementById("howToPlaySection").scrollIntoView({ behavior: "smooth" });
});

// Join Us button
document.getElementById("joinUsBtn").addEventListener("click", () => {
  alert("Redirecting to Registration page...");
  window.location.href = "register.html"; // navigate to register page
});

// Fund Wallet button
document.getElementById("fundWalletBtn").addEventListener("click", () => {
  alert("Open Fund Wallet modal...");
  // Example: open modal or redirect
  // openFundWalletModal();
});

// Contact Us button
document.getElementById("contactUsBtn").addEventListener("click", () => {
  alert("Redirecting to Contact page...");
  // Example: scroll to contact form
  // document.getElementById("contactSection").scrollIntoView({ behavior: "smooth" });
});


// Open modals
 const openButtons = document.querySelectorAll(".open-modal");
const closeButtons = document.querySelectorAll(".close");
const modals = document.querySelectorAll(".modal");

openButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById(btn.dataset.modal).style.display = "block";
  });
});

closeButtons.forEach(close => {
  close.addEventListener("click", () => {
    close.parentElement.parentElement.style.display = "none";
  });
});

window.onclick = (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
};
