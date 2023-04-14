import React from 'react';
import {PropsWithChildren, Fragment, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
 StyleSheet,
 Button,
 Pressable,
 Modal
} from 'react-native';

//Dependencias

//Componentes
import Formulario from './src/components/Formulario';


type SectionProps = PropsWithChildren<{
  title: string;
}>;

/*
  *Hooks
  Se dividen en basicos:
   useState, useEffet, useContext
  y adicionales:
   useReducer, useCallback, useMemo, useRef, useImperativeHandle, useLayoutEffect, useDebugValue
   - Se pueden crear propios Hooks
   - Se colocan en la parte superior de tus componentes de React

   *State
   Es basicamente el estado de la aplicacion, es una variable con info reelevante en la aplicacion de React
   a vecse el state pertenece a un componente especifico o otras veces se puede compartir

*/

function App(): JSX.Element {

  //Los hooks se colocan en la parte superior antes de los componentes
  const [modalVisible, setModalVisible] = useState(false); //es como una variable reactive

  const nuevaCitaHandler = () =>
  {
    //console.log('diste click');
    setModalVisible(true);
    //onPress evento normal, onPressLong evento donde se mantiene presionado, onPressIn cuando se le da al inicio click, onPressOute cuando se suelta el boton
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style = {styles.titulo}>Administrador de citas
          <Text style = {styles.tituloBold}> Veterinaria</Text>
      </Text>
      <Pressable style={styles.btnNuevaCita}>
        <Text style={styles.btnTextNuevaCita} onPress={nuevaCitaHandler}>  
           Nueva cita
        </Text>
      </Pressable>
      <Formulario modalVisible= {modalVisible} setModalVisible={setModalVisible} /> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
     backgroundColor:'#F3F4F6',
     flex:1 // con flex 1 toma todo el contenido de arriba hacia abajo
  },
  titulo: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 24,
    color: '#374151',
    fontWeight: '600'
  },
  tituloBold: {
    fontWeight:'900',
    color:'#6D28D9'
  },
  btnNuevaCita:{
    backgroundColor:'#6D28D9',
    padding: 15,
    margin:30,
    borderRadius:20
  },
  btnTextNuevaCita: {
    textAlign:'center',
    color:'white',
    fontWeight:'900',
    textTransform: 'uppercase',
    fontSize:18
  }
});

export default App;
