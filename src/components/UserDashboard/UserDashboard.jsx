import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineSquares2X2,
  HiOutlineUserGroup,
  HiOutlineShoppingBag,
  HiOutlineChartBar,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCog6Tooth,
  HiOutlineQuestionMarkCircle,
  HiOutlineBell,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowRightOnRectangle,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
  HiOutlineDocumentPlus,
  HiOutlineUserPlus,
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineInbox,
  HiOutlineStar,
  HiOutlineGlobeAlt,
  HiOutlineArrowDownTray,
  HiOutlineTruck,
  HiOutlineEllipsisHorizontal,
  HiOutlineBeaker,
  HiOutlineClipboardDocumentList,
  HiOutlineSun,
  HiOutlineMapPin,
  HiOutlineSparkles,
  HiOutlineCloudArrowUp,
  HiOutlineBanknotes,
  HiOutlineScale,
  HiOutlineFunnel,
  HiOutlineCircleStack,
  HiOutlineArrowPath,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineTag,
  HiOutlinePaperAirplane,
  HiOutlineChevronRight,
  HiOutlinePlusCircle,
  HiOutlineCreditCard,
  HiOutlineUserCircle,
  HiOutlineLockClosed,
  HiOutlineLanguage,
  HiOutlineBookOpen,
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineVideoCamera,
  HiOutlineArrowTopRightOnSquare,
} from "react-icons/hi2";
import "./UserDashboard.css";
import logo from "../../assets/stackly_logo.webp";

const NAV_ITEMS = [
  { label: "Dashboard", icon: HiOutlineSquares2X2, view: "dashboard" },
  { label: "Farmers", icon: HiOutlineUserGroup, view: "farmers" },
  { label: "Crops & Plots", icon: HiOutlineGlobeAlt, view: "crops" },
  { label: "Orders", icon: HiOutlineShoppingBag, view: "orders" },
  { label: "Analytics", icon: HiOutlineChartBar, view: "analytics" },
  { label: "Messages", icon: HiOutlineChatBubbleLeftRight, view: "messages" },
  { label: "Settings", icon: HiOutlineCog6Tooth, view: "settings" },
  { label: "Help & Support", icon: HiOutlineQuestionMarkCircle, view: "help" },
];

const STATS = [
  { label: "Total Crops Listed", value: "3,842", up: true, icon: HiOutlineGlobeAlt },
  { label: "Active Farmers", value: "214", up: true, icon: HiOutlineUserGroup },
  { label: "Monthly Orders", value: "6,510", up: false, icon: HiOutlineShoppingBag },
  { label: "Revenue", value: "₹24.6L",  up: true, icon: HiOutlineBanknotes },
  { label: "Avg. Order Value", value: "₹980", up: true, icon: HiOutlineScale },
  { label: "Pending Payouts", value: "₹4.1L",  up: false, icon: HiOutlineCircleStack },
];

const RECENT_ORDERS = [
  { id: "#HV-5031", crop: "Organic Tomatoes", farmer: "Ramesh Patil", status: "Delivered", amount: "₹1,200", qty: "40 kg", date: "Jun 28" },
  { id: "#HV-5030", crop: "Basmati Rice (50kg)", farmer: "Sundar Krishnan", status: "Shipped", amount: "₹2,400", qty: "2 bags", date: "Jun 28" },
  { id: "#HV-5029", crop: "Fresh Spinach Bunch", farmer: "Anita Devi", status: "Processing", amount: "₹340", qty: "12 bunches", date: "Jun 27" },
  { id: "#HV-5028", crop: "Alphonso Mangoes", farmer: "Vijay Sawant", status: "Delivered", amount: "₹3,100", qty: "1 box (10kg)", date: "Jun 27" },
  { id: "#HV-5027", crop: "Millets Mixed Pack", farmer: "Geeta Kumari", status: "Cancelled", amount: "₹890", qty: "15 kg", date: "Jun 26" },
  { id: "#HV-5026", crop: "Cold-Press Coconut Oil", farmer: "Anita Devi", status: "Delivered", amount: "₹1,560", qty: "6 bottles", date: "Jun 26" },
  { id: "#HV-5025", crop: "Desi Ghee (1L)", farmer: "Ramesh Patil", status: "Shipped", amount: "₹2,850", qty: "3 jars", date: "Jun 25" },
  { id: "#HV-5024", crop: "Turmeric Powder (1kg)", farmer: "Mohan Reddy", status: "Processing", amount: "₹420", qty: "5 packs", date: "Jun 25" },
];

const TOP_CROPS = [
  { title: "Alphonso Mangoes", farmer: "Vijay Sawant", sales: 892, percent: 95 },
  { title: "Organic Basmati Rice", farmer: "Sundar Krishnan", sales: 741, percent: 79 },
  { title: "Desi Ghee (1L)", farmer: "Ramesh Patil", sales: 638, percent: 68 },
  { title: "Cold-Press Coconut Oil", farmer: "Anita Devi", sales: 504, percent: 54 },
  { title: "Turmeric Powder (1kg)", farmer: "Mohan Reddy", sales: 411, percent: 44 },
];

