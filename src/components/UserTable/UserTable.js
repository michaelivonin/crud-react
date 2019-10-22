import React from "react";

class UserTable extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const users = this.props.users;

    return (
      <div>
        <br/>
        <br/>
        <div className="mui--text-display1">User table</div>
        <br/>
        <br/>
        <table className="mui-table">
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {users.map((user, i) => (
            <tr key={i}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <button className="mui-btn mui-btn--small mui-btn--primary mui-btn--fab">&#9998;</button>
                <button className="mui-btn mui-btn--small mui-btn--danger mui-btn--fab">&#10006;</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserTable;