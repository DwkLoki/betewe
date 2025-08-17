import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import Root from './routes/Root.jsx'
import Home from './routes/Home.jsx'
import Register from './routes/Register.jsx'
import Login from './routes/Login.jsx'
import Dashboard from './routes/Dashboard.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import Profile from './routes/Profile.jsx';
import QuestionDetails from './routes/QuestionDetails.jsx';
import QuestionLayout from './routes/QuestionLayout.jsx';
import EditProfile from './routes/EditProfile.jsx';
import ChangePassword from './routes/ChangePassword.jsx';
import ProfileSetting from './routes/ProfileSetting.jsx';
import QuestionsListWithoutLogin from './routes/QuestionsListWithoutLogin.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/register',
                element: (
                    <ProtectedRoute>
                        <Register />
                    </ProtectedRoute>
                )
            },
            {
                path: '/login',
                element: (
                    <ProtectedRoute>
                        <Login />
                    </ProtectedRoute>
                )
            },
            {
                path: '/dashboard',
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                )
            },
            {
                path: '/profile',
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                )
            },
            {
                path: '/profile/setting',
                element: (
                    <ProtectedRoute>
                        <ProfileSetting />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        index: true,
                        element: <Navigate to="edit-profile" replace />
                    },
                    {
                        path: 'edit-profile',
                        element: (
                            <ProtectedRoute>
                                <EditProfile />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: 'change-password',
                        element: (
                            <ProtectedRoute>
                                <ChangePassword />
                            </ProtectedRoute>
                        )
                    }
                ]
            },
            {
                path: '/question',
                element: <QuestionLayout />,
                children: [
                    {
                        path: ':id',
                        element: <QuestionDetails />
                    }
                ]
            },
            {
                path: '/questions',
                element: <QuestionsListWithoutLogin />
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
        <ToastContainer />
    </StrictMode>,
)
