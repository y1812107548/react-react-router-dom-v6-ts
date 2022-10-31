import React, { lazy, ReactNode, Suspense } from 'react'

import { RouteObject } from 'react-router-dom'


// 公共页面不使用懒加载
import AntLayout from '../AntLayout'
// 懒加载路由
const AddForm = lazy(() => import('../AntAddForm'))//动态表单
const WatchForm = lazy(() => import('../AntWatchForm'))//双向绑定表单
const Registry = lazy(() => import('../RegistryForm'))//注册表单
const Login = lazy(() => import('../Login'))//登录
const Home = lazy(() => import('../Home'))//首页
const UserList = lazy(() => import('../User'))//用户列表
const UserMenu = lazy(() => import('../UserMenu'))//菜单配置
const FileUpload = lazy(() => import('../FileUpload'))//文件上传
const FilePerview = lazy(() => import('../FilePerview'))//文件预览
const Setting = lazy(() => import('../Setting'))//系统设置
const Learn = lazy(() => import('../Learnts'))


// 实现懒加载用suspense包裹
const lazyLoad = (children: ReactNode): ReactNode => {
    return (
        <Suspense >
            {children}
        </Suspense>
    )
}

export const routers: RouteObject[] = [
    {
        path: '/',
        element: <AntLayout />,
        children: [
            {
                index: true,// 默认加载当前子项
                element: lazyLoad(<Home />),
            },
            {
                path: '/form',
                children: [
                    {
                        index: true,
                        element: lazyLoad(<AddForm />)
                    },
                    {
                        path: '/form/addform',
                        element: lazyLoad(<AddForm />)
                    },
                    {
                        path: '/form/watchform',
                        element: lazyLoad(<WatchForm />)
                    }
                ]
            },
            {
                path: '/user',
                children: [
                    {
                        index: true,
                        element: lazyLoad(<UserList />)
                    },
                    {
                        path: '/user/list',
                        element: lazyLoad(<UserList />)
                    },
                    {
                        path: '/user/menu',
                        element: lazyLoad(<UserMenu />)
                    }
                ]
            },
            {
                path: '/file',
                children: [
                    {
                        index: true,
                        element: lazyLoad(<FileUpload />)
                    },
                    {
                        index: true,
                        path: '/file/upload',
                        element: lazyLoad(<FileUpload />)
                    },
                    {
                        path: '/file/perview',
                        element: lazyLoad(<FilePerview />)
                    }
                ]
            },
            {
                path: '/workbench/ts',
                element: lazyLoad(<Learn />)
            },
            {
                path: '/setting',
                element: lazyLoad(<Setting />)
            }
        ],
    },
    {
        path: '/login',
        element: lazyLoad(<Login />)
    },
    {
        path: '/registry',
        element: lazyLoad(<Registry />)
    }
]