import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Pricing from "./pages/Pricing/Pricing";
import CurrentlyShowing from "pages/CurrentlyShowing/CurrentlyShowing";
import Upcoming from "pages/Upcoming/Upcoming";
import UserContextProvider from "contexts/UserContext/UserContextProvider";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/currently" element={<CurrentlyShowing />} />
          <Route path="/upcoming" element={<Upcoming />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
