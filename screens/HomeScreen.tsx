import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import iconSet from '@expo/vector-icons/build/Fontisto';

export default function HomeScreen() {
  const navigation = useNavigation();

  
/*   if (route.name === 'Inicio') {
    iconName = 'home';
  } else if (route.name === 'Productos') {
    iconName = 'pricetags';
  } else if (route.name === 'Perfil') {
    iconName = 'person';
  } else if (route.name === 'Inventario') {
    iconName = 'cube';
  } */

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla Inicial- App USTA </Text>
      <TouchableOpacity
      style={styles.TouchableOpacity}
      onPress={() => navigation.navigate('Productos' as never)}
      >
      <Text style={{ color: '#fff' }}>Ir a Productos</Text>
      </TouchableOpacity>
      <View style={{ height: 20 }} />
      <TouchableOpacity
      style={styles.TouchableOpacity}
      onPress={() => navigation.navigate('Perfil' as never)}
      >
      <Text style={{ color: '#fff' }}>Ir a Perfil</Text>
      </TouchableOpacity>
      <View style={{ height: 20 }} />
      <TouchableOpacity
      style={styles.TouchableOpacity}
      onPress={() => navigation.navigate('Inventario' as never)}
      >
      <Text style={{ color: '#fff' }}>Ir a Inventario</Text>
      </TouchableOpacity>
      <View style={{ height: 20 }} />
      <TouchableOpacity
      style={styles.TouchableOpacity}
      onPress={() => navigation.navigate('AcercaDe' as never)}
      >
      <Text style={{ color: '#fff' }}>Ir a Acerca de</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, marginBottom: 16 },
  TouchableOpacity: {
    backgroundColor: '#007bff',
    width: '80%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },


});
