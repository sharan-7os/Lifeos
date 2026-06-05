import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, logoutUser } from "../services/authService";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </header>

      <section className="welcome-section">
        <h2>Welcome back, {user?.name} 👋</h2>
        <p>{user?.email}</p>
      </section>

      

    </div>
  );
}

export default Dashboard;