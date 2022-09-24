import {createRouter, createWebHistory} from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import DefaultLayout from '../components/DefaultLayout.vue'
import Surveys from "../views/Surveys.vue";
import store from "../store/index.js";
import AuthLayout from "../components/AuthLayout.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        component: DefaultLayout,
        meta: {requiresAuth: true},
        children: [
            {path: '/dashboard', name: 'Dashboard', component: Dashboard},
            {path: '/surveys', name: 'Surveys', component: Surveys},
        ]
    },
    {
        path: '/auth',
        name: 'Auth',
        redirect: '/login',
        meta: {isGuest: true},
        component: AuthLayout,
        children: [
            {path: '/login', name: 'Login', component: Login},
            {path: '/register', name: 'Register', component: Register}
        ]
    },

]
const router = createRouter({
    history: createWebHistory(),
    routes
})

// check if the user is login
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({name: 'Login'})
    } else if (store.state.user.token && to.meta.isGuest) {
        // prevent user to access login page or Register page if he is authorized
        next({name: 'Dashboard'})
    } else {
        next();
    }

})
export default router;
