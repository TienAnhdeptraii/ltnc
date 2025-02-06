/* eslint-disable react/jsx-pascal-case */
import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Logo from "./bku.png";
import AppBackground from "./backgroud.png";

const Body = styled.div`
  background-image: url("../backgroud.png");
  width:100%;
  position: relative;
  overflow: hidden;
  height: 100vh;

`;
const Container = styled.div`
  width: 100%;
  display: flex;
`;
const _Input = styled.input`
  border: 0;
  border-bottom: 2px solid #09599b;
  outline: 0;
  background: transparent;
  width: 60%;
`;
const _Button = styled.button`
  width: 260px;
  margin-left: 70px;
  height: 40px;
  background-color: #09599b;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  font-size: 1.8rem;
  transition: all 0.3s ease;
  opacity: 0.9;
  &:hover {
    opacity: 1;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.2),
      0 1px 2px 0 rgba(0, 0, 0, 0.19);
  }
`;

const Icon = styled.i`
  padding: 0px 5px 2px 0px;
  border-bottom: 2px solid white;
  margin-left: 18%;
  color: #09599b;
`;
const Title = styled.p`
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 600;
  font-size: 3rem;
  color: #09599b;
  padding: 20px 0px 20px 0px;
`;
const Title1 = styled.p`
  width: 150px;
  margin: auto;
  text-align: center;
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  font-size: 1.5rem;
  padding-top: 15px;
  padding-bottom: 15px;
  opacity: 0.8;
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;
const Form = styled.form`
  width: 400px;
  height: 500px;
  margin-right:-100px;
  margin-top: 140px;
  background-color: white;
  border-radius: 70px;
`;
const Input_container = styled.div`
  padding: 0 0 10px 0;
`;
const BKU_logo = styled.img`
  width: 100px;
  height: 100px;
  margin-left: 150px;
  margin-top: 20px;
`;
const App_logo = styled.img`
  width: 600px;
  height: 250px;
`;
const App_background = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -10;
`;
const App_logo_container = styled.div`
  margin: 160px 0 0 150px;
`;
const Form_container = styled.div`
  position: absolute;
  right: 15%;
`;
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLogin: false,
    };
    this.handle = this.handle.bind(this);
    this.submit = this.submit.bind(this);
  }

  handle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  submit = async (event) => {
    event.preventDefault();
    try{
      const response = await axios.post("http://localhost:5000/login", {
        email: this.state.email,
        password: this.state.password,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      sessionStorage.setItem("role", response.data.role);
      sessionStorage.setItem("userId", response.data.userId);
      sessionStorage.setItem("email", response.data.email);
      sessionStorage.setItem("mssv", response.data.mssv);
      sessionStorage.setItem("lop", response.data.lop);
      sessionStorage.setItem("khoa", response.data.khoa);
      
      this.setState({ isLogin: !!localStorage.getItem("accessToken") });
      alert("đăng nhập thành công")
      }
      catch(error) {
        console.log(error);
        alert("sai tài khoản hoặc mật khẩu")
      };
  };

  render() {
    if (this.state.isLogin === true) {
      return <Redirect to='/home' />;
    } else {
      return (
        <Body>
          <App_background src={AppBackground}/>
          <Container>
            <App_logo_container>
            </App_logo_container>
            <Form_container>
              <Form action='' method='post' onSubmit={this.submit}>
                <BKU_logo src={Logo} />
                <Title>ĐĂNG NHẬP</Title>
                <Input_container>
                  <Icon>
                    <FaUser />
                  </Icon>
                  <_Input
                    type='email'
                    required
                    name='email'
                    placeholder='Email đăng nhập'
                    value={this.state.email}
                    onChange={this.handle}
                    autoFocus
                  />
                </Input_container>
                <br />
                <Input_container>
                  <Icon>
                    <RiLockPasswordFill />
                  </Icon>
                  <_Input
                    type='password'
                    name='password'
                    placeholder='Mật khẩu'
                    value={this.state.password}
                    onChange={this.handle}></_Input>
                </Input_container>
                <br />
                <_Button onClick={this.submit}>Đăng nhập</_Button>
                <br />
              </Form>
            </Form_container>
          </Container>
        </Body>
      );
    }
  }
}

export default Login;
