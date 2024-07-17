import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { database, storage, auth } from '../config/firebase';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const RegisterScreen = ({ navigation }) => {

  const [correo, setCorreo] = React.useState('');
  const [contra, setContra] = React.useState('');
  const [loading, setLoading] = useState(false);

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegistro = async () => {
    try {
      // Validación básica
      if (!correo || !contra) {
        Alert.alert('Error', 'Por favor, complete todos los campos.');
        return;
      }

      // Muestra un indicador de carga
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(auth, correo, contra);

      // Usuario creado exitosamente
      Alert.alert('Usuario creado', 'El usuario se registró correctamente');
      console.log('Usuario creado exitosamente:', userCredential.user);
      goToLogin();

      // Aquí puedes redirigir al usuario o realizar cualquier otra acción post registro
    } catch (error) {
      console.error('Error al agregar el usuario', error);
      Alert.alert('Error', 'Ocurrió un error al agregar el usuario: ' + error.message);
    } finally {
      // Oculta el indicador de carga
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <Text style={styles.title}>Registro de usuarios</Text>
      <Input
        placeholder='Ingrese un correo electrónico'
        keyboardType='Email'
        onChangeText={(text) => setCorreo(text)}
      />
      <Input
        placeholder='Ingrese una contraseña'
        keyboardType='Password'
        secureTextEntry={true}
        onChangeText={(text) => setContra(text)}
      />
      <Button textoBoton='Registrarse' marginBottom={10} marginTop={'15%'} width={'85%'}
        accionBoton={handleRegistro} />
      <Button textoBoton='Regresar al Login' marginBottom={20} width={'50%'} height={45}
        accionBoton={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: '15%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default RegisterScreen;
