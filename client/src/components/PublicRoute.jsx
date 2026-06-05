import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getProfile } from "../services/authService";

function PublicRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await getProfile();
        setAuthenticated(true);
      } catch {
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
    ? <Navigate to="/dashboard" replace />
    : children;
}

export default PublicRoute;