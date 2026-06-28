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
  HiOutlineClipboardDocumentList,
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
  HiOutlineShieldCheck,
  HiOutlineFlag,
  HiOutlineServerStack,
  HiOutlineKey,
  HiOutlineNoSymbol,
  HiOutlineWrenchScrewdriver,
  HiOutlineBuildingOffice2,
  HiOutlineIdentification,
  HiOutlineBellAlert,
  HiOutlinePresentationChartLine,
  HiOutlineArrowsRightLeft,
  HiOutlineMegaphone,
  HiOutlineReceiptPercent,
  HiOutlineChartPie,
} from "react-icons/hi2";
import "./AdminDashboard.css";
import logo from "../../assets/stackly_logo.webp";

const NAV_ITEMS = [
  { label: "Dashboard", icon: HiOutlineSquares2X2, view: "dashboard" },
  { label: "User Management", icon: HiOutlineUserGroup, view: "users" },
  { label: "Platform Orders", icon: HiOutlineShoppingBag, view: "orders" },
  { label: "Seller Approvals", icon: HiOutlineIdentification, view: "approvals" },
  { label: "Analytics", icon: HiOutlineChartBar, view: "analytics" },
  { label: "Disputes & Reports", icon: HiOutlineFlag, view: "disputes" },
  { label: "System Settings", icon: HiOutlineCog6Tooth, view: "settings" },
  { label: "Help & Support", icon: HiOutlineQuestionMarkCircle, view: "help" },
];

const STATS = [
  { label: "Total Platform Users", value: "18,402",  up: true, icon: HiOutlineUserGroup },
  { label: "Active Sellers", value: "1,241", up: true, icon: HiOutlineBuildingOffice2 },
  { label: "Orders This Month", value: "54,810",  up: true, icon: HiOutlineShoppingBag },
  { label: "Gross Revenue", value: "₹4.8Cr",  up: true, icon: HiOutlineBanknotes },
  { label: "Platform Commission", value: "₹38.4L",  up: true, icon: HiOutlineReceiptPercent },
  { label: "Open Disputes", value: "37", up: false, icon: HiOutlineFlag },
];

const RECENT_ORDERS = [
  { id: "#PLT-9821", seller: "HarvestHub Pvt. Ltd.", buyer: "Reliance Fresh", status: "Delivered", amount: "₹84,200", category: "Organic Produce", date: "Jun 28" },
  { id: "#PLT-9820", seller: "GreenRoots Co.", buyer: "Big Basket", status: "Shipped", amount: "₹32,100", category: "Grains & Cereals", date: "Jun 28" },
  { id: "#PLT-9819", seller: "FarmDirect India", buyer: "JioMart", status: "Processing", amount: "₹17,650", category: "Dairy & Ghee", date: "Jun 27" },
  { id: "#PLT-9818", seller: "PureHarvest LLP", buyer: "Swiggy Instamart", status: "Delivered", amount: "₹61,400", category: "Fruits", date: "Jun 27" },
  { id: "#PLT-9817", seller: "AgriConnect", buyer: "Metro Cash & Carry", status: "Cancelled", amount: "₹22,900", category: "Spices", date: "Jun 26" },
  { id: "#PLT-9816", seller: "GreenRoots Co.", buyer: "Spencer's Retail", status: "Delivered", amount: "₹45,700", category: "Vegetables", date: "Jun 26" },
  { id: "#PLT-9815", seller: "FarmDirect India", buyer: "Zepto", status: "Shipped", amount: "₹29,300", category: "Oils & Extracts", date: "Jun 25" },
  { id: "#PLT-9814", seller: "HarvestHub Pvt. Ltd.", buyer: "D-Mart", status: "Processing", amount: "₹73,800", category: "Organic Produce", date: "Jun 25" },
];

const TOP_SELLERS = [
  { title: "HarvestHub Pvt. Ltd.", region: "Nashik, Maharashtra", sales: 4821, percent: 95 },
  { title: "GreenRoots Co.", region: "Bengaluru, Karnataka", sales: 3940, percent: 77 },
  { title: "FarmDirect India", region: "Pune, Maharashtra", sales: 3201, percent: 63 },
  { title: "PureHarvest LLP", region: "Hyderabad, Telangana", sales: 2784, percent: 54 },
  { title: "AgriConnect", region: "Delhi NCR", sales: 1920, percent: 38 },
];

