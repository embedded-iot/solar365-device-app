import React from "react";


import "./style.scss";
import { FormattedMessage } from "react-intl";
import TableWrapper from "../../components/TableWrapper";

class Solar365Fault extends React.PureComponent {

  render() {

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        width: '30%',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        width: '30%',
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
    ];

    const dataSource = [];
    for (let i = 0; i < 100; i++) {
      dataSource.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
      });
    }

    return (
      <React.Fragment>
        <div className="page-header"><FormattedMessage id="SOLAR_FAULT" /></div>
        <div className="page-contents">
          <TableWrapper columns={columns} dataSource={dataSource} />
        </div>
      </React.Fragment>
    )
  }
}

export default Solar365Fault;
