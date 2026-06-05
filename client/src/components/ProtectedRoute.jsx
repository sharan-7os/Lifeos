import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getProfile } from "../services/authService";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await getProfile();
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return authenticated
    ? children
    : <Navigate to="/" replace />;
}

export default ProtectedRoute;