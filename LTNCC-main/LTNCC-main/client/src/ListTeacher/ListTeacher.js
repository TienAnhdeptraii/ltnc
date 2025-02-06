
import React, { Component } from "react";
import "./ListTeacher.css";
import ListGV from "./Components/ListGV";
import { Link } from "react-router-dom";
import CallApi from "../API/CallApi";

class ListTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: [],
    };
  }

  componentDidMount() {
    CallApi(`teacher`, "GET", null).then((res) => {
      if (res.data.ListTeachers != null) {
        this.setState({
          teachers: res.data.ListTeachers,
        });
      } else {
        this.setState({
          teachers: [],
        });
      }
      console.log(this.state.teachers);
    });
  }
  
  findIndex = (_id) => {
    var { teachers } = this.state;
    var result = -1;
    teachers.forEach((teacher, index) => {
      if (teacher._id === _id) result = index;
    });
    return result;
  };

  onDelete = (_id, ID) => {
    var { teachers } = this.state;
    console.log(_id)
    CallApi(`delete-teacher-account/${_id}`, "DELETE", null);
    CallApi(`teacher/delete/${_id}`, "DELETE", null).then((res) => {
      if (res.status === 200) {
        var index = this.findIndex(_id);
        if (index !== -1) {
          teachers.splice(index, 1);
          this.setState({
            teachers: teachers,
          });
        }
        window.location.reload();
      }
    });
  };
 
  render() {
    var { teachers } = this.state;
    console.log(teachers);
    return (
      <div className='Container'>
        <div className='text_center'>
          <h1 id='qlsv'>Quản lý giảng viên</h1>
        </div>
          <Link to='/home/list-teachers/add' className='btn btn-primary custom'>
            <span className='fa fa-plus'></span> &nbsp; Thêm giảng viên
          </Link>{" "}
          &nbsp;
          <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
              <ListGV teachers={teachers} onDelete={this.onDelete} />
            </div>
          </div>
        </div>
    );
  }
}

export default ListTeacher;
