import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import settings from '../../config/settings';
import { increaseFontSize, decreaseFontSize, nextSong, prevSong } from '../../actions/songs';

const HeaderButtons = (props) => {
    const increase = props.navigation.getParam('increaseFont');
    const decrease = props.navigation.getParam('decreaseFont');

    return (
        <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.headerButton} onPress={() => increase()}>
                <Text style={[styles.headerButtonText, {fontSize: 24}]}>A+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={() => decrease()}>
                <Text style={[styles.headerButtonText, {fontSize: 18}]}>A-</Text>
            </TouchableOpacity>
        </View>
    );
}

class Song extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: navigation.getParam('headerTitle'),
            headerRight: <HeaderButtons navigation={navigation}/>,
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            fontSize: 16,
            isRandomSong: false,
            collectionId: null,
            number: null,
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ increaseFont: this._increaseFont });
        this.props.navigation.setParams({ decreaseFont: this._decreaseFont });
        this.setState({
            isRandomSong: this.props.navigation.getParam('isRandomSong'),
            isNumberNavigation: this.props.navigation.getParam('isNumberNavigation'),
        })
    }

    _increaseFont = () => {
        this.props.increaseFontSize();
    }

    _decreaseFont = () => {
        this.props.decreaseFontSize();
    }

    onSwipeLeft = () => {
        if (!this.props.isError)
            this.props.nextSong(this.state);
    }

    onSwipeRight = () => {
        if (!this.props.isError)
            this.props.prevSong(this.state);
    }

    renderError() {
        return (
            <Text style={styles.text}>Помилка завантаження пісні</Text>
        );
    }

    renderSong() {
        const { song } = this.props;
        return (
            
            <ScrollView>
                <Text style={[styles.text, styles.title]}>{song.title}</Text>
                <View style={styles.collection}>
                    <Text style={styles.text}>{song.name} {song.number}</Text>
                </View>
                <Text style={[styles.text, styles.song, { fontSize: this.props.fontSize }]}>{song.text}</Text>
            </ScrollView>
        )
    }

    renderLoading() {
        return (
            <ActivityIndicator size="large" color={settings.primaryColor}  />
        );
    }

    render() {
        const config = {
            velocityThreshold: 0.5,
            directionalOffsetThreshold: 80
        };

        return (
            <GestureRecognizer
                onSwipeLeft={(state) => this.onSwipeLeft(state)}
                onSwipeRight={(state) => this.onSwipeRight(state)}
                config={config}
                style={{flex: 1}}
            >
                <View style={styles.container}>
                    {
                        this.props.loading? 
                        this.renderLoading():
                        this.props.isError? 
                        this.renderError(): 
                        this.renderSong() 
                    }     
                </View>
            </GestureRecognizer>
        )
    }
};

const styles = StyleSheet.create({
    headerButtons: {
        flex: 1,
        flexDirection: 'row',
        marginRight: 10,
    },
    headerButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 40,
        margin: 5,
        backgroundColor: settings.primaryColor,
        borderRadius: 4,
    },
    headerButtonText: {
        color: settings.textColor,
        fontWeight: 'bold',
    },
    container: {
        backgroundColor: settings.backgroundPrimaryColor,
        flex: 1,
    },
    collection: {
        flex: 1,
        alignItems: 'flex-end', 
        marginRight: 5
    },
    title: {
        fontSize: 24
    },
    song: {
        fontSize: 16,
        padding: 4
    },
    text: {
        color: settings.primaryColor,
        margin: 5
    }
});

const mapStateToProps = (state) => {
    return {
        song: state.song.song,
        loading: state.song.loading,
        isError: state.song.isError,
        fontSize: state.song.fontSize,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        increaseFontSize: () => dispatch(increaseFontSize()),
        decreaseFontSize: () => dispatch(decreaseFontSize()),
        nextSong: (params) => dispatch(nextSong(params)),
        prevSong: (params) => dispatch(prevSong(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Song);
