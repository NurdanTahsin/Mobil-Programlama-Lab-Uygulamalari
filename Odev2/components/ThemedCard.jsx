import { StyleSheet, useColorScheme, View } from 'react-native';
import { Colors } from '../constants/Colors';
export default function ThemedCard({ style, ...props }) {
 const theme=Colors[useColorScheme()]??Colors.light;
 return <View style={[{backgroundColor:theme.uiBackground,borderColor:theme.border},styles.card,style]} {...props}/>;
}
const styles=StyleSheet.create({card:{borderRadius:22,borderWidth:1,padding:18}});
