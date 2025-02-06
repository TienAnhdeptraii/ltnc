
import React, { Component } from "react";
import Sort from "./Sort";
import OneRowData from "./OneRowData";

class ListGV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: this.props.teachers,
      filter: {
        ID: "",
        name: "",
        gender: "",
        email: "",
      },
      sort: {
        by: "ID",
        value: 1,
      },
    };
  }

  componentDidMount() {
    this.setState({
      teachers: this.props.teachers,
    });
  }

  onDelete = (_id, ID) => {
    this.props.onDelete(_id, ID);
  };

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      filter: {
        [name]: value,
      },
    });
  };

  onSort = (sortBy, sortValue) => {
    this.setState({
      sort: {
        by: sortBy,
        value: sortValue,
      },
    });
  };

  render() {
    var { filter, sort } = this.state;
    var teachers = this.props.teachers;
    if (filter) {
      if (filter.ID) {
          teachers = teachers.filter((teacher) => {
          return teacher.ID.indexOf(filter.ID) === 0;
        });
      }
      if (filter.name) {
        teachers = teachers.filter((teacher) => {
          return teacher.name.indexOf(filter.name) !== -1;
        });
      }
      if (filter.gender) {
        teachers = teachers.filter((teacher) => {
          if (filter.gender === "all") return true;
          else return teacher.gender === filter.gender;
        });
      }
      if (filter.email) {
        teachers = teachers.filter((teacher) => {
          return teacher.email.indexOf(filter.email) !== -1;
        });
      }
    }

    if (sort) {
      if (sort.by === "ID") {
        teachers.sort((teacher1, teacher2) => {
          if (teacher1.ID > teacher2.ID) return sort.value;
          else if (teacher1.ID < teacher2.ID) return -sort.value;
          else return 0;
        });
      } else if (sort.by === "name") {
        teachers.sort((teacher1, teacher2) => {
          if (teacher1.name.localeCompare(teacher2.name) < 0) return sort.value;
          else if (teacher1.name.localeCompare(teacher2.name) > 0)
            return -sort.value;
          else return 0;
        });
      } 
    }
    var teacherList = teachers.map((teacher, index) => {

      return (
        <OneRowData
          key={teacher.id}
          index={index}
          teacher={teacher}
          onDelete={this.onDelete}
        />
      );
    });
    return (
      <div>
        <table className="table table-bordered table-hover">
          <Sort onSort={this.onSort} />

          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="ID"
                  value={filter.ID}
                  onChange={this.onChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={filter.name}
                  onChange={this.onChange}
                />
              </td>
              <td></td>
              <td>
                <select
                  className="form-control"
                  name="gender"
                  value={filter.gender}
                  onChange={this.onChange}
                >
                  <option value="all"></option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={filter.email}
                  onChange={this.onChange}
                />
              </td>
              <td></td>
            </tr>
            {teacherList}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListGV;
