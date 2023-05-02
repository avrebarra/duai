import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazily } from "react-lazily";

import { extendTheme } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

import * as appconfig from "./AppConfig";
// import { Footer } from "./components/BlockFooter";

const { FCScreenHome: ScreenHome, FCScreenFAQ: ScreenFAQ } = lazily(() => import("./AppComponent"));

export function App() {
  // context, vars, and states
  const [readiness, setReadiness] = React.useState<boolean>(false);

  // helper funcs
  const funcLoadData = async () => {};
  const funcRenderLoader = () => <p>Loading...</p>;

  // effects
  React.useEffect(() => {
    funcLoadData();
  }, [readiness]);

  return (
    <ChakraProvider theme={appconfig.ChakraTheme}>
      <div className="appwrapper flex justify-center items-center h-screen w-screen ">
        <div className="app w-full max-w-lg h-full xs:max-h-144">
          <div className="content p-10 py-16">
            <BrowserRouter basename={process.env.APP_BASE_PATH}>
              <React.Suspense fallback={funcRenderLoader()}>
                <Routes>
                  <Route path="/" element={<ScreenHome />} />
                  <Route path="/faqs" element={<ScreenFAQ />} />
                </Routes>
              </React.Suspense>
            </BrowserRouter>
            <br />
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}
