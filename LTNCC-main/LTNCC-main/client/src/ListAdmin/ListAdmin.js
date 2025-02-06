
import React, { Component } from "react";
import "./ListAdmin.css";
import ListAD from "./Components/ListAD";
import { Link } from "react-router-dom";
import CallApi from "../API/CallApi";

class ListAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admins: [],
    };
  }

  componentDidMount() {
    CallApi(`admin`, "GET", null).then((res) => {
      if (res.data.ListAdmins != null) {
        this.setState({
          admins: res.data.ListAdmins,
        });
      } else {
        this.setState({
          admins: [],
        });
      }
      console.log(this.state.admins);
    });
  }
  

  findIndex = (_id) => {
    var { admins } = this.state;
    var result = -1;
    admins.forEach((admin, index) => {
      if (admin._id === _id) result = index;
    });
    return result;
  };

  onDelete = (_id, ID) => {
    var { admins } = this.state;
    CallApi(`delete-admin-account/${_id}`, "DELETE", null);
    CallApi(`admin/delete/${_id}`, "DELETE", null).then((res) => {
      if (res.status === 200) {
        var index = this.findIndex(_id);
        if (index !== -1) {
          admins.splice(index, 1);
          this.setState({
            admins: admins,
          });
        }
        window.location.reload();
      }
    });
  };
 
  render() {
    var { lop, admins } = this.state;
    return (
      <div className='Container'>
        <div className='text_center'>
          <h1 id='qlsv'>Quản lý quản trị viên</h1>
        </div>
        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          &nbsp;
          <Link to='/home/list-admins/add' className='btn btn-primary custom'>
            <span className='fa fa-plus'></span> &nbsp; Thêm Admin
          </Link>{" "}
          &nbsp;
          <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
              <ListAD admins={admins} onDelete={this.onDelete} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListAdmin;
