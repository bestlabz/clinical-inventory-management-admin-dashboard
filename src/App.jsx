import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

// Page routes
import Login from "./pages/Authentication/Login";
import ThemeSuspense from "./Components/theme/ThemeSuspense";

// Lazy load Layout component
const Layout = React.lazy(() => import("./Layout/Layout"));

const App = () => {
  return (
    <div className="w-screen h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Pruvate Route */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="*" element={
              <Suspense fallback={<ThemeSuspense />}>
                <Layout />
              </Suspense>
            } />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
