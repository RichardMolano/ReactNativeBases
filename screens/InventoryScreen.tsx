import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';


type Producto = {
  id: string;
  nombre: string;
  precio: number;

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
  
  export default function InventoryScreen() {
    const [productos, setProductos] = useState<Producto[]>([
      { id: '1', nombre: '🧰 Martillo', precio: 20000 },
      { id: '2', nombre: '🔩 Tornillos', precio: 5000 },
      { id: '3', nombre: '🪚 Sierra', precio: 35000 },
    ]);
  
    const [nombreProducto, setNombreProducto] = useState('');
    const [precioProducto, setPrecioProducto] = useState('');
    const [iconoSeleccionado, setIconoSeleccionado] = useState<string | null>(null);
  
    const [modoEdicion, setModoEdicion] = useState(false);
    const [productoEditandoId, setProductoEditandoId] = useState<string | null>(null);
  
    const agregarProducto = () => {
      if (!nombreProducto || !precioProducto || !iconoSeleccionado) {
        Alert.alert('Campos incompletos', 'Por favor completa todos los campos y selecciona un ícono.');
        return;
      }
  
      const precio = parseFloat(precioProducto);
      if (isNaN(precio) || precio <= 0) {
        Alert.alert('Precio inválido', 'Ingresa un número válido como precio.');
        return;
      }
  
      if (modoEdicion && productoEditandoId) {
        const productosActualizados = productos.map((prod) =>
          prod.id === productoEditandoId
            ? { ...prod, nombre: `${iconoSeleccionado} ${nombreProducto}`, precio }
            : prod
        );
        setProductos(productosActualizados);
        setModoEdicion(false);
        setProductoEditandoId(null);
      } else {
        const nuevoProducto: Producto = {
          id: Date.now().toString(),
          nombre: `${iconoSeleccionado} ${nombreProducto}`,
          precio,
        };
        setProductos([...productos, nuevoProducto]);
      }
  
      setNombreProducto('');
      setPrecioProducto('');
      setIconoSeleccionado(null);
    };
  
    const editarProducto = (producto: Producto) => {
      const [icono, ...restoNombre] = producto.nombre.split(' ');
      setIconoSeleccionado(icono);
      setNombreProducto(restoNombre.join(' '));
      setPrecioProducto(producto.precio.toString());
      setModoEdicion(true);
      setProductoEditandoId(producto.id);
    };
  
    const cancelarEdicion = () => {
      setModoEdicion(false);
      setProductoEditandoId(null);
      setNombreProducto('');
      setPrecioProducto('');
      setIconoSeleccionado(null);
    };
  
    const eliminarProducto = (id: string) => {
        if (Platform.OS === 'web') {
          const confirm = window.confirm('¿Estás seguro de que quieres eliminar este producto?');
          if (confirm) {
            setProductos(productos.filter((prod) => prod.id !== id));
            if (productoEditandoId === id) {
              cancelarEdicion();
            }
          }
        } else {
          Alert.alert('Eliminar producto', '¿Estás seguro de que quieres eliminar este producto?', [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Eliminar',
              onPress: () => {
                setProductos(productos.filter((prod) => prod.id !== id));
                if (productoEditandoId === id) {
                  cancelarEdicion();
                }
              },
              style: 'destructive',
            },
          ]);
        }
      };
      
  
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.title}>Inventario as</Text>
      
  
        <View style={styles.form}>
          {modoEdicion && (
            <Text style={styles.editingIndicator}>🔧 Editando producto...</Text>
          )}
  
          <Text style={styles.label}>Selecciona un ícono:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.iconRow}>
            {iconosDisponibles.map((icono, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.iconButton,
                  icono === iconoSeleccionado && styles.iconSelected,
                ]}
                onPress={() => setIconoSeleccionado(icono)}
              >
                <Text style={styles.iconText}>{icono}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
  
          <TextInput
            placeholder="Nombre del producto"
            style={styles.input}
            value={nombreProducto}
            onChangeText={setNombreProducto}
          />
          <TextInput
            placeholder="Precio"
            style={styles.input}
            value={precioProducto}
            onChangeText={setPrecioProducto}
            keyboardType="numeric"
          />
  
          <Button
            title={modoEdicion ? 'Actualizar producto' : 'Agregar producto'}
            onPress={agregarProducto}
          />
          {modoEdicion && (
            <Button
              title="Cancelar edición"
              onPress={cancelarEdicion}
              color="#888"
            />
          )}
        </View>
  
        <FlatList
          style={styles.lista}
          data={productos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View>
                <Text style={styles.name}>{item.nombre}</Text>
                <Text style={styles.price}>${item.precio.toLocaleString()}</Text>
              </View>
              <View style={styles.buttons}>
                <TouchableOpacity onPress={() => editarProducto(item)} style={styles.actionButton}>
                  <Text style={styles.edit}>📝</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => eliminarProducto(item.id)} style={styles.actionButton}>
                  <Text style={styles.delete}>🗑</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </KeyboardAvoidingView>
    );
  }
  
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    form: { marginBottom: 20 },
    label: { marginBottom: 5, fontWeight: 'bold' },
    editingIndicator: {
      fontWeight: 'bold',
      color: '#007bff',
      marginBottom: 10,
      textAlign: 'center',
    },
    iconRow: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    iconButton: {
      backgroundColor: '#ffffff',
      padding: 10,
      marginRight: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    iconSelected: {
      backgroundColor: '#007bff',
      borderColor: '#0056b3',
    },
    iconText: {
      fontSize: 24,
      textAlign: 'center',
    },
    input: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 8,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    lista: { flex: 1 },
    item: {
      backgroundColor: 'white',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      elevation: 2,
    },
    name: { fontSize: 18 },
    price: { fontSize: 18, fontWeight: '600', color: '#333' },
    buttons: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    actionButton: {
      marginLeft: 10,
    },
    edit: {
      fontSize: 20,
    },
    delete: {
      fontSize: 20,
      color: 'red',
    },
  });