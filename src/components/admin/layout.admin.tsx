import React, { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  ExceptionOutlined,
  ApiOutlined,
  UserOutlined,
  BankOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AliwangwangOutlined,
  LogoutOutlined,
  HeartTwoTone,
  BugOutlined,
  ScheduleOutlined,
  AuditOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Space, message, Avatar, Button } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { callLogout } from "config/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { isMobile } from "react-device-detect";
import type { MenuProps } from "antd";
import { setLogoutAction } from "@/redux/slice/accountSlide";
import { ALL_PERMISSIONS } from "@/config/permissions";

const { Content, Footer, Sider } = Layout;

const LayoutAdmin = () => {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const user = useAppSelector((state) => state.account.user);

  const permissions = useAppSelector((state) => state.account.user.permissions);
  const [menuItems, setMenuItems] = useState<MenuProps["items"]>([]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (permissions?.length) {
      const viewCompany = permissions.find(
        (item) =>
          item.apiPath === ALL_PERMISSIONS.COMPANIES.GET_PAGINATE.apiPath &&
          item.method === ALL_PERMISSIONS.COMPANIES.GET_PAGINATE.method
      );

      const viewUser = permissions.find(
        (item) =>
          item.apiPath === ALL_PERMISSIONS.USERS.GET_PAGINATE.apiPath &&
          item.method === ALL_PERMISSIONS.USERS.GET_PAGINATE.method
      );

      const viewJob = permissions.find(
        (item) =>
          item.apiPath === ALL_PERMISSIONS.JOBS.GET_PAGINATE.apiPath &&
          item.method === ALL_PERMISSIONS.JOBS.GET_PAGINATE.method
      );

      const viewResume = permissions.find(
        (item) =>
          item.apiPath === ALL_PERMISSIONS.RESUMES.GET_PAGINATE.apiPath &&
          item.method === ALL_PERMISSIONS.RESUMES.GET_PAGINATE.method
      );

      const viewRole = permissions.find(
        (item) =>
          item.apiPath === ALL_PERMISSIONS.ROLES.GET_PAGINATE.apiPath &&
          item.method === ALL_PERMISSIONS.ROLES.GET_PAGINATE.method
      );

      const viewPermission = permissions.find(
        (item) =>
          item.apiPath === ALL_PERMISSIONS.PERMISSIONS.GET_PAGINATE.apiPath &&
          item.method === ALL_PERMISSIONS.USERS.GET_PAGINATE.method
      );
      const viewSkill = permissions.find(
        (item) =>
          item.apiPath === ALL_PERMISSIONS.SKILLS.GET_PAGINATE.apiPath &&
          item.method === ALL_PERMISSIONS.SKILLS.GET_PAGINATE.method
      );
      const viewSubscriber = permissions.find(
        (item) =>
          item.apiPath === ALL_PERMISSIONS.SUBSCRIBERS.GET_PAGINATE.apiPath &&
          item.method === ALL_PERMISSIONS.SUBSCRIBERS.GET_PAGINATE.method
      );

      const full = [
        {
          label: <Link to="/job-seeking-reactjs/admin">Dashboard</Link>,
          key: "/job-seeking-reactjs/admin",
          icon: <AppstoreOutlined />,
        },
        ...(viewCompany
          ? [
              {
                label: (
                  <Link to="/job-seeking-reactjs/admin/company">Company</Link>
                ),
                key: "/job-seeking-reactjs/admin/company",
                icon: <BankOutlined />,
              },
            ]
          : []),

        ...(viewUser
          ? [
              {
                label: <Link to="/job-seeking-reactjs/admin/user">User</Link>,
                key: "/job-seeking-reactjs/admin/user",
                icon: <UserOutlined />,
              },
            ]
          : []),
        ...(viewJob
          ? [
              {
                label: <Link to="/job-seeking-reactjs/admin/job">Job</Link>,
                key: "/job-seeking-reactjs/admin/job",
                icon: <ScheduleOutlined />,
              },
            ]
          : []),

        ...(viewResume
          ? [
              {
                label: (
                  <Link to="/job-seeking-reactjs/admin/resume">Resume</Link>
                ),
                key: "/job-seeking-reactjs/admin/resume",
                icon: <AliwangwangOutlined />,
              },
            ]
          : []),
        ...(viewSkill
          ? [
              {
                label: <Link to="/job-seeking-reactjs/admin/skill">Skill</Link>,
                key: "/job-seeking-reactjs/admin/skill",
                icon: <AuditOutlined />,
              },
            ]
          : []),
        ...(viewRole
          ? [
              {
                label: (
                  <Link to="/job-seeking-reactjs/admin/subscriber">
                    Subscriber
                  </Link>
                ),
                key: "/job-seeking-reactjs/admin/subscriber",
                icon: <PaperClipOutlined />,
              },
            ]
          : []),
        ...(viewPermission
          ? [
              {
                label: (
                  <Link to="/job-seeking-reactjs/admin/permission">
                    Permission
                  </Link>
                ),
                key: "/job-seeking-reactjs/admin/permission",
                icon: <ApiOutlined />,
              },
            ]
          : []),
        ...(viewRole
          ? [
              {
                label: <Link to="/job-seeking-reactjs/admin/role">Role</Link>,
                key: "/job-seeking-reactjs/admin/role",
                icon: <ExceptionOutlined />,
              },
            ]
          : []),
      ];

      setMenuItems(full);
    }
  }, [permissions]);
  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      dispatch(setLogoutAction({}));
      message.success("Đăng xuất thành công");
      navigate("/job-seeking-reactjs/");
    }
  };

  // if (isMobile) {
  //     items.push({
  //         label: <label
  //             style={{ cursor: 'pointer' }}
  //             onClick={() => handleLogout()}
  //         >Đăng xuất</label>,
  //         key: 'logout',
  //         icon: <LogoutOutlined />
  //     })
  // }

  const itemsDropdown = [
    {
      label: <Link to={"/job-seeking-reactjs/"}>Trang chủ</Link>,
      key: "home",
    },
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
          Đăng xuất
        </label>
      ),
      key: "logout",
    },
  ];

  return (
    <>
      <Layout style={{ minHeight: "100vh" }} className="layout-admin">
        {!isMobile ? (
          <Sider
            theme="light"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div style={{ height: 32, margin: 16, textAlign: "center" }}>
              <BugOutlined /> ADMIN
            </div>
            <Menu
              selectedKeys={[activeMenu]}
              mode="inline"
              items={menuItems}
              onClick={(e) => setActiveMenu(e.key)}
            />
          </Sider>
        ) : (
          <Menu
            selectedKeys={[activeMenu]}
            items={menuItems}
            onClick={(e) => setActiveMenu(e.key)}
            mode="horizontal"
          />
        )}

        <Layout>
          {!isMobile && (
            <div
              className="admin-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginRight: 20,
              }}
            >
              <Button
                type="text"
                icon={
                  collapsed
                    ? React.createElement(MenuUnfoldOutlined)
                    : React.createElement(MenuFoldOutlined)
                }
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />

              <Dropdown menu={{ items: itemsDropdown }} trigger={["click"]}>
                <Space style={{ cursor: "pointer" }}>
                  Welcome {user?.name}
                  <Avatar>
                    {" "}
                    {user?.name?.substring(0, 2)?.toUpperCase()}{" "}
                  </Avatar>
                </Space>
              </Dropdown>
            </div>
          )}
          <Content style={{ padding: "15px" }}>
            <Outlet />
          </Content>
          {/* <Footer style={{ padding: 10, textAlign: 'center' }}>
                        React Typescript series Nest.JS &copy; Hỏi Dân IT - Made with <HeartTwoTone />
                    </Footer> */}
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutAdmin;
