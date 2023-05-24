
import './App.css';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom';
import FileInput from './Components/FileInput';
import Admin from './Components/GovernmentPending';
import UserAuthentication from './Pages/User/UserAuthentication';
import PendingFile from './Pages/User/PendingFile';
import Coordinator from './Components/CoordiantorPending';
import FileFormat from './Pages/Co-ordinator/FileFormat';
import CoOrdinatorAuthentication from './Pages/Co-ordinator/CoOrdinatorAuthentication';
import GovernmentAuthentication from './Pages/Government/GovernmentAuthentication';
import GovernmentApproved from './Pages/Government/GovernmentApproved';
import CoOrdinatorApproved from './Pages/Co-ordinator/CoordinatorApproved';
import UserApproved from './Pages/User/UserApproved';
import Registration from './Pages/User/Registration';
import PendingUsers from './Pages/User/PendingUsers';

function App() {
  
  

  return (
      <Router>
        <ToastContainer/>
        <Routes>
          <Route path='/' element={<Navigate to="/user/reg"/>}></Route>
          <Route path='/user/auth' element={<UserAuthentication />}></Route>
          <Route path='/user/reg' element={<Registration/>}></Route>
          <Route path='/user' element={<FileInput />}></Route>
          <Route path='/user/pending' element={<PendingFile/>}></Route>
          <Route path='/user/approved' element={<UserApproved/>}></Route>
          
          <Route path="/coordinator/auth" element={<CoOrdinatorAuthentication/>}></Route>
          <Route path='/coordinator/pending' element={<Coordinator />}></Route>
          <Route path='/coordinator/approved' element={<CoOrdinatorApproved />}></Route>
          <Route path='/coordinator/fileFormat' element={<FileFormat/>}></Route>
          <Route path="/coordinator/pendingUser" element={<PendingUsers/>}></Route>

          <Route path='/government/auth' element={<GovernmentAuthentication/>}></Route>
          <Route path='/government/pending' element={<Admin/>}></Route>
          <Route path='/government/approved' element={<GovernmentApproved/>}></Route>
          <Route path='/government/fileFormat' element={<FileFormat/>}></Route>
        </Routes>

      </Router>
  );
}

export default App;
