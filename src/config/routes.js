import Home from '../pages/Home/Home';
import Invitation from '../pages/Invitation/Invitation';
import NotFound from '../pages/Home/404';
import Login from '../pages/Auth/Login/index';
import Signup from '../pages/Auth/Signup';
import ResetPass from '../pages/Auth/ResetPass';

import Posts from '../pages/Posts/index';
import Uploads from '../pages/Uploads/index';
import Dashboard from '../pages/Dashboard/index';

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    isPrivate: true,
    isVisible: false,
    multiple: false,
    priority: 2,
    title: 'Dashboard',
  },
  {
    path: '/posts',
    component: Posts,
    isPrivate: true,
    isVisible: true,
    multiple: false,
    priority: 4,
    title: 'Postlar',
  },
  {
    path: '/uploads',
    component: Uploads,
    isPrivate: true,
    isVisible: true,
    multiple: true,
    priority: 5,
    title: 'Fotoğraflar',
  },
  {
    path: '/invitation',
    component: Invitation,
    isPrivate: false,
    isVisible: true,
    multiple: true,
    priority: 3,
    title: 'Davet',
  },
  {
    path: '/login',
    component: Login,
    isPrivate: false,
    isVisible: false,
    multiple: false,
    priority: 2,
    title: 'Giriş',
  },
  {
    path: '/signup',
    component: Signup,
    isPrivate: false,
    isVisible: false,
    multiple: false,
    priority: 3,
    title: 'Kayıt',
  },
  {
    path: '/resetpassword',
    component: ResetPass,
    isPrivate: false,
    isVisible: false,
    multiple: false,
    priority: 4,
    title: 'Şifremi Unuttum',
  },
  {
    path: '/404',
    component: NotFound,
    isPrivate: false,
    isVisible: false,
    multiple: false,
    priority: 1,
    title: false,
  },
  {
    path: '/',
    component: Home,
    isPrivate: false,
    isVisible: true,
    multiple: true,
    priority: 1,
    title: 'Anasayfa',
  },
];

export default routes;
