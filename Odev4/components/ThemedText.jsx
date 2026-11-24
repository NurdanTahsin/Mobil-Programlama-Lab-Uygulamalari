import { Text, useColorScheme } from 'react-native';import{Colors}from'../constants/Colors';
export default function ThemedText({style,title=false,...props}){const theme=Colors[useColorScheme()]??Colors.light;return<Text style={[{color:title?theme.title:theme.text},style]} {...props}/>}
