import React from 'react';
import { View, Text, Picker, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import settings from '../../config/settings';
import { fetchSongByNumber } from '../../actions/songs'; 

class SearchByNumber extends React.Component {
    static navigationOptions = {
        headerTitle: 'Пошук по номеру',
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
                            size={20} color={settings.textColor} />
                    </View>
                    <TextInput
                        placeholder={`1 - ${this.state.collection.count}`}
                        onChangeText={this._onChange}
                        style={styles.input}
                        keyboardType='numeric'
                        placeholderTextColor={settings.textColor}
                        onSubmitEditing={this._openSongByNumber}
                    />
                </View>
                <TouchableOpacity onPress={this._openSongByNumber} style={styles.button}>
                    <Text style={styles.buttonText}>Перейти</Text>
                </TouchableOpacity>
              <ScrollView style={styles.descriptionBlock}>
                <Text style={styles.description}>{this.state.collection.description}</Text>
              </ScrollView>
            </View>
        ): <View style={styles.container}></View>;
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: settings.backgroundPrimaryColor,
        alignItems: 'center'
    },
    pickerContainer: {
        backgroundColor: settings.backgroundSecondColor,
        borderWidth: 1,
        borderColor: settings.backgroundSecondColor,
        borderRadius: 8,
        width: '100%',
        marginBottom: 1
    },
    picker: {
        color: settings.textColor,
        height: 50,
        margin: 0,
    },
    pickerItem: {
        color: settings.textColor,
        fontSize: 30,
    },
    inputContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: settings.backgroundSecondColor,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: settings.backgroundSecondColor
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
		backgroundColor: settings.backgroundSecondColor,
		color: settings.textColor
    },
    button: {
        height: 50,
        width: 200,
        borderRadius: 8,
        marginTop: 10,
        backgroundColor: settings.backgroundSecondColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: settings.textColor,
        fontSize: 20,
        fontWeight: 'bold',
    },
  descriptionBlock: {
    margin: 15,
  },
  description: {
        fontSize: 16,
        color: settings.primaryColor,
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
