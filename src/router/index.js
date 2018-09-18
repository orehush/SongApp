import { createStackNavigator } from 'react-navigation';
import Main from '../screens/Main';
import Song from '../screens/song';
import SongList from '../screens/songs';
import SearchByNumber from '../screens/search/byNumber';
import SearchByLetter from '../screens/search/byLetter';
import settings from '../config/settings';

export default RootStack = createStackNavigator({
    Main: {
        screen: Main,
    },
    Song: {
        screen: Song,
    },
    SongList: {
        screen: SongList,
    },
    SearchByNumber: {
        screen: SearchByNumber,
    },
    SearchByLetter: {
        screen: SearchByLetter,
    },
}, {
    headerMode: 'float',
    navigationOptions: {
        headerTintColor: settings.primaryColor,
        headerStyle: {
            backgroundColor: settings.backgroundPrimaryColor,
            elevation: 0,
            borderWidth: 0,    
        },
        headerTitleStyle: {
            color: settings.primaryColor,
            fontWeight: 'bold',
        },
    },
});