const ACTIVITY_FEED = [
  { icon: HiOutlineDocumentPlus, text: "New produce listing submitted by Ramesh Patil", time: "8 minutes ago", tone: "green" },
  { icon: HiOutlineCheckCircle, text: "Order #HV-5031 marked as delivered", time: "2 hours ago", tone: "success" },
  { icon: HiOutlineUserPlus, text: "Geeta Kumari registered as a new farmer", time: "4 hours ago", tone: "info" },
  { icon: HiOutlineExclamationCircle, text: "Order #HV-5027 was cancelled by customer", time: "6 hours ago", tone: "error" },
  { icon: HiOutlineInbox, text: "5 new wholesale enquiries in your inbox", time: "Yesterday", tone: "green" },
  { icon: HiOutlineCloudArrowUp, text: "Soil health report uploaded for Nashik Cluster", time: "Yesterday", tone: "info" },
  { icon: HiOutlineBanknotes, text: "Payout of ₹86,400 settled to 6 farmers", time: "2 days ago", tone: "success" },
];

const UPCOMING_TASKS = [
  { title: "Soil health audit — Nashik Cluster Farm", date: "Today, 3:00 PM", priority: "High" },
  { title: "Certification renewal call with Anita Devi", date: "Tomorrow, 10:00 AM", priority: "Medium" },
  { title: "Seasonal harvest report due", date: "Jul 1", priority: "High" },
  { title: "Farmer onboarding webinar — Kharif season", date: "Jul 4", priority: "Low" },
  { title: "Cold-chain vendor contract renewal", date: "Jul 6", priority: "Medium" },
  { title: "Quality audit — Alphonso Mango batch #18", date: "Jul 9", priority: "High" },
];

const NEW_FARMERS = [
  { name: "Geeta Kumari", region: "Bihar · Millets", plots: 3, joined: "4 hours ago" },
  { name: "Mohan Reddy", region: "Telangana · Rice", plots: 7, joined: "1 day ago" },
  { name: "Savita Bai", region: "Rajasthan · Pulses", plots: 2, joined: "3 days ago" },
  { name: "Irfan Sheikh", region: "Maharashtra · Cotton", plots: 5, joined: "5 days ago" },
];

const REVIEWS = [
  { crop: "Alphonso Mangoes", reviewer: "Verified Buyer", rating: 5, text: "Absolutely divine — perfectly ripened, zero chemical smell, delivered fresh to our door." },
  { crop: "Organic Basmati Rice", reviewer: "Bulk Buyer", rating: 4, text: "Excellent grain quality and authentic aroma, though delivery took a day longer." },
  { crop: "Desi Ghee (1L)", reviewer: "Verified Buyer", rating: 5, text: "Pure and grainy — just like grandma used to make. Will reorder every month." },
];

const SALES_BY_CATEGORY = [
  { genre: "Fruits & Vegetables", percent: 38 },
  { genre: "Grains & Cereals", percent: 27 },
  { genre: "Dairy & Ghee", percent: 17 },
  { genre: "Oils & Extracts", percent: 11 },
  { genre: "Spices & Herbs", percent: 7 },
];

const REGIONAL_CLUSTERS = [
  { region: "Nashik, Maharashtra", farmers: 58, crop: "Mangoes, Grapes", health: 92 },
  { region: "Thanjavur, Tamil Nadu", farmers: 41, crop: "Basmati & Paddy Rice", health: 87 },
  { region: "Anand, Gujarat", farmers: 33, crop: "Dairy & Ghee", health: 95 },
  { region: "Muzaffarpur, Bihar", farmers: 27, crop: "Millets, Litchi", health: 78 },
  { region: "Warangal, Telangana", farmers: 35, crop: "Cotton, Chillies", health: 84 },
  { region: "Kota, Rajasthan", farmers: 20, crop: "Pulses, Coriander", health: 81 },
];

const MESSAGES_PREVIEW = [
  { name: "Vijay Sawant", snippet: "Mango harvest is 2 days ahead of schedule this week.", time: "10m", unread: true },
  { name: "Cold Chain Logistics", snippet: "Pickup confirmed for tomorrow, 7 AM slot.", time: "1h", unread: true },
  { name: "Anita Devi", snippet: "Sent the renewed organic certificate, please check.", time: "3h", unread: false },
  { name: "Wholesale — Big Basket", snippet: "Can we discuss bulk pricing for basmati rice?", time: "Yesterday", unread: false },
];

const CERTIFICATIONS = [
  { label: "India Organic (NPOP)", status: "Active", expiry: "Mar 2027" },
  { label: "FSSAI License", status: "Active", expiry: "Nov 2026" },
  { label: "GlobalG.A.P.", status: "Renewal Due", expiry: "Jul 2026" },
  { label: "Fair Trade Certified", status: "Active", expiry: "Jan 2027" },
];

const WEATHER_STRIP = [
  { day: "Today", temp: "31°C", note: "Clear skies" },
  { day: "Tue", temp: "29°C", note: "Light showers" },
  { day: "Wed", temp: "28°C", note: "Cloudy" },
  { day: "Thu", temp: "30°C", note: "Clear skies" },
  { day: "Fri", temp: "32°C", note: "Humid" },
];

