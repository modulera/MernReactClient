import Home from '../pages/Home/Home';
import Location from '../pages/Location/Location';
import NotFound from '../pages/Home/404';
import Signin from '../pages/Auth/Signin/index';
import Signup from '../pages/Auth/Signup';
import ResetPass from '../pages/Auth/ResetPass';

import Posts from '../pages/Posts/index';
import Test from '../pages/Test/index';
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
    isVisible: false,
    multiple: false,
    priority: 7,
    title: 'Postlar',
  },
  {
    path: '/test',
    component: Test,
    isPrivate: true,
    isVisible: false,
    multiple: false,
    priority: 10,
    title: 'Test',
  },
  {
    path: '/uploads',
    component: Uploads,
    isPrivate: true,
    isVisible: false,
    multiple: true,
    priority: 5,
    title: 'Fotoğraflarım',
  },
  {
    path: '/location',
    component: Location,
    isPrivate: false,
    isVisible: true,
    multiple: true,
    priority: 3,
    title: 'Konum',
  },
  {
    path: '/davet',
    component: Location,
    isPrivate: false,
    isVisible: false,
    multiple: false,
    priority: 3,
    title: 'Konum',
  },
  {
    path: '/signin',
    component: Signin,
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
    isVisible: false,
    multiple: true,
    priority: 1,
    title: 'Düğünden Kareler',
  },
];

export default routes;
