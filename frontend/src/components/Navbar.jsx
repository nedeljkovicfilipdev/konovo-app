import { useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav>
      {isLoggedIn && (
        // button is on the right side of the navbar in line with the title
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%"}}>
          <h1>Product App</h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button onClick={handleLogout} style={{ marginLeft: "auto" }}>
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
