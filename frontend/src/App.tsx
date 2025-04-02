import './App.css'
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout.tsx";
import Home from "./pages/Home/Home.tsx";

function App() {

  return (
    <Routes>
        <Route element={<Layout/>}>
            <Route path="/" element={<Home/>}/>
        </Route>
    </Routes>
  )
}

export default App
