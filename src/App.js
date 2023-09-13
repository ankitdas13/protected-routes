import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navlinks from './Components/Header/Navigation';
import Home from './Components/Home/Index';
import Admin from './Components/Admin';
import Dashboard from './Components/Dashboard';
import Help from './Components/Help';
import Login from './Components/Login';
import { useAuth } from './Context/Auth';
import Protected from './Components/Protected';
import { useEffect } from 'react';

function App() {
  const [auth,setAuth] = useAuth()

  useEffect(()=>{
    const authDetail = localStorage.getItem("user")
    if(authDetail){
      setAuth(JSON.parse(authDetail))
    } 
  },[])

  const routes = [
    {
      path: '/',
      element: <Home />,
      requiresAuth: false
    },
    {
      path: '/admin',
      element: <Admin />,
      requiresAuth: true
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      requiresAuth: true
    },
    {
      path: '/help',
      element: <Help />,
      requiresAuth: true
    },
    {
      path: '/login',
      element: <Login />,
      requiresAuth: true
    }
  ]
  return (
    <>
      <Router>
        <Navlinks />
        <Routes>
          <Route>

            {routes.map((route, key) => {
              return <Route
                key={key}
                path={route.path}
                element={
                  route.requiresAuth ? (
                    <Protected auth={auth}> {route.element} </Protected>
                  ) : (
                    route.element
                  )
                } />
            })}

          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
