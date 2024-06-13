import "./App.css";
import "./custom.scss";
import NavBar from "./Componentes/NavBar";
import HowItWorks from "./Pages/HowItWorks";
import ListAllPosts from "./Pages/ListAllPosts";
import Post from "./Pages/Post";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CommentsFilterProvider } from "./Providers/CommentsFilterProvider";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <CommentsFilterProvider>
        <Routes>
          <Route path="/" element={<ListAllPosts />}></Route>
          <Route path="/post/:id" element={<Post />}></Route>
          <Route path="/how-it-works" element={<HowItWorks />}></Route>
        </Routes>
      </CommentsFilterProvider>
    </>
  );
}

export default App;
