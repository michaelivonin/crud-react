import React from "react";
import StorageOption from "./components/StorageOption/StorageOption";
import UserForm from "./components/UserForm/UserForm";
import UserTable from "./components/UserTable/UserTable";
import './App.sass';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.hideMessage = this.hideMessage.bind(this);
    this.localStorageGetUsers = this.localStorageGetUsers.bind(this);
    this.localStorageSetUsers = this.localStorageSetUsers.bind(this);
    this.handleStorageOptionSubmit = this.handleStorageOptionSubmit.bind(this);
    this.handleButtonCreateClick = this.handleButtonCreateClick.bind(this);
    this.handleUserFormCreateSubmit = this.handleUserFormCreateSubmit.bind(this);
    this.handleButtonReadClick = this.handleButtonReadClick.bind(this);
    this.handleUserFormReadSubmit = this.handleUserFormReadSubmit.bind(this);
    this.handleUserTableUpdateClick = this.handleUserTableUpdateClick.bind(this);
    this.handleUserFormUpdateSubmit = this.handleUserFormUpdateSubmit.bind(this);
    this.handleUserTableDeleteClick = this.handleUserTableDeleteClick.bind(this);
    this.state = {
      isLocalStorage: false,
      users: null,
      isSuccessfully: false,
      isCreating: false,
      isReading: false,
      userFound: null,
      userIsNotFound: false,
      userUpdating: null,
    };
  }

  hideMessage() {
    setTimeout(() => this.setState({
      isSuccessfully: false,
      userIsNotFound: false,
    }), 3800);
  }

  localStorageGetUsers() {
    this.setState({isLocalStorage: true});
    if (!localStorage.users) localStorage.users = JSON.stringify([]);
    return JSON.parse(localStorage.users);
  }

  localStorageSetUsers(data) {
    localStorage.users = JSON.stringify(data);
  }

  handleStorageOptionSubmit(target) {
    const select = target.querySelector(".options");
    const selectedOption = select.options[select.selectedIndex].value;

    const storage = (selectedOption === "Memory") ? [] :
      (selectedOption === "Local Storage") ? this.localStorageGetUsers() : null;

    setTimeout(() => this.setState({
      users: storage,
      isSuccessfully: true,
    }), 200);

    this.hideMessage();
  }

  handleButtonCreateClick(e) {
    e.preventDefault();
    this.setState({
      isCreating: true,
      isReading: false,
      userFound: null,
      userUpdating: null,
    });
  }

  handleUserFormCreateSubmit(target) {
    const {isLocalStorage, users} = this.state;

    users.push({
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      name: target.name.value,
    });

    setTimeout(() => this.setState({
      users: users,
      isCreating: false,
      isSuccessfully: true,
    }), 200);

    this.hideMessage();
    if (isLocalStorage) this.localStorageSetUsers(users);
  }

  handleButtonReadClick(e) {
    e.preventDefault();
    this.setState({
      isReading: true,
      isCreating: false,
      userFound: null,
      userUpdating: null,
    });
  }

  handleUserFormReadSubmit(target) {
    const user = this.state.users.find(user => user.name === target.name.value);

    if (!user) {
      this.setState({userIsNotFound: true});
      this.hideMessage();
      return;
    }

    setTimeout(() => this.setState({
      userFound: user,
      isReading: false,
    }), 200);
  }

  handleUserTableUpdateClick() {
    setTimeout(() => this.setState({
      userUpdating: this.state.userFound,
      userFound: null,
    }), 200);
  }

  handleUserFormUpdateSubmit(target) {
    const {isLocalStorage, users, userUpdating} = this.state;

    if (userUpdating.name === target.name.value) {
      target.name.value = "Type new name";
      return;
    }

    users.find(user => user.id === userUpdating.id).name = target.name.value;

    setTimeout(() => this.setState({
      users: users,
      isSuccessfully: true,
      userUpdating: null,
    }), 200);

    this.hideMessage();
    if (isLocalStorage) this.localStorageSetUsers(users);
  }

  handleUserTableDeleteClick(id) {
    const accept = window.confirm("Are you sure you want to delete this user?");
    if (!accept) return;

    const users = this.state.users.filter(user => user.id !== id);
    setTimeout(() => this.setState({
      users: users,
      userFound: null,
      isSuccessfully: true,
    }), 200);

    this.hideMessage();
    if (this.state.isLocalStorage) this.localStorageSetUsers(users);
  }

  render() {
    const {users, isSuccessfully, isCreating, isReading, userFound, userIsNotFound, userUpdating} = this.state;

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
                          <li>
                            <a href="/" onClick={this.handleButtonReadClick}>
                              Read
                            </a>
                          </li>
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
        <div className="content-wrapper">
          <div className="mui--appbar-height"></div>
          {!users &&
            <StorageOption onSubmit={this.handleStorageOptionSubmit} />
          }
          {isCreating &&
            <UserForm
              isCreating={isCreating}
              onCreateSubmit={this.handleUserFormCreateSubmit}
            />
          }
          {isReading &&
            <UserForm
              isReading={isReading}
              onReadSubmit={this.handleUserFormReadSubmit}
            />
          }
          {userFound &&
            <UserTable
              user={userFound}
              onUpdateClick={this.handleUserTableUpdateClick}
              onDeleteClick={this.handleUserTableDeleteClick}
            />
          }
          {userUpdating &&
            <UserForm
              userUpdating={userUpdating}
              onUpdateSubmit={this.handleUserFormUpdateSubmit}
            />
          }
          <p
            className={isSuccessfully ? "mui--z2 alert alert_success" :
              userIsNotFound ? "mui--z2 alert alert_failure" : "mui--z2 alert"
            }
          >
            {(isSuccessfully && "Successfully") || (userIsNotFound && "Not found")}
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