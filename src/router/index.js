import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MyPage from '../views/MyPage.vue'
import UploadVideo from '../views/UploadVideo.vue'
import NotLogIn from '../views/NotLogIn.vue'
import ErrorPage from '../views/ErrorPage.vue'

import EditProfile from '../views/rank1/EditProfile.vue'
import MakeAccount from '../views/rank1/MakeAccount.vue'
import LogIn from '../views/rank1/LogIn.vue'
import TaggedScreen from '../views/rank1/TaggedScreen.vue'
import MyPageChild from '../views/rank1/MyPageChild.vue'
import ThanksMakeAccount from '../views/rank1/ThanksMakeAccount.vue'
import ForgotPassword from '../views/rank1/ForgotPassword.vue'
import NewPassword from '../views/NewPassword.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/trend',
        name: 'trend',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '../views/Trend.vue')
    },
    {
        path: '/my-page',
        name: 'my-page',
        component: MyPage,
        children: [
            {
                path: ':id',
                component: MyPageChild
            }
        ]
    },
    {
        path: '/upload-video',
        name: 'upload-video',
        component: UploadVideo
    },
    {
        path: '/not-log-in',
        name: 'not-log-in',
        component: NotLogIn
    },
    {
        path: '/edit-profile',
        name: 'edit-profile',
        component: EditProfile
    },
    {
        path: '/make-account',
        name: 'make-account',
        component: MakeAccount
    },
    {
        path: '/log-in',
        name: 'log-in',
        component: LogIn
    },
    {
        path: '/tagged-screen',
        name: 'tagged-screen',
        component: TaggedScreen
    },
    {
        path: '/error-page',
        name: 'error-page',
        component: ErrorPage
    },
    {
        path: '/thanks-mkacc',
        name: 'thanks-mkacc',
        component: ThanksMakeAccount
    },
    {
        component: ForgotPassword,
        path: '/forgot-password',
        name: 'forgot-password'
    },
    {
        component: NewPassword,
        path: '/new-password',
        name: 'new-password'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
})

export default router
