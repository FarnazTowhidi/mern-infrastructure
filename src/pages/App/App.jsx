
import "./App.css";
import { useState } from "react";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import AuthPage from "../AuthPage/AuthPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import { Routes,Route,Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import NavBar from "../../components/NavBar/NavBar";
import LoginForm from "../../components/LoginForm/LoginForm";
import ListHotelPage from "../ListHotelPage/ListHotelPage";


function App() {
  const [user,setUser] = useState(getUser())

  return (
    <main className="App">
       
      { user ? (
      <>
      <NavBar user={user} setUser={setUser} />
      <Routes>
      <Route path="/" element={ <LoginForm></LoginForm>} />
        <Route path="/orders/new" element={<NewOrderPage user={user} setUser={setUser} />} />
        <Route path="/orders/" element={<OrderHistoryPage />} />
        <Route path="/hotels/" element={<ListHotelPage />} />
      </Routes>
      </>
       ): (
       <AuthPage setUser={ setUser } />)}
    </main>

  );
}

export default App;
