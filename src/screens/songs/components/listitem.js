import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import settings from '../../../config/settings';

export class SongListItem extends React.PureComponent {
    render() {
        const { id, title, onPress } = this.props;
        return (
            <TouchableOpacity style={styles.item} onPress={() => onPress(id)}>
                <Text style={styles.itemText}>{title}</Text>
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: settings.backgroundSecondColor,
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
