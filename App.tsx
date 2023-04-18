import React from 'react';
import {PropsWithChildren, Fragment, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
 StyleSheet,
 Button,
 Pressable,
 Modal,
 FlatList,
 Alert
} from 'react-native';

//Dependencias

//Componentes
import Formulario from './src/components/Formulario';
import Paciente from './src/components/Paciente';
import InformacionPaciente from './src/components/InformacionPaciente';


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
  //se necesita un state para mostrar los clientes
  const [pacientes, setPacientes] = useState([]);
  //declaramos variable reactiva para el editado del paciente
  const [pacienteSelected, setPaciente] = useState({});
  //Otro Modal de informacion de paciente
  const [modalPaciente, setModalPaciente] = useState(false);

  const nuevaCitaHandler = () =>
  {
    //console.log('diste click');
    setModalVisible(true);
    //onPress evento normal, onPressLong evento donde se mantiene presionado, onPressIn cuando se le da al inicio click, onPressOute cuando se suelta el boton
  }

  const pacienteEditar = id =>  //funcion para el seleccionado del paciente a editar
  {
     const pacienteEditar  = pacientes.filter(paciente => paciente.id == id)
     
     setPaciente(pacienteEditar[0]);
  }

  const pacienteEliminar = id => 
  {
    //console.log('eliminando', id)
    Alert.alert(
      '¿Deseas eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        {text:'Cancelar'},{text:'Si, eliminar', onPress:() => {
          //console.log('eliminando')
          const pacientesActualizado = pacientes.filter(pacientesState => pacientesState.id !== id )
          setPacientes(pacientesActualizado)
        }}
      ]
    )
  }

  const cerrarModal = () =>  //funcion para cerrar modal del formulario
  {
    setModalVisible(false)
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

      {
        //si la cantidad de pacientes es igual a 0 
        pacientes.length === 0 ? 
        <Text style={styles.noPacientes}>No hay pacientes aun.</Text> :
        <FlatList style={styles.listado} data={pacientes} keyExtractor={(item) => item.id} renderItem={({item}) => { //itera items y muestra esos items
          return (
            <Paciente 
            item={item}
            setModalVisible={setModalVisible} 
            pacienteEditar={pacienteEditar} 
            pacienteEliminar = {pacienteEliminar} 
            setModalPaciente = {setModalPaciente}
            setPaciente = {setPaciente}
            />
          )
         }} />
      }

      {modalVisible && ( //Condicional para montar o desmontar el componente y que no se este poniendo los datos en el form
         <Formulario 
         cerrarModal={cerrarModal}
         setPacientes={setPacientes} 
         pacientes={pacientes} pacienteSelected={pacienteSelected} setPaciente={setPaciente} /> 
      )}
      <Modal visible={modalPaciente} animationType='fade'>
         <InformacionPaciente paciente={pacienteSelected} setModalPaciente={setModalPaciente} setPaciente={setPaciente}/>
      </Modal>
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
  },
  noPacientes:{
    marginTop:40,
    textAlign:'center',
    fontSize:24,
    fontWeight:'600',
    color: '#374151',
  },
  listado:{
    marginTop:50,
    marginHorizontal:30
  }
});

export default App;
