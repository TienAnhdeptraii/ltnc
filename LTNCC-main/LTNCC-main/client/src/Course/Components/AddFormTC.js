import React, { Component } from "react";
import { Link } from "react-router-dom";
import CallApi from "../../API/CallApi";
import axios from "axios"; // Import axios library
import "../../index.css";
import styled from "styled-components";


const Btn_site = styled.div`
  position: static;
  margin-top: 5vh;
  text-align: center;
`;
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
  padding: 2rem;
  width: 50%;
  border-radius: 10px;
  background-color: whitesmoke;
  margin: auto;
`;

class AddForm5 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teachers: [],
            selectedTeacher: "",
            selectedClass: "",
            lopOptions: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        const lopString = sessionStorage.getItem("selectedLop");
        const lopOptions = lopString.split(",");
        const { match } = this.props;
        const { mamonhoc } = match.params;
        CallApi(`admin/getcourse/${mamonhoc}`)
        .then((response) => {
            console.log(response.data);
            const lopOptionsFiltered = lopOptions.filter((lop) => {
                const foundClass = response.data.data.filter((classData) => classData.id === lop);
                return !foundClass[0] || !foundClass[0].IDGV;
            });  
            this.setState({ lopOptions: lopOptionsFiltered, loading: false });
        })
        .catch((error) => {
            console.error("Error fetching course data:", error);
        });
        const khoa = sessionStorage.getItem("khoa");
        CallApi(`teacher/department/${khoa}`, 'GET')
            .then((res) => {
                this.setState({ teachers: res.data, loading: false });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                this.setState({ error: error, loading: false });
            });
    }

    handleTeacherChange = (event) => {
        this.setState({ selectedTeacher: event.target.value });
    };

    handleClassChange = (event) => {
        this.setState({ selectedClass: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const selectedClass = this.state.selectedClass;
        const selectedTeacher = this.state.selectedTeacher;
        const { match } = this.props;
        const { mamonhoc } = match.params;
        
        try {
            const createCourseResponse = await CallApi(`teacher/create-courses/${selectedTeacher}`, "POST", {
                mamonhoc: mamonhoc,
                lop: selectedClass,
            });
    
            if (createCourseResponse.status === 200) {
                await CallApi(`admin/update-teacherCourse/${mamonhoc}/${selectedClass}`, "PATCH", {
                    IDGV: selectedTeacher,
                });
                alert("Thêm giảng viên thành công!");

            } else {
                throw new Error("Failed to create teacher");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        }
    };    

    render() {
        const { teachers, lopOptions, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        return (
            <div className='container'>
                <Title>Thêm giảng viên</Title>
                <Infor_site> 
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Select Teacher:</label>
                        <select value={this.state.selectedTeacher} onChange={this.handleTeacherChange}>
                            <option value="">-- Select Teacher --</option>
                            {teachers.map((teacher) => (
                                <option key={teacher.id} value={teacher.id}>
                                    {teacher.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Select Class:</label>
                        <select value={this.state.selectedClass} onChange={this.handleClassChange}>
                            <option value="">-- Select Class --</option>
                            {lopOptions.map((lop) => (
                                <option key={lop} value={lop}>
                                    {lop}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Submit</button>
                </form>
                </Infor_site>
                <Btn_site>
          <Link
            to='/home/manage-courses'
            className='goback btn btn-danger'
            style={{ marginRight: "20px" }}>
            <span className='fa fa-arrow-left'></span> &nbsp; Quay lại
          </Link>
        </Btn_site>
                
            </div>
        );
    }
}

export default AddForm5;
