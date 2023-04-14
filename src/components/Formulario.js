import React, {useState} from 'react'
import { Modal, Text, SafeAreaView, StyleSheet, TextInput, View, ScrollView } from 'react-native'
import DatePicker from 'react-native-date-picker';

const Formulario = ({modalVisible}) => 
{
   const [paciente, setPaciente] = useState('');
   const [propietario, setPropietario] = useState('');
   const [emailPropietario, setEmailPropietario] = useState('');
   const [telefonoPropietario, setTelefonoPropietario] = useState('');
   const [fecha, setFecha] = useState(new Date());
   const [sintomas, setSintomas] = useState('');

  return (
    <Modal animationType='slide' visible={modalVisible}>
        <SafeAreaView style={styles.contenido}>
          <ScrollView>
            <Text style={styles.titulo}>Nueva {''}
                <Text style={styles.tituloBold}>Cita</Text>
            </Text> 
            <View style={styles.campo}>
                <Text style={styles.label}>Nombre De Paciente</Text>
                <TextInput style={styles.input} value={paciente} onChangeText={setPaciente} placeholder='Nombre De Paciente' placeholderTextColor={'#666'} />
            </View>
            <View style={styles.campo}>
                <Text style={styles.label}>Nombre De Propietario</Text>
                <TextInput style={styles.input} value={propietario} onChangeText={setPropietario}  placeholder='Nombre De Propietario' placeholderTextColor={'#666'} />
            </View>
            <View style={styles.campo}>
                <Text style={styles.label}>Email De Propietario</Text>
                <TextInput keyboardType='email-address' style={styles.input} value={emailPropietario} onChangeText={setEmailPropietario}  placeholder='Email De Propietario' placeholderTextColor={'#666'} />
            </View>
            <View style={styles.campo}>
                <Text style={styles.label}>Teléfono De Propietario</Text>
                <TextInput keyboardType='phone-pad' style={styles.input} value={telefonoPropietario} onChangeText={setTelefonoPropietario} placeholder='Teléfono De Propietario' placeholderTextColor={'#666'} maxLength={10} />
            </View>
            <View style={styles.campo}>
                <Text style={styles.label}>Fecha De Alta</Text>
                <View style={styles.fechaContenedor}>
                   <DatePicker date={fecha} locale='es' mode='date' />
                </View>
            </View>
            <View style={styles.campo}>
                <Text style={styles.label}>Síntomas</Text>
                <TextInput  style={[styles.input, styles.inputSintomas]} value={sintomas} onChangeText={setSintomas} placeholder='Síntomas propietario' placeholderTextColor={'#666'} multiline= {true} numberOfLines={4} />
            </View>
          </ScrollView>
        </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
 contenido:{
     backgroundColor:'#6D28D9',
     flex:1,
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
  campo:{
     marginTop:10,
     marginHorizontal:30,
     marginBottom:10
  },
  input:{
    backgroundColor:'white',
    padding:15,
    borderRadius:10,
  },
  label:{
    color:'white',
    marginBottom:10,
    marginTop:15,
    fontSize:20,
    fontWeight:'600'
  },
  inputSintomas:{
    height:100
  },
  fechaContenedor:{
    backgroundColor:'white'
  }
});

export default Formulario