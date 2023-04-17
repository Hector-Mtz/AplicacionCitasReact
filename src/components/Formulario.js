import React, {useState, useEffect} from 'react';
import { Modal, Text, SafeAreaView, StyleSheet, TextInput, View, ScrollView, 
         Pressable, Alert } from 'react-native'; 
import DatePicker from 'react-native-date-picker';

const Formulario = ({modalVisible,
  setModalVisible, 
  setPacientes, 
  pacientes, 
  pacienteSelected,
  setPaciente:setPacienteApp}) => 
{
   const [id, setId] = useState('');
   const [paciente, setPaciente] = useState('');
   const [propietario, setPropietario] = useState('');
   const [emailPropietario, setEmailPropietario] = useState('');
   const [telefonoPropietario, setTelefonoPropietario] = useState('');
   const [fecha, setFecha] = useState(new Date());
   const [sintomas, setSintomas] = useState('');

  //UseEffect
   //Siempre tiene una funcion dentro de el que se ejecuta una vez que el componente cambia o cuando el componente esta listo
   useEffect(()=>{
     if(Object.keys(pacienteSelected).length > 0) //si existe el objeto y tiene valores se colocan sino se dejan vacios
     {
      // console.log('si hay algo')
      //console.log(pacienteSelected)set
      setId(pacienteSelected.id)
      setPaciente(pacienteSelected.paciente)
      setPropietario(pacienteSelected.propietario)
      setEmailPropietario(pacienteSelected.emailPropietario)
      setTelefonoPropietario(pacienteSelected.telefonoPropietario)
      setFecha(pacienteSelected.fecha)
      setSintomas(pacienteSelected.sintomas)

      setPacienteApp({})
      
     }                   //cada ves que cambia el pacienteSelected, se eejcuta el codigo anterior
   },[pacienteSelected]) //solo se ejecutara una vez y si se le pasa alguna variable reactiva, solo hasta que esta cambie se hara

   //funcion para el agregado de pacientes
   const handleNuevaCita = () => 
   {
      //console.log('presionaste agregar paciente');
      // pasamos arreglo con todos los valores del formulario}
      if([paciente, propietario, emailPropietario, telefonoPropietario, fecha, sintomas].includes('')) //includes revisara si alguno esta vacio 
      {
         Alert.alert(
          'Error',  //titulo de alerta
          'Todos los campos son obligatorios',  //descripcion de problema
          //[{text:'Recordame despues'},{text:'Cancelar'}, {text:'OK'}] //puede haber mas botones y el orden de estos cambia dependiendo cuantos botones sean
         );

         return 
      }

      const nuevoPaciente = {  //nuevo objeto con la info que ingreso el usuario
        paciente,
        propietario,
        emailPropietario,
        telefonoPropietario,
        fecha,
        sintomas
     }   

      //Revisar si es un registro nuevo o edicion
      if(id) //Editado
      {
        nuevoPaciente.id = id
        //No se puede modificar directamente el arreglo actual, se tiene que crear otro para ello
        const pacientesActualizados = pacientes.map(pacienteState => //para ello comprobamos el id seleccionado a editar
          pacienteState.id == nuevoPaciente.id ? nuevoPaciente : pacienteState) //map devuelve un nuevo arrreglo

          setPacientes(pacientesActualizados)
      }
      else //Nuevo registro 
      {
         
         nuevoPaciente.id = Date.now() //id temporal ya que no hay valores de bd ya que se necesita para la muestra de pacientes en app
         setPacientes([...pacientes, nuevoPaciente])  //toma una copia de pacientes y le agrega el nuevo paciente en dado caso de que haya
      }


      setModalVisible(!modalVisible); //una vez agregado el nuevo paciente se cierra el modal

      //Se setean los valores en vacios nuevamente para el reseteo del formulario
      setPaciente('');
      setPropietario('');
      setEmailPropietario('');
      setSintomas('');
      setTelefonoPropietario('');
      setFecha(new Date());
   }

  return (
    <Modal animationType='slide' visible={modalVisible}>
        <SafeAreaView style={styles.contenido}>
          <ScrollView>
            <Text style={styles.titulo}> {pacienteSelected.id ? 'Editar' : 'Nueva'} {''}
                <Text style={styles.tituloBold}>Cita</Text>
            </Text> 

            <Pressable style={styles.btnCancel} onLongPress={()=>{
              setModalVisible(!modalVisible)

              setPacienteApp({});   
              setPaciente('');
              setPropietario('');
              setEmailPropietario('');
              setSintomas('');
              setTelefonoPropietario('');
              setFecha(new Date());

            }}>
               <Text style={styles.btnCancelTexto}>X Cancelar</Text>
            </Pressable>

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
                   <DatePicker date={fecha} locale='es' mode='date' onDateChange={(date)=>setFecha(date)} />
                </View>
            </View>
            <View style={styles.campo}>
                <Text style={styles.label}>Síntomas</Text>
                <TextInput  style={[styles.input, styles.inputSintomas]} value={sintomas} onChangeText={setSintomas} placeholder='Síntomas propietario' placeholderTextColor={'#666'} multiline= {true} numberOfLines={4} />
            </View>
            <Pressable style={styles.btnNuevaCita} onPress={handleNuevaCita}>
               <Text style={styles.btnNuevaCitaTexto}> {pacienteSelected.id ? 'Editar' : 'Agregar'} paciente</Text>
            </Pressable>
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
  btnCancel:{
    marginTop:20,
    marginVertical:30,
    backgroundColor:'#5827A4',
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
    backgroundColor:'white',
    borderRadius:10,
  },
  btnNuevaCita:{
     marginVertical:50,
     backgroundColor:'#F59E0B',
     paddingVertical:15,
     marginHorizontal:30,
     borderRadius:10,
  },
  btnNuevaCitaTexto:{
    textAlign:'center',
    color:'#5827A4',
    textTransform:'uppercase',
    fontWeight:'900',
    fontSize:16
  }
});

export default Formulario
