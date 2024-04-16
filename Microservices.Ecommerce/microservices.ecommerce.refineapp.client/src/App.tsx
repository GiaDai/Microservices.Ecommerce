import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
    DocumentTitleHandler,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductCreate, ProductList } from "./pages";

const App = () => {
    return (
        <BrowserRouter>
            {/* <GitHubBanner /> */}
            <RefineKbarProvider>
                <AntdApp>
                    <DevtoolsProvider>
                        <Refine
                            notificationProvider={useNotificationProvider}
                            routerProvider={routerBindings}
                            dataProvider={dataProvider("https://localhost:5174")}
                            options={{
                                syncWithLocation: true,
                                warnWhenUnsavedChanges: true,
                                useNewQueryKeys: true,
                                projectId: "Hx7Fre-IvNYXu-eeHYTN",
                            }}
                            resources={[
                                {
                                    name: "api/v1/product",
                                    list: "/products",
                                    create: "/products/new",
                                    edit: "/products/:id/edit",
                                    show: "/products/:id",
                                  }
                            ]}
                            >
                            <Routes>
                                <Route index element={<WelcomePage />} />
                                <Route path="/products">
                                    <Route index element={<ProductList />} />
                                    <Route path="new" element={<ProductCreate />} />
                                </Route>
                            </Routes>
                            <RefineKbar />
                            <UnsavedChangesNotifier />
                            <DocumentTitleHandler />
                        </Refine>
                    </DevtoolsProvider>
                </AntdApp>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;