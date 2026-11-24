import { StyleSheet, View, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

export default function ThemedCard({ style, ...props }) {
  const theme = Colors[useColorScheme()] ?? Colors.light;
  return <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }, style]} {...props} />;
}

const styles = StyleSheet.create({
  card: { borderRadius: 20, borderWidth: 1, padding: 16 },
});
