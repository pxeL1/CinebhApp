import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Pricing from "./pages/Pricing/Pricing";
import CurrentlyShowing from "pages/CurrentlyShowing/CurrentlyShowing";
import Upcoming from "pages/Upcoming/Upcoming";
import { UserContext } from "contexts/UserContext";
import { useEffect, useState } from "react";
import { User } from "models/User";
import get from "services/fetching/Get";
import { getValidateRequest } from "services/fetching/API";
import { isTimeBeforeNow } from "utility/time-utils";

function App() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const expiration = localStorage.getItem("expiration");
    if (userString) {
      const user: User = JSON.parse(userString);
      setUser(user);
    }

    if (expiration && isTimeBeforeNow(expiration)) {
      get(getValidateRequest()).catch(() => {
        setUser(undefined);
        localStorage.removeItem("user");
        localStorage.removeItem("expiration");
      });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/currently" element={<CurrentlyShowing />} />
          <Route path="/upcoming" element={<Upcoming />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
