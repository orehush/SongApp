import React from 'react';
import { View, Text, ScrollView, FlatList, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { SongListItem } from './components/listitem';
import { fetchSong, fetchSongsByQuery, fetchSongsSuccess } from '../../actions/songs';
import settings from '../../config/settings';

class SongList extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: navigation.getParam('headerTitle'),
            headerTintColor: settings.primaryColor,
            headerStyle: {
                backgroundColor: settings.backgroundPrimaryColor,
            },
            headerTitleStyle: {
                color: settings.primaryColor,
                fontWeight: 'bold',
            },
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            showSearch: false,
        }
    }

    componentDidMount() {
        const showSearch = this.props.navigation.getParam('showSearch');
        if (showSearch) this.setState({ showSearch });
    }

    componentWillUnmount() {
        this.props.resetSongList();
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id) => {
        let headerTitle = this.props.navigation.getParam('headerTitle');
        headerTitle += this.state.query ? ` - ${this.state.query}`: '';  

        this.props.fetchSong(id);
        this.props.navigation.navigate('Song', { headerTitle });
    };

    _renderItem = ({item}) => (
        <SongListItem
            id={item.id}
            onPress={this._onPressItem}
            title={item.title}
        />
    );

    _onChangeText = (query) => {
        this.setState({ query });
        if (query.length >= 3) {
            this.props.fetchSongsByQuery(query);
        } else {
            this.props.resetSongList();
        }
    }
    
    _renderSearchField = () => {
        return this.state.showSearch ? (
            <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                    <Icon style={styles.inputIcon} name="ios-search" 
                          size={20} color={settings.black} />
                </View>
                <TextInput
                    onChangeText={this._onChangeText}
                    style={styles.input}
                    placeholderTextColor={settings.black}
                />
            </View>
        ): null;
    }

    render() {
        return (
            <FlatList style={{ backgroundColor: settings.backgroundPrimaryColor }}
                data={this.props.songs}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                ListHeaderComponent={this._renderSearchField}
            />
        );
    }
};

const styles = StyleSheet.create({
    inputContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: settings.primaryColor,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: settings.black
	},
    iconContainer: {
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 8
	},
	inputIcon: {
		paddingHorizontal: 8,
		padding: 0
	},
	input: {
		flex: 1,
		padding: 10,
		borderTopRightRadius: 8,
		borderBottomRightRadius: 8,
		backgroundColor: settings.primaryColor,
		color: settings.black
    },
});

const mapStateToProps = (state) => {
    return {
        songs: state.songs.songs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchSong: (id) => dispatch(fetchSong(id)),
        fetchSongsByQuery: (query) => dispatch(fetchSongsByQuery(query)),
        resetSongList: () => dispatch(fetchSongsSuccess(null)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongList);
