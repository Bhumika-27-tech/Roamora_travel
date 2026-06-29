const SITE_STORAGE_KEY = "roamoraSiteData";
const SUPPORT_STORAGE_KEY = "roamoraSupportTickets";

const defaultData = {
  destinations: [
    { id: 1, name: "Bali", type: "Beach", season: "Summer", days: 6, price: 78000, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85", description: "Tropical temples, private pool stays, rice terraces, and golden beach evenings." },
    { id: 2, name: "Swiss Alps", type: "Luxury", season: "Winter", days: 8, price: 235000, image: "https://images.unsplash.com/photo-1500043357865-c6b8827edf10?auto=format&fit=crop&w=900&q=85", description: "Scenic rail routes, alpine villages, snow views, and refined mountain hotels." },
    { id: 3, name: "Kerala", type: "Culture", season: "Monsoon", days: 5, price: 52000, image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85", description: "Backwater cruises, Ayurveda retreats, tea hills, and slow coastal food trails." },
    { id: 4, name: "Dubai", type: "Luxury", season: "Winter", days: 5, price: 96000, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85", description: "Skyline views, desert safaris, theme parks, shopping, and premium hotels." },
    { id: 5, name: "Himachal", type: "Adventure", season: "Spring", days: 7, price: 62000, image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=85", description: "Mountain roads, pine forests, riverside stays, hikes, and cafe-lined towns." },
    { id: 6, name: "Maldives", type: "Beach", season: "Summer", days: 5, price: 148000, image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=85", description: "Lagoon villas, snorkeling, sandbank dining, and bright blue island calm." },
  ],
  packages: [
    { id: 1, name: "Island Romance", destination: "Bali", days: 6, price: 92000, offer: "12% honeymoon offer" },
    { id: 2, name: "Desert and Skyline", destination: "Dubai", days: 5, price: 104000, offer: "Free desert dinner" },
    { id: 3, name: "Alpine Luxe Rail", destination: "Swiss Alps", days: 8, price: 245000, offer: "Early bird Rs.18,000 off" },
    { id: 4, name: "Backwater Escape", destination: "Kerala", days: 5, price: 58000, offer: "Spa credit included" },
    { id: 5, name: "Mountain Trail", destination: "Himachal", days: 7, price: 69000, offer: "Group discount" },
    { id: 6, name: "Lagoon Villa Stay", destination: "Maldives", days: 5, price: 162000, offer: "Seaplane upgrade" },
  ],
  bookings: [
    { id: 1, name: "Ananya Rao", email: "ananya@example.com", destination: "Bali", date: "2026-08-12", travelers: 2, budget: "Rs.1,00,000", status: "Pending" },
    { id: 2, name: "Kabir Mehta", email: "kabir@example.com", destination: "Dubai", date: "2026-11-04", travelers: 4, budget: "Rs.2,20,000", status: "Approved" },
  ],
  reviews: [
    { id: 1, name: "Priya Nair", trip: "Kerala Backwaters", text: "Everything felt calm, personal, and perfectly timed." },
    { id: 2, name: "Rahul Shah", trip: "Dubai Family Trip", text: "Roamora handled our transfers, tickets, and hotel choices smoothly." },
  ],
};

function loadSiteData() {
  try {
    const savedData = JSON.parse(localStorage.getItem(SITE_STORAGE_KEY));
    return savedData || structuredClone(defaultData);
  } catch (error) {
    return structuredClone(defaultData);
  }
}

function saveSiteData() {
  localStorage.setItem(SITE_STORAGE_KEY, JSON.stringify(state));
}

function loadSupportTickets() {
  try {
    return JSON.parse(localStorage.getItem(SUPPORT_STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveSupportTickets(tickets) {
  localStorage.setItem(SUPPORT_STORAGE_KEY, JSON.stringify(tickets));
}

const state = loadSiteData();
const formatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
  style: "currency",
  currency: "INR",
});

function money(value) {
  return formatter.format(value).replace("₹", "Rs.");
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(function () { toast.classList.remove("show"); }, 2400);
}

function renderStats() {
  const approved = state.bookings.filter(function (booking) { return booking.status === "Approved"; });
  const pending = state.bookings.filter(function (booking) { return booking.status === "Pending"; });
  const counts = state.bookings.reduce(function (result, booking) {
    result[booking.destination] = (result[booking.destination] || 0) + 1;
    return result;
  }, {});
  const popular = Object.entries(counts).sort(function (a, b) { return b[1] - a[1]; })[0];

  document.querySelector("#statBookings").textContent = state.bookings.length;
  document.querySelector("#statRevenue").textContent = money(approved.length * 85000);
  document.querySelector("#statPending").textContent = pending.length;
  document.querySelector("#statPopular").textContent = popular ? popular[0] : "Bali";
  document.querySelector("#recentBookings").innerHTML = state.bookings.slice(0, 5).map(function (booking) {
    return "<tr><td>" + booking.name + "</td><td>" + booking.destination + "</td><td>" + booking.date + "</td><td>" + booking.status + "</td></tr>";
  }).join("");
}

function renderDestinations() {
  document.querySelector("#adminDestinationList").innerHTML = state.destinations.map(function (destination) {
    return "<div class=\"admin-item\"><div><strong>" + destination.name + "</strong><p>" + destination.type + " - " + destination.season + " - " + destination.days + " days - " + money(destination.price) + "</p></div><div class=\"item-actions\"><button onclick=\"editDestination(" + destination.id + ")\">Edit</button><button class=\"danger\" onclick=\"deleteDestination(" + destination.id + ")\">Delete</button></div></div>";
  }).join("");
}

function renderPackages() {
  document.querySelector("#adminPackageList").innerHTML = state.packages.map(function (travelPackage) {
    return "<div class=\"admin-item\"><div><strong>" + travelPackage.name + "</strong><p>" + travelPackage.destination + " - " + travelPackage.days + " days - " + money(travelPackage.price) + " - " + (travelPackage.offer || "No offer") + "</p></div><div class=\"item-actions\"><button onclick=\"editPackage(" + travelPackage.id + ")\">Edit</button><button class=\"danger\" onclick=\"deletePackage(" + travelPackage.id + ")\">Delete</button></div></div>";
  }).join("");
}

function renderBookings() {
  document.querySelector("#adminBookingList").innerHTML = state.bookings.map(function (booking) {
    return "<div class=\"admin-item\"><div><strong>" + booking.name + "</strong><p>" + booking.destination + " - " + booking.date + " - " + booking.travelers + " travelers - " + booking.status + "</p><p>" + booking.email + " - " + booking.budget + "</p></div><div class=\"item-actions\"><button class=\"approve\" onclick=\"setBookingStatus(" + booking.id + ", 'Approved')\">Approve</button><button class=\"danger\" onclick=\"setBookingStatus(" + booking.id + ", 'Rejected')\">Reject</button></div></div>";
  }).join("");
}

function renderReviews() {
  document.querySelector("#adminReviewList").innerHTML = state.reviews.map(function (review) {
    return "<div class=\"admin-item\"><div><strong>" + review.name + "</strong><p>" + review.trip + " - " + review.text + "</p></div><button class=\"danger\" onclick=\"deleteReview(" + review.id + ")\">Delete</button></div>";
  }).join("");
}

function renderSupportTickets() {
  const tickets = loadSupportTickets();
  const openCount = tickets.filter(function (ticket) { return ticket.status === "Open"; }).length;
  document.querySelector("#openTicketCount").textContent = openCount + " open";

  document.querySelector("#adminSupportList").innerHTML = tickets.length ? tickets.map(function (ticket) {
    const replies = ticket.replies.map(function (reply) {
      return "<div class=\"ticket-reply admin-reply\"><strong>Admin reply</strong><p>" + reply.message + "</p><small>" + reply.date + "</small></div>";
    }).join("");

    return "<article class=\"support-admin-card\"><div class=\"ticket-card-top\"><div><strong>Ticket #" + ticket.id + " - " + ticket.name + "</strong><p>" + ticket.email + " | " + ticket.category + " | " + ticket.createdAt + "</p></div><span class=\"status status-" + ticket.status.toLowerCase() + "\">" + ticket.status + "</span></div><div class=\"customer-message\"><strong>Customer</strong><p>" + ticket.message + "</p></div>" + replies + "<form class=\"reply-form\" onsubmit=\"replyToTicket(event, '" + ticket.id + "')\"><textarea rows=\"3\" required placeholder=\"Write a helpful reply to the customer\"></textarea><div class=\"item-actions\"><button>Send Reply</button><button type=\"button\" class=\"approve\" onclick=\"closeTicket('" + ticket.id + "')\">Mark Resolved</button></div></form></article>";
  }).join("") : "<p class=\"empty-state\">No customer complaints have been submitted.</p>";
}

function renderAdmin() {
  renderStats();
  renderDestinations();
  renderPackages();
  renderBookings();
  renderReviews();
  renderSupportTickets();
}

function editDestination(id) {
  const destination = state.destinations.find(function (item) { return item.id === id; });
  if (!destination) return;
  destination.price = Number(prompt("Update price", destination.price) || destination.price);
  destination.season = prompt("Update season", destination.season) || destination.season;
  saveSiteData();
  renderAdmin();
  showToast("Destination updated");
}

function deleteDestination(id) {
  state.destinations = state.destinations.filter(function (item) { return item.id !== id; });
  saveSiteData();
  renderAdmin();
}

function editPackage(id) {
  const travelPackage = state.packages.find(function (item) { return item.id === id; });
  if (!travelPackage) return;
  travelPackage.price = Number(prompt("Update price", travelPackage.price) || travelPackage.price);
  travelPackage.offer = prompt("Update offer", travelPackage.offer) || travelPackage.offer;
  saveSiteData();
  renderAdmin();
}

function deletePackage(id) {
  state.packages = state.packages.filter(function (item) { return item.id !== id; });
  saveSiteData();
  renderAdmin();
}

function setBookingStatus(id, status) {
  const booking = state.bookings.find(function (item) { return item.id === id; });
  if (!booking) return;
  booking.status = status;
  saveSiteData();
  renderAdmin();
  showToast("Booking " + status.toLowerCase());
}

function deleteReview(id) {
  state.reviews = state.reviews.filter(function (item) { return item.id !== id; });
  saveSiteData();
  renderAdmin();
}

function replyToTicket(event, ticketId) {
  event.preventDefault();
  const tickets = loadSupportTickets();
  const ticket = tickets.find(function (item) { return item.id === ticketId; });
  if (!ticket) return;

  ticket.replies.push({
    message: event.target.querySelector("textarea").value.trim(),
    date: new Date().toLocaleString("en-IN"),
  });
  ticket.status = "Answered";
  saveSupportTickets(tickets);
  renderSupportTickets();
  showToast("Reply saved for the customer");
}

function closeTicket(ticketId) {
  const tickets = loadSupportTickets();
  const ticket = tickets.find(function (item) { return item.id === ticketId; });
  if (!ticket) return;
  ticket.status = "Resolved";
  saveSupportTickets(tickets);
  renderSupportTickets();
}

function setupAdminEvents() {
  document.querySelector("#adminLoginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const validLogin = document.querySelector("#adminEmail").value === "admin@roamora.com" && document.querySelector("#adminPassword").value === "roamora123";
    if (!validLogin) return showToast("Invalid admin login");
    document.querySelector("#loginPanel").classList.add("hidden");
    document.querySelector("#adminDashboard").classList.remove("hidden");
    renderAdmin();
  });

  document.querySelector("#logoutBtn").addEventListener("click", function () {
    document.querySelector("#adminDashboard").classList.add("hidden");
    document.querySelector("#loginPanel").classList.remove("hidden");
  });

  document.querySelectorAll("[data-tab]").forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelectorAll("[data-tab]").forEach(function (item) { item.classList.remove("active"); });
      document.querySelectorAll(".tab").forEach(function (item) { item.classList.remove("active"); });
      button.classList.add("active");
      document.querySelector("#" + button.dataset.tab).classList.add("active");
      document.querySelector("#adminTitle").textContent = button.textContent;
    });
  });

  document.querySelector("#destinationForm").addEventListener("submit", function (event) {
    event.preventDefault();
    state.destinations.unshift({ id: Date.now(), name: document.querySelector("#destName").value, type: document.querySelector("#destType").value, season: document.querySelector("#destSeason").value, days: Number(document.querySelector("#destDays").value), price: Number(document.querySelector("#destPrice").value), image: document.querySelector("#destImage").value, description: "A newly added Roamora destination." });
    saveSiteData();
    event.target.reset();
    renderAdmin();
  });

  document.querySelector("#packageForm").addEventListener("submit", function (event) {
    event.preventDefault();
    state.packages.unshift({ id: Date.now(), name: document.querySelector("#pkgName").value, destination: document.querySelector("#pkgDestination").value, days: Number(document.querySelector("#pkgDays").value), price: Number(document.querySelector("#pkgPrice").value), offer: document.querySelector("#pkgOffer").value });
    saveSiteData();
    event.target.reset();
    renderAdmin();
  });

  document.querySelector("#reviewForm").addEventListener("submit", function (event) {
    event.preventDefault();
    state.reviews.unshift({ id: Date.now(), name: document.querySelector("#reviewName").value, trip: document.querySelector("#reviewTrip").value, text: document.querySelector("#reviewText").value });
    saveSiteData();
    event.target.reset();
    renderAdmin();
  });

  document.querySelector("#contentForm").addEventListener("submit", function (event) {
    event.preventDefault();
    localStorage.setItem("roamoraHeadline", document.querySelector("#contentHeadline").value);
    localStorage.setItem("roamoraAbout", document.querySelector("#contentAbout").value);
    showToast("Website content saved");
  });
}

setupAdminEvents();
renderAdmin();
