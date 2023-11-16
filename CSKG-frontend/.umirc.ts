import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/login', component: '@/pages/login/login' },

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
        { path: '/question',
          routes: [
            {
              path: '/question/user',
              component: '@/pages/question/user/index',
            },
            {
              path: '/question/teacher',
              component: '@/pages/question/teacher/index',
            },
          ],
        },
      ],
    },
  ],

  
  fastRefresh: {},
});
