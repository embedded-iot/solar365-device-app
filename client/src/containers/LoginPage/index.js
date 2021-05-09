import React from "react";
import { withRouter } from "react-router";
import Identicon from 'react-identicons';
import { globalConfig, webSocketClient } from "../../Utils";

import { ACTION_TYPES } from "../../components/constants";

import "./style.scss";

class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      userName: '',
      password: ''
    };
  }

  componentDidMount() {
    if (this.state.isLogined) {
      this.redirectPage();
    } else {
      webSocketClient.receivedMessage((response) => {
        if (response && response.isLogined) {
          this.redirectPage();
        }
      });
    }
  }

  redirectPage = () => {
    globalConfig.setConfigBackend({ isLogined: true });
    const { history, location } = this.props;
    console.log(location.pathname);
    history.push(location.pathname);
  }

  login = () => {
    const { userName, password } = this.state;
    webSocketClient.sendMessage({
      type: ACTION_TYPES.REQUEST_LOGIN,
      data: {
        userName,
        password
      }
    });
    this.redirectPage();
  }

  render() {
    return (
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__profile">
            <Identicon className="account__avatar" size={64} string="randomness" />
            <p className="account__name">Hello, Admin!</p>
            <p className="account__sub">Welcome to Solar365 Portal</p>
          </div>
          <input name="username" className="form-control" />
          <input name="password" className="form-control" />
          <button type="button" onClick={this.login} className="btn btn-primary account__btn">Login</button>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);
