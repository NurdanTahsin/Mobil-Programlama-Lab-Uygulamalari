import { useColorScheme, View } from 'react-native';
import { Colors } from '../constants/Colors';

export default function ThemedView({ style, ...props }) {
  const theme = Colors[useColorScheme()] ?? Colors.light;
  return <View style={[{ backgroundColor: theme.background }, style]} {...props} />;
}
