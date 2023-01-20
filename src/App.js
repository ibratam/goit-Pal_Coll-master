import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import SmsAddPage from "./pages/add/SmsAddPage";
import SmsSendPage from "./pages/send/SmsSendPage";
import Users from "./pages/settings/Users";
function App() {
  const { darkMode } = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext)
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="sms">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
     
            </Route>
            <Route path="send">
              <Route
                index
                element={
                  <RequireAuth>
                    <SmsSendPage />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="add">
              <Route
                index
                element={
                  <RequireAuth>
                    <SmsAddPage />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <Users />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
