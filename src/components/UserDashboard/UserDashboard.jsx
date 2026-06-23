import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import logo from "../../assets/stackly_logo.webp";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/dashboard", active: true },
  { label: "Farmers", to: "/404" },
  { label: "Crops", to: "/404" },
  { label: "Orders", to: "/404" },
  { label: "Analytics", to: "/404" },
  { label: "Messages", to: "/404" },
  { label: "Settings", to: "/404" },
  { label: "Help & Support", to: "/404" },
];

const STATS = [
  { label: "Total Crops", value: "2,847", delta: "+12.4%", up: true },
  { label: "Active Farmers", value: "164", delta: "+5.8%", up: true },
  { label: "Monthly Orders", value: "1,283", delta: "+8.2%", up: true },
  { label: "Revenue", value: "₹18.6L", delta: "+15.3%", up: true },
];

const RECENT_ORDERS = [
  { id: "#OR-2401", crop: "Organic Basmati", farmer: "Rajesh Kumar", status: "Delivered", amount: "₹12,499" },
  { id: "#OR-2400", crop: "Fresh Vegetables", farmer: "Priya Sharma", status: "Shipped", amount: "₹8,649" },
  { id: "#OR-2399", crop: "Herbal Tea Leaves", farmer: "Amit Singh", status: "Processing", amount: "₹5,349" },
  { id: "#OR-2398", crop: "Saffron", farmer: "Meera Patel", status: "Delivered", amount: "₹25,399" },
  { id: "#OR-2397", crop: "Organic Spices", farmer: "Vikram Reddy", status: "Cancelled", amount: "₹3,549" },
];

const TOP_CROPS = [
  { title: "Organic Basmati", farmer: "Rajesh Kumar", sales: 412, percent: 92 },
  { title: "Fresh Vegetables", farmer: "Priya Sharma", sales: 378, percent: 84 },
  { title: "Saffron", farmer: "Meera Patel", sales: 301, percent: 67 },
  { title: "Herbal Tea Leaves", farmer: "Amit Singh", sales: 256, percent: 57 },
];

const ACTIVITY_FEED = [
  { text: "New crop listing added by Rajesh Kumar", time: "12 minutes ago", tone: "harvest" },
  { text: "Order #OR-2401 marked as delivered", time: "1 hour ago", tone: "success" },
  { text: "Priya Sharma joined as a new farmer", time: "3 hours ago", tone: "info" },
  { text: "Order #OR-2397 was cancelled by customer", time: "5 hours ago", tone: "error" },
  { text: "3 new messages in your inbox", time: "Yesterday", tone: "harvest" },
];

const UPCOMING_TASKS = [
  { title: "Review organic certification — Basmati batch", date: "Today, 4:00 PM", priority: "High" },
  { title: "Farmer consultation call with Priya Sharma", date: "Tomorrow, 11:00 AM", priority: "Medium" },
  { title: "Quarterly sustainability report due", date: "Jun 25", priority: "High" },
  { title: "Marketing sync — Summer harvest catalogue", date: "Jun 27", priority: "Low" },
];

const NEW_FARMERS = [
  { name: "Priya Sharma", specialty: "Vegetables", crops: 3, joined: "3 hours ago" },
  { name: "Amit Singh", specialty: "Herbal Tea", crops: 2, joined: "2 days ago" },
  { name: "Meera Patel", specialty: "Saffron", crops: 1, joined: "4 days ago" },
];

const REVIEWS = [
  { crop: "Organic Basmati", reviewer: "Health Food Store", rating: 5, text: "Premium quality organic rice with exceptional aroma and taste." },
  { crop: "Fresh Vegetables", reviewer: "Verified Buyer", rating: 4, text: "Fresh and organic, though delivery was slightly delayed." },
  { crop: "Saffron", reviewer: "Verified Buyer", rating: 5, text: "Pure Kashmiri saffron - the best quality we've ever received." },
];

const SALES_BY_CATEGORY = [
  { category: "Grains & Cereals", percent: 34 },
  { category: "Vegetables", percent: 26 },
  { category: "Herbs & Spices", percent: 18 },
  { category: "Fruits", percent: 14 },
  { category: "Specialty Crops", percent: 8 },
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
    default: return "status-pill";
  }
}

function toneClass(tone) {
  return `activity-icon ${tone}`;
}

export default function UserDashboard() {
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
          <span className="dash-nav-label">Menu</span>
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
            <input type="text" placeholder="Search crops, farmers, orders…" />
          </div>

          <div className="dash-topbar-actions">
            <Link to="/404" className="dash-icon-btn" aria-label="Notifications">
              🔔
              <span className="dash-icon-badge" />
            </Link>
          </div>
        </header>

        <main className="dash-content">

          <div className="dash-heading-row">
            <div>
              <h1>Welcome back, Farmer</h1>
              <p>Here's what's happening across your organic farm today.</p>
            </div>
            <div className="dash-heading-actions">
              <Link to="/404" className="btn-secondary">
                ⬇ Export Report
              </Link>
              <Link to="/404" className="btn-primary">
                🌱 Add New Crop
              </Link>
            </div>
          </div>

          <section className="dash-stats">
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
                <h2>Top Performing</h2>
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

          <section className="dash-panels">

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

            <div className="panel panel-wide">
              <div className="panel-header">
                <h2>Upcoming Tasks</h2>
                <Link to="/404" className="panel-link">Manage →</Link>
              </div>
              <ul className="task-list">
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
                      <span className="author-joined">{a.joined}</span>
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

          <section className="panel quick-actions">
            <div className="panel-header">
              <h2>Quick Actions</h2>
            </div>
            <div className="quick-grid">
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
                📈
                <span>Full Analytics</span>
              </Link>
              <Link to="/404" className="quick-card">
                🌐
                <span>Storefront</span>
              </Link>
              <Link to="/404" className="quick-card">
                🖨️
                <span>Print Invoices</span>
              </Link>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}