const ACTIVITY_FEED = [
  { icon: HiOutlineIdentification, text: "New seller application from FreshFields Agro — pending review", time: "12 minutes ago", tone: "green" },
  { icon: HiOutlineFlag, text: "Dispute #DIS-441 raised by buyer on order #PLT-9811", time: "1 hour ago", tone: "error" },
  { icon: HiOutlineCheckCircle, text: "Seller verification approved for GreenRoots Co.", time: "3 hours ago", tone: "success" },
  { icon: HiOutlineUserPlus, text: "482 new users registered this week", time: "5 hours ago", tone: "info" },
  { icon: HiOutlineBanknotes, text: "Commission payout of ₹12.8L processed to 84 sellers", time: "Yesterday", tone: "success" },
  { icon: HiOutlineShieldCheck, text: "SSL certificates renewed across all subdomains", time: "Yesterday", tone: "green" },
  { icon: HiOutlineNoSymbol, text: "Seller account suspended: AgriNet Traders (policy violation)", time: "2 days ago", tone: "error" },
];

const UPCOMING_TASKS = [
  { title: "Monthly seller performance review", date: "Today, 2:00 PM", priority: "High" },
  { title: "Platform fee structure revision meeting", date: "Tomorrow, 11:00 AM", priority: "High" },
  { title: "Q2 financial audit submission", date: "Jul 1", priority: "High" },
  { title: "New payment gateway integration review", date: "Jul 3", priority: "Medium" },
  { title: "Seasonal marketing campaign approval", date: "Jul 5", priority: "Medium" },
  { title: "Infrastructure scaling for festive season", date: "Jul 8", priority: "Low" },
];

const NEW_USERS = [
  { name: "Priya Mehta", role: "Buyer · Mumbai", orders: 3, joined: "2 hours ago" },
  { name: "AgriNest LLP", role: "Seller · Nagpur", orders: 0, joined: "6 hours ago" },
  { name: "Rohan Das", role: "Buyer · Kolkata", orders: 1, joined: "1 day ago" },
  { name: "FreshFields Agro", role: "Seller · Pune", orders: 0, joined: "2 days ago" },
];

const REVIEWS = [
  { platform: "Seller Experience", reviewer: "HarvestHub Pvt. Ltd.", rating: 5, text: "Payout settlements are prompt and the dashboard gives excellent visibility into our orders." },
  { platform: "Buyer Experience", reviewer: "Verified Retailer", rating: 4, text: "Good variety of organic produce but could use faster dispute resolution turnaround." },
  { platform: "Platform Overall", reviewer: "Verified Buyer", rating: 5, text: "The quality assurance checks before listing give us great confidence as a bulk buyer." },
];

const REVENUE_BY_CATEGORY = [
  { genre: "Fruits & Vegetables", percent: 35 },
  { genre: "Grains & Cereals", percent: 26 },
  { genre: "Dairy & Ghee", percent: 19 },
  { genre: "Oils & Extracts", percent: 12 },
  { genre: "Spices & Herbs", percent: 8 },
];

const REGIONAL_PERFORMANCE = [
  { region: "Maharashtra", sellers: 312, revenue: "₹1.4Cr", health: 91 },
  { region: "Tamil Nadu", sellers: 198, revenue: "₹82.4L", health: 87 },
  { region: "Gujarat", sellers: 154, revenue: "₹71.2L", health: 94 },
  { region: "Bihar & Jharkhand", sellers: 97, revenue: "₹38.1L", health: 76 },
  { region: "Telangana & AP", sellers: 183, revenue: "₹94.7L", health: 83 },
  { region: "Rajasthan", sellers: 89, revenue: "₹29.6L", health: 80 },
];

