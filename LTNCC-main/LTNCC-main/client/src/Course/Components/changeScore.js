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
  color: #1f692f;
`;

const Site = styled.div`
  display: flex;
  margin-top: 10%;
`;

const Infor_site = styled.div`
  background-color: white;
  padding: 2rem 3rem;
  width: 60%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  background-color: whitesmoke;
`;

const Infor = styled.div`
  display: flex;
`;

const Left_div = styled.div`
  padding-right: 10px;
  padding-left: 10px;
  max-width: 35%;
`;

const Right_div = styled.div`
  padding-right: 10px;
  padding-left: 10px;
  max-width: 35%;
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
  text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3),
    0px -4px 10px rgba(255, 255, 255, 0.3);
`;

const Title_gpa = styled.p`
  font-size: 2.5rem;
  padding-bottom: 20px;
  font-weight: bold;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const Gpa_site = styled.div`
  background-color: whitesmoke;
  border-radius: 10px;
  width: 30%;
  padding: 2rem 3rem;
  margin-left: 5%;
  height: 50vh;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
`;

const Btn_site = styled.div`
  position: static;
  margin-top: 5vh;
  text-align: center;
`;

const ScoreInput = styled.input`
  width: 60px;
`;

const Container = styled.div``;

class InfoScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      lab: "",
      btl: "",
      gk: "",
      ck: "",
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { mamonhoc, lop, mssv } = match.params;
    if (match) {
      CallApi(`student/class/${mamonhoc}/${lop}`, "GET", null)
        .then((res) => {
          const studentScores = res.data.class.SINHVIEN[mssv];
          this.setState({
            lab: studentScores.LAB,
            btl: studentScores.BTL,
            gk: studentScores.GK,
            ck: studentScores.CK,
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      
      CallApi(`student/mssv/${mssv}`, "GET", null)
        .then((res) => {
          this.setState({ student: res.data.studentData });
        })
        .catch((error) => {
          console.error("Error fetching student data:", error);
        });
    }
  }

  onChange = (event, type) => {
    const { value } = event.target;
    this.setState({ [type]: value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { match } = this.props;
    const { mamonhoc, lop, mssv } = match.params;
    CallApi(`teacher/update_score/${mamonhoc}/${lop}/${mssv}`, "PATCH", {
      LAB: this.state.lab,
      BTL: this.state.btl,
      GK: this.state.gk,
      CK: this.state.ck,
    }).then((res) => {
      alert("Cập nhật thành công");
    });
  };

  render() {
    const { lab, btl, gk, ck, student } = this.state;
    return (
      <Container className='container'>
        <Title>Thông tin điểm số</Title>
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
                  alt='Avatar'
                />
              </Image_div>
              <Left_div>
                <p>Mã số sinh viên: </p>
                <label>{student.mssv}</label>
                <p style={{ marginTop: "10px" }}>Họ và tên: </p>
                <input
                  type='text'
                  name='name'
                  placeholder={student.name}
                  onChange={this.onChange}
                  style={{ width: "150px" }}
                />
                <p style={{ marginTop: "10px" }}>Ngày sinh:</p>
                <input
                  type='text'
                  name='birthday'
                  placeholder={moment(student.birthday).format("DD/MM/YYYY")}
                  onChange={this.onChange}
                  style={{ width: "150px" }}
                />
                <p style={{ marginTop: "10px" }}>Giới tính:</p>
                <input
                  type='text'
                  name='gender'
                  placeholder={student.gender}
                  onChange={this.onChange}
                  style={{ width: "150px" }}
                />
              </Left_div>
              <Right_div>
                <p>Lớp:</p>
                <label>{student.lop}</label>
                <p style={{ marginTop: "10px" }}>SĐT: </p>
                <input
                  type='text'
                  name='phone'
                  placeholder={student.phone}
                  onChange={this.onChange}
                  style={{ width: "175px" }}
                />
                <p>Email: </p>
                <input
                  style={{ width: "90%" }}
                  type='text'
                  name='email'
                  placeholder={student.email}
                  onChange={this.onChange}
                />
                <p style={{ marginTop: "10px" }}>Địa chỉ: </p>
                <textarea
                  style={{
                    resize: "none",
                    width: "175px",
                    minHeight: "9rem",
                  }}
                  type='text'
                  name='address'
                  placeholder={student.address}
                  onChange={this.onChange}
                />
              </Right_div>
            </Infor>
          </Infor_site>
          <Gpa_site>
            <Title_gpa>Điểm số</Title_gpa>
            <p>Lab:</p>
            <ScoreInput
              type="number"
              value={lab}
              onChange={(e) => this.onChange(e, "lab")}
            />
            <p>Bài tập lớn:</p>
            <ScoreInput
              type="number"
              value={btl}
              onChange={(e) => this.onChange(e, "btl")}
            />
            <p>Giữa kì:</p>
            <ScoreInput
              type="number"
              value={gk}
              onChange={(e) => this.onChange(e, "gk")}
            />
            <p>Cuối kì:</p>
            <ScoreInput
              type="number"
              value={ck}
              onChange={(e) => this.onChange(e, "ck")}
            />
          </Gpa_site>
        </Site>
        <Btn_site>
          <button onClick={this.onSubmit}>Lưu điểm</button>
        </Btn_site>
      </Container>
    );
  }
}

export default InfoScore;
