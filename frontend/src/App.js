import { Route, Routes } from "react-router";
import "./App.css";
import Advertisement from "./Screens/Advertisement";
import Compose from "./Screens/Compose";
import Inbox from "./Screens/Inbox";
import Saved from "./Screens/Saved";
import Sent from "./Screens/Sent";
import Signup from "./Screens/Signup/Signup";
function App() {
  return (
    <div className="App">
      {/* <SideNav> */}
      <Routes>
        <Route path="/" element={<Advertisement />} />
        <Route path="/signin" element={<Signup />} />
        <Route path="/inbox" element={<Inbox/>}/>
        <Route path="/sent" element={<Sent/>}/>
        <Route path="/compose" element={<Compose/>}/>
        <Route path="/saved" element={<Saved/>}/>
      </Routes>
      {/* </SideNav> */}
    </div>
  );
}

export default App;
