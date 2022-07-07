import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot, useRecoilValue } from "recoil";
import App from "./App";


ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
        <App />
    </RecoilRoot>
    </React.StrictMode>,
  document.getElementById("root")
);