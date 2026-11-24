import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import ThemedCard from './ThemedCard';
import ThemedText from './ThemedText';

export default function CourseCard({ course }) {
  return (
    <Pressable onPress={() => router.push(`/ders/${course.id}`)}>
      <ThemedCard style={styles.card}>
        <View style={styles.row}>
          <ThemedText title style={styles.title}>{course.name}</ThemedText>
          <ThemedText style={styles.time}>{course.time}</ThemedText>
        </View>
        <ThemedText style={styles.meta}>{course.day} · {course.classroom}</ThemedText>
        <ThemedText style={styles.teacher}>{course.instructor}</ThemedText>
      </ThemedCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { gap: 8 },
  row: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  title: { flex: 1, fontSize: 18, fontWeight: '900' },
  time: { fontSize: 13, fontWeight: '900' },
  meta: { fontSize: 13 },
  teacher: { fontSize: 12 },
});
