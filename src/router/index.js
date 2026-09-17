import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Quiz from '@/views/Quiz.vue';
import Report from '@/views/Report.vue';
import Privacy from '@/views/Privacy.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/quiz', name: 'Quiz', component: Quiz },
  { path: '/report', name: 'Report', component: Report },
  { path: '/privacy', name: 'Privacy', component: Privacy }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;