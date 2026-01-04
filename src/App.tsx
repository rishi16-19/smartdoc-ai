
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { UploadPage } from './pages/UploadPage';
import { StatusPage } from './pages/StatusPage';
import { ResultsPage } from './pages/ResultsPage';

import { AuthProvider } from './contexts/AuthContext';
import { LoginPage } from './pages/LoginPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/upload"
              element={
                <UploadPage />
              }
            />
            <Route
              path="/status/:fileId"
              element={
                <StatusPage />
              }
            />
            <Route
              path="/result/:fileId"
              element={
                <ResultsPage />
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
