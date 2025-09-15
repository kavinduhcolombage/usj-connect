import './App.css'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Notifications } from '@mantine/notifications';
import FindTalentsPage from './pages/FIndTalentsPage';
import TalentProfilePage from './pages/TalentProfilePage';
import PostJobPage from './pages/PostJobPage';
import ApplyJObPage from './pages/ApplyJobPage';
import ProfilePage from './pages/ProfilePage';
import Store from './Store';
import JobDescriptionPage from './pages/JobDescriptionPage';
import CompanyPage from './pages/CompanyPage';
import PostedJobPage from './pages/PostedJobPage';
import JobHistoryPage from './pages/JobHistoryPage';
import ProtectedRoute from './Services/ProtectedRoute';
import PublicRoute from './Services/PublicRoute';

// import HomePage from './pages/HomePage';
// import FindJob from './pages/FindJob';
// import SignUpPage from './pages/SignUpPage';

const HomePage = lazy(() => import('./pages/HomePage'));
const FindJobPage = lazy(() => import('./pages/FindJobPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));


function App() {
  // const theme = createTheme({
  //   colors: {
  //     blue: [
  //       '#eef3ff',
  //       '#dee2f2',
  //       '#bdc2de',
  //       '#98a0ca',
  //       '#7a84ba',
  //       '#6672b0',
  //       '#5c68ac',
  //       '#4c5897',
  //       '#424e88',
  //       '#364379',
  //     ],
  //   }

  // })
  return (

    <Provider store={Store}>
      <MantineProvider>
        <Notifications position="top-center" zIndex={1000} />
        <BrowserRouter>
          <div className='relative'>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/find-job" element={<FindJobPage />} />
                <Route path="/find-talents" element={<FindTalentsPage />} />
                <Route path="/post-job/:id" element={<ProtectedRoute allowedRoles={['COMPANY']}>  <PostJobPage /> </ProtectedRoute>} />
                <Route path="/talent-profile/:id" element={<TalentProfilePage />} />
                <Route path="/apply-job/:id" element={<ApplyJObPage />} />
                <Route path="/signup" element={<PublicRoute><SignUpPage /></PublicRoute>} />
                <Route path="/login" element={<PublicRoute><SignUpPage /></PublicRoute>} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/jobs/:id" element={<JobDescriptionPage />} />
                <Route path="/company/:name" element={<CompanyPage />} />
                <Route path="/posted-job/:id" element={<ProtectedRoute allowedRoles={['COMPANY']}><PostedJobPage /></ProtectedRoute>} />
                <Route path="/job-history" element={<ProtectedRoute allowedRoles={['STUDENT']}> <JobHistoryPage /> </ProtectedRoute>} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      </MantineProvider>
    </Provider>

  )
}

export default App
