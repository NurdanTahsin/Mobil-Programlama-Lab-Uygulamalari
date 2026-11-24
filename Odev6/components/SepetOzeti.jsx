import { StyleSheet, View } from 'react-native';
import ThemedText from './ThemedText';

export default function SepetOzeti({ toplamAdet, toplamTutar }) {
  return <View style={styles.row}><ThemedText style={styles.label}>{toplamAdet} ürün</ThemedText><ThemedText title style={styles.total}>{toplamTutar} TL</ThemedText></View>;
}

const styles = StyleSheet.create({
  row: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  label: { fontSize: 14 },
  total: { fontSize: 21, fontWeight: '900' },
});
