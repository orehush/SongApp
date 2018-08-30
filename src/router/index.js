import { createStackNavigator } from 'react-navigation';
import Main from '../screens/Main';
import Song from '../screens/song';
import SongList from '../screens/songs';
import SearchByNumber from '../screens/search/byNumber';
import SearchByLetter from '../screens/search/byLetter';

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
});
