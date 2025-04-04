import './App.css'
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout.tsx";
import Home from "./pages/Home/Home.tsx";
import About from "./pages/About/About.tsx";
import Pricing from "./pages/Pricing/Pricing.tsx";

function App() {

  return (
    <Routes>
        <Route element={<Layout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/pricing" element={<Pricing/>}/>
        </Route>
    </Routes>
  )
}

export default App
