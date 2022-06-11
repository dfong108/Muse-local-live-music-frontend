// import './App.css';
import { Routes, Route,Navigate } from 'react-router-dom';

import Header from './features/header/Header';
import Footer from './features/footer/Footer';
import HomePage from './pages/Home/HomePage';
import ShowPage from './pages/Show/ShowPage';
import FormPage from './pages/Forms/BandForm';
import Bands from './features/bands/Bands';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Main from './pages/Main/Main';
import Events from './features/events/Events';
import ProtectedRoute from './ProtectedRoute';
import BandForm from './pages/Forms/BandForm';

function App() {
  const user= localStorage.getItem("token")
  // console.log(localStorage)
 
// console.log(user)   // This is my Access token The important
  return (
    <div className='main'>
      
       <Header />

        <Routes>
            <Route path='/login' exact element={<Login />}/>
            <Route path='/' exact element={<Navigate replace to="/login"/>}/>
      
            <Route path='/signup' exact element={<Signup />}/>
        
            <Route element={<ProtectedRoute accessToken={user}/>}>
                <Route exact path="/home" element={<HomePage accessToken={user} />} />
                <Route exact path="/bands" element={<Bands/>} />
                <Route exact path="/:bandName" element={<ShowPage />} />
                <Route exact path="/bands/:id" element={<ShowPage />} />
                <Route exact path="/events" element={<Events accessToken={user}/>} />
                <Route exact path="/events/:id" element={<ShowPage id="" />} />
                <Route exact path="/registerband" element={<BandForm />} />
            </Route>

        </Routes>

        {/* <Footer /> */}
    </div>
  );
}

export default App;
