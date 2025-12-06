document.addEventListener("DOMContentLoaded", () => {
  const mobileIcon = document.getElementById("mobileMenuIcon");
  const mobileNav = document.getElementById("mobileNav");

  mobileIcon.addEventListener("click", () => {
    mobileNav.classList.toggle("show");
  });
});


// TAB SWITCHING
  const tabs = document.querySelectorAll(".cat-tab");
  const boxes = document.querySelectorAll(".game-box");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {

      // remove active classes
      tabs.forEach(btn => btn.classList.remove("active"));
      boxes.forEach(box => box.classList.remove("active"));

      // activate clicked
      tab.classList.add("active");
      document.getElementById(tab.dataset.target).classList.add("active");
    });
  });

  // SHUFFLE TICKET (random 5 digits)
  function shuffleTicket(id) {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    document.getElementById(id).value = randomNum;
  }


  const ticketPrices = {
  supreme: 1000,
  lite: 500,
  instant: 300
};

// -------------------------------------------
// STORAGE FOR SELECTED TICKETS
// -------------------------------------------
let selectedTickets = [];  
// Format: {category: "supreme", code: "452AR9", price: 500}


// -------------------------------------------
// GENERATE RANDOM TICKET
// -------------------------------------------
function shuffleTicket(inputId) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = Math.floor(100 + Math.random() * 900); // 3-digit
  const letter1 = letters[Math.floor(Math.random() * letters.length)];
  const letter2 = letters[Math.floor(Math.random() * letters.length)];

  const ticketCode = `${numbers}${letter1}${letter2}`;

  document.getElementById(inputId).value = ticketCode;
}


// -------------------------------------------
// SELECT TICKET INTO CHECKOUT
// -------------------------------------------
function selectTicket(category) {
  const inputId = category + "Ticket";
  const ticketCode = document.getElementById(inputId).value;

  if (!ticketCode || ticketCode.trim() === "") {
    alert("Please shuffle ticket first.");
    return;
  }

  

  // Store ticket
  selectedTickets.push({
    category: category,
    code: ticketCode,
    price: ticketPrices[category]
  });

  renderTickets();
  updateTotal();

  alert("Ticket added!");
}


// -------------------------------------------
// RENDER TICKETS IN CHECKOUT SECTION
// -------------------------------------------
function renderTickets() {
  const container = document.getElementById("ticketsList");
  container.innerHTML = ""; // clear list

  selectedTickets.forEach((ticket, index) => {
    const div = document.createElement("div");
    div.className = "ticket-item";

    div.innerHTML = `
      <span>${ticket.code} — ₦${ticket.price}</span>
      <button class="remove-ticket" onclick="removeTicket(${index})">Remove</button>
    `;

    container.appendChild(div);
  });
}


// -------------------------------------------
// REMOVE TICKET FROM LIST
// -------------------------------------------
function removeTicket(index) {
  selectedTickets.splice(index, 1);
  renderTickets();
  updateTotal();
}


// -------------------------------------------
// UPDATE TOTAL AMOUNT
// -------------------------------------------
function updateTotal() {
  let total = 0;
  selectedTickets.forEach(t => total += t.price);

  document.getElementById("totalAmount").textContent = "₦" + total;
}


// -------------------------------------------
// FINAL PURCHASE (CONNECT TO BACKEND LATER)
// -------------------------------------------
function finalPurchase() {
  if (selectedTickets.length === 0) {
    alert("No tickets selected!");
    return;
  }

  alert("Processing payment... (Backend integration coming next)");

  // TODO: Send the selectedTickets array to backend
  // fetch("/api/buy", {method: "POST", body: JSON.stringify(selectedTickets)})

  selectedTickets = []; // reset
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