/* ── Farmers page ── */
const ALL_FARMERS = [
  { name: "Ramesh Patil", region: "Nashik, Maharashtra", crop: "Tomatoes, Onions", plots: 6, rating: 4.8, status: "Active" },
  { name: "Sundar Krishnan", region: "Thanjavur, Tamil Nadu", crop: "Basmati Rice", plots: 9, rating: 4.6, status: "Active" },
  { name: "Anita Devi", region: "Anand, Gujarat", crop: "Spinach, Coconut Oil", plots: 4, rating: 4.9, status: "Active" },
  { name: "Vijay Sawant", region: "Ratnagiri, Maharashtra", crop: "Alphonso Mangoes", plots: 5, rating: 4.9, status: "Active" },
  { name: "Geeta Kumari", region: "Muzaffarpur, Bihar", crop: "Millets", plots: 3, rating: 4.4, status: "New" },
  { name: "Mohan Reddy", region: "Warangal, Telangana", crop: "Rice, Turmeric", plots: 7, rating: 4.5, status: "New" },
  { name: "Savita Bai", region: "Kota, Rajasthan", crop: "Pulses, Coriander", plots: 2, rating: 4.3, status: "New" },
  { name: "Irfan Sheikh", region: "Nagpur, Maharashtra", crop: "Cotton", plots: 5, rating: 4.2, status: "New" },
  { name: "Lakshmi Narayanan", region: "Madurai, Tamil Nadu", crop: "Bananas, Coconut", plots: 8, rating: 4.7, status: "Active" },
];

/* ── Crops & Plots page ── */
const CROP_CATALOG = [
  { name: "Alphonso Mangoes", category: "Fruits", farmers: 12, stock: "High", price: "₹310/kg" },
  { name: "Organic Basmati Rice", category: "Grains", farmers: 24, stock: "High", price: "₹120/kg" },
  { name: "Desi Ghee (1L)", category: "Dairy", farmers: 9, stock: "Medium", price: "₹950/jar" },
  { name: "Cold-Press Coconut Oil", category: "Oils", farmers: 7, stock: "Medium", price: "₹260/L" },
  { name: "Turmeric Powder (1kg)", category: "Spices", farmers: 15, stock: "High", price: "₹84/pack" },
  { name: "Fresh Spinach Bunch", category: "Vegetables", farmers: 31, stock: "Low", price: "₹28/bunch" },
  { name: "Millets Mixed Pack", category: "Grains", farmers: 11, stock: "Medium", price: "₹59/kg" },
  { name: "Organic Tomatoes", category: "Vegetables", farmers: 22, stock: "High", price: "₹30/kg" },
];

const PLOT_HEALTH = [
  { region: "Nashik, Maharashtra", farmers: 58, crop: "Mangoes, Grapes", health: 92 },
  { region: "Thanjavur, Tamil Nadu", farmers: 41, crop: "Basmati & Paddy Rice", health: 87 },
  { region: "Anand, Gujarat", farmers: 33, crop: "Dairy & Ghee", health: 95 },
  { region: "Muzaffarpur, Bihar", farmers: 27, crop: "Millets, Litchi", health: 78 },
  { region: "Warangal, Telangana", farmers: 35, crop: "Cotton, Chillies", health: 84 },
  { region: "Kota, Rajasthan", farmers: 20, crop: "Pulses, Coriander", health: 81 },
];

/* ── Analytics page ── */
const MONTHLY_REVENUE = [
  { month: "Jan", value: 14.2 }, { month: "Feb", value: 15.8 }, { month: "Mar", value: 17.1 },
  { month: "Apr", value: 16.4 }, { month: "May", value: 19.9 }, { month: "Jun", value: 21.3 },
  { month: "Jul", value: 22.0 }, { month: "Aug", value: 20.5 }, { month: "Sep", value: 19.2 },
  { month: "Oct", value: 23.6 }, { month: "Nov", value: 24.0 }, { month: "Dec", value: 24.6 },
];

const ANALYTICS_KPIS = [
  { label: "Order Fulfillment Rate", value: "96.2%", note: "Above 95% target" },
  { label: "Avg. Delivery Time", value: "2.4 days", note: "Down from 2.9 days" },
  { label: "Repeat Buyer Rate", value: "58%", note: "Up 6 pts YoY" },
  { label: "Farmer Retention", value: "91%", note: "214 of 235 active" },
];

/* ── Settings page ── */
const SETTINGS_GROUPS = [
  {
    title: "Account",
    icon: HiOutlineUserCircle,
    items: [
      { label: "Profile details", desc: "Name, email, phone, organization role" },
      { label: "Organization", desc: "HarvestHub Pvt. Ltd. · Nashik, Maharashtra" },
    ],
  },
  {
    title: "Security",
    icon: HiOutlineLockClosed,
    items: [
      { label: "Password", desc: "Last changed 3 months ago" },
      { label: "Two-factor authentication", desc: "Enabled via SMS" },
    ],
  },
  {
    title: "Billing",
    icon: HiOutlineCreditCard,
    items: [
      { label: "Payout account", desc: "HDFC Bank •••• 4821" },
      { label: "Invoices", desc: "View and download past invoices" },
    ],
  },
  {
    title: "Preferences",
    icon: HiOutlineLanguage,
    items: [
      { label: "Language", desc: "English (India)" },
      { label: "Notification settings", desc: "Email, SMS, and in-app alerts" },
    ],
  },
];

