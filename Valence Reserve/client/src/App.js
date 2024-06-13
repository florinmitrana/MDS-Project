import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import {Route,Routes,  Link, BrowserRouter} from 'react-router-dom'
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
 
function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
      <Routes>
      <Route path = "/home" element = {<Homescreen />} />
      <Route path ='/book/:restaurantid' element = {<Bookingscreen />} />
      <Route path = '/register' element = {<Registerscreen />} />
      <Route path = '/login' element = {<Loginscreen />} />
      <Route path = '/profile' element = {<Profilescreen />}/>

      </Routes>
      </BrowserRouter>
      
      


    </div>
  );
}

export default App;
