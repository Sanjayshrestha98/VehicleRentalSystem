import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Page404 from './Pages/404/Page404';
import AppNavbar from './components/AppNavbar';
import Signup from './Pages/Signup/Signup';
import Contact from './Pages/Contact/Contact';
import { Toaster } from 'react-hot-toast';
import AuthContextProvider from './context/authContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './Pages/AdminPages/Dashboard';
import AdminNavbar from './components/AdminComponents/AdminNavbar';
import ProtectedAdminRoute from './components/AdminComponents/ProtectedAdminRoute';
import User from './Pages/AdminPages/User/User';
import Profile from './Pages/Profile/Profile';
import Footer from './components/Footer';
import AdminContact from './Pages/AdminPages/Contact/AdminContact';
import AdminEvents from './Pages/AdminPages/Events/Events';
import EventPage from './Pages/ClientEventPage/EventPage';
import BlogPage from './Pages/Blog/BlogPage';
import AdminBlog from './Pages/AdminPages/Blog/AdminBlog';
import AddBlog from './Pages/AdminPages/Blog/AddBlog';
import EditBlog from './Pages/AdminPages/Blog/EditBlog';
import SingleBlogPage from './Pages/Blog/SingleBlogPage';
import AdminSessions from './Pages/AdminPages/Sessions/AdminSessions';
import AddSessionModal from './Pages/AdminPages/Sessions/AddSessionModal';
import EditSessionModal from './Pages/AdminPages/Sessions/EditSessionModal';
import Coaching from './Pages/Coaching/Coaching';
import Success from './Pages/payment/Success';
import Failed from './Pages/payment/Failed';
import About from './Pages/About/About';
import Forum from './Pages/Forum/Forum';
import AddForum from './Pages/Forum/AddForum';
import SingleForumPage from './Pages/Forum/SingleForumPage';
import Notices from './Pages/Notices/Notices';

function App() {

  return (
    <div>
      <AuthContextProvider>
        <Toaster />
        <div className='min-h-screen flex flex-col'>
          <AppNavbar />
          <AdminNavbar />
          <div className='flex-1'>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/events" element={<EventPage />} />
              <Route path="/blogs" element={<BlogPage />} />
              <Route path="/coaching" element={<Coaching />} />
              <Route path="/success" element={<Success />} />
              <Route path="/failure" element={<Failed />} />
              <Route path="/about" element={<About />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/forum/:slug" element={<SingleForumPage />} />

              {/* Auth Pages */}

              <Route
                path="/forum/addforum"
                element={
                  <ProtectedRoute>
                    <AddForum />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notices"
                element={
                  <ProtectedRoute>
                    <Notices />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* 404 Page */}
              <Route path="*" element={<Page404 />} />

              {/* Admin Pages */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedAdminRoute>
                    <Dashboard />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/dashboard/users"
                element={
                  <ProtectedAdminRoute>
                    <User />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/dashboard/contact"
                element={
                  <ProtectedAdminRoute>
                    <AdminContact />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/dashboard/events"
                element={
                  <ProtectedAdminRoute>
                    <AdminEvents />
                  </ProtectedAdminRoute>
                }
              />

              {/* Blog */}
              <Route
                path="/dashboard/blog"
                element={
                  <ProtectedAdminRoute>
                    <AdminBlog />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/dashboard/blog/addblog"
                element={
                  <ProtectedAdminRoute>
                    <AddBlog />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/dashboard/blog/editblog/:id"
                element={
                  <ProtectedAdminRoute>
                    <EditBlog />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/blogs/:id"
                element={
                  // <ProtectedAdminRoute>
                  <SingleBlogPage />
                  // </ProtectedAdminRoute>
                }
              />

              {/* Sessions */}
              <Route
                path="/dashboard/sessions"
                element={
                  <ProtectedAdminRoute>
                    <AdminSessions />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/dashboard/sessions/addsession"
                element={
                  <ProtectedAdminRoute>
                    <AddSessionModal />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/dashboard/sessions/editsession/:id"
                element={
                  <ProtectedAdminRoute>
                    <EditSessionModal />
                  </ProtectedAdminRoute>
                }
              />

            </Routes>
          </div>
          <Footer />
        </div>
      </AuthContextProvider>
    </div>
  );
}

export default App;
