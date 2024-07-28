import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SigninPage from "./pages/LoginPage/SigninPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
// import Dashboard from "./components/MentorComponent/Dashboard";
import Schedule from "./components/MentorComponent/Schedule";
import TaskPerformance from "./components/MentorComponent/TaskPerformance";
import Chat from "./components/MentorComponent/Chat";
import CustomMenu from "./components/CustomMenu/CustomMenu";
import "./App.css";
import HRCampaignsDetails from "./components/HR/CampaignsComponent/HRCampaignsDetails";
import GuestPage from "./pages/GuessPage/GuessPage";
import GuestInfo from "./pages/GuestInfo/GuestInfo";
import HRCampaings from "./components/HR/CampaignsComponent/HRCampaings";
import Jobs from "./components/HR/CampaignsComponent/Jobs";
import CreateCampainsHrComponent from "./components/HR/CampaignsComponent/CreateCampainsHrComponent";
import CreateNewJobs from "./components/HR/CampaignsComponent/CreateNewJobs";
import CvListComponent from "./components/HR/CampaignsComponent/CvListComponent";
import HRPage from "./pages/HRPage/HRPage";
import GuessDetailPage from "./pages/GuessDetailPage/GuessDetailPage";
import HRCampaignsDetailss from "./components/HR/CampaignsComponent/HRCampaignsDetailss";
import ViewGuestInfoCv from "./components/HR/CampaignsComponent/ViewGuestInfoCv";

import TaskBoard from "./components/MentorComponent/TaskBoard/Board";
import Create from "./components/ICComponent/ICComponent1/create";
import ViewCampaigns from "./components/ICComponent/ICComponent1/view";
import TrainingProgramDetail from "./components/ICComponent/ICComponent1/TrainingProgramDetail";
import InternPage from "./pages/InternPage/InternPage";
import ClassList from "./components/ICComponent/ICComponent1/class";
import StudentList from "./components/ICComponent/ICComponent1/StudentList";
import TaskDetails from "./components/MentorComponent/TaskDetails";
import StudentAttendanceRecord from "./components/ICComponent/ICComponent1/StudentAttendanceRecord";
import ClassAttendanceRecord from "./components/ICComponent/ICComponent1/ClassAttendanceRecord";
import EditJob from "./components/HR/CampaignsComponent/EditJob ";
import ListTraining from "./components/HR/CampaignsComponent/ListTraining";
import ListJobs from "./components/HR/CampaignsComponent/ListJobs";
import EditCampaign from "./components/HR/CampaignsComponent/EditCampaign";
import ResourceList from "./components/ICComponent/ICComponent1/ResourceList";
import EditTraining from "./components/ICComponent/ICComponent1/EditTraining";
import ResourceListt from "./components/ICComponent/ICComponent1/ResourceListt";
import KPIList from "./components/ICComponent/ICComponent1/KPIList";
import Traininglistt from "./components/ICComponent/ICComponent1/TrainingListt";
import TrainingProgramDetailOJobs from "./components/ICComponent/ICComponent1/TrainingProgramDetailOJobs";
import KPIListt from "./components/ICComponent/ICComponent1/KPIListt";
import MentorList from "./components/ICComponent/ICComponent1/MentorList";
import NewUser from "./components/HR/CampaignsComponent/NewUser";
import ListUser from "./components/HR/CampaignsComponent/ListUser";
import UserDetails from "./components/HR/CampaignsComponent/UserDetails";


