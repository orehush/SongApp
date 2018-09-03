import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import settings from '../config/settings';
import { fetchRandomSong, fetchCollectionsList, fetchLetters } from '../actions/songs';

class Main extends React.Component {

    static navigationOptions = {
        title: 'SongApp',
        headerStyle: {
            backgroundColor: settings.backgroundPrimaryColor,
        },
        headerTitleStyle: {
            color: settings.primaryColor,
            fontWeight: 'bold',
        },
    };

    _selectByNumber = () => {
        this.props.fetchCollectionsList();
        this.props.navigation.navigate('SearchByNumber');
    }

    _navigateToRandomSong = () => {
        this.props.fetchRandomSong();
        this.props.navigation.navigate('Song', { 
            headerTitle: 'Випадкова пісня' 
        });
    }

    _navigateToSearch = () => {
        this.props.navigation.navigate('SongList', { 
            headerTitle: 'Пошук', showSearch: true 
        });
    }

    _navigateToAlphabetic = () => {
        this.props.fetchLetters();
        this.props.navigation.navigate('SearchByLetter');
    }

    _navigateToBookmarks = () => {

    }

    _navigateToHistory = () => {

    }

    render() {
        return (
            <View style={styles.content}>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.col}
                          onPress={() => this._selectByNumber()}>
                        <Icon name="ios-copy" style={styles.icon} 
                          size={80} color={settings.primaryColor} />
                        <Text style={styles.iconText}>По номеру</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.col}
                          onPress={() => this._navigateToAlphabetic()}>
                        <Icon name="ios-information-circle" style={styles.icon} 
                          size={80} color={settings.primaryColor} />
                        <Text style={styles.iconText}>Зміст</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity style={styles.col}
                          onPress={() => this._navigateToSearch()}>
                        <Icon name="ios-search" style={styles.icon} 
                          size={80} color={settings.primaryColor} />
                        <Text style={styles.iconText}>Пошук</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.col}
                          onPress={() => this._navigateToRandomSong()}>
                        <Icon name="ios-help-circle" style={styles.icon} 
                          size={80} color={settings.primaryColor} />
                        <Text style={styles.iconText}>Випадкова пісня</Text>
                    </TouchableOpacity>
                </View>

                {/* <View style={styles.row}>
                    <TouchableOpacity style={styles.col}
                          onPress={() => this._navigateToBookmarks()}>
                        <Icon name="ios-bookmark" style={styles.icon} 
                          size={80} color={settings.primaryColor} />
                        <Text style={styles.iconText}>Закладки</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.col}
                          onPress={() => this._navigateToHistory()}>
                        <Icon name="ios-book" style={styles.icon} 
                          size={80} color={settings.primaryColor} />
                        <Text style={styles.iconText}>Історія</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
        );
    }
};

const styles = StyleSheet.create({
	content: {
        flex: 1,
        backgroundColor: settings.backgroundPrimaryColor,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    col: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {

    },
    iconText: {
        color: settings.primaryColor,
        fontSize: 14,
        fontWeight: 'bold'
    }
});


const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchRandomSong: () => dispatch(fetchRandomSong()),
        fetchCollectionsList: () => dispatch(fetchCollectionsList()),
        fetchLetters: () => dispatch(fetchLetters()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
