import React from "react";
import "./CreateUserForm.sass";

class CreateUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(e.target);
  }

  render () {
    return (
      <div className="create-form">
        <br/>
        <br/>
        <div className="mui--text-display1">Create new user</div>
        <br/>
        <br/>
        <form className="mui-form" onSubmit={this.handleSubmit}>
          <div className="mui-textfield mui-textfield--float-label">
            <input type="text" name="name" required={true}/>
            <label>Name</label>
          </div>
          <button type="submit" className="mui-btn mui-btn--raised create-form__button">Create</button>
        </form>
      </div>
    );
  }
}

export default CreateUserForm;