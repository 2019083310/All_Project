import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
// 登录界面路由
const Login = () =>
    import ('../views/login/Login.vue')
const Home = () =>
    import ('../views/home/Home.vue')
const Banner = () =>
    import ('../views/login/Banner.vue')
const Register = () =>
    import ('../views/login/Register.vue')

//普通用户界面路由
const Reg = () =>
    import ('../views/home/Reg.vue')
const News = () =>
    import ('../views/home/News.vue')
const Message = () =>
    import ('../views/home/Message.vue')
const Cancel = () =>
    import ('../views/home/Cancel.vue')
const Person = () =>
    import ('../views/home/Person.vue')

//后台管理路由
const Admin = () =>
    import ('../views/admin/Admin.vue')
const User = () =>
    import ('../views/admin/User.vue')
const AdminCenter = () =>
    import ('../views/admin/AdminCenter.vue')
const Doctor = () =>
    import ('../views/admin/Doctor.vue')
const UserInfo = () =>
    import ('../views/admin/UserInfo.vue')

//医生界面路由
const DoctorUi = () =>
    import ('../views/doctor/DoctorUi.vue')
const doctorReg = () =>
    import ('../views/doctor/doctorReg.vue')
const PersonCenter = () =>
    import ('../views/doctor/PersonCenter.vue')
const UserReg = () =>
    import ('../views/doctor/UserReg.vue')

// 重写路由push方法,阻止重复点击报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}

// 重写路由replace方法,阻止重复点击报错
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
}

Vue.use(VueRouter)

const routes = [{
        path: '*',
        redirect: '/welcome'
    },
    {
        path: '/welcome',
        component: Banner
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home,
        redirect: '/reg',
        children: [{
                path: '/reg',
                component: Reg
            },
            {
                path: '/news',
                component: News
            },
            {
                path: '/findMessage',
                component: Message
            },
            {
                path: '/cancelReg',
                component: Cancel
            },
            {
                path: '/person',
                component: Person
            }
        ]
    },
    {
        path: '/admin',
        component: Admin,
        redirect: '/userCenter',
        children: [{
                path: '/userCenter',
                component: User
            },
            {
                path: '/adminCenter',
                component: AdminCenter
            },
            {
                path: '/doctorCenter',
                component: Doctor
            },
            {
                path: '/userInfo',
                component: UserInfo
            }
        ]
    },
    {
        path: '/doctor',
        component: DoctorUi,
        redirect: '/personCenter',
        children: [{
                path: '/personCenter',
                component: PersonCenter
            },
            {
                path: '/userReg',
                component: UserReg
            },
            {
                path: '/doctorReg',
                component: doctorReg
            }
        ]
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

// 路由拦截
router.beforeEach((to, form, next) => {
    if (to.path === '/login') {
        return next()
    } else if (to.path === '/register') {
        return next()
    } else if (to.path === '/welcome') {
        return next()
    }
    const token = window.sessionStorage.getItem('token')
    if (!token) {
        return next('/welcome')
    } else {
        next()
    }

})

export default router