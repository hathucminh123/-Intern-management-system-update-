import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  window.onload = function() {
    const authTimestamp = localStorage.getItem("authTimestamp");
    const currentTime = Date.now();

    // Kiểm tra nếu thời gian đã lưu cách hiện tại một khoảng nhất định (ví dụ: 1 giờ)
    if (authTimestamp && (currentTime - authTimestamp) > 3600000) { // 3600000 ms = 1 giờ
        localStorage.removeItem("authTimestamp");
        localStorage.removeItem("Auth");
    }
};
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
