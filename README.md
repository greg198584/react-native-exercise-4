# React Native - Exercises - 4

## Exercice 4 : SignUp et SignIn en React Native

### Objectif

Dans cet exercice, nous allons implémenter des écrans de connexion (SignIn) et d'inscription (SignUp) en React Native. Nous utiliserons une API externe pour gérer l'authentification.

⚠️ Pour une démonstration en vidéo et la présentation de l'API, [référez-vous à cette vidéo YouTube](https://www.youtube.com/@codeurlibre).

### Instructions

1. **Installer les dépendances**

   Vous aurez besoin d'installer `axios` pour effectuer des requêtes HTTP. Utilisez la commande suivante pour l'installer :

   ```bash
   npm install axios
   ```
   Le package pour la navigation par pile (Stack.Navigator).

   ```bash
   npm install @react-navigation/stack
   ```

2. **Création de l'écran SignUp**

   Créez un nouveau fichier `SignUpScreen.js` dans votre dossier `screens`. Vous pouvez utiliser le code suivant comme point de départ :

```jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const SignUpScreen = () => {
   const [email, setEmail] = useState('');
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');

   const handleSignUp = async () => {
      if (email && firstName && lastName && password && confirmPassword) {
         if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas');
            return;
         }

         // Ici, le code pour envoyer les données à l'API
   };

   return (
           <View style={styles.container}>
              <Text style={styles.title}>Sign Up</Text>
              <TextInput
                      style={styles.input}
                      placeholder="Email"
                      onChangeText={setEmail}
              />
              <TextInput
                      style={styles.input}
                      placeholder="First Name"
                      onChangeText={setFirstName}
              />
              <TextInput
                      style={styles.input}
                      placeholder="Last Name"
                      onChangeText={setLastName}
              />
              <TextInput
                      style={styles.input}
                      placeholder="Password"
                      secureTextEntry={true}
                      onChangeText={setPassword}
              />
              <TextInput
                      style={styles.input}
                      placeholder="Confirm Password"
                      secureTextEntry={true}
                      onChangeText={setConfirmPassword}
              />
              <Button title="Sign Up" onPress={handleSignUp} />
           </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   title: {
      fontSize: 24,
      marginBottom: 20,
   },
   input: {
      width: 200,
      height: 40,
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      paddingHorizontal: 10,
   },
});

export default SignUpScreen;
```

3. **Création de l'écran SignIn**

   Suivez les mêmes étapes que pour le `SignUpScreen`, mais cette fois-ci pour un écran de connexion `SignInScreen`.

```jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSignIn = async () => {
        if (email && password) {
           // Ici, le code pour envoyer les données à l'API
        } else {
            alert('Veuillez entrer un email et un mot de passe');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={setPassword}
            />
            <Button title="Sign In" onPress={handleSignIn} />
            <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
});

export default SignInScreen;
```

4. **Mise en place de l'API**

   Utilisez la bibliothèque `axios` pour effectuer des requêtes HTTP vers l'API. Le point d'API pour la création de compte sera `/auth/signup`, et pour la connexion, `/auth/signin`.

```jsx
const handleSignIn = async () => {
   if (email && password) {
      try {
         const response = await axios.post('http://localhost/auth/signin', {
            email,
            password,
         });

         if (response.status === 200 && response.data.token) {
            alert('Connexion réussie');
            // Stocke le token ici (sera fait dans une future vidéo)
            navigation.navigate('Main');
         }
      } catch (error) {
         alert('Erreur de connexion');
      }
   } else {
      alert('Veuillez entrer un email et un mot de passe');
   }
};
```

```jsx
const handleSignUp = async () => {
   if (email && firstName && lastName && password && confirmPassword) {
      if (password !== confirmPassword) {
         alert('Les mots de passe ne correspondent pas');
         return;
      }

      try {
         const response = await axios.post('http://localhost/auth/signup', {
            email,
            nom: firstName,
            prenom: lastName,
            password,
         });

         if (response.status === 201) {
            alert('Inscription réussie');
         }
      } catch (error) {
         alert('Erreur lors de l\'inscription');
      }
   } else {
      alert('Veuillez remplir tous les champs');
   }
};
```

   Gérez les réponses de l'API en vérifiant les codes de statut HTTP. Un code `201` signifie que la création du compte ou la connexion a réussi.

5. **Navigation**

   Utilisez `React Navigation` pour naviguer entre les écrans `SignIn` et `SignUp`.

6. **Modification de la navigation avec `React Navigation`**

   Dans cet exercice, nous allons également apporter des changements à la structure de la navigation. Initialement, nous utilisions `Tab.Navigator` pour naviguer entre différents onglets. Toutefois, avec l'ajout des écrans `SignIn` et `SignUp`, nous devons intégrer un autre type de navigation, à savoir `Stack.Navigator`.

   #### Pourquoi utiliser `Stack.Navigator` ?

   Le `Stack.Navigator` est souvent utilisé pour des transitions entre des écrans où chacun a une relation forte avec l'écran précédent. Il est idéal pour les flux d'authentification, comme c'est le cas ici.

   #### Code modifié dans `App.js`

   Voici comment le code a changé :

```jsx
import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Importation des différents écrans
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const CountContext = createContext();

// Nous avons déplacé le code du `Tab.Navigator` dans une nouvelle fonction `MainTabs`
const MainTabs = () => {
    return (
        <Tab.Navigator>
           <Tab.Screen name="Home" component={HomeScreen} />
           <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

// Dans le composant principal `App`, nous utilisons maintenant `Stack.Navigator`
export default function App() {
   const [count, setCount] = useState(0);
    
    return (
        <CountContext.Provider value={{ count, setCount }}>
            <NavigationContainer>
                <Stack.Navigator>
                   <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }} />
                   <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
                    <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </CountContext.Provider>
    );
}
```

   - Nous avons créé une nouvelle fonction MainTabs qui contient le Tab.Navigator. Cette fonction est appelée dans le Stack.Navigator.
   - Le Stack.Navigator est utilisé pour envelopper l'ensemble des écrans, y compris les écrans d'authentification et les onglets principaux.

   Cela permet d'avoir une navigation par pile pour les écrans SignIn et SignUp tout en conservant la navigation par onglets pour les autres écrans. Cette architecture offre une grande flexibilité et une expérience utilisateur fluide.

7. **Tester votre application**

   Lancez votre application et testez les fonctionnalités de SignUp et SignIn.

