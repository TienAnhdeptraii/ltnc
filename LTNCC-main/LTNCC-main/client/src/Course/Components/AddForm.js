import React, { Component } from "react";
import { Link } from "react-router-dom";
import CallApi from "../../API/CallApi";
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


class AddForm4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tenmonhoc: "",
            mamonhoc: "",
            lop: "",
        };
    }

    onChange = (event) => {
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit = async (event) => {
        const userId = sessionStorage.getItem("userId")
        console.log(userId);
        event.preventDefault();
       
       try{
            const resultCAPI  = CallApi(`admin/create-Course/${userId}`, "POST",{
                    tenmonhoc: this.state.tenmonhoc,
                    mamonhoc: this.state.mamonhoc,
                    lop: this.state.lop,
                })
            if(resultCAPI.status === 200){
                alert("Thêm môn học thành công!");
                window.location.reload();
            }else{
                throw new Error("Failed to create course ");
            }
        }catch{
            
        }
    };

    render() {
        const { tenmonhoc, mamonhoc, lop } = this.state;
        return (
            <div className='container' >
                
                <Title>Thêm môn học</Title>
                <Infor_site> 
                
                <form onSubmit={this.onSubmit} className="panel-body">
        
                    <div>
                        <label>Tên Môn Học:</label>
                        <input type="text" name="tenmonhoc" value={tenmonhoc} onChange={this.onChange} />
                    </div>
                    <div>
                        <label>Mã Môn Học:</label>
                        <input type="text" name="mamonhoc" value={mamonhoc} onChange={this.onChange} />
                    </div>
                    <div>
                        <label>Lớp:</label>
                        <input type="text" name="lop" value={lop} onChange={this.onChange} />
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

export default AddForm4;
