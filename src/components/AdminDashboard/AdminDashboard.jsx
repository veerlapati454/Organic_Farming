import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import logo from "../../assets/stackly_logo.webp";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/dashboard", active: true },
  { label: "Users", to: "/404" },
  { label: "Farmers", to: "/404" },
  { label: "Crops", to: "/404" },
  { label: "Orders", to: "/404" },
  { label: "Analytics", to: "/404" },
  { label: "Payments", to: "/404" },
  { label: "Support", to: "/404" },
  { label: "Settings", to: "/404" },
];

const STATS = [
  { label: "Total Users", value: "12,847", delta: "+18.4%", up: true },
  { label: "Active Farmers", value: "1,164", delta: "+12.8%", up: true },
  { label: "Total Orders", value: "8,283", delta: "+22.6%", up: true },
  { label: "Revenue", value: "₹42.8L", delta: "+28.3%", up: true },
  { label: "Crops Listed", value: "3,429", delta: "+15.7%", up: true },
  { label: "Pending Approvals", value: "47", delta: "-8.2%", up: false },
];

const RECENT_ORDERS = [
  { id: "#OR-2401", crop: "Organic Basmati", farmer: "Rajesh Kumar", customer: "Ananya Sharma", status: "Delivered", amount: "₹12,499" },
  { id: "#OR-2400", crop: "Fresh Vegetables", farmer: "Priya Sharma", customer: "Vikram Singh", status: "Shipped", amount: "₹8,649" },
  { id: "#OR-2399", crop: "Herbal Tea Leaves", farmer: "Amit Singh", customer: "Neha Patel", status: "Processing", amount: "₹5,349" },
  { id: "#OR-2398", crop: "Saffron", farmer: "Meera Patel", customer: "Rahul Kumar", status: "Delivered", amount: "₹25,399" },
  { id: "#OR-2397", crop: "Organic Spices", farmer: "Vikram Reddy", customer: "Sneha Gupta", status: "Cancelled", amount: "₹3,549" },
];

const TOP_CROPS = [
  { title: "Organic Basmati", farmer: "Rajesh Kumar", sales: 412, percent: 92 },
  { title: "Fresh Vegetables", farmer: "Priya Sharma", sales: 378, percent: 84 },
  { title: "Saffron", farmer: "Meera Patel", sales: 301, percent: 67 },
  { title: "Herbal Tea Leaves", farmer: "Amit Singh", sales: 256, percent: 57 },
  { title: "Organic Spices", farmer: "Vikram Reddy", sales: 189, percent: 42 },
];

const ACTIVITY_FEED = [
  { text: "New user registration: Priya Verma", time: "5 minutes ago", tone: "info" },
  { text: "Rajesh Kumar listed new organic wheat crop", time: "23 minutes ago", tone: "harvest" },
  { text: "Order #OR-2401 marked as delivered", time: "1 hour ago", tone: "success" },
  { text: "Payment of ₹25,399 received from Rahul Kumar", time: "2 hours ago", tone: "success" },
  { text: "New farmer application from Suresh Patel", time: "3 hours ago", tone: "info" },
  { text: "Order #OR-2397 was cancelled by customer", time: "5 hours ago", tone: "error" },
  { text: "System update completed successfully", time: "8 hours ago", tone: "info" },
];

const UPCOMING_TASKS = [
  { title: "Review farmer applications (12 pending)", date: "Today, 3:00 PM", priority: "High" },
  { title: "Approve new crop listings (23 pending)", date: "Today, 5:00 PM", priority: "High" },
  { title: "Monthly revenue report generation", date: "Tomorrow, 10:00 AM", priority: "Medium" },
  { title: "Team meeting - Q4 strategy", date: "Tomorrow, 2:00 PM", priority: "Medium" },
  { title: "Update organic certification standards", date: "Jun 28, 11:00 AM", priority: "Low" },
  { title: "Review customer feedback analytics", date: "Jun 29, 4:00 PM", priority: "Low" },
];

const NEW_FARMERS = [
  { name: "Suresh Patel", specialty: "Organic Vegetables", crops: 0, joined: "2 hours ago", status: "Pending" },
  { name: "Priya Verma", specialty: "Herbal Medicinal Plants", crops: 0, joined: "5 hours ago", status: "Pending" },
  { name: "Amit Kumar", specialty: "Organic Fruits", crops: 2, joined: "1 day ago", status: "Active" },
  { name: "Sunita Reddy", specialty: "Spices", crops: 1, joined: "2 days ago", status: "Active" },
];

