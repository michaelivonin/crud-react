import React from "react";
import './App.sass';
import StorageOption from "./components/StorageOption/StorageOption";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      users: null,
      isSuccessfully: false,
    };
  }

  handleButtonClick(target) {
    if (target.tagName !== "BUTTON") return;

    if (!localStorage.users) localStorage.users = JSON.stringify([]);

    const storage = (target.textContent === "Memory") ? [] :
      (target.textContent === "Local Storage") ? JSON.parse(localStorage.users) : null;

    setTimeout(() => this.setState({
      users: storage,
      isSuccessfully: true,
    }), 200);

    setTimeout(() => this.setState({
      isSuccessfully: false,
    }), 3000);

    /*for (let i = 0; i <= 3; i++) {
      const storage = JSON.parse(this.state.storage);
      this.setState((prevState) => ({
        storage: JSON.stringify(JSON.parse(prevState.storage).push(i))
      }));
    }*/
  }

  render() {
    const {users, isSuccessfully} = this.state;

    return (
      <div className="app-wrapper">
        <header className="mui-appbar mui--z1 header">
          <div className="mui-container">
            <table className="header__table">
              <tbody>
              <tr className="mui--appbar-height">
                <td className="mui--text-title">CRUD App</td>
                <td className="mui--text-right">
                  {users &&
                    <div className="mui-dropdown">
                      <button className="mui-btn mui-btn--primary header__button" data-mui-toggle="dropdown">
                        User
                        <span className="mui-caret"></span>
                      </button>
                      <ul className="mui-dropdown__menu header__list">
                        <li><a href="/">Create</a></li>
                        {(users && users.length > 0) &&
                          <li><a href="/">Read</a></li>
                        }
                      </ul>
                    </div>
                  }
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </header>
        <div className="mui--text-center content-wrapper">
          <div className="mui--appbar-height"></div>
          {!users &&
            <StorageOption onButtonClick={this.handleButtonClick}/>
          }
          <p
            className={isSuccessfully ? "mui--z2 alert-success alert-success_visible" : "mui--z2 alert-success"}
          >
            Successfully
          </p>
        </div>
        <footer className="footer">
          <div className="mui-container mui--text-center">
            Made by Mike Ivonin
          </div>
        </footer>
      </div>
    );
  }
}

export default App;