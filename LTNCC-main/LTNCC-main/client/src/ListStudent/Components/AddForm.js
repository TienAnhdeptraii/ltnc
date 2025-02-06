import React, { Component } from "react";
import { Link } from "react-router-dom";
import CallApi from "../../API/CallApi";
class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      mssv: "",
      name: "",
      birthday: "",
      gender: "",
      email:" ",
      phone: "",
      address: "",
      sum_of_credits: 0,
      gpa: 0,
      status: "",
      khoa: "",
      lop: "",
      department: "",
    };
  }
    componentDidMount() {
      const department = sessionStorage.getItem("khoa");
      const lop = sessionStorage.getItem("lop");
      if (department) {
        this.setState({ department: department });

        this.setState({ khoa: this.convertKhoaToDepartment(department) });
      }
      
      if (lop) {
        this.setState({ lop });
      }
    }

    convertKhoaToDepartment = (department) => {
      switch (department) {
        case "CK":
          return "KHOA CƠ KHÍ";
        case "KTDCVDK":
          return "KHOA KỸ THUẬT ĐỊA CHẤT VÀ DẦU KHÍ";
        case "DDD":
          return "KHOA ĐIỆN - ĐIỆN TỬ";
        case "KTGT":
          return "KHOA KỸ THUẬT GIAO THÔNG";
        case "KTHH":
          return "KHOA KỸ THUẬT HÓA HỌC";
        case "MTVTN":
          return "KHOA MÔI TRƯỜNG VÀ TÀI NGUYÊN";
        case "KHVKTMT":
          return "KHOA KHOA HỌC VÀ KỸ THUẬT MÁY TÍNH";
        default:
          return "";
      }
    };


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
    CallApi("create-student-account", "POST", {
        username: this.state.email,
        password: this.state.mssv,
        lop: this.state.lop,
    }).then((res) => {
      if(res.data.id != null){
        this.setState({
          id: res.data.id,
        },()=>{
          CallApi("student/create", "POST", {
            id: this.state.id,
            mssv: this.state.mssv,
            name: this.state.name,
            birthday: this.state.birthday,
            gender: this.state.gender,
            phone: this.state.phone,
            email: this.state.email,
            address: this.state.address,
            sum_of_credits: this.state.sum_of_credits,
            gpa: this.state.gpa,
            status: this.state.status,
            khoa: this.state.khoa,
            lop: this.state.lop,
            department: this.state.department,
          }).then(()=>{
            this.setState({
              mssv: "",
              id:"",
              name: "",
              birthday: "",
              gender: "",
              phone: "",
              address: "",
              sum_of_credits: "",
              gpa: "",
              status: "",
              khoa: "",
              nganh: "",
              lop: "",
            });
          });
        });
      }
  });
    alert("Đã thêm thành công");
  };

  render() {
    const lopOptions = sessionStorage.getItem("lop") ? sessionStorage.getItem("lop").split(", ") : [];
    return (
      <div className="addForm">
        <div className="back">
          <Link to="/home/list-students" className="btn btn-danger">
            <span className="fa fa-arrow-left"></span> &nbsp; Quay lại
          </Link>
        </div>
        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 center">
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">Thêm sinh viên</h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>mssv: </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="mssv"
                    value={this.state.mssv}
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
                  <label>email:</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <label>Số điện thoại:</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="phone"
                    value={this.state.phone}
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
                  <label>Tổng số tín chỉ: </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="sum_of_credits"
                    value={this.state.sum_of_credits}
                    onChange={this.onChange}
                  />
                  <label>GPA: </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="gpa"
                    value={this.state.gpa}
                    onChange={this.onChange}
                  />
                  <label>Trạng thái: </label>
                  <select
                    className="form-control"
                    required
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option>--Select--</option>
                    <option value="Không">Không </option>
                    <option value="Nguy cơ nghỉ học">Nguy cơ nghỉ học</option>
                    <option value="Cảnh báo học vụ">Cảnh báo học vụ</option>
                    <option value="Thiếu tín chỉ">Thiếu tín chỉ</option>
                    <option value="Thiếu học phí">Thiếu học phí</option>
                    <option value="Khen thưởng">Khen thưởng</option>
                  </select>{" "}
                  <label>Lớp:</label>
                  <select
                    className="form-control"
                    required
                    name="lop"
                    value={this.state.lop}
                    onChange={this.onChange}
                  >
                    <option value="">-- Chọn lớp --</option>
                    {lopOptions.map((lop, index) => (
                      <option key={index} value={lop}>{lop}</option>
                    ))}
                  </select>
                  <br />
                  <div className="text_center">
                    <button
                      type="submit"
                      className="button submit btn btn-primary custom"
                      onClick={this.onSubmit}
                    >
                      <span className="fa fa-plus"></span> &nbsp;Lưu lại
                    </button>{" "}
                    &nbsp;
                    <Link
                      to="/home/list-students"
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

export default AddForm;
