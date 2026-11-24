import { FlatList, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tickets } from '../../data/tickets';
import TicketCard from '../../components/TicketCard';
import ThemedText from '../../components/ThemedText';
import ThemedView from '../../components/ThemedView';

export default function TicketList() {
  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <Pressable onPress={() => router.back()}><ThemedText style={styles.back}>← Ana menü</ThemedText></Pressable>
        <ThemedText title style={styles.title}>Arıza Listesi</ThemedText>
        <ThemedText style={styles.subtitle}>Kayıt seçerek ayrıntıları görüntüleyin.</ThemedText>
        <FlatList data={tickets} keyExtractor={(item) => item.id} renderItem={({ item }) => <TicketCard ticket={item} />} contentContainerStyle={styles.list} />
        <Pressable style={styles.newButton} onPress={() => router.push('/ariza/yeni')}><ThemedText style={styles.newText}>+ Yeni Arıza</ThemedText></Pressable>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1, padding: 24 },
  back: { fontSize: 13, fontWeight: '900', marginTop: 16 },
  title: { fontSize: 32, fontWeight: '900', marginTop: 22 },
  subtitle: { fontSize: 14, marginTop: 6 },
  list: { gap: 12, paddingVertical: 24 },
  newButton: { alignItems: 'center', backgroundColor: '#7C4D9E', borderRadius: 14, padding: 15 },
  newText: { color: '#FFFDF8', fontWeight: '900' },
});
