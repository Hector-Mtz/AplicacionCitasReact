import React from 'react'
import {Text, SafeAreaView, Pressable, View, StyleSheet} from 'react-native'
import {formatearFecha} from './helpers';

const InformacionPaciente = ({paciente, setModalPaciente, setPaciente}) => {
  return (
    <SafeAreaView style={styles.contenedor}>
       <Text style={styles.titulo}>Información {''}
         <Text style= { styles.tituloBold}>Paciente</Text>
       </Text>
       <View>
         <Pressable style={styles.btnCancel} onLongPress={()=>{
          setModalPaciente(false)
          setPaciente({})
          }} >
            <Text style={styles.btnCancelTexto}>
              X Cerrar 
            </Text>
         </Pressable>
      </View>
       <View style={styles.contenido}>
          <View style={styles.campo}>
             <Text style={styles.label}>Nombre paciente:</Text>
             <Text style={styles.valor}>{paciente.paciente}</Text>
          </View>
          <View style={styles.campo}>
             <Text style={styles.label}>Nombre propietario:</Text>
             <Text style={styles.valor}>{paciente.propietario}</Text>
          </View>
          <View style={styles.campo}>
             <Text style={styles.label}>Email propietario:</Text>
             <Text style={styles.valor}>{paciente.emailPropietario}</Text>
          </View>
          <View style={styles.campo}>
             <Text style={styles.label}>Teléfono propietario:</Text>
             <Text style={styles.valor}>{paciente.telefonoPropietario}</Text>
          </View>
          <View style={styles.campo}>
             <Text style={styles.label}>Fecha:</Text>
             <Text style={styles.valor}>{formatearFecha(paciente.fecha)}</Text>
          </View>
          <View style={styles.campo}>
             <Text style={styles.label}>Sintomas:</Text>
             <Text style={styles.valor}>{paciente.sintomas}</Text>
          </View>
       </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contenedor:{
    backgroundColor:'#F59E0B',
    flex:1
  },
  titulo:{
    fontSize:30,
    textAlign:'center',
    fontWeight:'600',
    marginTop:30,
    color:'white'
  },
  tituloBold:{
    fontWeight:'900'
  },
  btnCancel:{
    marginTop:20,
    marginVertical:30,
    backgroundColor:'#E06900',
    marginHorizontal:30,
    padding:15,
    borderRadius:10,
    borderWidth:1,
  },
  btnCancelTexto:{
    color:'white',
    textAlign:'center',
    fontWeight:'900',
    fontSize:20,
    textTransform:'uppercase'
  },
  contenido:{
    backgroundColor:'white',
    marginHorizontal:30,
    borderRadius:10,
    padding:20,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
  },
  campo:{
   marginBottom:10
  },
  label:{
   textTransform:'uppercase',
   color:'#374151',
   fontWeight:'600',
   fontSize:12
  },
  valor:
  {
    fontWeight:'700',
    fontSize:20,
    color:'#334155'
  }
})

export default InformacionPaciente
