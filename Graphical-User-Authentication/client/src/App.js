import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./scenes/home";
import SignIn1 from './scenes/1-step'
import SignIn2 from './scenes/2-step'
import SignIn3 from './scenes/3-step'
import Signup1 from './scenes/1-signup'
import Signup2 from './scenes/2-signup'
import Signup3 from './scenes/3-signup'
import PwdRequest from './scenes/pwdRequest'
import PwdReset1 from './scenes/pwdReset1';
import PwdReset2 from './scenes/pwdReset2'
import PwdReset3 from './scenes/pwdReset3'

import { isLoggedIn } from './actions/authActions'

function App() {

  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.authenticated)
  useEffect(() => {
    if (!authenticated) {
      dispatch(isLoggedIn());
    }
  }, []);
  return (
    <div className="app">
      <Toaster position="top-center" reverseOrder={true} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signIn1" element={<SignIn1 />} />
          <Route path="/signIn2/:email/:password" element={<SignIn2 />} />
          <Route path="/signIn3/:email/:password/:colorPwd" element={<SignIn3 />} />
          <Route path="/signUp1" element={<Signup1 />} />
          <Route path="/signUp2/:email/:password/:fullName" element={<Signup2 />} />
          <Route path="/signUp3/:email/:password/:fullName/:colorPwd" element={<Signup3 />} />
          <Route path="/pwdRequest" element={<PwdRequest />} />
          <Route path="/pwdReset1/:token" element={<PwdReset1 />} />
          <Route path="/pwdReset2/:token/:hashPass/:OTP" element={<PwdReset2 />} />
          <Route path="/pwdReset3/:token/:hashPass/:OTP/:colorPass" element={<PwdReset3 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
