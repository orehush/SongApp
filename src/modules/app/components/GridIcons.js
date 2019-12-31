import React from 'react';
import {Col, Grid, Row} from 'native-base';
import Icon from 'components/Icon';

export default ({...props}) => {
  return (
    <Grid>
      <Row>
        <Col>
          <Icon name={'home'} label={'Search'} />
        </Col>
        <Col>
          <Icon name={'home'} label={'Search'} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Icon name={'home'} label={'Search'} />
        </Col>
        <Col>
          <Icon name={'home'} label={'Search'} />
        </Col>
      </Row>
    </Grid>
  );
};
