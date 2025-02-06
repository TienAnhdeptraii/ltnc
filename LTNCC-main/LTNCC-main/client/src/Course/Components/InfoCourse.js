import React, { Component } from "react";
import { Link } from "react-router-dom";
import CallApi from "../../API/CallApi";
import styled from "styled-components";
import "../../index.css";

const Title = styled.h2`
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3);
  font-size: 3rem;
  font-weight: bolder;
  margin-top: 2rem;
  color: #1f692f;
`;

const InfoContainer = styled.div`
  background-color: whitesmoke;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19);
  margin: 2rem auto;
  width: 80%;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 1rem;

  h3 {
    margin: 0;
    margin-left: 1rem;
    font-size: 1.5rem;
  }
`;

const SectionContent = styled.div`
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const ToggleIcon = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BtnContainer = styled.div`
  text-align: center;
  margin-top: 3rem;
`;

class InfoCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedIndex: null,
      scores: {},
      studentMSSVs: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const mamonhoc = match.params.mamonhoc;
    const lop = sessionStorage.getItem("selectedLop");
    const mssv = sessionStorage.getItem("mssv");

    if (match) {
      CallApi(`student/class/${mamonhoc}/${lop}`, "GET", null).then((res) => {
        const studentScores = res.data.class.SINHVIEN[mssv];
        const studentMSSVs = Object.keys(res.data.class.SINHVIEN);
        this.setState({
          scores: studentScores,
          studentMSSVs: studentMSSVs,
        });
      });
    }
  }

  toggleExpand = (index) => {
    this.setState((prevState) => ({
      expandedIndex: prevState.expandedIndex === index ? null : index,
    }));
  };

  render() {
    const { match } = this.props;
    const mamonhoc = match.params.mamonhoc;
    const lop = sessionStorage.getItem("selectedLop");
    const { expandedIndex, scores } = this.state;
    const role = sessionStorage.getItem("role");

    return (
      <div className="container">
        <Title>Thông tin chi tiết môn học</Title>
        <InfoContainer>
          <Section>
            <Title>
              <p>Lớp: {lop}</p>
            </Title>
          </Section>
          <hr />
          <Section>
            <Link to={`/home/class/student/${mamonhoc}/${lop}`}>
              <h3>Danh sách sinh viên</h3>
            </Link>
          </Section>
          <hr />
          {role === "student" && (
            <Section>
              <SectionHeader onClick={() => this.toggleExpand(0)}>
                <ToggleIcon>{expandedIndex === 0 ? "-" : ">"}</ToggleIcon>
                <h3>Điểm số</h3>
              </SectionHeader>
              {expandedIndex === 0 && (
                <SectionContent>
                  {!scores || Object.keys(scores).length === 0 ? (
                    <p>Không có điểm số.</p>
                  ) : (
                    Object.entries(scores).map(([subject, score]) => (
                      <p key={subject}>{subject}: {score}</p>
                    ))
                  )}
                </SectionContent>
              )}
            </Section>
          )}
          <hr />
          <Section>
            <SectionHeader onClick={() => this.toggleExpand(1)}>
              <ToggleIcon>{expandedIndex === 1 ? "-" : ">"}</ToggleIcon>
              <h3>Thông báo</h3>
            </SectionHeader>
            {expandedIndex === 1 && (
              <SectionContent>
                {/* Nội dung thông báo */}
              </SectionContent>
            )}
          </Section>
          <hr />
          <Section>
            <SectionHeader onClick={() => this.toggleExpand(2)}>
              <ToggleIcon>{expandedIndex === 2 ? "-" : ">"}</ToggleIcon>
              <h3>Bài giảng</h3>
            </SectionHeader>
            {expandedIndex === 2 && (
              <SectionContent>
                {/* Nội dung bài giảng */}
              </SectionContent>
            )}
          </Section>
          <hr />
          <Section>
            <SectionHeader onClick={() => this.toggleExpand(3)}>
              <ToggleIcon>{expandedIndex === 3 ? "-" : ">"}</ToggleIcon>
              <h3>Tham khảo</h3>
            </SectionHeader>
            {expandedIndex === 3 && (
              <SectionContent>
                {/* Nội dung tham khảo */}
              </SectionContent>
            )}
          </Section>
        </InfoContainer>
        <BtnContainer>
          <Link to='/home/manage-courses' className='goback btn btn-danger' style={{ marginRight: "20px" }}>
            <span className='fa fa-arrow-left'></span> &nbsp; Quay lại
          </Link>
        </BtnContainer>
      </div>
    );
  }
}

export default InfoCourse;
