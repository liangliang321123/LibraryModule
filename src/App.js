import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Component/HomePage';
import LoginPage from './Component/LoginPage';
import LibraryHomePage from './Component/Library/LibraryHomePage';
import AddUser from './Component/User/AddUser';
import ForgetPassword from './Component/User/ForgetPassword';
import ViewProfile from './Library/ViewProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/PAY"
          element={<HomePage />} />
        <Route exact path="/"
          element={<LoginPage />} />
        <Route path="/REG"
          element={<AddUser />} />
        <Route path="/FORGP"
          element={<ForgetPassword />} />
        {/* <Route path="/LIB" element={<LibraryHomePage />}>
          <Route path=":userID" element={<LibraryHomePage />} />

        </Route> */}

        <Route path="/LIB"
          element={<LibraryHomePage />} />
        <Route path="/LIB/:borrowerID"
          element={<ViewProfile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
