import React, { Component } from 'react';

import Identicon from 'react-identicons';
import {
  UncontrolledTooltip
} from 'reactstrap';
import Editor from 'react-medium-editor';
import { WebSocketClient } from "../Utils";
import { ACTION_TYPES } from "../../components/constants";


const contentDefaultMessage = "Start writing your document here";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUsers: [],
      userActivity: [],
      username: null,
      text: ''
    };
  }

  componentDidMount() {
    WebSocketClient.receivedMessage((response) => {
      console.log(response);
      if (response.type === ACTION_TYPES.REQUEST_LOGIN) {
        console.log('REQUEST_LOGIN');
      }
    });
  }

  showEditorSection = () => (
    <div className="main-content">
      <div className="document-holder">
        <div className="currentusers">
          {this.state.currentUsers.map(user => (
            <React.Fragment>
              <span id={user.username} className="userInfo" key={user.username}>
                <Identicon className="account__avatar" style={{ backgroundColor: user.randomcolor }} size={40} string={user.username} />
              </span>
              <UncontrolledTooltip placement="top" target={user.username}>
                {user.username}
              </UncontrolledTooltip>
            </React.Fragment>
          ))}
        </div>
        <Editor
          options={{
            placeholder: {
              text: this.state.text ? contentDefaultMessage : ""
            }
          }}
          className="body-editor"
          text={this.state.text}
          onChange={this.onEditorStateChange}
        />
      </div>
      <div className="history-holder">
        <ul>
          {this.state.userActivity.map((activity, index) => <li key={`activity-${index}`}>{activity}</li>)}
        </ul>
      </div>
    </div>
  )

  render() {
    const {
      username
    } = this.state;
    return (
      <React.Fragment>

        <div className="container-fluid">
          asdasdasd
          {this.showEditorSection()}
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
