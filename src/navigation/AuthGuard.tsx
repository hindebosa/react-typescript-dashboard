import type { ReactNode } from "react";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

import Login from "../pages/Login";

interface AuthGuardProps {
  children: ReactNode;
}
const AuthGuard: React.FC<AuthGuardProps> = (props) => {
  const { children } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [requestedLocation, setRequestedLocation] = useState<string | null>();

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // if (location.pathname !== requestedLocation) {
    //   setRequestedLocation(location.pathname);
    // }
    navigate("/auth/login");
  }
  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }
  return <>{children}</>;
};

export default AuthGuard;