const REVIEWS = [
  { crop: "Organic Basmati", reviewer: "Health Food Store", rating: 5, text: "Premium quality organic rice with exceptional aroma and taste." },
  { crop: "Fresh Vegetables", reviewer: "Verified Buyer", rating: 4, text: "Fresh and organic, though delivery was slightly delayed." },
  { crop: "Saffron", reviewer: "Verified Buyer", rating: 5, text: "Pure Kashmiri saffron - the best quality we've ever received." },
  { crop: "Herbal Tea Leaves", reviewer: "Wellness Center", rating: 5, text: "Excellent quality tea leaves. Perfect for our wellness programs." },
];

const SALES_BY_CATEGORY = [
  { category: "Grains & Cereals", percent: 34 },
  { category: "Vegetables", percent: 26 },
  { category: "Herbs & Spices", percent: 18 },
  { category: "Fruits", percent: 14 },
  { category: "Specialty Crops", percent: 8 },
];

const USER_STATS = [
  { label: "Total Customers", value: "8,234", change: "+15.6%" },
  { label: "Active Farmers", value: "1,164", change: "+12.8%" },
  { label: "New Users (Week)", value: "347", change: "+23.4%" },
  { label: "Inactive Users", value: "2,349", change: "-5.2%" },
];

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
    case "Active": return "status-pill delivered";
    case "Pending": return "status-pill processing";
    default: return "status-pill";
  }
}

