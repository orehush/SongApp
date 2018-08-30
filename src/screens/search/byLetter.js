import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import settings from '../../config/settings';
import { fetchSongsByLetter } from '../../actions/songs';

class SearchByLetter extends React.Component {

    static navigationOptions = {
        headerTitle: 'Зміст',
        headerTintColor: settings.primaryColor,
        headerStyle: {
            backgroundColor: settings.backgroundPrimaryColor,
        },
        headerTitleStyle: {
            color: settings.primaryColor,
            fontWeight: 'bold',
        },
    };

    _onPress = (letter) => {
        this.props.fetchSongsByLetter(letter);
        this.props.navigation.navigate('SongList', { headerTitle: `Зміст - ${letter}`});
    }

    renderButton(letter) {
        return (
            <TouchableOpacity style={styles.button} onPress={() => this._onPress(letter)}>
                <Text style={styles.buttonText}>{letter}</Text>
            </TouchableOpacity>
        );
    }

    renderButtonContainer(buttons) {
        return (
            <View style={styles.buttonContainer}>{buttons}</View>
        );
    }

    render() {
        const { letters } = this.props;
        let buttons = [];
        let buttonsContainer = [];
        if (letters) {
            for (let letter of letters) {
                buttons.push(this.renderButton(letter));
                if (buttons.length == 4) {
                    buttonsContainer.push(this.renderButtonContainer(buttons))
                    buttons = [];
                }
            }
            if (buttons.length) buttonsContainer.push(this.renderButtonContainer(buttons));
        }
        return (
            <ScrollView style={styles.container}>
                {buttonsContainer}
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
	container: {
        backgroundColor: settings.backgroundPrimaryColor,
        flex: 1, 
        flexDirection: 'column', 
    },
    buttonContainer: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    button: {
        width: 60,
        height: 60,
        backgroundColor: settings.primaryColor,
        borderRadius: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: settings.black,
        fontSize: 32,
        fontWeight: 'bold'
    }
});


const mapStateToProps = (state) => {
    return {
        letters: state.songs.letters
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchSongsByLetter: (letter) => dispatch(fetchSongsByLetter(letter)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchByLetter);
