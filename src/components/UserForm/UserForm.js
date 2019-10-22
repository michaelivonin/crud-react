import React from "react";
import "./UserForm.sass";

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const {isCreating, isReading, userUpdating} = this.props;

    if (isCreating) this.props.onCreateSubmit(e.target);
    if (isReading) this.props.onReadSubmit(e.target);
    if (userUpdating) this.props.onUpdateSubmit(e.target);
  }

  render () {
    const {isCreating, isReading, userUpdating} = this.props;

    return (
      <div className="user-form">
        <br/>
        <br/>
        <div className="mui--text-display1">
          {(isCreating && "Create new user") ||
            (isReading && "Read user") ||
            (userUpdating && `Update user "${userUpdating.name}"`)
          }
        </div>
        <br/>
        <br/>
        <form className="mui-form" onSubmit={this.handleSubmit}>
          <div className="mui-textfield mui-textfield--float-label">
            <input type="text" name="name" required={true}/>
            <label>{(userUpdating && "New name") || "Name"}</label>
          </div>
          <button type="submit" className="mui-btn mui-btn--raised user-form__button">
            {(isCreating && "Create") || (isReading && "Read") || (userUpdating && "Update")}
          </button>
        </form>
      </div>
    );
  }
}

export default UserForm;