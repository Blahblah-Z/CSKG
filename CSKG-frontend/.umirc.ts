import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    // { path: '/', component: '@/pages/index' },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/home', component: '@/pages/home/index' },
        { path: '/kg', component: '@/pages/kg/index' },
        {
          path: '/analyse',
          routes: [
            {
              path: '/analyse/keywords',
              component: '@/pages/analyse/keywords/index',
            },
            {
              path: '/analyse/wordcloud',
              component: '@/pages/analyse/wordcloud/index',
            },
          ],
        },
        { path: '/home', component: '@/pages/home/index' },
        { path: '/statistic', component: '@/pages/statistic/index' },
        { path: '/question', component: '@/pages/question/index' },
      ],
    },
  ],
  fastRefresh: {},
});