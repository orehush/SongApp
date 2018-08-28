import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import settings from '../config/settings';

class Main extends React.Component {

    static navigationOptions = {
        title: 'Songs App',
        headerStyle: {
            backgroundColor: settings.backgroundPrimaryColor,
        },
        headerTitleStyle: {
            color: settings.primaryColor,
            fontWeight: 'bold',
        },
    };

    _selectByNumber = () => {
        this.props.navigation.navigate('Song');

    }

    _navigateToRandomSong = () => {
        this.props.navigation.navigate('Song');
    }

    _navigateToSearch = () => {

    }

    _navigateToAlphabetic = () => {

    }

    _navigateToBookmarks = () => {

    }

    _navigateToSongBooks = () => {

    }

    render() {
        return (
            <View style={styles.content}>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.col}
                          onPress={() => this._selectByNumber()}>
                        <Ionicons name="ios-copy" style={styles.icon} 
                          size={80} color={settings.primaryColor} />
                        <Text style={styles.iconText}>Find by number</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.col}
                          onPress={() => this._navigateToAlphabetic()}>
                        <Ionicons name="ios-information-circle" style={styles.icon} 
                          size={80} color={settings.primaryColor} />
                        <Text style={styles.iconText}>Alphabetic index</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity style={styles.col}
                          onPress={() => this._navigateToSearch()}>
                        <Ionicons name="ios-search" style={styles.icon} 
                          size={80} color={settings.primaryColor} />
                        <Text style={styles.iconText}>Search</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.col}
                          onPress={() => this._navigateToBookmarks()}>
                        <Ionicons name="ios-bookmark" style={styles.icon} 
                          size={80} color={settings.primaryColor} />
                        <Text style={styles.iconText}>Bookmarks</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <TouchableOpacity style={styles.col}
                          onPress={() => this._navigateToRandomSong()}>
                        <Ionicons name="ios-help-circle" style={styles.icon} 
                          size={80} color={settings.primaryColor} />
                        <Text style={styles.iconText}>Random song</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.col}
                          onPress={() => this._navigateToSongBooks()}>
                        <Ionicons name="ios-book" style={styles.icon} 
                          size={80} color={settings.primaryColor} />
                        <Text style={styles.iconText}>Songbooks</Text>
                    </TouchableOpacity>
                </View>
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
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
