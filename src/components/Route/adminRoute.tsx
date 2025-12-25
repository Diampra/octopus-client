import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
