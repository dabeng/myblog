import { useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/providers/AuthProvider";

const Logout = () => {
  const { clearToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate("/", { replace: true });
  };

  setTimeout(() => {
    handleLogout();
  }, 3 * 1000);

  return <>Logout Page</>;
};

export default Logout;