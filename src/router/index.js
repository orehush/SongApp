import { createStackNavigator } from 'react-navigation';
import Main from '../screens/Main';
import Song from '../screens/song';

export default RootStack = createStackNavigator({
    Main: {
        screen: Main,
    },
    Song: {
        screen: Song,
    },
});