/* ── Help & Support page ── */
const FAQ_ITEMS = [
  { q: "How do I onboard a new farmer?", a: "Go to Farmers and use the onboarding form to add region, crop type, and plot details." },
  { q: "How are payouts calculated?", a: "Payouts are settled weekly based on delivered orders minus platform commission." },
  { q: "How do I renew a certification?", a: "Open the certification card on the Dashboard and submit renewal documents." },
  { q: "Why was an order marked cancelled?", a: "Orders are cancelled automatically if not confirmed by the farmer within 24 hours." },
];

const SUPPORT_CHANNELS = [
  { icon: HiOutlinePhone, label: "Call Support", detail: "+91 1800 200 3000 · 9 AM–7 PM" },
  { icon: HiOutlineChatBubbleLeftEllipsis, label: "Live Chat", detail: "Avg. response time: 4 minutes" },
  { icon: HiOutlineEnvelope, label: "Email Us", detail: "support@harvesthub.in" },
  { icon: HiOutlineVideoCamera, label: "Book a Demo Call", detail: "Walkthrough with onboarding team" },
];

const VIEW_HEADINGS = {
  dashboard: { title: "Good harvest season 🌾", subtitle: "Here's what's growing across your organic network today." },
  farmers: { title: "Farmers", subtitle: "Every farmer registered on your organic network, in one place." },
  crops: { title: "Crops & Plots", subtitle: "Catalog of crops, stock levels, and regional plot health." },
  orders: { title: "Orders", subtitle: "Track every order from confirmation to delivery." },
  analytics: { title: "Analytics", subtitle: "Revenue trends and performance across your network." },
  messages: { title: "Messages", subtitle: "Conversations with farmers, buyers, and logistics partners." },
  settings: { title: "Settings", subtitle: "Manage your account, security, billing, and preferences." },
  help: { title: "Help & Support", subtitle: "Answers to common questions and ways to reach our team." },
};

function priorityClass(p) {
  if (p === "High") return "priority-pill high";
  if (p === "Medium") return "priority-pill medium";
  return "priority-pill low";
}

function statusClass(status) {
  switch (status) {
    case "Delivered": return "status-pill delivered";
    case "Shipped": return "status-pill shipped";
    case "Processing": return "status-pill processing";
    case "Cancelled": return "status-pill cancelled";
    default: return "status-pill";
  }
}

function certClass(status) {
  return status === "Active" ? "cert-pill active" : "cert-pill due";
}

function toneClass(tone) {
  return `activity-icon ${tone}`;
}

function healthClass(h) {
  if (h >= 90) return "health-bar-fill excellent";
  if (h >= 80) return "health-bar-fill good";
  return "health-bar-fill fair";
}

function farmerStatusClass(status) {
  return status === "Active" ? "status-pill delivered" : "status-pill processing";
}

