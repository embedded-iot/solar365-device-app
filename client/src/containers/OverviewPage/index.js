import React from "react";
import { FormattedMessage } from "react-intl";
import { webSocketClient } from "../../Utils";
import { ACTION_TYPES } from "../../components/constants";

class OverviewPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isConnected: false,
      DeviceSN: ''
    };
  }


  componentDidMount() {
    webSocketClient.receivedMessage((response) => {
      if (response.type === ACTION_TYPES.CONFIG) {
        const { DeviceSN, isConnected } = response.data || {};
        this.setState({
          isConnected,
          DeviceSN
        });
      }
    });

    webSocketClient.sendMessage({ type: ACTION_TYPES.CONFIG });
  }

  render() {
    const { DeviceSN, isConnected } = this.state;
    if (!isConnected) {
      return <FormattedMessage id="NO_CONNECT" />;
    }
    const link = `${process.env.REACT_APP_SOLAR365_FE}master-status/${DeviceSN}`;
    return (
      <iframe title="Overview" src={link} style={{ width: "100%", height: "100%", border: 'none' }} />
    )
  }
}

export default OverviewPage;
