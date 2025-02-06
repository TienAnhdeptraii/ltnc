import React, { Component } from "react";
import "./NavBar.css";
import "boxicons";
import { AiOutlineHome } from "react-icons/ai";
import { BsClipboardData } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import routes from "../router";
import { Redirect } from "react-router";
import CallApi from "../API/CallApi";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      chooseHome: true,
      chooseNoti: false,
      chooseChat: false,
      chooseListStudent: false,
      chooseListTeacher: false,
      chooseListAdmin: false,
      chooseChart: false,
      chooseProfile: false,
      chooseProfileAdmin: false,
      chooseProfileTeacher: false,
      chooseManageCourses: false,
    };
  }

  componentDidMount() {
    this.setState({
      role: sessionStorage.getItem("role"),
    });
  }

  open = () => {
    this.setState({
      openNav: !this.state.openNav,
    });
  };

  chooseHome = () => {
    this.setState({
      chooseHome: true,
      chooseNoti: false,
      chooseChat: false,
      chooseListStudent: false,
      chooseListTeacher: false,
      chooseListAdmin: false,
      chooseChart: false,
      chooseProfile: false,
      chooseProfileAdmin: false,
      chooseProfileTeacher: false,
      chooseManageCourses: false,
    });
  };

  chooseNoti = () => {
    this.setState({
      chooseHome: false,
      chooseNoti: true,
      chooseChat: false,
      chooseListStudent: false,
      chooseListTeacher: false,
      chooseListAdmin: false,
      chooseChart: false,
      chooseProfile: false,
      chooseProfileAdmin: false,
      chooseProfileTeacher: false,
      chooseManageCourses: false,
    });
  };

  chooseChat = () => {
    this.setState({
      chooseHome: false,
      chooseNoti: false,
      chooseChat: true,
      chooseListStudent: false,
      chooseListTeacher: false,
      chooseListAdmin: false,
      chooseChart: false,
      chooseProfile: false,
      chooseProfileAdmin: false,
      chooseProfileTeacher: false,
      chooseManageCourses: false,
    });
  };
  chooseManageCourses = () => {
    this.setState({
      chooseHome: false,
      chooseNoti: false,
      chooseChat: false,
      chooseListStudent: false,
      chooseListTeacher: false,
      chooseListAdmin: false,
      chooseChart: false,
      chooseProfile: false,
      chooseProfileAdmin: false,
      chooseProfileTeacher: false,
      chooseManageCourses: true,
    });
  };
  chooseListStudent = () => {
    this.setState({
      chooseHome: false,
      chooseNoti: false,
      chooseChat: false,
      chooseListStudent: true,
      chooseListTeacher: false,
      chooseListAdmin: false,
      chooseChart: false,
      chooseProfile: false,
      chooseProfileAdmin: false,
      chooseProfileTeacher: false,
      chooseManageCourses: false,
    });
  };
  chooseListTeacher = () => {
    this.setState({
      chooseHome: false,
      chooseNoti: false,
      chooseChat: false,
      chooseListStudent: false,
      chooseListTeacher: true,
      chooseListAdmin: false,
      chooseChart: false,
      chooseProfile: false,
      chooseProfileAdmin: false,
      chooseProfileTeacher: false,
      chooseManageCourses: false,
    });
  };
  chooseListAdmin = () => {
    this.setState({
      chooseHome: false,
      chooseNoti: false,
      chooseChat: false,
      chooseListStudent: false,
      chooseListTeacher: false,
      chooseListAdmin: true,
      chooseChart: false,
      chooseProfile: false,
      chooseProfileAdmin: false,
      chooseProfileTeacher: false,
      chooseManageCourses: false,
    });
  };
  chooseChart = () => {
    this.setState({
      chooseHome: false,
      chooseNoti: false,
      chooseChat: false,
      chooseListStudent: false,
      chooseListTeacher: false,
      chooseListAdmin: false,
      chooseChart: true,
      chooseProfile: false,
      chooseProfileAdmin: false,
      chooseProfileTeacher: false,
      chooseManageCourses: false,
    });
  };

  chooseProfile = () => {
    this.setState({
      chooseHome: false,
      chooseNoti: false,
      chooseChat: false,
      chooseListStudent: false,
      chooseListTeacher: false,
      chooseListAdmin: false,
      chooseChart: false,
      chooseProfile: true,
      chooseProfileAdmin: false,
      chooseProfileTeacher: false,
      chooseManageCourses: false,
    });
  };
  chooseProfileAdmin = () => {
    this.setState({
      chooseHome: false,
      chooseNoti: false,
      chooseChat: false,
      chooseListStudent: false,
      chooseListTeacher: false,
      chooseListAdmin: false,
      chooseChart: false,
      chooseProfile: false,
      chooseProfileAdmin: true,
      chooseProfileTeacher: false,
      chooseManageCourses: false,
    });
  };
   chooseProfileTeacher = () => {
    this.setState({
      chooseHome: false,
      chooseNoti: false,
      chooseChat: false,
      chooseListStudent: false,
      chooseListTeacher: false,
      chooseListAdmin: false,
      chooseChart: false,
      chooseProfile: false,
      chooseProfileAdmin: false,
      chooseProfileTeacher: true,
      chooseManageCourses: false,
    });
  };
  chooseLogout = () => {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("msv");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("lop");
    sessionStorage.removeItem("item");
    CallApi(`logout`,"POST")
  };

 

  render() {
    if (localStorage.getItem("accessToken") == null) {
      return <Redirect to='/login' />;
    }
    var {
      role,
      openNav,
      chooseHome,
      chooseNoti,
      chooseChat,
      chooseListStudent,
      chooseListTeacher,
      chooseListAdmin,
      chooseChart,
      chooseProfile,
      chooseProfileTeacher,
      chooseProfileAdmin,
      chooseManageCourses,
    } = this.state;
    console.log(role);
    if (role === "student") {
      return (
        <Router>
        <section className='body'>
          <div className={openNav ? "sidebar open" : "sidebar"}>
            <div className='logo-details'>
             
              <div className='logo_name'>MENU</div>
              <div id='btn' onClick={this.open}>
                <box-icon name='menu' color='#ffffff'></box-icon>
              </div>
            </div>
            <ul className='nav-list'>
              <li
                className={chooseHome ? "home" : ""}
                onClick={this.chooseHome}>
                <Link to='/home'>
                  <ul>
                    <div className='icon'>
                      <AiOutlineHome />
                    </div>
                    <span className='links_name'>Trang chủ</span>
                  </ul>
                </Link>
                <span className='tooltip'>Trang chủ</span>
              </li>

              <li
                className={chooseNoti ? "home" : ""}
                onClick={this.chooseNoti}>
                <Link to='/home/notification'>
                 
                  <ul>
                  <div className='icon'>
                    <IoMdNotificationsOutline />
                  </div>
                  <span className='links_name'>Thông Báo</span>
                  </ul>
                </Link>
                <span className='tooltip'>Thông Báo</span>
              </li>
              <li
                className={chooseManageCourses ? "home" : ""}
                onClick={this.chooseManageCourses}
              >
              <Link to="/home/manage-courses">
                <ul>
                  <div className="icon">
                    <span className="fa fa-book"></span>{" "}
                  </div>
                  <span className="links_name">Quản lí môn học</span>
                </ul>
              </Link>
              <span className="tooltip">Quản lí môn học</span>
            </li>
              <li
                className={chooseChat ? "home" : ""}
                onClick={this.chooseChat}>
                <Link to='/home/chat'>
                  <ul>
                  <div className='icon'>
                    <span className='fa fa-graduation-cap'></span>
                  </div>
                  <span className='links_name'>Bảng điểm</span>
                  </ul>
                </Link>
                <span className='tooltip'>Bảng điểm</span>
              </li>
             
              <li

                className={
                  chooseProfile ? "home" : ""
                  
                }
                onClick={this.chooseProfile}>
                <Link to='/home/profile'>
                  <ul>
                  <div className='icon'>
                    <span className='fa fa-id-card'></span>{" "}
                  </div>
                  <span className='links_name'>Hồ sơ</span>
                  </ul>
                </Link>
                <span className='tooltip'>Hồ sơ</span>
              </li>
              
  
              <li className='logout' onClick={this.chooseLogout}>
                <a href='/'>
                  
                  <ul>
                  <div className='icon'>
                    <BiLogOut />
                  </div>
                  <span className='links_name'>Đăng Xuất</span>
                  </ul>
                </a>
                <span className='tooltip'>Đăng Xuất</span>
              </li>
            </ul>
          </div>
          <div className={openNav ? "nav_open" : "nav_close"}>
            <div>{this.show(routes)}</div>
          </div>
        </section>
      </Router>
      );
    } else if (role === "teacher"){
      return (
        <Router>
        <section className='body'>
          <div className={openNav ? "sidebar open" : "sidebar"}>
            <div className='logo-details'>
             
              <div className='logo_name'>MENU</div>
              <div id='btn' onClick={this.open}>
                <box-icon name='menu' color='#ffffff'></box-icon>
              </div>
            </div>
            <ul className='nav-list'>
              <li
                className={chooseHome ? "home" : ""}
                onClick={this.chooseHome}>
                <Link to='/home'>
                  <ul>
                    <div className='icon'>
                      <AiOutlineHome />
                    </div>
                    <span className='links_name'>Trang chủ</span>
                  </ul>
                </Link>
                <span className='tooltip'>Trang chủ</span>
              </li>

              <li
                className={chooseNoti ? "home" : ""}
                onClick={this.chooseNoti}>
                <Link to='/home/notification'>
                 
                  <ul>
                  <div className='icon'>
                    <IoMdNotificationsOutline />
                  </div>
                  <span className='links_name'>Thông Báo</span>
                  </ul>
                </Link>
                <span className='tooltip'>Thông Báo</span>
              </li>
                <li
                  className={chooseManageCourses ? "home" : ""}
                  onClick={this.chooseManageCourses}
                >
                <Link to="/home/manage-courses">
                  <ul>
                    <div className="icon">
                      <span className="fa fa-book"></span>{" "}
                    </div>
                    <span className="links_name">Quản lí môn học</span>
                  </ul>
                </Link>
                <span className="tooltip">Quản lí môn học</span>
              </li>
              <li
                id='liststu'
                className={
                  chooseListStudent ? "home" : ""
                }
                onClick={this.chooseListStudent}>
                <Link to='/home/list-students'>
                
                  <ul>
                  <div className='icon'>
                    <BsClipboardData />
                  </div>
                  <span className='links_name'>DS Sinh viên</span>
                  </ul>
                </Link>
                <span className='tooltip'>DS Sinh viên</span>
              </li>
              <li
                className={
                  chooseChart ? "home" : ""
                
                }
                onClick={this.chooseChart}>
                <Link to='/home/chart'>
                  <ul>
                  <div className='icon'>
                    <span className='fa fa-chart-bar'></span>
                  </div>
                  <span className='links_name'>Biểu đồ điểm</span>
                  </ul>
                </Link>
                <span className='tooltip'>Biểu đồ điểm</span>
              </li>
              <li
                className={
                  chooseProfileTeacher ? "home" : ""
                }
                onClick={this.chooseProfileTeacher}>
                <Link to='/home/profile_teacher'>
                  <ul>
                  <div className='icon'>
                    <span className='fa fa-id-card'></span>{" "}
                  </div>
                  <span className='links_name'>Hồ sơ</span>
                  </ul>
                </Link>
                <span className='tooltip'>Hồ sơ</span>
             </li>
              <li className='logout' onClick={this.chooseLogout}>
                <a href='/'>
                  
                  <ul>
                  <div className='icon'>
                    <BiLogOut />
                  </div>
                  <span className='links_name'>Đăng Xuất</span>
                  </ul>
                </a>
                <span className='tooltip'>Đăng Xuất</span>
              </li>
            </ul>
          </div>
          <div className={openNav ? "nav_open" : "nav_close"}>
            <div>{this.show(routes)}</div>
          </div>
        </section>
      </Router>
      );
    } else if (role === "admin"){
      return (
        <Router>
        <section className='body'>
          <div className={openNav ? "sidebar open" : "sidebar"}>
            <div className='logo-details'>
             
              <div className='logo_name'>MENU</div>
              <div id='btn' onClick={this.open}>
                <box-icon name='menu' color='#ffffff'></box-icon>
              </div>
            </div>
            <ul className='nav-list'>
              <li
                className={chooseHome ? "home" : ""}
                onClick={this.chooseHome}>
                <Link to='/home'>
                  <ul>
                    <div className='icon'>
                      <AiOutlineHome />
                    </div>
                    <span className='links_name'>Trang chủ</span>
                  </ul>
                </Link>
                <span className='tooltip'>Trang chủ</span>
              </li>

              <li
                className={chooseNoti ? "home" : ""}
                onClick={this.chooseNoti}>
                <Link to='/home/notification'>
                 
                  <ul>
                  <div className='icon'>
                    <IoMdNotificationsOutline />
                  </div>
                  <span className='links_name'>Thông Báo</span>
                  </ul>
                </Link>
                <span className='tooltip'>Thông Báo</span>
              </li>
                <li
                  className={chooseManageCourses ? "home" : ""}
                  onClick={this.chooseManageCourses}
                >
                <Link to="/home/manage-courses">
                  <ul>
                    <div className="icon">
                      <span className="fa fa-book"></span>{" "}
                    </div>
                    <span className="links_name">Quản lí môn học</span>
                  </ul>
                </Link>
                <span className="tooltip">Quản lí môn học</span>
              </li>
              <li
                id='liststu'
                className={
                  chooseListStudent ? "home" : ""
                }
                onClick={this.chooseListStudent}>
                <Link to='/home/list-students'>
                
                  <ul>
                  <div className='icon'>
                    <BsClipboardData />
                  </div>
                  <span className='links_name'>DS Sinh viên</span>
                  </ul>
                </Link>
                <span className='tooltip'>DS Sinh viên</span>
              </li>
              <li
                className={
                  chooseListTeacher ? "home" : ""
                }
                onClick={this.chooseListTeacher}>
                <Link to='/home/list-teachers'>
                
                  <ul>
                  <div className='icon'>
                    <BsClipboardData />
                  </div>
                  <span className='links_name'>DS Giảng viên</span>
                  </ul>
                </Link>
                <span className='tooltip'>DS Giảng viên</span>
              </li>

              <li
                id='listsad'
                className={
                  chooseListAdmin ? "home" : ""
                }
                onClick={this.chooseListAdmin}>
                <Link to='/home/list-admins'>
                
                  <ul>
                  <div className='icon'>
                    <BsClipboardData />
                  </div>
                  <span className='links_name'>DS Quản vị viên</span>
                  </ul>
                </Link>
                <span className='tooltip'>DS Quản trị viên</span>
              </li>
             
              <li
                className={
                  chooseChart ? "home" : ""
                
                }
                onClick={this.chooseChart}>
                <Link to='/home/chart'>
                  <ul>
                  <div className='icon'>
                    <span className='fa fa-chart-bar'></span>
                  </div>
                  <span className='links_name'>Biểu đồ điểm</span>
                  </ul>
                </Link>
                <span className='tooltip'>Biểu đồ điểm</span>
              </li>
              <li
                className={
                  chooseProfileAdmin ? "home" : ""
                }
                onClick={this.chooseProfileAdmin}>
                <Link to='/home/profile_admin'>
                  <ul>
                  <div className='icon'>
                    <span className='fa fa-id-card'></span>{" "}
                  </div>
                  <span className='links_name'>Hồ sơ</span>
                  </ul>
                </Link>
                <span className='tooltip'>Hồ sơ</span>
              </li>
             
              <li className='logout' onClick={this.chooseLogout}>
                <a href='/'>
                  
                  <ul>
                  <div className='icon'>
                    <BiLogOut />
                  </div>
                  <span className='links_name'>Đăng Xuất</span>
                  </ul>
                </a>
                <span className='tooltip'>Đăng Xuất</span>
              </li>
            </ul>
          </div>
          <div className={openNav ? "nav_open" : "nav_close"}>
            <div>{this.show(routes)}</div>
          </div>
        </section>
      </Router>
      );
    } else {
      return (
        <div>BTL LTNC !</div>
      );
    }
  }
  show = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  };
}

export default NavBar;
