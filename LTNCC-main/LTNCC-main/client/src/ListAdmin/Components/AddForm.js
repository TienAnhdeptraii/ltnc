import React, { Component } from "react";
import { Link } from "react-router-dom";
import CallApi from "../../API/CallApi";
import axios from "axios";

class AddForm3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: "",
      id: "",
      name: "",
      birthday: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      khoa: "",
      lop: "",
      department: "", 
    };
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });

    // Cập nhật trường department tương ứng với tên khoa
    if (name === "khoa") {
      switch (value) {
        case "KHOA CƠ KHÍ":
          this.setState({ department: "CK" });
          break;
        case "KHOA KỸ THUẬT ĐỊA CHẤT VÀ DẦU KHÍ":
          this.setState({ department: "KTDCVDK" });
          break;
        case "KHOA ĐIỆN - ĐIỆN TỬ":
          this.setState({ department: "DDD" });
          break;
        case "KHOA KỸ THUẬT GIAO THÔNG":
          this.setState({ department: "KTGT" });
          break;
        case "KHOA KỸ THUẬT HÓA HỌC":
          this.setState({ department: "KTHH" });
          break;
        case "KHOA MÔI TRƯỜNG VÀ TÀI NGUYÊN":
          this.setState({ department: "MTVTN" });
          break;
        case "KHOA KHOA HỌC VÀ KỸ THUẬT MÁY TÍNH":
          this.setState({ department: "KHVKTMTC" });
          break;
        default:
          this.setState({ department: "" });
          break;
      }
    }
  };

  onSubmit = (event) => {
    event.preventDefault();
    CallApi("create-admin-account", "POST", {
      username: this.state.email,
      password: this.state.ID,
      lop: this.state.lop,
    }).then((res)=>{
      if(res.data.id!=null){
        this.setState({
          id: res.data.id,
        }, ()=>{
          CallApi("admin/create", "POST", {
            ID: this.state.ID,
            id: this.state.id,
            name: this.state.name,
            birthday: this.state.birthday,
            gender: this.state.gender,
            phone: this.state.phone,
            email: this.state.email,
            address: this.state.address,
            khoa: this.state.khoa,
            department: this.state.department,
            lop: this.state.lop,
          }). then(()=>{
            this.setState({
              ID: "",
              id:"",
              name: "",
              birthday: "",
              gender: "",
              phone: "",
              email: "",
              address: "",
              khoa: "",
              lop: "", // Reset lớp sau khi thêm
            });
          });
        })
      }
    })
    alert("Đã thêm thành công");
  };

  render() {
    const khoaOptions = [
      "KHOA CƠ KHÍ",
      "KHOA KỸ THUẬT ĐỊA CHẤT VÀ DẦU KHÍ",
      "KHOA ĐIỆN - ĐIỆN TỬ",
      "KHOA KỸ THUẬT GIAO THÔNG",
      "KHOA KỸ THUẬT HÓA HỌC",
      "KHOA MÔI TRƯỜNG VÀ TÀI NGUYÊN",
      "KHOA KHOA HỌC VÀ KỸ THUẬT MÁY TÍNH",
    ];

    return (
      <div className="addForm">
        <div className="back">
          <Link to="/home/list-admins" className="btn btn-danger">
            <span className="fa fa-arrow-left"></span> &nbsp; Quay lại
          </Link>
        </div>
        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 center">
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">Thêm Admin</h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Mã Admin: </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="ID"
                    value={this.state.ID}
                    onChange={this.onChange}
                  />
                  <label>Họ và tên: </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  <label>Ngày sinh: </label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    name="birthday"
                    value={this.state.birthday}
                    onChange={this.onChange}
                  />
                  <label>Giới tính:</label>
                  <select
                    className="form-control"
                    name="gender"
                    required
                    value={this.state.gender}
                    onChange={this.onChange}
                  >
                    <option>--Select--</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                  <label>Số điện thoại:</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="phone"
                    value={this.state.phone}
                    onChange={this.onChange}
                  />
                  <label>Email: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <label>Địa chỉ: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={this.state.address}
                    onChange={this.onChange}
                  />
                  <label>Khoa:</label>
                  <select
                    className="form-control"
                    required
                    name="khoa"
                    value={this.state.khoa}
                    onChange={this.onChange}
                  >
                    <option value="">-- Chọn khoa --</option>
                    {khoaOptions.map((khoa, index) => (
                      <option key={index} value={khoa}>{khoa}</option>
                    ))}
                  </select>
                  <label>Lớp:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lop"
                    value={this.state.lop}
                    onChange={this.onChange}
                  />
                  <br />
                  <div className="text_center">
                    <button
                      type="submit"
                      className="button submit btn btn-primary custom"
                    >
                      <span className="fa fa-plus"></span> &nbsp;Lưu lại
                    </button>{" "}
                    &nbsp;
                    <Link
                      to="/home/list-admins"
                      className="btn btn-danger"
                    >
                      <span className="fa fa-close"></span> &nbsp;Hủy bỏ
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddForm3;