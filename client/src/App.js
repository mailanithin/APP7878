
import './App.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './components/Login';
import Singup from './components/Singup';
import Desktop from './components/Desktop';
import Messages from './components/Messages';
import Leaves from './components/Leaves';
import Tasks from './components/Tasks';
import EditProfile from './components/EditProfile';
import SignOut from './components/SignOut';
import TopNavigation from './components/TopNavigation';
function App() {

 
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login></Login>}></Route>
      <Route path='/signup' element={<Singup></Singup>}></Route>
      <Route path='/desktop' element={<Desktop></Desktop>}></Route>
      <Route path='/messages' element={<Messages></Messages>}></Route>
      <Route path='/tasks' element={<Tasks></Tasks>}></Route>
      <Route path='/leaves' element={<Leaves></Leaves>}></Route>
      <Route path='/editProfile' element={<EditProfile></EditProfile>}></Route>
      <Route path='/signout' element={<SignOut></SignOut>}></Route>
      <Route path='/topNavigation' element={<TopNavigation></TopNavigation>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
