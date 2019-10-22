import React from "react";
import "./StorageOption.sass";

class StorageOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onButtonClick(e.target);
  }

  render() {
    return (
      <div className="storage-option">
        <br/>
        <br/>
        <div className="mui--text-display3">Choose storage</div>
        <br/>
        <br/>
        <div onClick={this.handleClick}>
          <button className="mui-btn mui-btn--raised storage-option__button">Memory</button>
          <button className="mui-btn mui-btn--raised storage-option__button">Local Storage</button>
        </div>
      </div>
    );
  }
}

export default StorageOption;