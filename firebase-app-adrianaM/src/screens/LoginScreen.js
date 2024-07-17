import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { database, storage, auth } from '../config/firebase';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {

  const [correo, setCorreo] = React.useState('');
  const [contra, setContra] = React.useState('');
  const [loading, setLoading] = useState(false);

  // Función para navegar a la pantalla de inicio
  const goToHome = () => {
    navigation.navigate('Home');
  };

  const handleLogin = async () => {
    try {
      // Validación básica
      if (!correo || !contra) {
        Alert.alert('Error', 'Por favor, complete todos los campos.');
        return;
      }

      // Muestra un indicador de carga
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(auth, correo, contra);

      // Usuario iniciado sesión exitosamente
      Alert.alert('Usuario iniciado', 'El usuario inició sesión correctamente');
      console.log('Usuario iniciado sesión exitosamente:', userCredential.user);
      goToHome();

      // Aquí puedes redirigir al usuario o realizar cualquier otra acción post inicio de sesión
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión: ' + error.message); // Mostrar el mensaje de error específico
      console.error('Error al iniciar sesión', error);
    } finally {
      // Oculta el indicador de carga
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <Text style={styles.title}>Login</Text>
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
      <Button textoBoton='Iniciar sesión' marginBottom={10} marginTop={'15%'} width={'85%'}
        accionBoton={handleLogin} />
      <Button textoBoton='Ir al registro' marginBottom={20} width={'50%'} height={45}
        accionBoton={() => navigation.navigate('Register')} />
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

export default LoginScreen;
