import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Common/Home';
import NotFound from './pages/Common/NotFound';

import BlogsRoutes from './modules/Blogs/Blogs.routes';

import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './style.scss';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/blogs/*" element={<BlogsRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
