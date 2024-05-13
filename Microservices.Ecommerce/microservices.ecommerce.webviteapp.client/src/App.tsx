import "@refinedev/antd/dist/reset.css";
import {
  AuthPage,
  ErrorComponent,
  ImageField,
  ThemedLayoutV2,
  ThemedTitleV2,
  useNotificationProvider,
} from "@refinedev/antd";
import { SmileOutlined } from "@ant-design/icons";
import { Refine, Authenticated, CanAccess } from "@refinedev/core";
import { ConfigProvider, App as AntdApp } from "antd";
import React from "react";
import routerProvider from "@refinedev/react-router-v6";
import {
  dataProvider,
  authProvider,
  // accessControlProvider,
} from "@providers/index";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Header, Unauthorized } from "@components/index";
import {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router-v6";
import {
  CreateProduct,
  CreateRangeProduct,
  EditProduct,
  ListProduct,
  ListRole,
  ShowProduct,
  ShowRole,
  CreateRole,
  EditRole,
  CloneRole,
  ShowUser,
  EditUser,
  CloneUser,
  CreateUser,
  ListUser,
} from "./pages";
import {
  CloneRoleClaim,
  CreateRoleClaim,
  EditRoleClaim,
  ListRoleClaim,
  ShowRoleClaim,
} from "@pages/roleclaims";
import { Dashboards } from "@pages/dashboards";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <Refine
            dataProvider={dataProvider}
            authProvider={authProvider}
            routerProvider={routerProvider}
            // accessControlProvider={accessControlProvider}
            notificationProvider={useNotificationProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
            resources={[
              {
                name: "dashboard",
                list: "/dashboard",
              },
              {
                name: "products",
                list: "/products",
                create: "/products/create",
                edit: "/products/:id/edit",
                show: "/products/:id",
              },
              {
                name: "identity",
                meta: {
                  label: "Identity",
                },
              },
              {
                name: "users",
                identifier: "data-users",
                list: "/identity/users",
                create: "/identity/users/create",
                clone: "/identity/users/:id/clone",
                edit: "/identity/users/:id/edit",
                show: "/identity/users/:id",
                meta: {
                  canDelete: true,
                  parent: "identity",
                },
              },
              {
                name: "roles",
                identifier: "data-roles",
                list: "/identity/roles",
                create: "/identity/roles/create",
                clone: "/identity/roles/:id/clone",
                edit: "/identity/roles/:id/edit",
                show: "/identity/roles/:id",
                meta: {
                  canDelete: true,
                  parent: "identity",
                },
              },
              {
                name: "roleclaims",
                identifier: "data-roleclaims",
                list: "/identity/roleclaims",
                create: "/identity/roleclaims/create",
                clone: "/identity/roleclaims/:id/clone",
                edit: "/identity/roleclaims/:id/edit",
                show: "/identity/roleclaims/:id",
                meta: {
                  canDelete: true,
                  parent: "identity",
                },
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <ThemedLayoutV2
                      // Sider={() => <ThemedSiderV2 fixed />}
                      Header={() => <Header />}
                      Title={({ collapsed }: any) => (
                        <ThemedTitleV2
                          collapsed={collapsed}
                          icon={
                            <ImageField
                              value="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                              title="Logo of GiaDai"
                            />
                          }
                          text="Ant Design Pro"
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="dashboard" />}
                />
                <Route path="/dashboard">
                  <Route
                    index
                    element={
                      <CanAccess
                        resource="dashboard"
                        action="list"
                        fallback={<Unauthorized />}
                      >
                        <Dashboards />
                      </CanAccess>
                    }
                  />
                </Route>
                <Route path="/products">
                  <Route
                    index
                    element={
                      <CanAccess
                        resource="products"
                        action="list"
                        fallback={<Unauthorized />}
                      >
                        <ListProduct />
                      </CanAccess>
                    }
                  />
                  <Route
                    path="create"
                    element={
                      <CanAccess
                        resource="products"
                        action="create"
                        fallback={<Unauthorized />}
                      >
                        <CreateProduct />
                      </CanAccess>
                    }
                  />
                  <Route
                    path=":id"
                    element={
                      <CanAccess
                        resource="products"
                        action="show"
                        fallback={<Unauthorized />}
                      >
                        <ShowProduct />
                      </CanAccess>
                    }
                  />
                  <Route
                    path=":id/edit"
                    element={
                      <CanAccess
                        resource="products"
                        action="show"
                        fallback={<Unauthorized />}
                      >
                        <EditProduct />
                      </CanAccess>
                    }
                  />
                  <Route
                    path="create-range"
                    element={
                      <CanAccess
                        resource="products"
                        action="create-range"
                        fallback={<Unauthorized />}
                      >
                        <CreateRangeProduct />
                      </CanAccess>
                    }
                  />
                </Route>
                <Route path="/identity" element={<Outlet />}>
                  <Route path="users">
                    <Route
                      index
                      element={
                        <CanAccess
                          resource="users"
                          action="list"
                          fallback={<Unauthorized />}
                        >
                          <ListUser />
                        </CanAccess>
                      }
                    />
                    <Route path="create" element={<CreateUser />} />
                    <Route
                      path=":id/clone"
                      element={
                        <CanAccess
                          resource="users"
                          action="clone"
                          fallback={<Unauthorized />}
                        >
                          <CloneUser />
                        </CanAccess>
                      }
                    />
                    <Route
                      path=":id/edit"
                      element={
                        <CanAccess
                          resource="users"
                          action="edit"
                          fallback={<Unauthorized />}
                        >
                          <EditUser />
                        </CanAccess>
                      }
                    />
                    <Route
                      path=":id"
                      element={
                        <CanAccess
                          resource="users"
                          action="show"
                          fallback={<Unauthorized />}
                        >
                          <ShowUser />
                        </CanAccess>
                      }
                    />
                  </Route>
                  <Route path="roles">
                    <Route
                      index
                      element={
                        <CanAccess
                          resource="roles"
                          action="list"
                          fallback={<Unauthorized />}
                        >
                          <ListRole />
                        </CanAccess>
                      }
                    />
                    <Route
                      path="create"
                      element={
                        <CanAccess
                          resource="roles"
                          action="create"
                          fallback={<Unauthorized />}
                        >
                          <CreateRole />
                        </CanAccess>
                      }
                    />
                    <Route
                      path=":id/clone"
                      element={
                        <CanAccess
                          resource="roles"
                          action="clone"
                          fallback={<Unauthorized />}
                        >
                          <CloneRole />
                        </CanAccess>
                      }
                    />
                    <Route
                      path=":id/edit"
                      element={
                        <CanAccess
                          resource="roles"
                          action="edit"
                          fallback={<Unauthorized />}
                        >
                          <EditRole />
                        </CanAccess>
                      }
                    />
                    <Route
                      path=":id"
                      element={
                        <CanAccess
                          resource="roles"
                          action="show"
                          fallback={<Unauthorized />}
                        >
                          <ShowRole />
                        </CanAccess>
                      }
                    />
                  </Route>
                  <Route path="roleclaims">
                    <Route
                      index
                      element={
                        <CanAccess
                          resource="roleclaims"
                          action="list"
                          fallback={<Unauthorized />}
                        >
                          <ListRoleClaim />
                        </CanAccess>
                      }
                    />
                    <Route
                      path="create"
                      element={
                        <CanAccess
                          resource="roleclaims"
                          action="list"
                          fallback={<Unauthorized />}
                        >
                          <CreateRoleClaim />
                        </CanAccess>
                      }
                    />
                    <Route path=":id/clone" element={<CloneRoleClaim />} />
                    <Route
                      path=":id/edit"
                      element={
                        <CanAccess
                          resource="roleclaims"
                          action="list"
                          fallback={<Unauthorized />}
                        >
                          <EditRoleClaim />
                        </CanAccess>
                      }
                    />
                    <Route
                      path=":id"
                      element={
                        <CanAccess
                          resource="roleclaims"
                          action="list"
                          fallback={<Unauthorized />}
                        >
                          <ShowRoleClaim />
                        </CanAccess>
                      }
                    />
                  </Route>
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      type="login"
                      title={<ThemedTitleV2 collapsed={true} text="Refine" />}
                      forgotPasswordLink={false}
                      registerLink={false}
                      formProps={{
                        initialValues: {
                          email: "basicuser@gmail.com",
                          password: "123Pa$$word!",
                        },
                      }}
                    />
                  }
                />
              </Route>
              <Route
                path="/change-password"
                element={
                  <AuthPage
                    type="updatePassword"
                    title={
                      <ThemedTitleV2
                        collapsed={false}
                        icon={
                          <SmileOutlined
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          />
                        }
                        text="Change password"
                      />
                    }
                  />
                }
              />
              <Route
                element={
                  <Authenticated key="catch-all">
                    <ThemedLayoutV2
                      Header={Header}
                      Title={({ collapsed }: any) => (
                        <ThemedTitleV2 collapsed={collapsed} text="Refine" />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