const MESSAGES_PREVIEW = [
  { name: "Compliance Team", snippet: "GlobalG.A.P. renewal reminder sent to 14 sellers.", time: "15m", unread: true },
  { name: "Payment Gateway", snippet: "Razorpay settlement file ready for reconciliation.", time: "2h", unread: true },
  { name: "HarvestHub Pvt. Ltd.", snippet: "Requesting early access to the bulk pricing API.", time: "5h", unread: false },
  { name: "Legal Team", snippet: "Draft ToS update for review before publishing.", time: "Yesterday", unread: false },
];

const PLATFORM_HEALTH = [
  { label: "API Uptime (30d)", status: "Operational", note: "99.97%" },
  { label: "Payment Gateway", status: "Operational", note: "Razorpay · Active" },
  { label: "Storage (CDN)", status: "Operational", note: "82% capacity" },
  { label: "Email / SMS Service", status: "Degraded", note: "Delayed by ~4 min" },
];

const WEATHER_STRIP = [
  { day: "Today", temp: "31°C", note: "Clear skies" },
  { day: "Tue", temp: "29°C", note: "Light showers" },
  { day: "Wed", temp: "28°C", note: "Cloudy" },
  { day: "Thu", temp: "30°C", note: "Clear skies" },
  { day: "Fri", temp: "32°C", note: "Humid" },
];

/* ── User Management page ── */
const ALL_USERS = [
  { name: "HarvestHub Pvt. Ltd.", email: "admin@harvesthub.in", role: "Seller", joined: "Mar 2023", orders: 4821, status: "Active" },
  { name: "GreenRoots Co.", email: "ops@greenroots.co", role: "Seller", joined: "Jan 2024", orders: 3940, status: "Active" },
  { name: "FarmDirect India", email: "hello@farmdirect.in", role: "Seller", joined: "Jun 2024", orders: 3201, status: "Active" },
  { name: "Priya Mehta", email: "priya.m@gmail.com", role: "Buyer", joined: "Jun 2026", orders: 3, status: "Active" },
  { name: "AgriNet Traders", email: "info@agrinettraders.in", role: "Seller", joined: "Sep 2024", orders: 892, status: "Suspended" },
  { name: "FreshFields Agro", email: "freshfields@agro.in", role: "Seller", joined: "Jun 2026", orders: 0, status: "Pending" },
  { name: "Rohan Das", email: "rohan.das@outlook.com", role: "Buyer", joined: "Jun 2026", orders: 1, status: "Active" },
  { name: "PureHarvest LLP", email: "contact@pureharvest.co", role: "Seller", joined: "Nov 2023", orders: 2784, status: "Active" },
  { name: "Lakshmi Stores", email: "lakshmistores@retail.in", role: "Buyer", joined: "Feb 2025", orders: 214, status: "Active" },
];

/* ── Seller Approvals page ── */
const PENDING_APPROVALS = [
  { name: "FreshFields Agro", region: "Pune, Maharashtra", category: "Vegetables & Fruits", docs: "Submitted", applied: "Jun 28" },
  { name: "OrganicNest India", region: "Coimbatore, Tamil Nadu", category: "Grains & Spices", docs: "Incomplete", applied: "Jun 26" },
  { name: "SunRise Dairy Co.", region: "Anand, Gujarat", category: "Dairy & Ghee", docs: "Submitted", applied: "Jun 24" },
  { name: "AgriVerde LLP", region: "Hyderabad, Telangana", category: "Organic Produce", docs: "Under Review", applied: "Jun 22" },
  { name: "GoldenGrain Exports", region: "Ludhiana, Punjab", category: "Grains & Cereals", docs: "Submitted", applied: "Jun 20" },
];

/* ── Disputes page ── */
const DISPUTES = [
  { id: "#DIS-441", order: "#PLT-9811", buyer: "Zepto", seller: "AgriConnect", reason: "Wrong item delivered", status: "Open", raised: "Jun 28" },
  { id: "#DIS-440", order: "#PLT-9804", buyer: "Big Basket", seller: "FarmDirect India", reason: "Delayed delivery — 4 days", status: "In Review", raised: "Jun 25" },
  { id: "#DIS-439", order: "#PLT-9799", buyer: "JioMart", seller: "PureHarvest LLP", reason: "Quality below listed standard", status: "Resolved", raised: "Jun 22" },
  { id: "#DIS-438", order: "#PLT-9791", buyer: "Swiggy Instamart", seller: "HarvestHub Pvt. Ltd.", reason: "Partial shipment received", status: "In Review", raised: "Jun 20" },
  { id: "#DIS-437", order: "#PLT-9782", buyer: "Spencer's Retail", seller: "GreenRoots Co.", reason: "Damaged packaging on arrival", status: "Resolved", raised: "Jun 17" },
];

