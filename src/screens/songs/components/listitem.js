import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import settings from '../../../config/settings';

export class SongListItem extends React.PureComponent {
    render() {
        const { id, title, onPress } = this.props;
        return (
            <TouchableHighlight style={styles.item} onPress={() => onPress(id)}>
                <Text style={styles.itemText}>{title}</Text>
            </TouchableHighlight>
        );
    }
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: settings.primaryColor,
        marginTop: 1,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        height: 40,
        justifyContent: 'center'
    },
    itemText: {
        color: settings.textColor,
        fontSize: 20,
        padding: 5,
        flex: 1
    }
});
