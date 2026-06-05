import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, logoutUser } from "../services/authService";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data);
    } catch (error) {
      console.error(error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard">

      <header className="dashboard-header">

        <div>
          <h1>🚀 LifeOS</h1>
          <p>Your Personal Productivity Operating System</p>
        </div>

        <div className="header-actions">

          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {menuOpen && (
            <div className="menu-dropdown">
              <div className="menu-top">


  <button
    className="close-menu-btn"
    onClick={() => setMenuOpen(false)}
  >
    ← Back
  </button>
              <div className="menu-profile">
                <h4>👤{user?.name}</h4>
                
                <p>{user?.email}</p>
              </div>
</div>


              <hr />

              <button>🏠 Dashboard</button>

              <button>👨‍👩‍👧 Household</button>

              <button>📝 Home Tasks</button>

              <button>✅ Personal Tasks</button>

              <button>💼 Work Tasks</button>

              <button>🛒 Inventory</button>

              <button>💰 Expenses</button>

              <button>📄 Documents</button>

              <button>📦 Assets</button>

              <button>⚙️ Settings</button>

              <hr />

              <button
                className="menu-logout"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </header>

      <section className="welcome-section">
        <h2>Welcome  {user?.name} 👋</h2>
      </section>

    </div>
  );
}

export default Dashboard;