import type { RouteRecordRaw } from 'vue-router';
 
//对外暴露配置路由
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home.vue'), // 注意这里要带上 文件后缀.vue
    meta: {}
  },
]