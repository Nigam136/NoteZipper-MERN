/* eslint-disable react/jsx-pascal-case */
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./screens/myNotes/MyNotes";
import LoginScreen from "./screens/loginscreen/LoginScreen";
import RegisterScreen from "./screens/registerscreen/RegisterScreen";
import CreateNote from "./screens/createnote/CreateNote";
import SingleNote from "./screens/singlenote/SingleNote";
import { useState } from "react";
import ProfileScreen from "./screens/profilescreen/ProfileScreen";

function App() {
  const [search, setSearch] = useState("");
  console.log(search);

  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/login" exact element={<LoginScreen />} />
          <Route path="/profile" exact element={<ProfileScreen />} />
          <Route path="/register" exact element={<RegisterScreen />} />
          <Route path="/createnote" exact element={<CreateNote />} />
          <Route path="/note/:id" exact element={<SingleNote />} />
          <Route path="/mynotes" element={<MyNotes search={search} />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
