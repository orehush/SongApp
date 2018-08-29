import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class Song extends React.Component {
    render() {
        const { song } = this.props;
        return song ? (
            <View>
                <Text>{song.title}</Text>
                <Text>{song.text}</Text>
            </View>
        ): null;
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