function toneClass(tone) {
  return `activity-icon ${tone}`;
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setSidebarOpen(false);
    navigate("/login");
  };

  return (
    <div className="dash-page">

      {sidebarOpen && <div className="dash-overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className={`dash-sidebar${sidebarOpen ? " open" : ""}`}>
        <div className="dash-logo-area">
          <div className="dash-logo-placeholder" aria-label="Logo placeholder">
            <img src={logo} alt="Logo" />
          </div>
          <button className="dash-sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            ✕
          </button>
        </div>

        <nav className="dash-nav">
          <span className="dash-nav-label">Admin Menu</span>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`dash-nav-item${item.active ? " active" : ""}`}
              onClick={() => {
                setSidebarOpen(false);
                window.scrollTo({ top: 0, behavior: "instant" });
              }}
            >
              <span className="dash-nav-icon">{item.active ? "●" : "○"}</span>
              <span>{item.label}</span>
              {item.active && <span className="dash-nav-dot" />}
            </Link>
          ))}
        </nav>

        <div className="dash-sidebar-footer">
          <button type="button" className="dash-nav-item logout" onClick={handleLogout}>
            <span className="dash-nav-icon">⟶</span>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      <div className="dash-main">

        <header className="dash-topbar">
          <button className="dash-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            ☰
          </button>

          <div className="dash-search">
            <span className="dash-search-icon">🔍</span>
            <input type="text" placeholder="Search users, crops, orders, farmers…" />
          </div>

          <div className="dash-topbar-actions">
            <Link to="/404" className="dash-icon-btn" aria-label="Notifications">
              🔔
              <span className="dash-icon-badge" />
            </Link>
            <div className="dash-profile-info">
              <span className="dash-profile-name">Admin</span>
              <span className="dash-profile-role">Super Admin</span>
            </div>
          </div>
        </header>

        <main className="dash-content">

          <div className="dash-heading-row">
            <div>
              <h1>Welcome back, Admin</h1>
              <p>Complete overview of your organic farming platform.</p>
            </div>
            <div className="dash-heading-actions">
              <Link to="/404" className="btn-secondary">
                ⬇ Export Report
              </Link>
              <Link to="/404" className="btn-primary">
                🌱 Add New Crop
              </Link>
              <Link to="/404" className="btn-primary" style={{ background: 'var(--info)' }}>
                👤 Manage Users
              </Link>
            </div>
          </div>

          <section className="dash-stats dash-stats-6">
            {STATS.map((s) => (
              <Link to="/404" className="stat-card" key={s.label}>
                <div className="stat-header">
                  <span className="stat-label">{s.label}</span>
                  <span className="stat-icon">📊</span>
                </div>
                <div className="stat-row">
                  <span className="stat-value">{s.value}</span>
                  <span className={`stat-delta ${s.up ? "up" : "down"}`}>
                    {s.up ? "↑" : "↓"}
                    {s.delta}
                  </span>
                </div>
              </Link>
            ))}
          </section>

          <section className="dash-panels">

            <div className="panel panel-wide">
              <div className="panel-header">
                <h2>Recent Orders</h2>
                <Link to="/404" className="panel-link">View all →</Link>
              </div>
              <div className="table-wrap">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Crop</th>
                      <th>Farmer</th>
                      <th>Customer</th>
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
                        <td className="muted">{o.customer}</td>
                        <td><span className={statusClass(o.status)}>{o.status}</span></td>
                        <td className="strong">{o.amount}</td>
                        <td>
                          <Link to="/404" className="row-action" aria-label="More options">
                            ⋯
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
                <h2>Top Crops</h2>
                <Link to="/404" className="panel-link">Details →</Link>
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

          <section className="dash-panels dash-panels-two">

            <div className="panel">
              <div className="panel-header">
                <h2>User Statistics</h2>
                <Link to="/404" className="panel-link">View all →</Link>
              </div>
              <div className="user-stats-grid">
                {USER_STATS.map((u) => (
                  <div className="user-stat-item" key={u.label}>
                    <span className="user-stat-label">{u.label}</span>
                    <div className="user-stat-row">
                      <span className="user-stat-value">{u.value}</span>
                      <span className="user-stat-change positive">{u.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <h2>Recent Activity</h2>
                <Link to="/404" className="panel-link">View all →</Link>
              </div>
              <ul className="activity-list">
                {ACTIVITY_FEED.map((a, i) => (
                  <li key={i}>
                    <Link to="/404" className="activity-item">
                      <span className={toneClass(a.tone)}>●</span>
                      <div className="activity-text">
                        <span>{a.text}</span>
                        <span className="activity-time">
                          🕐 {a.time}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </section>

          <section className="dash-panels dash-panels-three">

            <div className="panel">
              <div className="panel-header">
                <h2>New Farmers</h2>
                <Link to="/404" className="panel-link">View all →</Link>
              </div>
              <ul className="author-list">
                {NEW_FARMERS.map((a) => (
                  <li key={a.name}>
                    <Link to="/404" className="author-item">
                      <span className="author-avatar">{a.name.split(" ").map((n) => n[0]).join("")}</span>
                      <div className="author-text">
                        <span className="author-name">{a.name}</span>
                        <span className="author-meta">{a.specialty} · {a.crops} crops</span>
                      </div>
                      <span className={`author-status ${a.status === 'Active' ? 'active' : 'pending'}`}>
                        {a.status}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel">
              <div className="panel-header">
                <h2>Sales by Category</h2>
                <Link to="/404" className="panel-link">Full report →</Link>
              </div>
              <ul className="genre-list">
                {SALES_BY_CATEGORY.map((g) => (
                  <li key={g.category} className="genre-item">
                    <div className="genre-row">
                      <span className="genre-name">{g.category}</span>
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
                <Link to="/404" className="panel-link">View all →</Link>
              </div>
              <ul className="review-list">
                {REVIEWS.map((r, i) => (
                  <li key={i}>
                    <Link to="/404" className="review-item">
                      <div className="review-top">
                        <span className="review-book">{r.crop}</span>
                        <span className="review-stars">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <span key={idx} className={idx < r.rating ? "filled" : ""}>★</span>
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

          <section className="panel">
            <div className="panel-header">
              <h2>Upcoming Tasks</h2>
              <Link to="/404" className="panel-link">Manage →</Link>
            </div>
            <ul className="task-list task-list-grid">
              {UPCOMING_TASKS.map((t, i) => (
                <li key={i}>
                  <Link to="/404" className="task-item">
                    <span className="task-icon">📅</span>
                    <div className="task-text">
                      <span className="task-title">{t.title}</span>
                      <span className="task-date">{t.date}</span>
                    </div>
                    <span className={priorityClass(t.priority)}>{t.priority}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel quick-actions">
            <div className="panel-header">
              <h2>Admin Quick Actions</h2>
            </div>
            <div className="quick-grid quick-grid-8">
              <Link to="/404" className="quick-card">
                👤
                <span>Manage Users</span>
              </Link>
              <Link to="/404" className="quick-card">
                🌱
                <span>Manage Crops</span>
              </Link>
              <Link to="/404" className="quick-card">
                👥
                <span>Manage Farmers</span>
              </Link>
              <Link to="/404" className="quick-card">
                🛒
                <span>View Orders</span>
              </Link>
              <Link to="/404" className="quick-card">
                💰
                <span>Payments</span>
              </Link>
              <Link to="/404" className="quick-card">
                📈
                <span>Analytics</span>
              </Link>
              <Link to="/404" className="quick-card">
                ⚙️
                <span>Settings</span>
              </Link>
              <Link to="/404" className="quick-card">
                🏷️
                <span>Certifications</span>
              </Link>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}