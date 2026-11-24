import { Pressable, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { courses } from '../../data/courses';
import ThemedCard from '../../components/ThemedCard';
import ThemedText from '../../components/ThemedText';
import ThemedView from '../../components/ThemedView';

export default function CourseDetail() {
  const { id } = useLocalSearchParams();
  const course = courses.find((item) => item.id === id);
  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <Pressable onPress={() => router.back()}><ThemedText style={styles.back}>← Ders listesine dön</ThemedText></Pressable>
        <ThemedCard style={styles.card}>
          {course ? <><ThemedText title style={styles.title}>{course.name}</ThemedText><ThemedText style={styles.row}>Gün: {course.day}</ThemedText><ThemedText style={styles.row}>Saat: {course.time}</ThemedText><ThemedText style={styles.row}>Sınıf: {course.classroom}</ThemedText><ThemedText style={styles.row}>Öğretim elemanı: {course.instructor}</ThemedText><ThemedText style={styles.copy}>{course.description}</ThemedText></> : <><ThemedText title style={styles.title}>Ders bulunamadı</ThemedText><ThemedText style={styles.copy}>#{id} numaralı ders mevcut değil.</ThemedText></>}
        </ThemedCard>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1, padding: 24 },
  back: { fontSize: 13, fontWeight: '900', marginTop: 16 },
  card: { gap: 12, marginTop: 28 },
  title: { fontSize: 28, fontWeight: '900', marginBottom: 8 },
  row: { fontSize: 15 },
  copy: { fontSize: 14, lineHeight: 22, marginTop: 10 },
});
