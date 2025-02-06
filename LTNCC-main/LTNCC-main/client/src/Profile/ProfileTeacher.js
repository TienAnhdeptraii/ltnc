/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import CallApi from "../API/CallApi";
import styled from "styled-components";
import moment from "moment";
import "../index.css";
import avatar from "./avatar.png";

const Title = styled.h2`
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3);
  font-size: 5rem;
  font-weight: bolder;
  margin-top: 5%;
  color: #1f692f;
`;
const Infor_site = styled.div`
  background-color: white;
  padding: 2rem 3rem;
  width: 60%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  background-color: whitesmoke;
  margin: auto;
`;
const Infor = styled.div`
  display: flex;
`;
const Left_div = styled.div`
  padding-right: 10px;
  padding-left: 10px;
`;
const Right_div = styled.div`
  padding-right: 10px;
  padding-left: 10px;
`;
const Image_div = styled.div`
  padding-top: 30px;
`;
const Title_infor = styled.p`
  font-size: 2.5rem;
  width: 60%;
  margin: auto;
  padding-bottom: 20px;
  text-align: center;
  font-weight: bold;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3),
    0px -4px 10px rgba(255, 255, 255, 0.3);
`;
const Site = styled.div`
  display: flex;
  margin-top: 10%;
`;
const Btn_site = styled.div`
  position: static;
  margin-top: 5vh;
  text-align: center;
`;

class InfoTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: "",
      name: "",
      birthday: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      lop: "",
      khoa: "",
      department:"",
    };
  }

  componentDidMount() {
    var { match } = this.props;
    if (match) {
      var id = sessionStorage.getItem("userId");
      CallApi(`teacher/${id}`, "GET", null).then((res) => {
        var data = res.data.TeacherDetail;
        this.setState({
          ID: data.ID,
          name: data.name,
          birthday: data.birthday,
          gender: data.gender,
          phone: data.phone,
          email: data.email,
          address: data.address,
          lop: data.management,
          khoa: data.khoa,
          department: data.department,
        });
      });
    }
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    var id = sessionStorage.getItem("userId");
    CallApi(`teacher/update/${id}`, "PATCH", {
      ID: this.state.ID,
      management: this.state.lop,
      khoa: this.state.khoa,
      name: this.state.name,
      birthday: this.state.birthday,
      gender: this.state.gender,
      phone: this.state.phone,
      email: this.state.email,
      address: this.state.address,
      department: this.state.department,
    }).then((res) => {
      alert("Cập nhật thành công");
      window.location.reload();
    });
  };

  render() {
    var {
      ID,
      name,
      birthday,
      gender,
      phone,
      email,
      address,
      lop,
      khoa,
      department,
    } = this.state;
    return (
      <div className='container'>
        <Title>Thông tin cá nhân</Title>
        <Site>
          <Infor_site>
            <Title_infor>Thông tin cá nhân</Title_infor>
            <Infor>
              <Image_div>
                <img
                  className='avatar'
                  src={avatar}
                  width='150px'
                  height='150px'
                />
              </Image_div>
              <Left_div>
                <p>Mã giảng viên: </p>
                <label>{ID}</label>
                <p>Giới tính:</p>
                <label>{gender}</label>
                <p style={{ marginTop: "10px" }}>Họ và tên: </p>
                <input
                  style={{ width: "90%" }}
                  type='text'
                  name='name'
                  placeholder={name}
                  onChange={this.onChange}
                />
                <p style={{ marginTop: "10px" }}>Ngày sinh:</p>
                <input
                  style={{ width: "90%" }}
                  type='text'
                  name='birthday'
                  placeholder={moment(birthday).format("DD/MM/YYYY")}
                  onChange={this.onChange}
                />
              </Left_div>
              <Right_div>
                <p>Lớp: </p>
                <label> {lop} </label>
                <p>SĐT: </p>
                <input
                  style={{ width: "90%" }}
                  type='text'
                  name='phone'
                  placeholder={phone}
                  onChange={this.onChange}
                />
                <p>Email: </p>
                <input
                  style={{ width: "90%" }}
                  type='text'
                  name='email'
                  placeholder={email}
                  onChange={this.onChange}
                />
                <p style={{ marginTop: "10px" }}>Địa chỉ: </p>
                <textarea
                  style={{
                    width: "90%",
                    resize: "none",
                    minHeight: "9rem",
                  }}
                  name='address'
                  placeholder={address}
                  onChange={this.onChange}
                />
              </Right_div>
            </Infor>
          </Infor_site>
        </Site>
        <Btn_site>
          <button
            type='submit'
            className='btn btn-primary custom'
            style={{ marginRight: "20px" }}
            onClick={this.onSubmit}>
            <span className='fa fa-save'></span> &nbsp; Ghi nhận
          </button>
          <Link
            to='/home/change-password'
            className='btn btn-primary custom'
            style={{ marginRight: "20px" }}>
            <span className='fa fa-key'></span> &nbsp; Đổi mật khẩu
          </Link>
        </Btn_site>
      </div>
    );
  }
}
export default InfoTeacher;
