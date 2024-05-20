import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleGetMe = () => {
      try {
        const isLoggined = localStorage.getItem("Auth");
        if (!isLoggined) {
          navigate("/sign-in");
        } else {
          setIsLoading(false);
        }
      } catch {
        navigate("/sign-in");
      }
    };

    handleGetMe();
  }, [navigate]);

  return isLoading ? <></> : <Outlet />;
};

export default ProtectedRoute;
