import React from "react";
import "./StorageOption.sass";

class StorageOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(e.target);
  }

  render() {
    return (
      <div className="storage-option">
        <br/>
        <br/>
        <div className="mui--text-display2">Choose storage</div>
        <br/>
        <br/>
        <form className="mui-form" onSubmit={this.handleSubmit}>
          <div className="mui-select">
            <select className="options">
              <option>Memory</option>
              <option>Local Storage</option>
            </select>
            <label>Storage</label>
          </div>
          <button type="submit" className="mui-btn mui-btn--raised storage-option__button">Confirm</button>
        </form>
      </div>
    );
  }
}

export default StorageOption;