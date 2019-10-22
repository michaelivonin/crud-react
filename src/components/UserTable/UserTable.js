import React from "react";
import "./UserTable.sass";

class UserTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleUpdateClick(id) {
    this.props.onUpdateClick(id)
  }

  handleDeleteClick(id) {
    this.props.onDeleteClick(id);
  }

  render() {
    const user = this.props.user;

    return (
      <div className="user-table">
        <br/>
        <br/>
        <div className="mui--text-display1 mui--text-center">User table</div>
        <br/>
        <br/>
        <table className="mui-table mui-table--bordered">
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <button
                  className="mui-btn mui-btn--small mui-btn--primary mui-btn--fab"
                  onClick={() => this.handleUpdateClick(user.id)}
                >
                  &#9998;
                </button>
                <button
                  className="mui-btn mui-btn--small mui-btn--danger mui-btn--fab"
                  onClick={() => this.handleDeleteClick(user.id)}
                >
                  &#10006;
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserTable;