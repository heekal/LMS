import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "../../api/axios";

export default function PrivateRoute({ children, role }) {
  const [authState, setAuthState] = useState({ user: null, loading: true });

  useEffect(() => {
    axios
      .get("/me", { withCredentials: true })
      .then((res) => setAuthState({ user: res.data, loading: false }))
      .catch(() => setAuthState({ user: null, loading: false }));
  }, []);

  if (authState.loading)
    return (
      <div className="flex h-screen items-center justify-center text-gray-700">
        Loading
      </div>
    );

  if (!authState.user) return <Navigate to="/login" replace />;
  if (role && authState.user.role !== role) return <Navigate to="/login" replace />;

  return children;
}
