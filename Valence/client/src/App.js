import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import {Route,Routes,  Link, BrowserRouter} from 'react-router-dom'
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
 
function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
      <Routes>
      <Route path = "/home" element = {<Homescreen />} />
      <Route path ='/book/:restaurantid' element = {<Bookingscreen />} />
      </Routes>
      </BrowserRouter>
      
      


    </div>
  );
}

export default App;
