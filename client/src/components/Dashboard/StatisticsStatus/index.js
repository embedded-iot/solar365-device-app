import React from 'react';
import { Card, Col, Row } from 'antd';


import './style.scss';
import { FormattedMessage } from "react-intl";

const renderContents = (contents) => {
  return (
    <div className="statistic-status__contents">
      {
        contents.map(content => (
          <div className="statistic-status__item">
            <div className="statistic-status__item-header">
              <span style={{ color: content.important ? 'red' : ''}} className={content.viewDetail ? "link" : ''} onClick={content.viewDetail}>{content.value}</span>
              <span>{content.unit}</span>
            </div>
            <div className="statistic-status__item-description">{content.description}</div>
          </div>
        ))
      }
    </div>
  );
};

const StatisticsStatus = (props) => {
  return (
    <div className="statistic-status__wrapper">
      <Row gutter={16}>
        {
          !!props.list.length && props.list.map((item, index) => (
            <Col span={6} key={index.toString()}>
              <Card title={item.title || '-'} extra={item.viewDetail ? <span onClick={item.viewDetail} className="link"><FormattedMessage id="VIEW_ALL" /></span>: ''}>
                <div className="d-flex">
                  { item.icon && (<img src={item.icon} alt="" />) }
                  { item.contents.length && renderContents(item.contents) }
                </div>
              </Card>
            </Col>
          ))
        }
      </Row>
    </div>
  );
};

export default StatisticsStatus;
