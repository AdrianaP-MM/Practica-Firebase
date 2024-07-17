import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native'; // Importa los estilos y el componente TouchableOpacity de React Native

export default function Button({ textoBoton = 'undefined', accionBoton, width = 180, height = 55, marginTop = 0, marginBottom = 0, }) {
    // Define el estilo dinámico del botón basado en las propiedades recibidas
    const buttonStyle = {
        width: width,
        height: height,
        marginTop: marginTop,
        marginBottom: marginBottom,
    };

    return (
        // Componente de botón que devuelve un TouchableOpacity con el texto personalizado
        <TouchableOpacity style={[styles.button, buttonStyle,]} onPress={accionBoton}>
            <Text style={styles.Text}>
                {textoBoton}
            </Text>
        </TouchableOpacity>
    );
}

// Estilos del componente Button utilizando StyleSheet.create
const styles = StyleSheet.create({
    button: {
        alignItems: 'center', // Centra el contenido horizontalmente
        justifyContent: 'center', // Centra el contenido verticalmente
        backgroundColor: '#2296F3', // Color de fondo del botón
        borderRadius: 10, // Borde redondeado del botón
    },
    Text: {
        fontSize: 16,
        color:'white',
        fontWeight:'bold'
    },
});
