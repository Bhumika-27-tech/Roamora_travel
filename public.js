const formatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
  style: "currency",
  currency: "INR",
});

const state = {
  destinations: [
    {
      id: 1,
      name: "Bali",
      type: "Beach",
      season: "Summer",
      days: 6,
      price: 78000,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
      description: "Tropical temples, private pool stays, rice terraces, and golden beach evenings.",
    },
    {
      id: 2,
      name: "Swiss Alps",
      type: "Luxury",
      season: "Winter",
      days: 8,
      price: 235000,
      image: "https://images.unsplash.com/photo-1500043357865-c6b8827edf10?auto=format&fit=crop&w=900&q=85",
      description: "Scenic rail routes, alpine villages, snow views, and refined mountain hotels.",
    },
    {
      id: 3,
      name: "Kerala",
      type: "Culture",
      season: "Monsoon",
      days: 5,
      price: 52000,
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",
      description: "Backwater cruises, Ayurveda retreats, tea hills, and slow coastal food trails.",
    },
    {
      id: 4,
      name: "Dubai",
      type: "Luxury",
      season: "Winter",
      days: 5,
      price: 96000,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85",
      description: "Skyline views, desert safaris, theme parks, shopping, and premium hotels.",
    },
    {
      id: 5,
      name: "Himachal",
      type: "Adventure",
      season: "Spring",
      days: 7,
      price: 62000,
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=85",
      description: "Mountain roads, pine forests, riverside stays, hikes, and cafe-lined towns.",
    },
    {
      id: 6,
      name: "Maldives",
      type: "Beach",
      season: "Summer",
      days: 5,
      price: 148000,
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=85",
      description: "Lagoon villas, snorkeling, sandbank dining, and bright blue island calm.",
    },
  ],

  packages: [
    { name: "Island Romance", destination: "Bali", days: 6, price: 92000, offer: "12% honeymoon offer" },
    { name: "Desert and Skyline", destination: "Dubai", days: 5, price: 104000, offer: "Free desert dinner" },
    { name: "Alpine Luxe Rail", destination: "Swiss Alps", days: 8, price: 245000, offer: "Early bird Rs.18,000 off" },
    { name: "Backwater Escape", destination: "Kerala", days: 5, price: 58000, offer: "Spa credit included" },
    { name: "Mountain Trail", destination: "Himachal", days: 7, price: 69000, offer: "Group discount" },
    { name: "Lagoon Villa Stay", destination: "Maldives", days: 5, price: 162000, offer: "Seaplane upgrade" },
  ],

  reviews: [
    {
      name: "Priya Nair",
      trip: "Kerala Backwaters",
      text: "Everything felt calm, personal, and perfectly timed. The houseboat stay was beautiful.",
    },
    {
      name: "Rahul Shah",
      trip: "Dubai Family Trip",
      text: "Roamora handled our transfers, tickets, and hotel choices so smoothly.",
    },
    {
      name: "Meera Iyer",
      trip: "Bali Honeymoon",
      text: "The itinerary had the right mix of romance, culture, beaches, and relaxed time.",
    },
  ],
};

const savedSiteData = localStorage.getItem("roamoraSiteData");

if (savedSiteData) {
  try {
    const storedData = JSON.parse(savedSiteData);
    state.destinations = storedData.destinations || state.destinations;
    state.packages = storedData.packages || state.packages;
    state.reviews = storedData.reviews || state.reviews;
  } catch (error) {
    console.warn("Saved site data could not be loaded.");
  }
}

const savedHeadline = localStorage.getItem("roamoraHeadline");
const savedAbout = localStorage.getItem("roamoraAbout");

if (savedHeadline) {
  document.querySelector(".hero h1").textContent = savedHeadline;
}

if (savedAbout) {
  document.querySelector(".about-text").textContent = savedAbout;
}

const toast = document.querySelector("#toast");

function money(value) {
  return formatter.format(value).replace("₹", "Rs.");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(function () {
    toast.classList.remove("show");
  }, 2400);
}

function selectDestination(destinationName) {
  document.querySelector("#guestDestination").value = destinationName;
  document.querySelector("#booking").scrollIntoView({ behavior: "smooth" });
}

function createDestinationCard(destination) {
  return "" +
    "<article class=\"destination-card\">" +
      "<img src=\"" + destination.image + "\" alt=\"" + destination.name + "\">" +
      "<div class=\"card-body\">" +
        "<div class=\"package-top\">" +
          "<h3>" + destination.name + "</h3>" +
          "<span class=\"offer\">" + destination.type + "</span>" +
        "</div>" +
        "<p>" + destination.description + "</p>" +
        "<p>" + destination.days + " days - " + destination.season + "</p>" +
        "<div class=\"price\">From " + money(destination.price) + "</div>" +
        "<div class=\"card-actions\">" +
          "<button onclick=\"selectDestination('" + destination.name + "')\">Book Inquiry</button>" +
          "<button class=\"ghost\" onclick=\"showDetails('destination', '" + destination.id + "')\">View Details</button>" +
        "</div>" +
      "</div>" +
    "</article>";
}

