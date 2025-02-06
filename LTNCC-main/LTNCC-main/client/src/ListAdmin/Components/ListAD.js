
import React, { Component } from "react";
import Sort from "./Sort";
import OneRowData from "./OneRowData";

class ListAD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admins: this.props.admins,
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
      admins: this.props.admins,
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
    var admins = this.props.admins;
    console.log(admins);
    if (filter) {
      if (filter.ID) {
        admins = admins.filter((admin) => {
          return admin.ID.indexOf(filter.ID) === 0;
        });
      }
      if (filter.name) {
        admins = admins.filter((admin) => {
          return admin.name.indexOf(filter.name) !== -1;
        });
      }
      if (filter.gender) {
        admins = admins.filter((admin) => {
          if (filter.gender === "all") return true;
          else return admin.gender === filter.gender;
        });
      }
      if (filter.email) {
        admins = admins.filter((admin) => {
          return admin.email.indexOf(filter.email) !== -1;
        });
      }
    }

    if (sort) {
      if (sort.by === "ID") {
        admins.sort((admin1, admin2) => {
          if (admin1.ID > admin2.ID) return sort.value;
          else if (admin1.ID < admin2.ID) return -sort.value;
          else return 0;
        });
      } else if (sort.by === "name") {
        admins.sort((admin1, admin2) => {
          if (admin1.name.localeCompare(admin2.name) < 0) return sort.value;
          else if (admin1.name.localeCompare(admin2.name) > 0)
            return -sort.value;
          else return 0;
        });
      } 
    }
    var adminList = admins.map((admin, index) => {
      return (
        <OneRowData
          key={admin.id}
          index={index}
          admin={admin}
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
            {adminList}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListAD;
