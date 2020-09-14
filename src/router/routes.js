import Login from '@/views/Login';
import TheLayout from '@/components/Layout/TheLayout.vue';
import ChooseSystem from '@/views/ChooseSystem.vue';

export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    component: TheLayout,
    redirect: '/admin/choose-system',
    children: [
      {
        path: '/admin/choose-system',
        component: ChooseSystem
      }
    ]
  }
];
