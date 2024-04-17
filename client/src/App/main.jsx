import React from "react";
import ReactDOM from "react-dom/client";
import "./GlobalStyles/index.scss";
import RouterWrapper from "./Routes/RouterWrapper";
import UserInfoContextProvider from "./Context/UserInfoContext/UserInfoContext.jsx";
import { Provider } from "react-redux";
import { setupStore } from "../Shared/api/store/index.js";
import { ConfigProvider } from "antd";
import locale from "antd/locale/ru_RU";

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          colorPrimary: "#515151",
          colorInfo: "#515151",
        },
        components: {
          Select: {
            optionSelectedColor: "#fff",
            fontFamily: "font-family: 'FeatureMono', light",
            fontSize: "20px",
            optionPadding: "10px",
            fontWeightStrong: "false",
          },
        },
      }}
    >
      <UserInfoContextProvider>
        <RouterWrapper />
      </UserInfoContextProvider>
    </ConfigProvider>
  </Provider>
);
