import React from 'react';
import { View, Text, Picker, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import settings from '../../config/settings';
import { fetchSongByNumber } from '../../actions/songs'; 

class SearchByNumber extends React.Component {
    static navigationOptions = {
        headerTitle: 'Пошук по номеру',
        headerTintColor: settings.primaryColor,
        headerStyle: {
            backgroundColor: settings.backgroundPrimaryColor,
        },
        headerTitleStyle: {
            color: settings.primaryColor,
            fontWeight: 'bold',
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            collection: null,
            number: null,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.collections && !this.props.collections && nextProps.collections.length) {
            this.setState({ collection: nextProps.collections[0] });
        }
    }

    _selectCollection = (id) => {
        const { collections } = this.props;
        const selectedCollection = collections.filter(item => item.id == id)[0];
        this.setState({ collection: selectedCollection });
    }

    _onChange = (number) => {
        this.setState({ number });
    }

    _openSongByNumber = () => {
        const { collection, number } = this.state;
        if (collection && number) {
            this.props.fetchSongByNumber(collection.id, number);
            this.props.navigation.navigate('Song', { 
                headerTitle: `${collection.name} ${number}`,
                isNumberNavigation: true
            })
        }
    }
    
    renderPickerItem = (item) => {
        return <Picker.Item style={styles.pickerItem} key={item.id} value={item.id} label={item.name} />;
    }

    render() {
        const { collections } = this.props;
        const items = collections ? collections.map(item => this.renderPickerItem(item)): null;
        return this.state.collection ? (
            <View style={styles.container}>
                <View style={styles.pickerContainer}>
                    <Picker selectedValue={this.state.collection.id} 
                            onValueChange={this._selectCollection}
                            style={styles.picker}>
                        {items}
                    </Picker>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.iconContainer}>
                        <Icon style={styles.inputIcon} name="ios-search" 
                            size={20} color={settings.black} />
                    </View>
                    <TextInput
                        placeholder={`1 - ${this.state.collection.count}`}
                        onChangeText={this._onChange}
                        style={styles.input}
                        keyboardType='numeric'
                        placeholderTextColor={settings.black}
                    />
                </View>
                <TouchableOpacity onPress={this._openSongByNumber} style={styles.button}>
                    <Text style={styles.buttonText}>Перейти</Text>
                </TouchableOpacity>
            </View>
        ): <View style={styles.container}></View>;
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: settings.backgroundPrimaryColor,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    pickerContainer: {
        backgroundColor: settings.primaryColor,
        borderWidth: 1,
        borderColor: settings.black,
        borderRadius: 8,
        width: '100%'
    },
    picker: {
        color: settings.black,
        height: 50,
        margin: 0,
    },
    pickerItem: {
        color: settings.black,
        fontSize: 30,
    },
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
    button: {
        height: 50,
        width: 200,
        borderRadius: 8,
        marginTop: 10,
        backgroundColor: settings.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: settings.black,
        fontSize: 20,
        fontWeight: 'bold',
    }
});

const mapStateToProps = (state) => {
    return {
        collections: state.songs.collections
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchSongByNumber: (collectionId, number) => dispatch(fetchSongByNumber(collectionId, number)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchByNumber);
