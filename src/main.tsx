/**
 * @Author:XYH
 * @Date:2025-11-27
 * @Description: 应用入口文件，挂载 React 根组件
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
