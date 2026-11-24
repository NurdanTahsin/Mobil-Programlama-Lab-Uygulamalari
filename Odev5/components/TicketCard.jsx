import { Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import ThemedCard from './ThemedCard';
import ThemedText from './ThemedText';
import StatusBadge from './StatusBadge';

export default function TicketCard({ ticket }) {
  return (
    <Pressable onPress={() => router.push(`/ariza/${ticket.id}`)}>
      <ThemedCard style={styles.card}>
        <ThemedText style={styles.id}>#{ticket.id}</ThemedText>
        <ThemedText title style={styles.title}>{ticket.title}</ThemedText>
        <ThemedText style={styles.location}>{ticket.location}</ThemedText>
        <StatusBadge status={ticket.status} />
      </ThemedCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { gap: 8 },
  id: { fontSize: 11, fontWeight: '900' },
  title: { fontSize: 19, fontWeight: '900' },
  location: { fontSize: 13, marginBottom: 4 },
});