function renderDestinations(destinations) {
  const destinationGrid = document.querySelector("#destinationGrid");
  const list = destinations || state.destinations;

  if (list.length === 0) {
    destinationGrid.innerHTML = "<p>No destinations match your filters.</p>";
    return;
  }

  destinationGrid.innerHTML = list.map(createDestinationCard).join("");
}

function createPackageCard(travelPackage) {
  return "" +
    "<article class=\"package-card\">" +
      "<div class=\"package-top\">" +
        "<span class=\"offer\">" + travelPackage.offer + "</span>" +
        "<b>" + travelPackage.days + " days</b>" +
      "</div>" +
      "<h3>" + travelPackage.name + "</h3>" +
      "<p>" + travelPackage.destination + " package with stays, transfers, guided experiences, and Roamora planning support.</p>" +
      "<div class=\"price\">" + money(travelPackage.price) + "</div>" +
      "<div class=\"card-actions\">" +
        "<button onclick=\"selectDestination('" + travelPackage.destination + "')\">Inquire</button>" +
        "<button class=\"ghost\" onclick=\"showDetails('package', '" + travelPackage.name + "')\">Details</button>" +
      "</div>" +
    "</article>";
}

function renderPackages() {
  document.querySelector("#packageGrid").innerHTML = state.packages
    .map(createPackageCard)
    .join("");
}

function createReviewCard(review) {
  return "" +
    "<article class=\"testimonial-card\">" +
      "<h3>" + review.name + "</h3>" +
      "<b>" + review.trip + "</b>" +
      "<p>\"" + review.text + "\"</p>" +
    "</article>";
}

function renderReviews() {
  document.querySelector("#testimonialGrid").innerHTML = state.reviews
    .map(createReviewCard)
    .join("");
}

function applyFilters() {
  const typeFilter = document.querySelector("#typeFilter").value;
  const priceFilter = document.querySelector("#priceFilter").value;
  const durationFilter = document.querySelector("#durationFilter").value;
  const seasonFilter = document.querySelector("#seasonFilter").value;

  const filteredDestinations = state.destinations.filter(function (destination) {
    const matchesType = typeFilter === "all" || destination.type === typeFilter;
    const matchesPrice = priceFilter === "all" || destination.price <= Number(priceFilter);
    const matchesDuration = durationFilter === "all" || destination.days <= Number(durationFilter);
    const matchesSeason = seasonFilter === "all" || destination.season === seasonFilter;

    return matchesType && matchesPrice && matchesDuration && matchesSeason;
  });

  renderDestinations(filteredDestinations);
}

function handleTripSearch(event) {
  event.preventDefault();

  const locationSearch = document.querySelector("#searchLocation").value.toLowerCase();
  const selectedBudget = document.querySelector("#searchBudget").value;

  const matchingDestinations = state.destinations.filter(function (destination) {
    const matchesLocation =
      !locationSearch ||
      destination.name.toLowerCase().includes(locationSearch) ||
      destination.type.toLowerCase().includes(locationSearch);

    const matchesBudget =
      selectedBudget === "all" || destination.price <= Number(selectedBudget);

    return matchesLocation && matchesBudget;
  });

  renderDestinations(matchingDestinations);
  document.querySelector("#destinations").scrollIntoView({ behavior: "smooth" });
  showToast(matchingDestinations.length + " trips found");
}

function handleBookingForm(event) {
  event.preventDefault();

  const savedData = JSON.parse(localStorage.getItem("roamoraSiteData") || "{}");
  const bookings = savedData.bookings || [];

  bookings.unshift({
    id: Date.now(),
    name: document.querySelector("#guestName").value.trim(),
    email: document.querySelector("#guestEmail").value.trim(),
    destination: document.querySelector("#guestDestination").value.trim(),
    date: document.querySelector("#guestDate").value,
    travelers: Number(document.querySelector("#guestTravelers").value),
    budget: document.querySelector("#guestBudget").value.trim() || "Not specified",
    message: document.querySelector("#guestMessage").value.trim(),
    status: "Pending",
  });

  savedData.destinations = savedData.destinations || state.destinations;
  savedData.packages = savedData.packages || state.packages;
  savedData.reviews = savedData.reviews || state.reviews;
  savedData.bookings = bookings;
  localStorage.setItem("roamoraSiteData", JSON.stringify(savedData));

  event.target.reset();
  document.querySelector("#guestTravelers").value = 2;
  showToast("Inquiry sent. Roamora team will contact you soon.");
}

function handleNewsletterForm(event) {
  event.preventDefault();

  event.target.reset();
  showToast("Subscribed to Roamora updates");
}

function setupEventListeners() {
  document.querySelector(".nav-toggle").onclick = function () {
    document.querySelector(".main-nav").classList.toggle("open");
  };

  document
    .querySelectorAll("#typeFilter, #priceFilter, #durationFilter, #seasonFilter")
    .forEach(function (filter) {
      filter.onchange = applyFilters;
    });

  document.querySelector("#tripSearch").onsubmit = handleTripSearch;
  document.querySelector("#bookingForm").onsubmit = handleBookingForm;
  document.querySelector("#newsletterForm").onsubmit = handleNewsletterForm;
}

