import { FlatList, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { courses } from '../../data/courses';
import CourseCard from '../../components/CourseCard';
import ThemedText from '../../components/ThemedText';
import ThemedView from '../../components/ThemedView';

export default function CourseList() {
  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <Pressable onPress={() => router.back()}><ThemedText style={styles.back}>← Ana menü</ThemedText></Pressable>
        <ThemedText title style={styles.title}>Ders Programı</ThemedText>
        <ThemedText style={styles.subtitle}>Haftalık derslerini seçerek ayrıntıları aç.</ThemedText>
        <FlatList data={courses} keyExtractor={(item) => item.id} renderItem={({ item }) => <CourseCard course={item} />} contentContainerStyle={styles.list} />
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
});
