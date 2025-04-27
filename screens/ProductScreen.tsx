import { View, Text ,ScrollView , StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants/colors';

type Producto = {
  id: string;
  nombre: string;
  precio: number;
  useded?: boolean; // Añadido para indicar si el producto está usado o no
  description?: string; // Añadido para la descripción del producto
};
const iconosDisponibles = [
  // Herramientas
  '🧰', '🔩', '🪚', '🧲', '🧤', '🔧', '📏', '🪛',
  // Tecnología
  '💻', // laptop
  '🖥️', // desktop
  '🖨️', // printer
  '🖱️', // mouse
  '⌨️', // keyboard
  '💾', // floppy disk
  '📡', // antenna
  '🛜', // wifi
  '🧮', // calculator
  '🧑‍💻', // coder
];
export default function ProductScreen() {
  let products: Producto[] = [
    { id: '1', nombre: '🔧 Martillo', precio: 100, useded: false, description: 'Duradero de mango de maderia y cabeza de acero inoxidable' },
    { id: '2', nombre: '🪛 Destornillador', precio: 50, useded: true, description: 'Destornillador de acero inoxidable' },
    { id: '3', nombre: '🪚 Sierra', precio: 150, useded: false, description: 'Sierra de mango de maderia y hoja de acero inoxidable' },
    { id: '4', nombre: '🔧 Llave inglesa', precio: 200, useded: true, description: 'Llave inglesa de acero inoxidable' },
    { id: '5', nombre: '🧰 Alicates', precio: 120, useded: false, description: 'Alicates de mango de maderia y cabeza de acero inoxidable' },
  ];
    
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
        <Text style={styles.textTitle}>Lista de productos</Text>
  <ScrollView style={styles.space }>
        {products.map((product) => (
          <View key={product.id} style={ styles.element}>
            <Text style={styles.textElt}> {product.nombre}</Text>
            <Text style={styles.text}>Precio: ${product.precio}</Text>
            <Text style={styles.text}>Usado: {product.useded ? 'Sí' : 'No'}</Text>
            <Text style={styles.text}>Descripción: {product.description}</Text>
          </View>
        ))}
        </ScrollView>
      {/* lista products */}

      {/* Botón para volver al inicio */}
      
      <Button title="Volver al inicio" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  space: { marginTop: 20, marginBottom: 20, paddingHorizontal: 10 },
  textElt: { fontSize: 20, marginBottom: 8, fontWeight: 'bold' },
  textTitle: { fontSize: 26, marginBottom: 16, fontWeight: 'bold', color: colors.adons },
  element: { marginBottom: 15, padding: 10,backgroundColor: '#deefff', borderRadius: 8 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 20 },
  text: { fontSize: 18, marginBottom: 8, color: '#555' },
});
