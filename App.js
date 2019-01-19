import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import RootStack from './src/router';
import store from './src/store/configureStore';
import settings from './src/config/settings';


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
          <View style={styles.container}>
            <StatusBar backgroundColor={settings.backgroundPrimaryColor} barStyle="default" />
            <RootStack/>
          </View>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerView: {
  	flex: 1,
  },
});
