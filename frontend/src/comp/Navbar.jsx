import { useNavigate, useLocation } from "react-router-dom";
import { FaPlus, FaList, FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import Dock from "./Dock";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const isActive = (path) => {
    if (path === "/viewall") {
      return location.pathname === "/viewall" || location.pathname.startsWith("/posts");
    }
    return location.pathname === path;
  };
    const isInPostDetail = location.pathname.startsWith("/posts/");

  const loggedInItems = [
    {
      icon: <FaPlus size={24} color={isActive("/create") ? "wheat" : undefined} />,
      label: "Create",
      onClick: () => navigate("/create"),
    },
    {
      icon: <FaList size={24} color={isActive("/viewall") ? "wheat" : undefined} />,
      label: "View All",
      onClick: () => navigate("/viewall"),
    },
    {
      icon: <FaUser size={24} color={isActive("/viewmypost") ? "wheat" : undefined} />,
      label: "Profile",
      onClick: () => navigate("/viewmypost"),
    },
    {
      icon: <FaSignOutAlt size={24} />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  const filteredItems = isInPostDetail
    ? loggedInItems.filter((item) => item.label !== "Logout")
    : loggedInItems;

  const guestItems = [
    {
      icon: <FaSignInAlt size={24} color={isActive("/") ? "blue" : undefined} />,
      label: "Sign In",
      onClick: () => navigate("/"),
    },
    {
      icon: <FaUserPlus size={24} color={isActive("/signup") ? "blue" : undefined} />,
      label: "Sign Up",
      onClick: () => navigate("/signup"),
    },
  ];

  return <Dock items={isLoggedIn ? filteredItems : guestItems} />;
};

export default Navbar;
