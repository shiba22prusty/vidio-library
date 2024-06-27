import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { VideoHome } from './video-components/video-home';
import { AdminLogin } from './video-components/admin-login';
import { AdminDashbord } from './video-components/admin-dashbord';
import { AdminError } from './video-components/admin-error';
import { AddVideo } from './video-components/add-video';
import { UserLogin } from './video-components/user-login';
import { UserRegister } from './video-components/user-register';
import { UserDashbord } from './video-components/user-dashbord';
import { EditVideo } from './video-components/edit-video';
import { UserError } from './video-components/user-error';
import { VideoCategories } from './video-components/video-categories';




function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <header className='p-2 fs-4 d-flex justify-content-between text-white bg-dark text-white'>
          <Link to='/' className='text-white text-decoration-none'>Vedio Library Project</Link>
          <Link to="/admin-login" className="bi bi-person-bounding-box text-white text-decoration-none">Admin Login</Link>
          <Link to="/user-login" className='bi bi-person-fill text-white text-decoration-none'>User Login</Link>
        </header>
        <section className='text-centre mt-4'>
          <Routes>
            <Route path='/' element={<VideoHome />} />
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path='/admin-dashbord' element={<AdminDashbord />} />
            <Route path='/admin-error' element={<AdminError />} />
            <Route path='/user-error' element={<UserError />} />
            <Route path='/add-video' element={<AddVideo />} />
            <Route path='/user-login' element={<UserLogin />} />
            <Route path='/user-register' element={<UserRegister />} />
            <Route path='/user-dashbord' element={<UserDashbord />} />
            <Route path='/user-register' element={<UserRegister />} />
            <Route path='/user-login' element={<UserLogin />} />
            <Route path='/edit-video/:id' element={<EditVideo />} />
            <Route path='/video-categories' element={<VideoCategories />} />
          </Routes>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
