
import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

class OneRowData extends Component {
  onDelete = (_id, ID) => {
    if (window.confirm("Bạn chắc chắn muốn xóa giảng viên này ?")) {
      this.props.onDelete(_id, ID);
    }
  };

  render() {
    var { admin, index } = this.props;
    return (
      <tr height='30px'>
        <td className='text_center'>{index + 1}</td>
        <td className='text_center'>{admin.ID}</td>
        <td>{admin.name}</td>
        <td className='text_center'>
          {moment(admin.birthday).format("DD/MM/YYYY")}
        </td>
        <td className='text_center'>{admin.gender}</td>
        <td className='text_center'>{admin.email}</td>
        <td className='text_center'>
          <Link
            to={`/home/list-admins/update/${admin.id}`}
            className='btn btn-warning'>
            <span className='fa fa-info'></span> &nbsp;Chi tiết
          </Link>{" "}
          &nbsp;
          <button
            className='btn btn-danger'
            type='button'
            onClick={() => this.onDelete(admin.id, admin.ID)}>
            <span className='fa fa-trash'></span> &nbsp;Xóa
          </button>{" "}
          &nbsp;
        </td>
      </tr>
    );
  }
}

export default OneRowData;
