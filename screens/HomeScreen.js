import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import ProfileButton from '../components/ProfileButton';
import { CountContext } from '../App';

const HomeScreen = ({ navigation }) => {
    const { count, setCount } = useContext(CountContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue à la maison !</Text>
            <Image
                style={styles.image}
                source={require('../assets/home.png')}
            />
            <Text style={styles.text}>Ceci est une démonstration de React Native.</Text>
            <Text style={styles.text}>Nombre de visites : {count}</Text>
            <Button title="Visiter" onPress={() => setCount(count + 1)} />
            <ProfileButton onPress={() => navigation.navigate('Profile')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    image: {
        width: 200,
        height: 200,
        margin: 15,
    },
    text: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default HomeScreen;