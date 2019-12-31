import React, {Component} from 'react';
import {Container, Header, Tabs, Tab, TabHeading} from 'native-base';
import Icon from 'components/Icon';
import GridIcons from '../components/GridIcons';

export default class HomeScreen extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Tabs>
          <Tab
            heading={
              <TabHeading>
                <Icon />
              </TabHeading>
            }>
            <GridIcons />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Icon />
              </TabHeading>
            }>
            <GridIcons />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
