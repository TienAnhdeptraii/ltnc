import React, { Component } from "react";
import CallApi from "../API/CallApi";
import { Link } from "react-router-dom";
import "./Course.css";

class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedHocki: "",
            selectedMonhocs: [],
            khoahoc: [],
            courseNames: {},
        };
    }

    componentDidMount() {
        const role = sessionStorage.getItem("role");
        var id = sessionStorage.getItem("userId");
        if (role === "student" || role === "teacher" || role === "admin") {
            CallApi(`${role}/allcourse/${id}`, "GET", null).then((res) => {
                if (res.data.listCourse != null) {
                    this.setState({
                        khoahoc: res.data.listCourse,
                    });
                    res.data.listCourse.forEach(hocki => {
                        hocki.MONHOC.forEach(monhoc => {
                            this.fetchCourseName(monhoc.mamonhoc);
                        });
                    });
                } else {
                    this.setState({
                        khoahoc: [],
                    });
                }
            });
        }
    }

    fetchCourseName = (courseId) => {
        CallApi(`course/name/${courseId}`, "GET", null).then((res) => {
            if (res.data.courseName != null) {
                this.setState((prevState) => ({
                    courseNames: {
                        ...prevState.courseNames,
                        [courseId]: res.data.courseName.NAME
                    }
                }));
            }
        });
    };

    onChange = (selectedHocki) => {
        this.setState({ selectedHocki });
        const selectedMonhocs = this.state.khoahoc.find((item) => item.id === selectedHocki);
        this.setState({ selectedMonhocs });
    };

    onClick = (monhoc) => {
        sessionStorage.setItem("selectedLop", monhoc.lop);
    };

    render() {
        const { selectedHocki, selectedMonhocs, khoahoc, courseNames } = this.state;
        const role = sessionStorage.getItem("role");
        console.log(courseNames);
        return (
            <div className="Container">
                <div className="text_center">
                    <h1 id="qlmh">Quản lí môn học</h1>
                </div>
                <div className="selection-container">
                    <div className="dropdown">
                        <button
                            type="button"
                            className="btn dropdown-toggle"
                            id="dropdownmssv"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="true">
                            {selectedHocki ? `Học kỳ: ${selectedHocki}` : "Chọn học kì"} &nbsp; 
                            <span className="fa fa-caret-square-o-down"></span>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                            {khoahoc.map((hocki) => (
                                <li key={hocki.id} onClick={() => this.onChange(hocki.id)}>
                                    <a className="dropdown-item" href="#">
                                        {hocki.id}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {role === "admin" && (
                        <Link to='/home/courses-addcourse/add' className='btn btn-primary custom'>
                            <span className='fa fa-plus'></span>  Thêm môn học
                        </Link>
                    )}
                </div>
                <div className="monhoc-container">
                    {selectedMonhocs && selectedMonhocs.MONHOC &&
                        selectedMonhocs.MONHOC.map((monhoc) => (
                            <Link
                                key={monhoc.mamonhoc}
                                className="monhoc-item"
                                to={
                                    role === "admin"
                                        ? `/home/class/student/${monhoc.mamonhoc}/${monhoc.lop}`
                                        : `/home/monhoc/${monhoc.mamonhoc}`
                                }
                                onClick={() => this.onClick(monhoc)}
                            >
                                <div className="monhoc-content">
                                    <h3>{courseNames[monhoc.mamonhoc]}</h3>
                                    <p>{monhoc.mamonhoc}</p>
                                    <p>{monhoc.lop}</p>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        );
    }
}

export default Course;
