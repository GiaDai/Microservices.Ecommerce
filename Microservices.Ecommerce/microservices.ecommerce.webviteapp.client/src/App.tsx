import "@refinedev/antd/dist/reset.css";
import {
  AuthPage,
  ErrorComponent,
  ThemedLayoutV2,
  ThemedTitleV2,
  useNotificationProvider,
} from "@refinedev/antd";
import { Refine, Authenticated, CanAccess } from "@refinedev/core";
import { ConfigProvider, App as AntdApp } from "antd";
import React from "react";
import routerProvider from "@refinedev/react-router-v6";
import { dataProvider, authProvider, accessControlProvider } from "@providers/index";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Header } from "@components/index";
import {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router-v6";
import { CreateProduct, CreateProductRange, EditProduct, ListProduct, ShowProduct } from "./pages";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <Refine
            dataProvider={dataProvider}
            authProvider={authProvider}
            routerProvider={routerProvider}
            accessControlProvider={accessControlProvider}
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
                show: "/products/:id"
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
                      Title={({ collapsed }: any) => (
                        <ThemedTitleV2 collapsed={collapsed} text="Hello" />
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
                  <Route index element={<h1>Dashboard</h1>} />
                </Route>
                <Route path="/products">
                  <Route index element={
                    <CanAccess
                      resource="products"
                      action="list"
                      fallback={<div>Unauthorized!</div>}
                    >
                      <ListProduct />
                    </CanAccess>
                  } />
                  <Route path="create" element={
                    <CanAccess
                      resource="products"
                      action="create"
                      fallback={<div>Unauthorized!</div>}
                    >
                      <CreateProduct />
                    </CanAccess>
                  }
                  />
                  <Route path=":id" element={<ShowProduct />} />
                  <Route path=":id/edit" element={<EditProduct />} />

                  <Route path="create-range" element={
                    <CanAccess
                      resource="products"
                      action="create-range"
                      fallback={<div>Unauthorized!</div>}
                    >
                      <CreateProductRange />
                    </CanAccess>
                  } />

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
