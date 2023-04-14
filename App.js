import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native';

import api from './src/services/api';
import { useState, useRef } from 'react';

export default function App() {
  const [cep, setCep] = useState('');
  const [cepUser, setCepUser] = useState(null)
  const inputRef = useRef(null);

  function handleClean() {
    console.log('teste')
    setCep('')
    inputRef.current.focus();
    setCepUser(null)
  }

  async function hadleSearch() {
    if (cep == '') {
      alert('Digite um cep valido');
      setCep('');
      return;
    }

    try {
      const response = await api.get(`/${cep}/json`);
      console.log(response.data)
      setCepUser(response.data);
      Keyboard.dismiss();

    } catch (error) {
      console.log('ERROR: ' + error);
      alert('Digite um cep valido');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.text}>Digite o CEP desejado</Text>
        <TextInput
          style={styles.input}
          placeholder='Ex: 99999999'
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          keyboardType='numeric'
          ref={inputRef}
        />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#1dd' }]}
          onPress={hadleSearch}
        >
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#1d77' }]}
          onPress={handleClean}
        >
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {
        cepUser && (
          <View style={styles.resultado}>
            <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
            <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
            <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
            <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
            <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
          </View>
        )
      }
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 50,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: '90%',
    padding: 14,
    fontSize: 18,
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  botao: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
  },
  botaoText: {
    fontSize: 20,
    color: '#ffb'
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 20
  }
});
