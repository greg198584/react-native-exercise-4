import React from 'react';
import { Button } from 'react-native';

const ProfileButton = ({ onPress }) => (
    <Button title="Voir le profil" onPress={onPress} />
);

export default ProfileButton;