/* ── Analytics page ── */
const MONTHLY_REVENUE = [
  { month: "Jan", value: 2.8 }, { month: "Feb", value: 3.1 }, { month: "Mar", value: 3.5 },
  { month: "Apr", value: 3.3 }, { month: "May", value: 4.0 }, { month: "Jun", value: 4.4 },
  { month: "Jul", value: 4.8 }, { month: "Aug", value: 4.5 }, { month: "Sep", value: 4.1 },
  { month: "Oct", value: 5.1 }, { month: "Nov", value: 5.4 }, { month: "Dec", value: 4.8 },
];

const ANALYTICS_KPIS = [
  { label: "Order Fulfillment Rate", value: "94.8%", note: "Across all sellers" },
  { label: "Avg. Platform Commission", value: "8.1%", note: "Up from 7.4% last quarter" },
  { label: "Seller Retention Rate", value: "89%", note: "1,241 of 1,394 retained" },
  { label: "Repeat Buyer Rate", value: "62%", note: "Up 8 pts YoY" },
];

/* ── System Settings page ── */
const SETTINGS_GROUPS = [
  {
    title: "Platform Identity",
    icon: HiOutlineGlobeAlt,
    items: [
      { label: "Platform name & branding", desc: "HarvestHub — logo, colors, domain config" },
      { label: "Regional & language settings", desc: "English (India) · INR · IST" },
    ],
  },
  {
    title: "Access & Security",
    icon: HiOutlineLockClosed,
    items: [
      { label: "Admin roles & permissions", desc: "3 super-admins · 8 staff admins" },
      { label: "Two-factor authentication", desc: "Enforced for all admin accounts" },
    ],
  },
  {
    title: "Billing & Commission",
    icon: HiOutlineCreditCard,
    items: [
      { label: "Platform commission rules", desc: "8% standard · 6% for bulk sellers" },
      { label: "Payout schedule", desc: "Weekly settlement · T+2 banking days" },
    ],
  },
  {
    title: "Notifications",
    icon: HiOutlineBellAlert,
    items: [
      { label: "System alert channels", desc: "Email, SMS, Slack webhook" },
      { label: "Automated seller notifications", desc: "Order, payout, and compliance alerts" },
    ],
  },
];

/* ── Help & Support page ── */
const FAQ_ITEMS = [
  { q: "How do I approve a new seller application?", a: "Go to Seller Approvals and review the submitted documents. Use the Approve or Reject action to update status." },
  { q: "How are platform commissions configured?", a: "Commission rules are set under System Settings → Billing & Commission. Changes apply from the next payout cycle." },
  { q: "How do I suspend a seller account?", a: "Open User Management, find the seller, and use the More Options (⋯) menu to suspend or deactivate the account." },
  { q: "How are disputes escalated to admins?", a: "Any dispute unresolved after 48 hours is automatically escalated and flagged in the Disputes & Reports view." },
];

const SUPPORT_CHANNELS = [
  { icon: HiOutlinePhone, label: "Internal Support Line", detail: "Ext. 2200 · 9 AM–7 PM" },
  { icon: HiOutlineChatBubbleLeftEllipsis, label: "Admin Slack Channel", detail: "#platform-admin · Avg. 2 min response" },
  { icon: HiOutlineEnvelope, label: "Email Ops Team", detail: "ops@harvesthub.in" },
  { icon: HiOutlineVideoCamera, label: "Engineering Sync Call", detail: "Book via internal calendar" },
];

