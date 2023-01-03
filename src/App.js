import { Routes, Route } from "react-router-dom";
import Registration from "./pages/registration";
import LogIn from "./pages/logIn";
import Home from "./pages/home";
import Message from "./pages/message";
import Notification from "./pages/notification";
import Setting from "./pages/setting";

function App() {
  return (
    <Routes>
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/" element={<Home />} />
      <Route path="/message" element={<Message />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/setting" element={<Setting />} />
    </Routes>
  );
}

export default App;
