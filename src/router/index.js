import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MyPage from '../views/MyPage.vue'
import EditProfile from '../views/rank1/EditProfile.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: './search',
        name: 'search',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '../views/Search.vue')
    },
    {
        path: '/mypage',
        name: 'mypage',
        component: MyPage
    },
    {
        path: '/edit-profile',
        name: 'edit-profile',
        component: EditProfile
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
