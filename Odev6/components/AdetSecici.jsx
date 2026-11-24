import { Pressable, StyleSheet, View } from 'react-native';
import ThemedText from './ThemedText';

export default function AdetSecici({ adet, onArtir, onAzalt }) {
  return <View style={styles.row}><Pressable onPress={onAzalt} style={styles.button}><ThemedText style={styles.symbol}>−</ThemedText></Pressable><ThemedText style={styles.value}>{adet}</ThemedText><Pressable onPress={onArtir} style={styles.button}><ThemedText style={styles.symbol}>+</ThemedText></Pressable></View>;
}

const styles = StyleSheet.create({
  row: { alignItems: 'center', flexDirection: 'row', gap: 16, justifyContent: 'center', paddingVertical: 6 },
  button: { alignItems: 'center', borderColor: '#D8C8E5', borderRadius: 9, borderWidth: 1, height: 32, justifyContent: 'center', width: 32 },
  symbol: { fontSize: 20, fontWeight: '900' },
  value: { fontSize: 17, fontWeight: '900' },
});
