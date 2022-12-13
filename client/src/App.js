import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Forgot from "./components/ForgotPassword/Forgot";
import PasswordReset from "./components/ForgotPassword/PasswordReset";
import MainTable from "./components/Leaderboard/MainTable";
import UserData from "./components/MyAccount/UserData";
import MyPerformance from "./components/MyPerformance/MyPerformance";
import EmailVerified from "./Pages/EmailVerified";

import ErrorPage from "./Pages/ErrorPage";
import Home from "./Pages/Home";
import Leaderboard from "./Pages/Leaderboard";
import Login from "./Pages/Login";
import MyAccount from "./Pages/MyAccount";
import ProtectedRoute from "./Pages/ProtectedRoute";
import RootLayout from "./Pages/RootLayout";
import Train from "./Pages/Train";
import TrainStart from "./Pages/TrainStart";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route element={<Leaderboard />}>
        <Route
          path="object-one-ranking"
          element={<MainTable title="Object One" />}
        />
        <Route
          path="object-two-ranking"
          element={<MainTable title="Object Two" />}
        />
        <Route path="action-ranking" element={<MainTable title="Action" />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="/:userIdAndToken" element={<EmailVerified />} />
      <Route path="forgot-password" element={<Forgot />} />
      <Route path="/:resetToken" element={<PasswordReset />} />
      <Route
        element={
          <ProtectedRoute>
            <MyAccount />
          </ProtectedRoute>
        }
      >
        <Route
          path="my-account"
          element={
            <ProtectedRoute>
              <UserData />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-performance"
          element={
            <ProtectedRoute>
              <MyPerformance />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Train Routes */}
      <Route
        path="train"
        element={
          <ProtectedRoute>
            <Train />
          </ProtectedRoute>
        }
      />

      <Route
        path="train-object-one"
        element={
          <ProtectedRoute>
            <TrainStart title="Object One" />
          </ProtectedRoute>
        }
      />
      <Route
        path="train-object-two"
        element={
          <ProtectedRoute>
            <TrainStart title="Object Two" />
          </ProtectedRoute>
        }
      />
      <Route
        path="train-action"
        element={
          <ProtectedRoute>
            <TrainStart title="Action" />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
