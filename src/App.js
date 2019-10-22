import React from "react";
import StorageOption from "./components/StorageOption/StorageOption";
import UserForm from "./components/UserForm/UserForm";
import UserTable from "./components/UserTable/UserTable";
import './App.sass';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.hideMessege = this.hideMessege.bind(this);
    this.handleStorageOptionClick = this.handleStorageOptionClick.bind(this);
    this.handleButtonCreateClick = this.handleButtonCreateClick.bind(this);
    this.handleUserFormCreateSubmit = this.handleUserFormCreateSubmit.bind(this);
    this.handleButtonReadClick = this.handleButtonReadClick.bind(this);
    this.handleUserFormReadSubmit = this.handleUserFormReadSubmit.bind(this);
    this.handleUserTableUpdateClick = this.handleUserTableUpdateClick.bind(this);
    this.handleUserFormUpdateSubmit = this.handleUserFormUpdateSubmit.bind(this);
    this.handleUserTableDeleteClick = this.handleUserTableDeleteClick.bind(this);
    this.state = {
      users: null,
      isSuccessfully: false,
      isCreating: false,
      isReading: false,
      userFound: null,
      userUpdating: false,
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
    this.setState({
      isCreating: true,
      isReading: false,
      userFound: null,
      userUpdating: null,
    });
  }

  handleUserFormCreateSubmit(target) {
    const users = this.state.users;

    users.push({
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      name: target.name.value,
    });

    setTimeout(() => this.setState({
      isCreating: false,
      isSuccessfully: true,
    }), 200);

    this.hideMessege();
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

    setTimeout(() => this.setState({
      userFound: user,
      isReading: false,
    }), 200);
  }

  handleUserTableUpdateClick(id) {
    this.setState({
      userFound: null,
      userUpdating: this.state.users.find(user => user.id === id)
    });
  }

  handleUserFormUpdateSubmit() {

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

    this.hideMessege();
  }

  render() {
    const {users, isSuccessfully, isCreating, isReading, userFound, userUpdating} = this.state;

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
            <StorageOption onClick={this.handleStorageOptionClick} />
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