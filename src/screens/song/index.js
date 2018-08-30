import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import settings from '../../config/settings';

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
            fontSize: 16,
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ increaseFont: this._increaseFont });
        this.props.navigation.setParams({ decreaseFont: this._decreaseFont });
    }

    _increaseFont = () => {
        const current = this.state.fontSize;
        this.setState({ fontSize: current >= 23 ? 23: current + 1 });
    }

    _decreaseFont = () => {
        const current = this.state.fontSize;
        this.setState({ fontSize: current <= 12 ? 12: current - 1 });
    }

    renderSong() {
        const { song } = this.props;
        return song ? (
            <ScrollView>
                <Text style={[styles.text, styles.title]}>{song.title}</Text>
                <View style={styles.collection}>
                    <Text style={styles.text}>{song.name} {song.number}</Text>
                </View>
                <Text style={[styles.text, styles.song, { fontSize: this.state.fontSize }]}>{song.text}</Text>
            </ScrollView>
        ): <Text style={styles.text}>Помилка завантаження пісні</Text>;
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderSong()}       
            </View>
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
        color: settings.black,
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Song);
