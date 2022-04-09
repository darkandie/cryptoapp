import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';

import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={8}>24h Trade Volume</Col>
        <Col span={8}>Markets</Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
              <Panel style={{margin: '10px 0;'}}
                key={exchange.uuid}
                showArrow={false}
                header={(
                  <Row key={exchange.uuid}>
                    <Col span={6}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={8}>${millify(exchange["24hVolume"])}</Col>
                    <Col span={8}>{millify(exchange.numberOfMarkets)}</Col>
                  </Row>
                  )}
              >
              </Panel>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;