import { RouteRecordRaw } from "vue-router";
import { LOGIN_URL } from "@/config";

export const staticRouter: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: LOGIN_URL
    },
    {
        path: LOGIN_URL,
        name: "login",
        component: () => import("@/views/login/index.vue"),
        meta: {
            title: "登录"
        }
    },
    {
        path: "/layout",
        name: "layout",
        component: () => import("@/layouts/index.vue"),
        children: []
    }
];

export const errorRouter: RouteRecordRaw[] = [
    {
        path: "/403",
        name: "403",
        component: () => import("@/components/ErrorMessage/403.vue"),
        meta: {
            title: "403页面"
        }
    },
    {
        path: "/404",
        name: "404",
        component: () => import("@/components/ErrorMessage/404.vue"),
        meta: {
            title: "404页面"
        }
    },
    {
        path: "/500",
        name: "500",
        component: () => import("@/components/ErrorMessage/500.vue"),
        meta: {
            title: "500页面"
        }
    },
    // Resolve refresh page, route warnings
    {
        path: "/:pathMatch(.*)*",
        component: () => import("@/components/ErrorMessage/404.vue")
    }
];