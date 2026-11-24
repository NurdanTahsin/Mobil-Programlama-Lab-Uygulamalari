import { StyleSheet, View, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import ThemedText from './ThemedText';

export default function StatusBadge({ status }) {
  const theme = Colors[useColorScheme()] ?? Colors.light;
  const color = status === 'Bekliyor' ? theme.warning : status === 'İşlemde' ? theme.info : theme.success;
  return (
    <View style={[styles.badge, { backgroundColor: `${color}22` }]}>
      <ThemedText style={[styles.text, { color }]}>{status}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6 },
  text: { fontSize: 11, fontWeight: '900' },
});
