import { ErrorComponent } from "@refinedev/antd";
import { Refine, WelcomePage } from "@refinedev/core";
import { ConfigProvider, App as AntdApp } from "antd";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <Refine>
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="*" element={<ErrorComponent />} />
            </Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
