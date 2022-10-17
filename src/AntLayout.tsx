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

import { TransitionGroup,CSSTransition, SwitchTransition } from "react-transition-group";

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number];


// 生成菜单列表
function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
        label,
        key,
        icon,
        children
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('首页', '/', <PieChartOutlined />),
    getItem('账号配置', '/setting', <DesktopOutlined />),
    getItem('用户系统', '/user', <UserOutlined />, [
        getItem('用户列表','/user/list')
    ]),
    getItem('工作系统', '/workbench', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('文件系统', '/file', <FileOutlined />),
    getItem('表单', '/form', <UserOutlined />, [
        getItem('动态表单', '/form/addform'),
        getItem('双向绑定表单', '/form/watchform'),
    ])
];

const handleMenuClick = (e: any) => {
    // console.log(e,'click');
}

const AntLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
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
            <Layout>
                <Header>
                    欢迎来到缅北诈骗系统
                </Header>
                <Content style={{ padding: 24, margin: 0}}>
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


