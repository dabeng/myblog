import { Routes, Route } from 'react-router-dom';
import { AuthProvider, ProtectedRoute } from './modules/auth';
import { Layout } from './components';
import {Home, Login, SignUp, Profile, NotFound } from './pages';
import BlogsRoutes from './modules/blogs/Blogs.routes';

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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
