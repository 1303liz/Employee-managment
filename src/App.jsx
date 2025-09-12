import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/common/Navbar'
import Sidebar from './components/common/Sidebar'
import ProtectedRoute from './components/common/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import EmployeeListPage from './pages/EmployeeListPage'
import EmployeeDetailPage from './pages/EmployeeDetailPage'
import DepartmentPage from './pages/DepartmentPage'
import AttendancePage from './pages/AttendancePage'
import LeavePage from './pages/LeavePage'
import PayrollPage from './pages/PayrollPage'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AppLayout>
                  <DashboardPage />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/employees" element={
              <ProtectedRoute requiredRoles={['admin', 'manager']}>
                <AppLayout>
                  <EmployeeListPage />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/employees/:id" element={
              <ProtectedRoute requiredRoles={['admin', 'manager']}>
                <AppLayout>
                  <EmployeeDetailPage />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/departments" element={
              <ProtectedRoute requiredRoles={['admin', 'manager']}>
                <AppLayout>
                  <DepartmentPage />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/attendance" element={
              <ProtectedRoute>
                <AppLayout>
                  <AttendancePage />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/leave" element={
              <ProtectedRoute>
                <AppLayout>
                  <LeavePage />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/payroll" element={
              <ProtectedRoute>
                <AppLayout>
                  <PayrollPage />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

// Layout component for authenticated pages
function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default App
