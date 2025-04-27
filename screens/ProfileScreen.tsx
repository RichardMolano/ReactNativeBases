import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, 
  TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { BottomSheetDropdown  } from './hooks/Drop';
import { Menu } from 'react-native-paper';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [gen, setGen] = useState(false);
  const [age, setAge] = useState(0);
  const [saved, setSaved] = useState(false);
  const [savedData, setSavedData] = useState<{ name: string; email: string; bio: string; gen:boolean; age: number} | null>(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const handleSave = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!name || !email || !bio ||!age ) {
      alert('Por favor completa todos los campos.');
      return;
    }
  
    if (!emailRegex.test(email)) {
      alert('Por favor ingresa un correo electrónico válido.');
      return;
    }
  
    // Guardar los datos antes de limpiar
    setSavedData({ name, email, bio , gen, age });
    setSaved(true);
  
    // Limpiar formulario
    setName('');
    setEmail('');
    setBio('');
    setGen(false);
    setAge(0);
  };
  
  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Perfil del Usuario</Text>

      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Correo electrónico"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Biografía"
        style={[styles.input, { height: 100 }]}
        value={bio}
        onChangeText={setBio}
        multiline
      />
      <TouchableOpacity
                  onPress={() => setBottomSheetVisible(true)}
                  style={styles.dropdownButton}
                >
                  <Text style={styles.dropdownButtonText}>
                    {gen ? 'Masculino' : 'Femenino'}
                  </Text>
                </TouchableOpacity>
      
                <BottomSheetDropdown
                  listValue={['Femenino', 'Masculino']}
                  visible={bottomSheetVisible}
                  onDismiss={() => setBottomSheetVisible(false)}
                  onSelect={(value) => setGen(value)}
                />


      {/* edad */}
      <TextInput
        placeholder="Edad"
        style={styles.input}
        value={age.toString()}
        onChangeText={(text) => setAge(Number(text))}
        keyboardType="numeric"
      />

      <Button title="Guardar perfil" onPress={handleSave} />

      {saved && savedData && (
  <View style={styles.result}>
    <Text style={styles.resultText}>✅ Perfil guardado:</Text>
    <Text>👤 Nombre: {savedData.name}</Text>
    <Text>📧 Correo: {savedData.email}</Text>
    <Text>📝 Bio: {savedData.bio}</Text>
    <Text>👫 Género: {savedData.gen ? 'Masculino' : 'Femenino'}</Text>
    <Text>🎂 Edad: {savedData.age}</Text>
  </View>
)}

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  dropdownButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  dropdownButtonText: {
    fontSize: 16,
  },
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  result: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e0ffe0',
    borderRadius: 8
  },
  resultText: {
    fontWeight: 'bold',
    marginBottom: 5
  }
});
