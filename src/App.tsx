import { createBrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom';
import { AuthProvider, ProtectedRoute } from './modules/auth';
import { Layout } from './components';
import {Home, Login, SignUp, Profile, NotFound } from './pages';
import BlogsRoutes from './modules/blogs/Blogs.routes';

import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './style.scss';

const router = createBrowserRouter([
  { path: "/",
    Component: () => <AuthProvider><Layout /></AuthProvider>,
    children: [
      { index: true, Component: Home },
      { path: "/blogs/*", Component: () => <ProtectedRoute><BlogsRoutes /></ProtectedRoute> },
      { path: "/login", Component: Login },
      { path: "/signup", Component: SignUp },
      { path: "/profile/:id", Component: Profile },
      { path: "*", Component: NotFound },
    ],
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
