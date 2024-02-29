import { Routes, Route } from 'react-router-dom';
import AuthProvider from './shared/providers/AuthProvider';
import ProtectedRoute from './shared/routes';
import { Layout } from './components';
import {Home, Login, Logout, NotFound } from './pages';
import BlogsRoutes from './modules/Blogs/Blogs.routes';

import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './style.scss';

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/blogs/*" element={<ProtectedRoute><BlogsRoutes /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
