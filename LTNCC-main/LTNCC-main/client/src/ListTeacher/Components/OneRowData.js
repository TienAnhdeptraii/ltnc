
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
    var { teacher, index } = this.props;
    return (
      <tr height='30px'>
        <td className='text_center'>{index + 1}</td>
        <td className='text_center'>{teacher.ID}</td>
        <td>{teacher.name}</td>
        <td className='text_center'>
          {moment(teacher.birthday).format("DD/MM/YYYY")}
        </td>
        <td className='text_center'>{teacher.gender}</td>
        <td className='text_center'>{teacher.email}</td>
        <td className='text_center'>
          <Link
            to={`/home/list-teachers/update/${teacher.id}`}
            className='btn btn-warning'>
            <span className='fa fa-info'></span> &nbsp;Chi tiết
          </Link>{" "}
          &nbsp;
          <button
            className='btn btn-danger'
            type='button'
            onClick={() => this.onDelete(teacher.id, teacher.ID)}>
            <span className='fa fa-trash'></span> &nbsp;Xóa
          </button>{" "}
          &nbsp;
        </td>
      </tr>
    );
  }
}

export default OneRowData;
