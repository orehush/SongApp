import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class Song extends React.Component {
    render() {
        return (
            <View>
                <Text>{this.props.song.title}</Text>
            </View>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        song: state.song.song
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Song);