const VIEW_HEADINGS = {
  dashboard: { title: "Platform Overview 🛡️", subtitle: "System-wide health, revenue, and operational activity across HarvestHub." },
  users: { title: "User Management", subtitle: "Buyers, sellers, and admin accounts registered on the platform." },
  orders: { title: "Platform Orders", subtitle: "All orders processed across every seller and buyer on HarvestHub." },
  approvals: { title: "Seller Approvals", subtitle: "New seller applications pending review, verification, and onboarding." },
  analytics: { title: "Analytics", subtitle: "Platform-level revenue trends, commissions, and performance metrics." },
  disputes: { title: "Disputes & Reports", subtitle: "Open and resolved disputes between buyers and sellers." },
  settings: { title: "System Settings", subtitle: "Platform configuration, security policies, and billing rules." },
  help: { title: "Help & Support", subtitle: "Admin FAQs and internal support channels." },
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

function disputeStatusClass(status) {
  switch (status) {
    case "Resolved": return "status-pill delivered";
    case "In Review": return "status-pill shipped";
    case "Open": return "status-pill cancelled";
    default: return "status-pill";
  }
}

function docsClass(docs) {
  switch (docs) {
    case "Submitted": return "status-pill delivered";
    case "Incomplete": return "status-pill cancelled";
    case "Under Review": return "status-pill shipped";
    default: return "status-pill";
  }
}

function healthStatusClass(status) {
  switch (status) {
    case "Operational": return "status-pill delivered";
    case "Degraded": return "status-pill processing";
    case "Down": return "status-pill cancelled";
    default: return "status-pill";
  }
}

function toneClass(tone) {
  return `activity-icon ${tone}`;
}

function healthClass(h) {
  if (h >= 90) return "health-bar-fill excellent";
  if (h >= 80) return "health-bar-fill good";
  return "health-bar-fill fair";
}

function userStatusClass(status) {
  switch (status) {
    case "Active": return "status-pill delivered";
    case "Pending": return "status-pill processing";
    case "Suspended": return "status-pill cancelled";
    default: return "status-pill";
  }
}

export default function AdminDashboard() {
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

  return (
    <div className="dash-page admin-page">

      {sidebarOpen && <div className="dash-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* ── Sidebar ── */}
      <aside className={`dash-sidebar${sidebarOpen ? " open" : ""}`}>
        <div className="dash-logo-area">
          <div className="dash-logo-placeholder" aria-label="Logo">
            <img src={logo} alt="" />
          </div>
          <div className="admin-badge">ADMIN</div>
          <button className="dash-sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <HiOutlineXMark />
          </button>
        </div>

        <nav className="dash-nav">
          <span className="dash-nav-label">Admin Panel</span>
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
            <input type="text" placeholder="Search users, orders, sellers, disputes…" />
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
              <Link to="/404" className="btn-primary">+ Invite Admin</Link>
            </div>
          </div>

          {/* ══════════ DASHBOARD VIEW ══════════ */}
          {activeView === "dashboard" && (
          <>
          {/* Platform health strip */}
          <section className="weather-strip">
            <div className="weather-strip-label">
              <HiOutlineServerStack />
              <span>Platform Health · Live Status</span>
            </div>
            <div className="weather-strip-days">
              {PLATFORM_HEALTH.map((s) => (
                <div className="weather-day" key={s.label}>
                  <span className="weather-day-name">{s.label}</span>
                  <span className={`weather-day-temp ${s.status === "Degraded" ? "degraded" : ""}`}>{s.status}</span>
                  <span className="weather-day-note">{s.note}</span>
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
                <h2>Recent Platform Orders</h2>
                <Link to="/404" className="panel-link">View all</Link>
              </div>
              <div className="table-wrap">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Seller</th>
                      <th>Buyer</th>
                      <th>Category</th>
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
                        <td className="strong">{o.seller}</td>
                        <td className="muted">{o.buyer}</td>
                        <td className="muted">{o.category}</td>
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
                <h2>Top Sellers</h2>
                <Link to="/404" className="panel-link">Details</Link>
              </div>
              <ul className="top-list">
                {TOP_SELLERS.map((b) => (
                  <li key={b.title}>
                    <Link to="/404" className="top-item">
                      <div className="top-item-text">
                        <span className="top-item-title">{b.title}</span>
                        <span className="top-item-author">{b.region}</span>
                      </div>
                      <div className="top-item-bar-wrap">
                        <div className="top-item-bar">
                          <div className="top-item-bar-fill" style={{ width: `${b.percent}%` }} />
                        </div>
                        <span className="top-item-sales">{b.sales} orders</span>
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

          {/* New users + Revenue by category + Reviews */}
          <section className="dash-panels dash-panels-three">

            <div className="panel">
              <div className="panel-header">
                <h2>New Users</h2>
                <Link to="/404" className="panel-link">View all</Link>
              </div>
              <ul className="author-list">
                {NEW_USERS.map((a) => (
                  <li key={a.name}>
                    <Link to="/404" className="author-item">
                      <span className="author-avatar">{a.name.split(" ").map((n) => n[0]).join("").slice(0,2)}</span>
                      <div className="author-text">
                        <span className="author-name">{a.name}</span>
                        <span className="author-meta">{a.role} · {a.orders} orders</span>
                      </div>
                      <span className="author-joined">{a.joined}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel">
              <div className="panel-header">
                <h2>Revenue by Category</h2>
                <Link to="/404" className="panel-link">Full report</Link>
              </div>
              <ul className="genre-list">
                {REVENUE_BY_CATEGORY.map((g) => (
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
                <h2>Platform Reviews</h2>
                <Link to="/404" className="panel-link">View all</Link>
              </div>
              <ul className="review-list">
                {REVIEWS.map((r, i) => (
                  <li key={i}>
                    <Link to="/404" className="review-item">
                      <div className="review-top">
                        <span className="review-book">{r.platform}</span>
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

          {/* Regional performance + Messages */}
          <section className="dash-panels dash-panels-three">

            <div className="panel panel-wide">
              <div className="panel-header">
                <h2>Regional Performance</h2>
                <Link to="/404" className="panel-link">View map</Link>
              </div>
              <ul className="cluster-list">
                {REGIONAL_PERFORMANCE.map((c) => (
                  <li key={c.region}>
                    <Link to="/404" className="cluster-item">
                      <span className="cluster-pin"><HiOutlineGlobeAlt /></span>
                      <div className="cluster-text">
                        <span className="cluster-name">{c.region}</span>
                        <span className="cluster-meta">{c.sellers} sellers · {c.revenue}</span>
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

          {/* Quick actions */}
          <section className="panel quick-actions">
            <div className="panel-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="quick-grid">
              <Link to="/404" className="quick-card">
                <HiOutlineUserGroup />
                <span>Manage Users</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineIdentification />
                <span>Seller Approvals</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineShoppingBag />
                <span>All Orders</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineFlag />
                <span>Open Disputes</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineChartBar />
                <span>Analytics</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineBanknotes />
                <span>Payouts</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineShieldCheck />
                <span>Compliance</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineServerStack />
                <span>System Health</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineMegaphone />
                <span>Announcements</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineReceiptPercent />
                <span>Commission Rules</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineArrowPath />
                <span>Refunds</span>
              </Link>
              <Link to="/404" className="quick-card">
                <HiOutlineKey />
                <span>API Keys</span>
              </Link>
            </div>
          </section>
          </>
          )}

          {/* ══════════ USER MANAGEMENT VIEW ══════════ */}
          {activeView === "users" && (
            <>
              <section className="dash-stats">
                <div className="stat-card">
                  <div className="stat-top-row">
                    <span className="stat-label">Total Users</span>
                    <span className="stat-icon"><HiOutlineUserGroup /></span>
                  </div>
                  <div className="stat-row"><span className="stat-value">18,402</span></div>
                </div>
                <div className="stat-card">
                  <div className="stat-top-row">
                    <span className="stat-label">Active Sellers</span>
                    <span className="stat-icon"><HiOutlineBuildingOffice2 /></span>
                  </div>
                  <div className="stat-row"><span className="stat-value">1,241</span></div>
                </div>
                <div className="stat-card">
                  <div className="stat-top-row">
                    <span className="stat-label">Buyers</span>
                    <span className="stat-icon"><HiOutlineShoppingBag /></span>
                  </div>
                  <div className="stat-row"><span className="stat-value">17,161</span></div>
                </div>
                <div className="stat-card">
                  <div className="stat-top-row">
                    <span className="stat-label">Suspended Accounts</span>
                    <span className="stat-icon"><HiOutlineNoSymbol /></span>
                  </div>
                  <div className="stat-row"><span className="stat-value">24</span></div>
                </div>
              </section>

              <section className="panel">
                <div className="panel-header">
                  <h2>All Users</h2>
                  <Link to="/404" className="panel-link">
                    <HiOutlinePlusCircle style={{ marginRight: "0.3rem", verticalAlign: "-2px" }} />
                    Invite Admin
                  </Link>
                </div>
                <div className="table-wrap">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>Name / Company</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Joined</th>
                        <th>Orders</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {ALL_USERS.map((u) => (
                        <tr key={u.email}>
                          <td className="strong">{u.name}</td>
                          <td className="muted">{u.email}</td>
                          <td className="muted">{u.role}</td>
                          <td className="muted">{u.joined}</td>
                          <td className="muted">{u.orders.toLocaleString()}</td>
                          <td><span className={userStatusClass(u.status)}>{u.status}</span></td>
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

          {/* ══════════ PLATFORM ORDERS VIEW ══════════ */}
          {activeView === "orders" && (
            <section className="panel">
              <div className="panel-header">
                <h2>All Platform Orders</h2>
                <Link to="/404" className="panel-link">Export CSV</Link>
              </div>
              <div className="table-wrap">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Seller</th>
                      <th>Buyer</th>
                      <th>Category</th>
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
                        <td className="strong">{o.seller}</td>
                        <td className="muted">{o.buyer}</td>
                        <td className="muted">{o.category}</td>
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

          {/* ══════════ SELLER APPROVALS VIEW ══════════ */}
          {activeView === "approvals" && (
            <>
              <section className="dash-stats">
                <div className="stat-card">
                  <div className="stat-top-row">
                    <span className="stat-label">Pending Review</span>
                    <span className="stat-icon"><HiOutlineIdentification /></span>
                  </div>
                  <div className="stat-row"><span className="stat-value">5</span></div>
                </div>
                <div className="stat-card">
                  <div className="stat-top-row">
                    <span className="stat-label">Approved This Month</span>
                    <span className="stat-icon"><HiOutlineCheckCircle /></span>
                  </div>
                  <div className="stat-row"><span className="stat-value">38</span></div>
                </div>
                <div className="stat-card">
                  <div className="stat-top-row">
                    <span className="stat-label">Rejected</span>
                    <span className="stat-icon"><HiOutlineNoSymbol /></span>
                  </div>
                  <div className="stat-row"><span className="stat-value">7</span></div>
                </div>
                <div className="stat-card">
                  <div className="stat-top-row">
                    <span className="stat-label">Avg. Review Time</span>
                    <span className="stat-icon"><HiOutlineClock /></span>
                  </div>
                  <div className="stat-row"><span className="stat-value">1.8d</span></div>
                </div>
              </section>

              <section className="panel">
                <div className="panel-header">
                  <h2>Pending Seller Applications</h2>
                  <Link to="/404" className="panel-link">Export List</Link>
                </div>
                <div className="table-wrap">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>Applicant</th>
                        <th>Region</th>
                        <th>Category</th>
                        <th>Applied</th>
                        <th>Documents</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {PENDING_APPROVALS.map((a) => (
                        <tr key={a.name}>
                          <td className="strong">{a.name}</td>
                          <td className="muted">{a.region}</td>
                          <td className="muted">{a.category}</td>
                          <td className="muted">{a.applied}</td>
                          <td><span className={docsClass(a.docs)}>{a.docs}</span></td>
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

          {/* ══════════ DISPUTES VIEW ══════════ */}
          {activeView === "disputes" && (
            <>
              <section className="dash-stats">
                <div className="stat-card">
                  <div className="stat-top-row">
                    <span className="stat-label">Open Disputes</span>
                    <span className="stat-icon"><HiOutlineFlag /></span>
                  </div>
                  <div className="stat-row"><span className="stat-value">37</span></div>
                </div>
                <div className="stat-card">
                  <div className="stat-top-row">
                    <span className="stat-label">In Review</span>
                    <span className="stat-icon"><HiOutlineClock /></span>
                  </div>
                  <div className="stat-row"><span className="stat-value">14</span></div>
                </div>
                <div className="stat-card">
                  <div className="stat-top-row">
                    <span className="stat-label">Resolved This Month</span>
                    <span className="stat-icon"><HiOutlineCheckCircle /></span>
                  </div>
                  <div className="stat-row"><span className="stat-value">91</span></div>
                </div>
                <div className="stat-card">
                  <div className="stat-top-row">
                    <span className="stat-label">Avg. Resolution Time</span>
                    <span className="stat-icon"><HiOutlineArrowsRightLeft /></span>
                  </div>
                  <div className="stat-row"><span className="stat-value">2.6d</span></div>
                </div>
              </section>

              <section className="panel">
                <div className="panel-header">
                  <h2>All Disputes</h2>
                  <Link to="/404" className="panel-link">Export CSV</Link>
                </div>
                <div className="table-wrap">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>Dispute ID</th>
                        <th>Order</th>
                        <th>Buyer</th>
                        <th>Seller</th>
                        <th>Reason</th>
                        <th>Raised</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {DISPUTES.map((d) => (
                        <tr key={d.id}>
                          <td className="muted">{d.id}</td>
                          <td className="muted">{d.order}</td>
                          <td className="strong">{d.buyer}</td>
                          <td className="muted">{d.seller}</td>
                          <td className="muted">{d.reason}</td>
                          <td className="muted">{d.raised}</td>
                          <td><span className={disputeStatusClass(d.status)}>{d.status}</span></td>
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
                  <h2>Monthly Gross Revenue (₹ Crore)</h2>
                  <Link to="/404" className="panel-link">Export Report</Link>
                </div>
                <div className="bar-chart">
                  {MONTHLY_REVENUE.map((m) => (
                    <div className="bar-chart-col" key={m.month}>
                      <div className="bar-chart-bar-wrap">
                        <div
                          className="bar-chart-bar"
                          style={{ height: `${(m.value / 6) * 100}%` }}
                          title={`₹${m.value}Cr`}
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
                    <h2>Top Performing Sellers</h2>
                    <Link to="/404" className="panel-link">Details</Link>
                  </div>
                  <ul className="top-list">
                    {TOP_SELLERS.map((b) => (
                      <li key={b.title}>
                        <Link to="/404" className="top-item">
                          <div className="top-item-text">
                            <span className="top-item-title">{b.title}</span>
                            <span className="top-item-author">{b.region}</span>
                          </div>
                          <div className="top-item-bar-wrap">
                            <div className="top-item-bar">
                              <div className="top-item-bar-fill" style={{ width: `${b.percent}%` }} />
                            </div>
                            <span className="top-item-sales">{b.sales} orders</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="panel">
                  <div className="panel-header">
                    <h2>Revenue by Category</h2>
                    <Link to="/404" className="panel-link">Full report</Link>
                  </div>
                  <ul className="genre-list">
                    {REVENUE_BY_CATEGORY.map((g) => (
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
                <h2>Admin Inbox</h2>
                <Link to="/404" className="panel-link">
                  <HiOutlinePaperAirplane style={{ marginRight: "0.3rem", verticalAlign: "-2px" }} />
                  New Message
                </Link>
              </div>
              <ul className="message-list">
                {MESSAGES_PREVIEW.concat(MESSAGES_PREVIEW.map((m, i) => ({
                  ...m,
                  name: i === 0 ? "Engineering Team" : i === 1 ? "Finance Team" : i === 2 ? "AgriConnect" : "HarvestHub Pvt. Ltd.",
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
                      <h2><GroupIcon style={{ marginRight: "0.5rem", verticalAlign: "-3px", color: "var(--accent)" }} />{group.title}</h2>
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
                    <h2>Admin FAQs</h2>
                    <Link to="/404" className="panel-link">
                      <HiOutlineBookOpen style={{ marginRight: "0.3rem", verticalAlign: "-2px" }} />
                      Internal Docs
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
                    <h2>Contact Ops Team</h2>
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