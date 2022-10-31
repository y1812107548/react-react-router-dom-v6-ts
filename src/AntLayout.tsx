import React, { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import type { MenuProps } from 'antd';
import { Link, Outlet, matchRoutes, useLocation, useNavigate } from "react-router-dom";
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

import { CSSTransition, SwitchTransition } from "react-transition-group";

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number];


// 生成菜单列表
function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
        label,
        key,
        icon,
        children
    };
}
/**
 * @Description: antdesign 推荐写法
 * ant design 推荐写法 将items组合
 * const items = [
  { label: '菜单项一', key: 'item-1' }, // 菜单项务必填写 key
  { label: '菜单项二', key: 'item-2' },
  {
    label: '子菜单',
    key: 'submenu',
    children: [{ label: '子菜单项', key: 'submenu-item-1' }],
  },
];
 */
const items: MenuItem[] = [
    getItem('首页', '/', <PieChartOutlined />),
    getItem('账号配置', '/setting', <DesktopOutlined />),
    getItem('用户系统', '/user', <UserOutlined />, [
        getItem('用户列表', '/user/list'),
        getItem('角色配置', '/user/menu')
    ]),
    getItem('工作系统', '/workbench', <TeamOutlined />, [
        getItem('ts语法', '/workbench/ts'),
    ]),
    getItem('文件系统', '/file', <FileOutlined />,[
        getItem('上传文件','/file/upload'),
        getItem('图片预览','/file/perview')
    ]),
    getItem('表单', '/form', <UserOutlined />, [
        getItem('动态表单', '/form/addform'),
        getItem('双向绑定表单', '/form/watchform'),
    ])
];
const handleMenuClick = (e: any) => {
    // console.log(e,'click');
}
const pathMaps: Record<string, string> = {}
const matchPath = (arr: MenuItem[]) => {
    arr.map((v: any) => {
        if (v?.children) {
            matchPath(v.children)
        }
        pathMaps[v.key] = v.label
    })
}
matchPath(items)
console.log(pathMaps);
const AntLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const pathSnippets = location.pathname.split('/').filter(i => i)
    const breadCrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{pathMaps[url]}</Link>
            </Breadcrumb.Item>
        )
    })
    const finalCrumbItems = [
        <Breadcrumb.Item key="/">
            <Link to="/">首页</Link>
        </Breadcrumb.Item>
    ].concat(breadCrumbItems)
    // console.log('breadCrumbItems===>', breadCrumbItems);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={value => setCollapsed(value)}>
                <div className="logo"></div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    onClick={handleMenuClick}
                    onSelect={({ key }) => navigate(key)}
                    items={items} />
            </Sider>
            <Layout style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <Header>
                    欢迎来到缅北诈骗系统
                </Header>
                <Content style={{ padding: 24, margin: 0, flexGrow: 1, overflow: 'auto' }}>
                    <Breadcrumb separator=">" style={{ fontSize: 14, marginBottom: 20 }}>{finalCrumbItems}</Breadcrumb>
                    <SwitchTransition mode="out-in">
                        <CSSTransition key={location.key} timeout={300} classNames="fade" nodeRef={null}>
                            <Outlet />
                        </CSSTransition>
                    </SwitchTransition>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design @2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    )
}

export default AntLayout


