
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';

export default function App() {
  const [projetos, setProjetos] = useState([]);
  const [codigoBusca, setCodigoBusca] = useState('');

  const buscarProjetos = () => {
    const url = codigoBusca
      ? `http://localhost:3000/projetos/${codigoBusca}`
      : 'http://localhost:3000/projetos';

    fetch(url)
      .then(res => res.json())
      .then(data => setProjetos(Array.isArray(data) ? data : [data]))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    buscarProjetos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projetos Mecânicos e Elétricos</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar por código"
        keyboardType="numeric"
        onChangeText={setCodigoBusca}
        onSubmitEditing={buscarProjetos}
      />
      <FlatList
        data={projetos}
        keyExtractor={item => item.CodigoProjeto.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            [{item.CodigoProjeto}] {item.Titulo} ({item.Tipo}, {item.Ano}) - {item.Responsavel}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  title: { fontSize: 24, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 },
  item: { fontSize: 16, marginBottom: 5 }
});
