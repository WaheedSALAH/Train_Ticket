// import { Home } from './pages/home';
// import { Login } from './pages/login';
// import { Register } from './pages/register'
// import 'bootstrap/dist/css/bootstrap.min.css';


// function App() {

//   return (
//     <>
//       {/* <Register/> */}
//       {/* <Login/> */}
//       <Home/>
//     </>
//   )
// }

// export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Register } from './pages/register';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TicketDetails } from './pages/TicketDetails';
import MyTicket from './pages/myTicket';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ticket-details/:id" element={<TicketDetails />} /> {/* 👈 Route with ID */}
        <Route path="/ticket-details/" element={<MyTicket />} /> {/* 👈 Route with ID */}
        

      </Routes>
    </Router>
  );
}

export default App;