function stockClass(stock) {
  if (stock === "High") return "status-pill delivered";
  if (stock === "Medium") return "status-pill processing";
  return "status-pill cancelled";
}

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    setSidebarOpen(false);
    navigate("/login");
  };

  const goToView = (view) => {
    setActiveView(view);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const activeNavItem = NAV_ITEMS.find((n) => n.view === activeView) || NAV_ITEMS[0];

  return (
    <div className="dash-page">

      {sidebarOpen && <div className="dash-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* ── Sidebar ── */}
      <aside className={`dash-sidebar${sidebarOpen ? " open" : ""}`}>
        <div className="dash-logo-area">
          <div className="dash-logo-placeholder" aria-label="Logo">
            <img src={logo} alt="" />
          </div>
          <button className="dash-sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <HiOutlineXMark />
          </button>
        </div>

        <nav className="dash-nav">
          <span className="dash-nav-label">Menu</span>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.view === activeView;
            return (
              <button
                type="button"
                key={item.label}
                className={`dash-nav-item${isActive ? " active" : ""}`}
                onClick={() => goToView(item.view)}
              >
                <Icon className="dash-nav-icon" />
                <span>{item.label}</span>
                {isActive && <span className="dash-nav-dot" />}
              </button>
            );
          })}
        </nav>

        <div className="dash-sidebar-footer">
          <button type="button" className="dash-nav-item logout" onClick={handleLogout}>
            <HiOutlineArrowRightOnRectangle className="dash-nav-icon" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="dash-main">

        <header className="dash-topbar">
          <button className="dash-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <HiOutlineBars3 />
          </button>

          <div className="dash-search">
            <HiOutlineMagnifyingGlass className="dash-search-icon" />
            <input type="text" placeholder="Search crops, farmers, orders…" />
          </div>

          <div className="dash-topbar-actions">
            <Link to="/404" className="dash-icon-btn" aria-label="Notifications">
              <HiOutlineBell />
              <span className="dash-icon-badge" />
            </Link>
          </div>
        </header>

        <main className="dash-content">

          <div className="dash-heading-row">
            <div>
              <h1>{VIEW_HEADINGS[activeView].title}</h1>
              <p>{VIEW_HEADINGS[activeView].subtitle}</p>
            </div>
            <div className="dash-heading-actions">
              <Link to="/404" className="btn-secondary">
                <HiOutlineArrowDownTray />
                Export Report
              </Link>
              <Link to="/404" className="btn-primary">+ List New Crop</Link>
            </div>
          </div>

          {activeView === "dashboard" && (
          <>
          {/* Weather strip */}
          <section className="weather-strip">
            <div className="weather-strip-label">
              <HiOutlineSun />
              <span>Growing Season Outlook · Nashik Region</span>
            </div>
            <div className="weather-strip-days">
              {WEATHER_STRIP.map((w) => (
                <div className="weather-day" key={w.day}>
                  <span className="weather-day-name">{w.day}</span>
                  <span className="weather-day-temp">{w.temp}</span>
                  <span className="weather-day-note">{w.note}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Stat cards */}
          <section className="dash-stats">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <Link to="/404" className="stat-card" key={s.label}>
                  <div className="stat-top-row">
                    <span className="stat-label">{s.label}</span>
                    <span className="stat-icon"><Icon /></span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-value">{s.value}</span>
                    <span className={`stat-delta ${s.up ? "up" : "down"}`}>
                      {s.up ? <HiOutlineArrowTrendingUp /> : <HiOutlineArrowTrendingDown />}
                      {s.delta}
                    </span>
                  </div>
                </Link>
              );
            })}
          </section>

          {/* Two-column panels */}
          <section className="dash-panels">

            <div className="panel panel-wide">
              <div className="panel-header">
                <h2>Recent Orders</h2>
                <Link to="/404" className="panel-link">View all</Link>
              </div>
              <div className="table-wrap">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Crop</th>
                      <th>Farmer</th>
                      <th>Qty</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_ORDERS.map((o) => (
                      <tr key={o.id}>
                        <td className="muted">{o.id}</td>
                        <td className="strong">{o.crop}</td>
                        <td className="muted">{o.farmer}</td>
                        <td className="muted">{o.qty}</td>
                        <td className="muted">{o.date}</td>
                        <td><span className={statusClass(o.status)}>{o.status}</span></td>
                        <td className="strong">{o.amount}</td>
                        <td>
                          <Link to="/404" className="row-action" aria-label="More options">
                            <HiOutlineEllipsisHorizontal />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <h2>Top Performing</h2>
                <Link to="/404" className="panel-link">Details</Link>
              </div>
              <ul className="top-list">
                {TOP_CROPS.map((b) => (
                  <li key={b.title}>
                    <Link to="/404" className="top-item">
                      <div className="top-item-text">
                        <span className="top-item-title">{b.title}</span>
                        <span className="top-item-author">{b.farmer}</span>
                      </div>
                      <div className="top-item-bar-wrap">
                        <div className="top-item-bar">
                          <div className="top-item-bar-fill" style={{ width: `${b.percent}%` }} />
                        </div>
                        <span className="top-item-sales">{b.sales} sold</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </section>

          {/* Activity + Tasks */}
          <section className="dash-panels">

            <div className="panel">
              <div className="panel-header">
                <h2>Recent Activity</h2>
                <Link to="/404" className="panel-link">View all</Link>
              </div>
              <ul className="activity-list">
                {ACTIVITY_FEED.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <li key={i}>
                      <Link to="/404" className="activity-item">
                        <span className={toneClass(a.tone)}><Icon /></span>
                        <div className="activity-text">
                          <span>{a.text}</span>
                          <span className="activity-time">
                            <HiOutlineClock /> {a.time}
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="panel panel-wide">
              <div className="panel-header">
                <h2>Upcoming Tasks</h2>
                <Link to="/404" className="panel-link">Manage</Link>
              </div>
              <ul className="task-list">
                {UPCOMING_TASKS.map((t, i) => (
                  <li key={i}>
                    <Link to="/404" className="task-item">
                      <span className="task-icon"><HiOutlineCalendarDays /></span>
                      <div className="task-text">
                        <span className="task-title">{t.title}</span>
                        <span className="task-date">{t.date}</span>
                      </div>
                      <span className={priorityClass(t.priority)}>{t.priority}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </section>

          {/* New farmers + Sales by category + Reviews */}
          <section className="dash-panels dash-panels-three">

            <div className="panel">
              <div className="panel-header">
                <h2>New Farmers</h2>
                <Link to="/404" className="panel-link">View all</Link>
              </div>
              <ul className="author-list">
                {NEW_FARMERS.map((a) => (
                  <li key={a.name}>
                    <Link to="/404" className="author-item">
                      <span className="author-avatar">{a.name.split(" ").map((n) => n[0]).join("")}</span>
                      <div className="author-text">
                        <span className="author-name">{a.name}</span>
                        <span className="author-meta">{a.region} · {a.plots} plots</span>
                      </div>
                      <span className="author-joined">{a.joined}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel">
              <div className="panel-header">
                <h2>Sales by Category</h2>
                <Link to="/404" className="panel-link">Full report</Link>
              </div>
              <ul className="genre-list">
                {SALES_BY_CATEGORY.map((g) => (
                  <li key={g.genre} className="genre-item">
                    <div className="genre-row">
                      <span className="genre-name">{g.genre}</span>
                      <span className="genre-percent">{g.percent}%</span>
                    </div>
                    <div className="genre-bar">
                      <div className="genre-bar-fill" style={{ width: `${g.percent}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel">
              <div className="panel-header">
                <h2>Latest Reviews</h2>
                <Link to="/404" className="panel-link">View all</Link>
              </div>
              <ul className="review-list">
                {REVIEWS.map((r, i) => (
                  <li key={i}>
                    <Link to="/404" className="review-item">
                      <div className="review-top">
                        <span className="review-book">{r.crop}</span>
                        <span className="review-stars">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <HiOutlineStar key={idx} className={idx < r.rating ? "filled" : ""} />
                          ))}
                        </span>
                      </div>
                      <p className="review-text">{r.text}</p>
                      <span className="review-by">— {r.reviewer}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </section>

          {/* Regional clusters + Messages + Certifications */}
          <section className="dash-panels dash-panels-three">

            <div className="panel panel-wide">
              <div className="panel-header">
                <h2>Regional Clusters</h2>
                <Link to="/404" className="panel-link">View map</Link>
              </div>
              <ul className="cluster-list">
                {REGIONAL_CLUSTERS.map((c) => (
                  <li key={c.region}>
                    <Link to="/404" className="cluster-item">
                      <span className="cluster-pin"><HiOutlineMapPin /></span>
                      <div className="cluster-text">
                        <span className="cluster-name">{c.region}</span>
                        <span className="cluster-meta">{c.farmers} farmers · {c.crop}</span>
                      </div>
                      <div className="cluster-health">
                        <div className="health-bar">
                          <div className={healthClass(c.health)} style={{ width: `${c.health}%` }} />
                        </div>
                        <span className="health-percent">{c.health}%</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel">
              <div className="panel-header">
                <h2>Messages</h2>
                <Link to="/404" className="panel-link">Open inbox</Link>
              </div>
              <ul className="message-list">
                {MESSAGES_PREVIEW.map((m, i) => (
                  <li key={i}>
                    <Link to="/404" className="message-item">
                      <span className="message-avatar">{m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
                      <div className="message-text">
                        <div className="message-top">
                          <span className="message-name">{m.name}</span>
                          <span className="message-time">{m.time}</span>
                        </div>
                        <span className="message-snippet">{m.snippet}</span>
                      </div>
                      {m.unread && <span className="message-dot" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </section>

          {/* Certifications */}
          <section className="panel certifications-panel">
            <div className="panel-header">
              <h2>Certifications &amp; Compliance</h2>
              <Link to="/404" className="panel-link">Manage</Link>
            </div>
            <div className="cert-grid">
              {CERTIFICATIONS.map((c) => (
                <Link to="/404" className="cert-card" key={c.label}>
                  <div className="cert-top">
                    <HiOutlineClipboardDocumentList className="cert-icon" />
                    <span className={certClass(c.status)}>{c.status}</span>
                  </div>
                  <span className="cert-label">{c.label}</span>
                  <span className="cert-expiry">Valid until {c.expiry}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Quick actions */}
          <section className="panel quick-actions">
            <div className="panel-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="quick-grid">
              <Link to="/404" className="quick-card">
                <HiOutlineGlobeAlt />
                <span>Manage Crops</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineUserGroup />
                <span>Manage Farmers</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineShoppingBag />
                <span>View Orders</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineChartBar />
                <span>Full Analytics</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineBeaker />
                <span>Soil Reports</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineTruck />
                <span>Logistics</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlinePhone />
                <span>Contact Farmer</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineEnvelope />
                <span>Bulk Enquiries</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineTag />
                <span>Pricing Tools</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineFunnel />
                <span>Quality Filters</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineArrowPath />
                <span>Returns</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineSparkles />
                <span>Seasonal Picks</span>
              </Link>
            </div>
          </section>
          </>
          )}

          {/* ══════════ FARMERS VIEW ══════════ */}
          {activeView === "farmers" && (
            <>
              <section className="dash-stats">
                <div className="stat-card">
                  <div className="stat-top-row">
                    <span className="stat-label">Total Farmers</span>
                    <span className="stat-icon"><HiOutlineUserGroup /></span>
                  </div>
                  <div className="stat-row"><span className="stat-value">235</span></div>
                </div>
                <div className="stat-card">
                  <div className="stat-top-row">
                    <span className="stat-label">Active</span>
                    <span className="stat-icon"><HiOutlineCheckCircle /></span>
                  </div>
                  <div className="stat-row"><span className="stat-value">214</span></div>
                </div>
                <div className="stat-card">
                  <div className="stat-top-row">
                    <span className="stat-label">New This Month</span>
                    <span className="stat-icon"><HiOutlineUserPlus /></span>
                  </div>
                  <div className="stat-row"><span className="stat-value">21</span></div>
                </div>
                <div className="stat-card">
                  <div className="stat-top-row">
                    <span className="stat-label">Avg. Rating</span>
                    <span className="stat-icon"><HiOutlineStar /></span>
                  </div>
                  <div className="stat-row"><span className="stat-value">4.6</span></div>
                </div>
              </section>

              <section className="panel">
                <div className="panel-header">
                  <h2>All Farmers</h2>
                  <Link to="/404" className="panel-link">
                    <HiOutlinePlusCircle style={{ marginRight: "0.3rem", verticalAlign: "-2px" }} />
                    Onboard Farmer
                  </Link>
                </div>
                <div className="table-wrap">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>Farmer</th>
                        <th>Region</th>
                        <th>Primary Crop</th>
                        <th>Plots</th>
                        <th>Rating</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {ALL_FARMERS.map((f) => (
                        <tr key={f.name}>
                          <td className="strong">{f.name}</td>
                          <td className="muted">{f.region}</td>
                          <td className="muted">{f.crop}</td>
                          <td className="muted">{f.plots}</td>
                          <td className="muted">★ {f.rating}</td>
                          <td><span className={farmerStatusClass(f.status)}>{f.status}</span></td>
                          <td>
                            <Link to="/404" className="row-action" aria-label="More options">
                              <HiOutlineEllipsisHorizontal />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {/* ══════════ CROPS & PLOTS VIEW ══════════ */}
          {activeView === "crops" && (
            <>
              <section className="dash-panels">
                <div className="panel panel-wide">
                  <div className="panel-header">
                    <h2>Crop Catalog</h2>
                    <Link to="/404" className="panel-link">+ List New Crop</Link>
                  </div>
                  <div className="table-wrap">
                    <table className="dash-table">
                      <thead>
                        <tr>
                          <th>Crop</th>
                          <th>Category</th>
                          <th>Farmers</th>
                          <th>Stock</th>
                          <th>Price</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {CROP_CATALOG.map((c) => (
                          <tr key={c.name}>
                            <td className="strong">{c.name}</td>
                            <td className="muted">{c.category}</td>
                            <td className="muted">{c.farmers}</td>
                            <td><span className={stockClass(c.stock)}>{c.stock}</span></td>
                            <td className="strong">{c.price}</td>
                            <td>
                              <Link to="/404" className="row-action" aria-label="More options">
                                <HiOutlineEllipsisHorizontal />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="panel">
                  <div className="panel-header">
                    <h2>Sales by Category</h2>
                    <Link to="/404" className="panel-link">Full report</Link>
                  </div>
                  <ul className="genre-list">
                    {SALES_BY_CATEGORY.map((g) => (
                      <li key={g.genre} className="genre-item">
                        <div className="genre-row">
                          <span className="genre-name">{g.genre}</span>
                          <span className="genre-percent">{g.percent}%</span>
                        </div>
                        <div className="genre-bar">
                          <div className="genre-bar-fill" style={{ width: `${g.percent}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="panel">
                <div className="panel-header">
                  <h2>Plot Health by Region</h2>
                  <Link to="/404" className="panel-link">View map</Link>
                </div>
                <ul className="cluster-list">
                  {PLOT_HEALTH.map((c) => (
                    <li key={c.region}>
                      <Link to="/404" className="cluster-item">
                        <span className="cluster-pin"><HiOutlineMapPin /></span>
                        <div className="cluster-text">
                          <span className="cluster-name">{c.region}</span>
                          <span className="cluster-meta">{c.farmers} farmers · {c.crop}</span>
                        </div>
                        <div className="cluster-health">
                          <div className="health-bar">
                            <div className={healthClass(c.health)} style={{ width: `${c.health}%` }} />
                          </div>
                          <span className="health-percent">{c.health}%</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}

          {/* ══════════ ORDERS VIEW ══════════ */}
          {activeView === "orders" && (
            <section className="panel">
              <div className="panel-header">
                <h2>All Orders</h2>
                <Link to="/404" className="panel-link">Export CSV</Link>
              </div>
              <div className="table-wrap">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Crop</th>
                      <th>Farmer</th>
                      <th>Qty</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_ORDERS.map((o) => (
                      <tr key={o.id}>
                        <td className="muted">{o.id}</td>
                        <td className="strong">{o.crop}</td>
                        <td className="muted">{o.farmer}</td>
                        <td className="muted">{o.qty}</td>
                        <td className="muted">{o.date}</td>
                        <td><span className={statusClass(o.status)}>{o.status}</span></td>
                        <td className="strong">{o.amount}</td>
                        <td>
                          <Link to="/404" className="row-action" aria-label="More options">
                            <HiOutlineEllipsisHorizontal />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ══════════ ANALYTICS VIEW ══════════ */}
          {activeView === "analytics" && (
            <>
              <section className="dash-stats">
                {ANALYTICS_KPIS.map((k) => (
                  <div className="stat-card" key={k.label}>
                    <div className="stat-top-row">
                      <span className="stat-label">{k.label}</span>
                      <span className="stat-icon"><HiOutlineChartBar /></span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-value">{k.value}</span>
                    </div>
                    <span className="cert-expiry">{k.note}</span>
                  </div>
                ))}
              </section>

              <section className="panel">
                <div className="panel-header">
                  <h2>Monthly Revenue (₹ Lakhs)</h2>
                  <Link to="/404" className="panel-link">Export Report</Link>
                </div>
                <div className="bar-chart">
                  {MONTHLY_REVENUE.map((m) => (
                    <div className="bar-chart-col" key={m.month}>
                      <div className="bar-chart-bar-wrap">
                        <div
                          className="bar-chart-bar"
                          style={{ height: `${(m.value / 25) * 100}%` }}
                          title={`₹${m.value}L`}
                        />
                      </div>
                      <span className="bar-chart-label">{m.month}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="dash-panels">
                <div className="panel panel-wide">
                  <div className="panel-header">
                    <h2>Top Performing Crops</h2>
                    <Link to="/404" className="panel-link">Details</Link>
                  </div>
                  <ul className="top-list">
                    {TOP_CROPS.map((b) => (
                      <li key={b.title}>
                        <Link to="/404" className="top-item">
                          <div className="top-item-text">
                            <span className="top-item-title">{b.title}</span>
                            <span className="top-item-author">{b.farmer}</span>
                          </div>
                          <div className="top-item-bar-wrap">
                            <div className="top-item-bar">
                              <div className="top-item-bar-fill" style={{ width: `${b.percent}%` }} />
                            </div>
                            <span className="top-item-sales">{b.sales} sold</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="panel">
                  <div className="panel-header">
                    <h2>Sales by Category</h2>
                    <Link to="/404" className="panel-link">Full report</Link>
                  </div>
                  <ul className="genre-list">
                    {SALES_BY_CATEGORY.map((g) => (
                      <li key={g.genre} className="genre-item">
                        <div className="genre-row">
                          <span className="genre-name">{g.genre}</span>
                          <span className="genre-percent">{g.percent}%</span>
                        </div>
                        <div className="genre-bar">
                          <div className="genre-bar-fill" style={{ width: `${g.percent}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </>
          )}

          {/* ══════════ MESSAGES VIEW ══════════ */}
          {activeView === "messages" && (
            <section className="panel">
              <div className="panel-header">
                <h2>Inbox</h2>
                <Link to="/404" className="panel-link">
                  <HiOutlinePaperAirplane style={{ marginRight: "0.3rem", verticalAlign: "-2px" }} />
                  New Message
                </Link>
              </div>
              <ul className="message-list">
                {MESSAGES_PREVIEW.concat(MESSAGES_PREVIEW.map((m, i) => ({
                  ...m,
                  name: i === 0 ? "Logistics — Cold Chain" : i === 1 ? "Sundar Krishnan" : i === 2 ? "Wholesale — Reliance Fresh" : "Geeta Kumari",
                  unread: false,
                }))).map((m, i) => (
                  <li key={i}>
                    <Link to="/404" className="message-item">
                      <span className="message-avatar">{m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
                      <div className="message-text">
                        <div className="message-top">
                          <span className="message-name">{m.name}</span>
                          <span className="message-time">{m.time}</span>
                        </div>
                        <span className="message-snippet">{m.snippet}</span>
                      </div>
                      {m.unread && <span className="message-dot" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ══════════ SETTINGS VIEW ══════════ */}
          {activeView === "settings" && (
            <section className="dash-panels-three settings-grid">
              {SETTINGS_GROUPS.map((group) => {
                const GroupIcon = group.icon;
                return (
                  <div className="panel" key={group.title}>
                    <div className="panel-header">
                      <h2><GroupIcon style={{ marginRight: "0.5rem", verticalAlign: "-3px", color: "var(--green)" }} />{group.title}</h2>
                    </div>
                    <ul className="settings-list">
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <Link to="/404" className="settings-item">
                            <div className="settings-text">
                              <span className="settings-label">{item.label}</span>
                              <span className="settings-desc">{item.desc}</span>
                            </div>
                            <HiOutlineChevronRight className="settings-chevron" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </section>
          )}

          {/* ══════════ HELP & SUPPORT VIEW ══════════ */}
          {activeView === "help" && (
            <>
              <section className="dash-panels">
                <div className="panel panel-wide">
                  <div className="panel-header">
                    <h2>Frequently Asked Questions</h2>
                    <Link to="/404" className="panel-link">
                      <HiOutlineBookOpen style={{ marginRight: "0.3rem", verticalAlign: "-2px" }} />
                      Full Help Center
                    </Link>
                  </div>
                  <ul className="faq-list">
                    {FAQ_ITEMS.map((f) => (
                      <li key={f.q} className="faq-item">
                        <span className="faq-q">{f.q}</span>
                        <span className="faq-a">{f.a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="panel">
                  <div className="panel-header">
                    <h2>Contact Us</h2>
                  </div>
                  <ul className="support-list">
                    {SUPPORT_CHANNELS.map((s) => {
                      const SIcon = s.icon;
                      return (
                        <li key={s.label}>
                          <Link to="/404" className="support-item">
                            <span className="support-icon"><SIcon /></span>
                            <div className="support-text">
                              <span className="support-label">{s.label}</span>
                              <span className="support-detail">{s.detail}</span>
                            </div>
                            <HiOutlineArrowTopRightOnSquare className="settings-chevron" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </section>
            </>
          )}

        </main>
      </div>
    </div>
  );
}