setupEventListeners();
renderDestinations();
renderPackages();
renderReviews();


const SUPPORT_STORAGE_KEY = "roamoraSupportTickets";
let selectedModalDestination = "";

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

function showDetails(itemType, itemKey) {
  let title = "";
  let description = "";
  let image = "";
  let price = 0;
  let days = 0;
  let destinationName = "";

  if (itemType === "destination") {
    const destination = state.destinations.find(function (item) {
      return item.id === Number(itemKey);
    });

    if (!destination) return;
    title = destination.name;
    description = destination.description;
    image = destination.image;
    price = destination.price;
    days = destination.days;
    destinationName = destination.name;
  } else {
    const travelPackage = state.packages.find(function (item) {
      return item.name === itemKey;
    });

    if (!travelPackage) return;
    const destination = state.destinations.find(function (item) {
      return item.name === travelPackage.destination;
    });

    title = travelPackage.name;
    description = "A complete " + travelPackage.destination + " itinerary designed by Roamora travel specialists.";
    image = destination ? destination.image : "";
    price = travelPackage.price;
    days = travelPackage.days;
    destinationName = travelPackage.destination;
  }

  selectedModalDestination = destinationName;
  document.querySelector("#detailsImage").src = image;
  document.querySelector("#detailsTitle").textContent = title;
  document.querySelector("#detailsDescription").textContent = description;
  document.querySelector("#detailsFacts").innerHTML =
    "<div><span>Destination</span><strong>" + destinationName + "</strong></div>" +
    "<div><span>Duration</span><strong>" + days + " days</strong></div>" +
    "<div><span>Starting price</span><strong>" + money(price) + "</strong></div>";
  document.querySelector("#detailsIncludes").innerHTML =
    "<li>Selected hotel accommodation with breakfast</li>" +
    "<li>Airport and local transfers mentioned in the itinerary</li>" +
    "<li>Guided sightseeing and curated local experiences</li>" +
    "<li>Pre-travel assistance and emergency support</li>";

  document.querySelector("#detailsModal").classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function closeDetailsModal() {
  document.querySelector("#detailsModal").classList.add("hidden");
  document.body.classList.remove("modal-open");
}

function createCustomerTicketCard(ticket) {
  const replies = ticket.replies.length
    ? ticket.replies.map(function (reply) {
        return "<div class=\"ticket-reply admin-reply\"><strong>Roamora Support</strong><p>" + reply.message + "</p><small>" + reply.date + "</small></div>";
      }).join("")
    : "<p class=\"waiting-reply\">Our support team has not replied yet.</p>";

  return "<article class=\"ticket-card\">" +
    "<div class=\"ticket-card-top\"><strong>Ticket #" + ticket.id + "</strong><span class=\"status status-" + ticket.status.toLowerCase() + "\">" + ticket.status + "</span></div>" +
    "<p><b>" + ticket.category + ":</b> " + ticket.message + "</p>" +
    replies +
    "</article>";
}

function renderCustomerTickets(email) {
  const list = document.querySelector("#customerTicketList");
  const matchingTickets = loadSupportTickets().filter(function (ticket) {
    return ticket.email.toLowerCase() === email.toLowerCase();
  });

  list.innerHTML = matchingTickets.length
    ? matchingTickets.map(createCustomerTicketCard).join("")
    : "<p class=\"empty-state\">No tickets found for this email.</p>";
}

function handleSupportSubmit(event) {
  event.preventDefault();

  const tickets = loadSupportTickets();
  const ticket = {
    id: String(Date.now()).slice(-7),
    name: document.querySelector("#supportName").value.trim(),
    email: document.querySelector("#supportEmail").value.trim(),
    category: document.querySelector("#supportCategory").value,
    message: document.querySelector("#supportMessage").value.trim(),
    status: "Open",
    createdAt: new Date().toLocaleString("en-IN"),
    replies: [],
  };

  tickets.unshift(ticket);
  saveSupportTickets(tickets);
  document.querySelector("#ticketLookupEmail").value = ticket.email;
  event.target.reset();
  renderCustomerTickets(ticket.email);
  showToast("Support ticket #" + ticket.id + " created");
}

function setupRealisticFeatures() {
  document.querySelectorAll("[data-close-modal]").forEach(function (button) {
    button.addEventListener("click", closeDetailsModal);
  });

  document.querySelector("#modalBookButton").addEventListener("click", function () {
    closeDetailsModal();
    selectDestination(selectedModalDestination);
  });

  document.querySelector("#supportForm").addEventListener("submit", handleSupportSubmit);
  document.querySelector("#ticketLookupForm").addEventListener("submit", function (event) {
    event.preventDefault();
    renderCustomerTickets(document.querySelector("#ticketLookupEmail").value.trim());
  });
}

setupRealisticFeatures();
