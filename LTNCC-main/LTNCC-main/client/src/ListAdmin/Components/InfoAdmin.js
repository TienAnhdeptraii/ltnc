
import React, { Component } from "react";
import { Link } from "react-router-dom";
import CallApi from "../../API/CallApi";
import styled from "styled-components";
import moment from "moment";
import "../../index.css";
import bg_link from "./avatar.png";

const Title = styled.h2`
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3);
  font-size: 5rem;
  font-weight: bolder;
  margin-top: 5%;
  color: #0b5592;
`;
const Infor_site = styled.div`
  background-color: white;
  padding: 2rem 3rem;
  width: 80%;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.2),
    8px 8px 8px 8px rgba(0, 0, 0, 0.19);
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
  max-width: 30%;
`;
const Right_div = styled.div`
  padding-right: 10px;
  padding-left: 10px;
  max-width: 30%;
  margin-left: 2rem;
`;
const Last_div = styled.div`
  padding-right: 10px;
  padding-left: 10px;
  max-width: 30%;
  margin-left: 2rem;
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
  // text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3),
  //   0px -4px 10px rgba(255, 255, 255, 0.3);
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

const Container = styled.div``;
class InfoAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: [],
      name: "",
      birthday: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
    };
  }

  componentDidMount() {
    var { match } = this.props;
    if (match) {
      var id = match.params.id;
      console.log(match)
      CallApi(`admin/${id}`, "GET", null).then((res) => {
        var data = res.data.AdminDetail;
        this.setState({
          admin: data,
          name: data.name,
          birthday: data.birthday,
          gender: data.gender,
          phone: data.phone,
          email: data.email,
          address: data.address,
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
    var id = this.props.match.params.id;
    CallApi(`admin/update/${id}`, "PATCH", {
      name: this.state.name,
      birthday: this.state.birthday,
      gender: this.state.gender,
      phone: this.state.phone,
      email: this.state.email,
      address: this.state.address,
    }).then((res) => {
      alert("Cập nhật thành công");
    });
  };

  render() {
    var { admin } = this.state;

    return (
      <Container className='container'>
        <Title>Thông tin chi tiết</Title>
        <Site>
          <Infor_site>
            <Title_infor>Thông tin cá nhân</Title_infor>
            <Infor>
              <Image_div>
                <img
                  className='avatar'
                  src={bg_link}
                  width='150px'
                  height='150px'
                />
              </Image_div>
              <Left_div>
                <p>Mã Admin: </p>
                <label>{admin.ID}</label>
                <p style={{ marginTop: "10px" }}>Họ và tên: </p>
                <input
                  type='text'
                  name='name'
                  placeholder={admin.name}
                  onChange={this.onChange}
                  style={{ width: "150px" }}
                />
                <p style={{ marginTop: "10px" }}>Ngày sinh:</p>
                <input
                  type='text'
                  name='birthday'
                  placeholder={moment(admin.birthday).format("DD/MM/YYYY")}
                  onChange={this.onChange}
                  style={{ width: "150px" }}
                />
                <p style={{ marginTop: "10px" }}>Giới tính:</p>
                <input
                  type='text'
                  name='gender'
                  placeholder={admin.gender}
                  onChange={this.onChange}
                  style={{ width: "150px" }}
                />
              </Left_div>
              <Right_div>
              <p>KHOA:</p>
                <label>{admin.khoa}</label>
                <p style={{ marginTop: "10px" }}>SĐT: </p>
                <input
                  type='text'
                  name='phone'
                  placeholder={admin.phone}
                  onChange={this.onChange}
                  style={{ width: "175px" }}
                />
                 <p style={{ marginTop: "10px" }}>Email: </p>
                <input
                  type='text'
                  name='email'
                  placeholder={admin.email}
                  onChange={this.onChange}
                  style={{ width: "175px" }}
                />
                
              </Right_div>
              <Last_div>
              <p style={{ marginTop: "10px" }}>Địa chỉ: </p>
                <textarea
                  style={{
                    resize: "none",
                    width: "175px",
                    minHeight: "9rem",
                  }}
                  type='text'
                  name='address'
                  placeholder={admin.address}
                  onChange={this.onChange}
                />
              </Last_div>
            </Infor>
          </Infor_site>
        </Site>
        <Btn_site>
          <Link
            to='/home/list-admins'
            className='goback btn btn-danger'
            style={{ marginRight: "20px" }}>
            <span className='fa fa-arrow-left'></span> &nbsp; Quay lại
          </Link>
          <button
            type='submit'
            className='btn btn-primary'
            style={{ marginRight: "20px" }}
            onClick={this.onSubmit}>
            <span className='fa fa-save'></span> &nbsp; Ghi nhận
          </button>
        </Btn_site>
      </Container>
    );
  }
}
export default InfoAdmin;
