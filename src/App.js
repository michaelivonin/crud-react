import React from "react";
import './App.sass';
import StorageOption from "./components/StorageOption/StorageOption";
import CreateUserForm from "./components/CreateUserForm/CreateUserForm";
import UserTable from "./components/UserTable/UserTable";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.hideMessege = this.hideMessege.bind(this);
    this.handleStorageOptionClick = this.handleStorageOptionClick.bind(this);
    this.handleButtonCreateClick = this.handleButtonCreateClick.bind(this);
    this.handleCreateUserFormSubmit = this.handleCreateUserFormSubmit.bind(this);
    this.state = {
      users: null,
      isSuccessfully: false,
      isCreating: false,
    };
  }

  hideMessege() {
    setTimeout(() => this.setState({
      isSuccessfully: false,
    }), 3000);
  }

  handleStorageOptionClick(target) {
    if (target.tagName !== "BUTTON") return;

    if (!localStorage.users) localStorage.users = JSON.stringify([]);

    const storage = (target.textContent === "Memory") ? [] :
      (target.textContent === "Local Storage") ? JSON.parse(localStorage.users) : null;

    setTimeout(() => this.setState({
      users: storage,
      isSuccessfully: true,
    }), 200);

    this.hideMessege();

    /*for (let i = 0; i <= 3; i++) {
      const storage = JSON.parse(this.state.storage);
      this.setState((prevState) => ({
        storage: JSON.stringify(JSON.parse(prevState.storage).push(i))
      }));
    }*/
  }

  handleButtonCreateClick(e) {
    e.preventDefault();
    this.setState({isCreating: true});
  }

  handleCreateUserFormSubmit(target) {
    const users = this.state.users;

    users.push({
      id: users.length,
      name: target.name.value,
    });

    console.log(users);
    setTimeout(() => this.setState({
      isCreating: false,
      isSuccessfully: true,
    }), 200);

    this.hideMessege();
  }

  render() {
    const {users, isSuccessfully, isCreating} = this.state;

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
                        <li>
                          <a href="/" onClick={this.handleButtonCreateClick}>
                            Create
                          </a>
                        </li>
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
            <StorageOption onClick={this.handleStorageOptionClick} />
          }
          {isCreating &&
            <CreateUserForm onSubmit={this.handleCreateUserFormSubmit} />
          }
          {(users && users.length > 0) &&
            <UserTable users={users}/>
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