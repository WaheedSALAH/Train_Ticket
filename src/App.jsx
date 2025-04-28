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
import { AdminPanel } from './pages/admin';
import { AddTrain } from './pages/AddTrain';
import { EditTrain } from './pages/EditTrain';

function App() {
  return (
    <Router basename="/Train_Ticket">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/register" element={<Register />} />
        <Route path="/AddTrain" element={<AddTrain />} />
        <Route path="/EditTrain/:id" element={<EditTrain />} />
        <Route path="/ticket-details/:id" element={<TicketDetails />} /> 
        <Route path="/ticket-details/" element={<MyTicket />} /> 
      </Routes>
    </Router>
  );
}

export default App;
