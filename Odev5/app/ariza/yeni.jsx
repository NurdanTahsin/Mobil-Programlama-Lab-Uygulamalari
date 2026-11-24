import { Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemedCard from '../../components/ThemedCard';
import ThemedText from '../../components/ThemedText';
import ThemedView from '../../components/ThemedView';

export default function NewTicket() {
  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <Pressable onPress={() => router.back()}><ThemedText style={styles.back}>← Arıza listesine dön</ThemedText></Pressable>
        <ThemedText title style={styles.title}>Yeni Arıza</ThemedText>
        <ThemedCard style={styles.card}><ThemedText style={styles.copy}>Bu ders için temel yeni arıza ekranı hazırlandı. Form alanları sonraki adımda eklenebilir.</ThemedText></ThemedCard>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1, padding: 24 },
  back: { fontSize: 13, fontWeight: '900', marginTop: 16 },
  title: { fontSize: 32, fontWeight: '900', marginTop: 24 },
  card: { marginTop: 24 },
  copy: { fontSize: 15, lineHeight: 23 },
});
