import React from "react";
import Home from "./HomePage/Component/Home";
import Notification from "./HomePage/Component/Notification";
import { Chat } from "./Chat/Chat";
import ListStudent from "./ListStudent/ListStudent";
import ListTeacher from "./ListTeacher/ListTeacher";
import Chart from "./Chart/Chart";
import AddForm from "./ListStudent/Components/AddForm";
import AddForm2 from "./ListTeacher/Components/AddForm";
import InfoStudent from "./ListStudent/Components/InfoStudent";
import InfoTeacher from "./ListTeacher/Components/InfoTeacher";
import Profile from "./Profile/Profile";
import ChangePassword from "./Profile/ChangePassword";
import ProfileAdmin from "./Profile/ProfileAdmin";
import ProfileTeacher from "./Profile/ProfileTeacher";
import InfoAdmin from "./ListAdmin/Components/InfoAdmin";
import AddForm3 from "./ListAdmin/Components/AddForm";
import ListAdmin from "./ListAdmin/ListAdmin";
import Course from "./Course/course";
import InfoClassStudent from "./Course/Components/listClass";
import InfoCourse from "./Course/Components/InfoCourse";
import InfoScore from "./Course/Components/changeScore";
import AddForm4 from "./Course/Components/AddForm";
import AddForm5 from "./Course/Components/AddFormTC";
import AddForm6 from "./Course/Components/AddFormST";
const routes = [
  {
    path: "/home/notification",
    exact: true,
    main: () => <Notification />,
  },
  {
    path: "/home/chat",
    exact: true,
    main: () => <Chat />,
  },
  {
    path: "/home/list-students",
    exact: true,
    main: () => <ListStudent />,
  },
  {
    path: "/home/list-teachers",
    exact: true,
    main: () => <ListTeacher />,
  },
  {
    path: "/home/list-admins",
    exact: true,
    main: () => <ListAdmin />,
  },
  {
    path: "/home/chart",
    exact: true,
    main: () => <Chart />,
  },
  {
    path: "/home/list-students/add",
    exact: true,
    main: () => <AddForm />,
  },
  {
    path: "/home/list-teachers/add",
    exact: true,
    main: () => <AddForm2 />,
  },
  {
    path: "/home/list-admins/add",
    exact: true,
    main: () => <AddForm3 />,
  },
  {
    path:"/home/courses-addcourse/add",
    exact: true,
    main: () => <AddForm4/>,
  },
  {
    path: "/home/courses-addteacher/add/:mamonhoc",
    exact: true,
    main: ({match}) =><AddForm5 match = {match}/>
  },
  {
    path: "/home/courses-addstudent/add/:mamonhoc",
    exact: true,
    main: ({match}) =><AddForm6 match = {match}/>
  },
  {
    path: "/home/list-students/update/:mssv",
    exact: true,
    main: ({ match }) => <InfoStudent match={match} />,
  },
  {
    path: "/home/list-teachers/update/:id",
    exact: true,
    main: ({ match }) => <InfoTeacher match={match} />,
  },
  {
    path: "/home/list-admins/update/:id",
    exact: true,
    main: ({ match }) => <InfoAdmin match={match} />,
  },
  {
    path: "/home/profile",
    exact: true,
    main: ({ match }) => <Profile match={match} />,
  },
  {
    path: "/home/profile_admin",
    exact: true,
    main: ({ match }) => <ProfileAdmin match={match} />,
  },
  {
    path: "/home/profile_teacher",
    exact: true,
    main: ({ match }) => <ProfileTeacher match={match} />,
  },
  {
    path: "/home/manage-courses",
    exact: true,
    main: () => <Course/>,
  },
  {
    path: "/home/monhoc/:mamonhoc",
    exact: true,
    main: ({ match, lop }) => <InfoCourse match={match} lop={lop} />,
  },
  {
    path: "/home/class/student/:mamonhoc/:lop",
    exact: true,
    main: ({match}) => <InfoClassStudent match = {match}/>,
  },
  {
    path:"/home/course/detail/:mamonhoc/:lop/:mssv",
    exact: true,
    main: ({match}) => <InfoScore match = {match}/>

  },
  {
    path: "/home",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/home/change-password",
    exact: true,
    main: () => <ChangePassword />,
  }
];

export default routes;