import ScheduleDetails from "./components/MentorComponent/scheduleDetail";
import EditIntern from "./components/HR/CampaignsComponent/EditIntern";
import EditUserRole from "./components/HR/CampaignsComponent/EditUserRole";
import UserDetailsRole from "./components/HR/CampaignsComponent/UserDetailsRole";
import NewReport from "./components/MentorComponent/NewReport";
import UserListReport from "./components/MentorComponent/UserListReport";
import StudentListClass from "./components/MentorComponent/StudentListClass";
import InternReport from "./components/InternComponent/InternReport";
import KpiTracking from "./components/InternComponent/KPITracking_temp";
import KPIReportDetails from "./components/ICComponent/ICComponent1/KPIReportDetails";
import UserDetailss from "./components/MentorComponent/UserDetails";
import GuessJobDetailsComponent from "./components/GuessComponent/GuessJobDetailsComponent/GuessJobDetailsComponent";
import JobsTrainingDetails from "./components/ICComponent/ICComponent1/JobsTrainingDetails";
import JobsIC from "./components/ICComponent/ICComponent1/JobsIC";
import UserReportView from "./components/MentorComponent/markReportDetails";
import HRCampaignsDetailsss from "./components/ICComponent/ICComponent1/HRCampaignsDetailsss";
import InternList from "./components/ICComponent/ICComponent1/InternList";
import GuessSignin from "./components/GuessComponent/GuessSignin/GuessSignin";
import GuessSignup from "./components/GuessComponent/GuessSignup/GuessSignup";
import JobApply from "./components/GuessComponent/JobApply/JobApply";
import GuessProfile from "./components/GuessComponent/GuessProfile/GuessProfile";
import MentorViewProgram from "./components/MentorComponent/MentorViewProgram";
import InternViewTraining from "./components/InternComponent/InternViewTraining";
import ProtectedRouteGuest from "./components/ProtectedRoute/ProtectedRouteGuest";
import ListGuest from "./components/HR/CampaignsComponent/ListGuest";
import AllUserProfile from "./components/AllComponent/AllUserProfile";
import MList from "./components/ICComponent/ICComponent1/MList";
import IList from "./components/ICComponent/ICComponent1/IList";
function App() {
  const userRole = localStorage.getItem("role");

  console.log('asd', userRole)
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/sign-in" replace />} />
          <Route path="/sign-in" element={<SigninPage />} />
          <Route path="/login" element={<GuessSignin />} />
          <Route path="/sign-up" element={<GuessSignup />} />

          {/*         
          
          <Route element={<ProtectedRouteGuest />}>
       
          
          
          </Route> */}


          <Route path="/guest" element={<GuestPage />}>
            <Route index element={<Navigate to="info" replace />} />

            <Route path="info" element={<GuestInfo />} />
            <Route path="JobApply" element={<JobApply />} />
            <Route path="Profile" element={<GuessProfile />} />

            <Route path="Detail/:id" element={<GuessDetailPage />} />
            <Route path="JobDetails/:id" element={<GuessJobDetailsComponent />} />


          </Route>
          <Route element={<ProtectedRoute />}>





            {/* Mentor Routes */}
            <Route path="/mentor" element={<CustomMenu userRole="mentor" />}>
              <Route index element={<Navigate to="task" replace />} />
              {/* <Route path="home" element={<Dashboard />} /> */}
              <Route path="task" element={<TaskPerformance />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="chat" element={<Chat />} />
              <Route path="taskboard" element={<TaskBoard />} />
              <Route path="taskDetail/:id" element={<TaskDetails />} />
              {/* <Route path="class" element={<ClassList/>}/> */}
              <Route path="class" element={<StudentListClass />} />
              <Route path="students/:className" element={<StudentList />} />
              <Route path="ClassAttendance/:className" element={<StudentAttendanceRecord />} />
              <Route path="StudentAttendance/:className" element={<ClassAttendanceRecord />} />
              <Route path="NewReport" element={<NewReport />} />
              <Route path="UserListReport" element={<UserListReport />} />
              <Route path="scheduleDetail/:id" element={<ScheduleDetails />} />


              <Route path="ViewTrainingProgram" element={<MentorViewProgram />} />
              <Route path="TrainingPrograms/:id" element={<TrainingProgramDetail />} />
              <Route path="markReport/:id" element={< KPIReportDetails />} />
              <Route path="UserDetailsRole/:id" element={<UserDetailsRole />} />
              <Route path="kpiReport/:id" element={<UserReportView />} />
              <Route path="profile" element={<AllUserProfile />} />



            </Route>

            {/* HR Manager Routes */}
            <Route path="/hrmanager" element={<CustomMenu userRole="hrmanager" />}>
              <Route index element={<Navigate to="schedule" replace />} />
              {/* <Route path="home" element={<HRPage />} /> */}
              <Route path="chat" element={<Chat />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="campaigns" element={<HRCampaings />} />
              <Route path="campaigns/:id" element={<HRCampaignsDetailss />} />
              <Route path="NewCampaigns" element={<CreateCampainsHrComponent />} />
              <Route path="cvlist" element={<ViewGuestInfoCv />} />
              <Route path="NewJobs" element={<CreateNewJobs />} />
              <Route path="Jobs" element={<Jobs />} />
              <Route path="Detail/:id" element={<HRCampaignsDetails />} />
              <Route path="TrainingPrograms/:id" element={<TrainingProgramDetail />} />
              <Route path="EditJob/:id" element={<EditJob />} />
              <Route path="ListTraining/:id" element={<ListTraining />} />
              <Route path="ListJobs/:id" element={<ListJobs />} />
              <Route path="EditCampaign/:id" element={<EditCampaign />} />
              <Route path="scheduleDetail/:id" element={<ScheduleDetails />} />
              <Route path="NewUser" element={<NewUser />} />
              <Route path="UserList" element={<ListUser />} />
              <Route path="UserGuestList" element={<ListGuest />} />
              <Route path="UserDetails/:id" element={<UserDetails />} />
              <Route path="EditUserIntern/:id" element={<EditIntern />} />
              <Route path="EditUserRole/:id" element={<EditUserRole />} />
              <Route path="UserDetailsRole/:id" element={<UserDetailsRole />} />
              <Route path="profile" element={<AllUserProfile />} />






            </Route>

            {/* Internship Coordinator Routes */}
            <Route path="/internshipcoordinators" element={<CustomMenu userRole="internshipcoordinators" />}>
              <Route index element={<Navigate to="schedule" replace />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="NewTrainingProgram" element={<Create />} />
              <Route path="TrainingPrograms/:id" element={<TrainingProgramDetail />} />
              <Route path="TrainingProgramsofjob/:id" element={<TrainingProgramDetailOJobs />} />
              <Route path="ViewTrainingProgram" element={<ViewCampaigns />} />
              <Route path="class" element={<HRCampaings />} />
              <Route path="TrainingJobs" element={<JobsIC />} />
              <Route path="campaigns/:id" element={<HRCampaignsDetailss />} />
              <Route path="students/:className" element={<StudentList />} />
              <Route path="ListTraining/:id" element={<ListTraining />} />
              <Route path="ResourceList/:id" element={<ResourceList />} />
              <Route path="ResourceList" element={<ResourceListt />} />
              <Route path="Details/:id" element={<EditTraining />} />
              <Route path="Detail/:id" element={<HRCampaignsDetailsss />} />
              <Route path="Detailll/:id" element={<JobsTrainingDetails />} />
              <Route path="KPIList" element={<KPIList />} />
              <Route path="TrainingListt/:id" element={<Traininglistt />} />
              <Route path="KPISListt/:id" element={<KPIListt />} />
              <Route path="taskDetail/:id" element={<TaskDetails />} />
              <Route path="scheduleDetail/:id" element={<ScheduleDetails />} />
              <Route path="MentorList" element={<MentorList />} />
              <Route path="MentorsList" element={<MList />} />
              <Route path="InternList" element={<InternList />} />
              <Route path="InternsList" element={<IList />} />
              <Route path="markReport/:id" element={<UserReportView />} />
              <Route path="UserDetailsRole/:id" element={<UserDetailsRole />} />
              <Route path="profile" element={<AllUserProfile />} />


            </Route>
            {/* Internship Routes */}
            <Route path="/intern" element={<CustomMenu userRole="intern" />}>
              <Route index element={<Navigate to="schedule" replace />} />
              {/* <Route path="home" element={<InternPage />} /> */}
              <Route path="schedule" element={<Schedule />} />
              <Route path="taskboard" element={<TaskPerformance />} />
              <Route path="TrainingPrograms/:id" element={<TrainingProgramDetail />} />
              <Route path="Trainingprogram" element={<InternViewTraining />} />
              <Route path="taskDetail/:id" element={<TaskDetails />} />
              <Route path="ListTraining/:id" element={<ListTraining />} />
              <Route path="chat" element={<Chat />} />
              <Route path="scheduleDetail/:id" element={<ScheduleDetails />} />
              <Route path="internReport" element={< InternReport />} />
              <Route path="markReport" element={< InternReport />} />
              <Route path="profile" element={<AllUserProfile />} />
            </Route>




            {/* Guest Routes */}

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;