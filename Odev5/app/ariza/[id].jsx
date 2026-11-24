import { Pressable, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tickets } from '../../data/tickets';
import StatusBadge from '../../components/StatusBadge';
import ThemedCard from '../../components/ThemedCard';
import ThemedText from '../../components/ThemedText';
import ThemedView from '../../components/ThemedView';

export default function TicketDetail() {
  const { id } = useLocalSearchParams();
  const ticket = tickets.find((item) => item.id === id);
  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <Pressable onPress={() => router.back()}><ThemedText style={styles.back}>← Arıza listesine dön</ThemedText></Pressable>
        {ticket ? (
          <ThemedCard style={styles.card}>
            <ThemedText style={styles.id}>ARIZA #{ticket.id}</ThemedText>
            <ThemedText title style={styles.title}>{ticket.title}</ThemedText>
            <StatusBadge status={ticket.status} />
            <ThemedText style={styles.label}>Konum</ThemedText>
            <ThemedText style={styles.value}>{ticket.location}</ThemedText>
            <ThemedText style={styles.label}>Açıklama</ThemedText>
            <ThemedText style={styles.value}>{ticket.description}</ThemedText>
          </ThemedCard>
        ) : (
          <ThemedCard style={styles.card}><ThemedText title style={styles.title}>Arıza bulunamadı</ThemedText><ThemedText style={styles.value}>#{id} numaralı kayıt mevcut değil.</ThemedText></ThemedCard>
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1, padding: 24 },
  back: { fontSize: 13, fontWeight: '900', marginTop: 16 },
  card: { gap: 12, marginTop: 28 },
  id: { fontSize: 11, fontWeight: '900' },
  title: { fontSize: 26, fontWeight: '900', marginBottom: 4 },
  label: { fontSize: 12, fontWeight: '900', marginTop: 10 },
  value: { fontSize: 15, lineHeight: 22 },
});
