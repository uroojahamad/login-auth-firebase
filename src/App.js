import { Container } from 'react-bootstrap';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<LoginPage />}/>
            <Route path='/signup' element={<SignUpPage />}/>
            <Route path='/dashboard' element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }/>
          </Routes>
        </AuthProvider>
        </BrowserRouter>
      </div>
    </Container>
    </>
  );
}

export default App;