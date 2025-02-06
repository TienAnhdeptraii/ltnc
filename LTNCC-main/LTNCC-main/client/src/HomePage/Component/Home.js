/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import { BsClipboardData } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import home from "./home.png";
import "../NavBar.css";
import AppBackground from "./background_home.jpg";

const Body = styled.div`
  background-image: url("../backgroud.png");
  width:100%;
  position: relative;
  overflow: hidden;
  height: 100vh;
`;
const App_background = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -10;
`;
const App_background_blur = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: -9;
`;
const Title = styled.p`
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bold;
  font-size: 7rem;
  letter-spacing: 20px;
  color: white;
  margin-top: 20%;
  padding: 20px 0px 20px 0px;
`;
export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Body>
        <App_background_blur />
        <App_background src={AppBackground}/>
        <Title>TRƯỜNG ĐẠI HỌC BÁCH KHOA</Title>
      </Body>
    );
  }
}
