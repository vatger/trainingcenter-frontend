import "./assets/styles/app.scss";
import {SideNav} from "./components/template/SideNav";
import {ContentContainer} from "./components/template/ContentContainer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SideNavMenuProvider} from "./utils/contexts/SideNavMenuContext";
import {MainRouter} from "./pages/Main.router";
import {LoginView} from "./pages/login/Login.view";
import {AuthProvider} from "./utils/contexts/AuthContext";
import {LoginCallbackView} from "./pages/login/LoginCallbackView";
import {AxiosInterceptors} from "./utils/network/AxiosInterceptors";
import {DarkModeProvider} from "./utils/contexts/DarkModeContext";
import {LanguageProvider} from "./utils/contexts/LanguageContext";
import {ToastContainer, ToastContainerProps} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const toastSettings: ToastContainerProps = {
    position: "top-right",
    progressClassName: "rt_progress",
    autoClose: 2500,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "light",
    limit: 6,
};

function App() {
    return (
        <AuthProvider>
            <LanguageProvider>
                <DarkModeProvider>
                    <SideNavMenuProvider>
                        <BrowserRouter>
                            <AxiosInterceptors />
                            <ToastContainer {...toastSettings} />

                            <Routes>
                                <Route path={"/login"} element={<LoginView />} />
                                <Route path={"/login/callback"} element={<LoginCallbackView />} />

                                <Route
                                    path={"*"}
                                    element={
                                        <div
                                            className="App flex flex-auto absolute top-0 left-0 w-full h-full min-w-0 max-h-full"
                                            style={{ backgroundColor: "white" }}>
                                            <SideNav />

                                            <ContentContainer>
                                                <MainRouter />
                                            </ContentContainer>
                                        </div>
                                    }
                                />
                            </Routes>
                        </BrowserRouter>
                    </SideNavMenuProvider>
                </DarkModeProvider>
            </LanguageProvider>
        </AuthProvider>
    );
}

export default App;
