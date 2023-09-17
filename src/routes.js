import { createBrowserRouter } from "react-router-dom";
import MainHome from "./MainHome";
import {Layout} from "./Layout";
import Home from "./componenets/Home";
import Users from "./componenets/Users";
import Profile from "./componenets/Profile";



export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";

export const PROTECTED = "/protected";
export const DASHBOARD = "/protected/dashboard";
export const USERS = "/protected/users";
export const PROFILE = "/protected/profile/:id";
export const COMMENTS = "/protected/comments/:id";

export const router = createBrowserRouter([
  { path: ROOT, element: <Layout /> },
  { path: LOGIN, element: <MainHome/>},
//   { path: REGISTER, element: <MessagingInterface /> },
  {
    path: PROTECTED,
    element: <Layout />,
    children: [
      {
        path: DASHBOARD,
        element: <Home/>,
      },
      {
        path: USERS,
        element: <Users/>,
      },
      {
        path: PROFILE,
        element: <Profile/>,
      },
    //   {
    //     path: COMMENTS,
    //     element: <Comments />,
    //   },
    ],
  },
]);
