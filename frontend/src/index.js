import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomeScreen from "./screens/HomeScreen";
import EnrollmentScreen from "./screens/EnrollmentScreen";
import LoginScreen from "./screens/admin/LoginScreen";
import TrainingPackageList from "./screens/TrainingPackageList";
import AboutUs from "./screens/Abouts";
import TrainingPackageDetails from "./screens/TrainingPackageDetails";
import AdminRoute from "./components/AdminRoute";
import TrainingPackagesEditList from "./screens/admin/TrainingPackagesEditList";
import EditTrainingPackage from "./screens/admin/EditTrainingPackage";
import EditEnrollment from "./screens/admin/EditEnrollment";
import EnrollmentEditList from "./screens/admin/EnrollmentEditList";
import PaymentList from "./screens/admin/PaymentList";
import SystemSetting from "./screens/admin/SystemSetting";
import Dashboard from "./screens/admin/Dashboard";
import EnrollmentStatusScreen from "./screens/EnrollmentStatusScreen";
import MockTestScreen from "./screens/MockTestScreen";
import QuestionsEditList from "./screens/admin/QuestionsEditList";
import EditQuestion from "./screens/admin/EditQuestion";
import ResourceEditList from './screens/admin/ResourceEditList';
import EditResource from './screens/admin/EditResource';
import ResourcesPage from "./screens/ResourcePage";
import NotificationList from "./screens/admin/NotificationList";
import NotificationForm from "./screens/admin/NotificationForm";


const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen></HomeScreen>} />
      <Route
        index={true}
        path="/enroll"
        element={<EnrollmentScreen></EnrollmentScreen>}
      />
           <Route
        index={true}
        path="/enroll/:packageId"
        element={<EnrollmentScreen></EnrollmentScreen>}
      />
      <Route
        index={true}
        path="/enrollstatus"
        element={<EnrollmentStatusScreen></EnrollmentStatusScreen>}
      />

      <Route index={true} path="/login" element={<LoginScreen></LoginScreen>} />
      <Route
        index={true}
        path="/packageList"
        element={<TrainingPackageList></TrainingPackageList>}
      />
      <Route
        index={true}
        path="/packageDetails/:id"
        element={<TrainingPackageDetails></TrainingPackageDetails>}
      />

    <Route index={true} path="/mocktest" element={<MockTestScreen></MockTestScreen>} />

      <Route index={true} path="/aboutus" element={<AboutUs></AboutUs>} />

      <Route index={true} path="/resource" element={<ResourcesPage></ResourcesPage>} />

      {/* Admin users */}
      <Route path="" element={<AdminRoute />}>
      <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/packagelist" element={<TrainingPackagesEditList />} />
        <Route path="/admin/editPackage" element={<EditTrainingPackage />} />
        <Route path="/admin/editPackage/:id" element={<EditTrainingPackage />} />
        <Route path="/admin/enrolllist" element={<EnrollmentEditList />} />
        <Route path="/admin/enroll/:id" element={<EditEnrollment />} />
        <Route path="/admin/paymentlist" element={<PaymentList />} />
        <Route path="/admin/questioneditlist" element={<QuestionsEditList />} />
        <Route path="/admin/questionedit" element={<EditQuestion />} />
        <Route path="/admin/questionedit/:id" element={<EditQuestion />} />
        <Route path="/admin/resourceedit" element={<EditResource />} />
        <Route path="/admin/resourceedit/:id" element={<EditResource />} />
        <Route path="/admin/resourceeditlist" element={<ResourceEditList />} />
        <Route path="/admin/notifications" element={<NotificationList />} />
        <Route path="/admin/notificationCreate" element={<NotificationForm />} />
        <Route path="/admin/notificationCreate/:id" element={<NotificationForm />} />
        <Route path="/admin/systemSetting" element={<SystemSetting  />} />
      </Route>
    </Route>
  ])
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
