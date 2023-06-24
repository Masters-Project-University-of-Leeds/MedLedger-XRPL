import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Navbar from './components/navbar/navbar';
import { ToastContainer } from 'react-toastify';

const Login = lazy(() => import('./components/login/login'));
const Registration = lazy(() => import('./components/registration/registration'));
const Landing = lazy(() => import('./components/landing/landing'));
const AdminPanel = lazy(() => import('./components/admin-panel/admin-panel'));

function App() {
    return (
        <Router>
            <div>
                <Suspense fallback={<div>Loading...</div>}>
                    <ToastContainer />
                    <Navbar />
                    <Routes>
                        <Route exact path="/" element={<Landing />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route path="/registration" element={<Registration />} />
                        <Route path="/admin-panel" element={<AdminPanel />} />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
}

export default App;