import React from "react";
import { withRouter } from "react-router";
import {globalConfig, WebSocketClient} from "../../Utils";

import { ACTION_TYPES } from "../../components/constants";
import Identicon from 'react-identicons';

class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: ''
    };
  }

  componentDidMount() {
    globalConfig.setConfigBackend({ isLogined: true });
    this.props.history.push('/home');

    WebSocketClient.receivedMessage((response) => {
      if (response && response.isLogined) {
        this.props.history.push('/home');
      }
    });
  }

  login = () => {
    const { userName, password } = this.state;
    WebSocketClient.sendMessage({
      type: ACTION_TYPES.REQUEST_LOGIN,
      data: {
        userName,
        password
      }
    });
  }

  render() {
    return (
      <div className="account">
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
      </div>
    );
  }
}

export default withRouter(LoginPage);
