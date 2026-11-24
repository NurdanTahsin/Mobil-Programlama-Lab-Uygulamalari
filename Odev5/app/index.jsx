import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemedText from '../components/ThemedText';
import ThemedView from '../components/ThemedView';
import ThemedCard from '../components/ThemedCard';

const apps = [
  { title: 'Arıza Takip', copy: 'Arıza listesini ve dinamik detay ekranlarını aç.', path: '/ariza' },
  { title: 'Mini Ürün Kataloğu', copy: 'Ürünleri incele, stok ve detay bilgilerine git.', path: '/urun' },
  { title: 'Ders Programı', copy: 'Dersleri listele ve seçilen dersin detayını gör.', path: '/ders' },
];

export default function Index() {
  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <ThemedText title style={styles.eyebrow}>MOBİL PROGRAMLAMA</ThemedText>
        <ThemedText title style={styles.title}>Uygulama menüsü</ThemedText>
        <ThemedText style={styles.subtitle}>Ortak tema ile hazırlanmış üç çalışma.</ThemedText>
        <ScrollView contentContainerStyle={styles.list}>
          {apps.map((app, index) => (
            <Pressable key={app.path} onPress={() => router.push(app.path)}>
              <ThemedCard style={styles.card}>
                <ThemedText style={styles.number}>0{index + 1}</ThemedText>
                <ThemedText title style={styles.cardTitle}>{app.title}</ThemedText>
                <ThemedText style={styles.copy}>{app.copy}</ThemedText>
                <ThemedText style={styles.link}>Aç →</ThemedText>
              </ThemedCard>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1, padding: 24 },
  eyebrow: { fontSize: 11, fontWeight: '900', letterSpacing: 1.8, marginTop: 16 },
  title: { fontSize: 34, fontWeight: '900', marginTop: 10 },
  subtitle: { fontSize: 15, marginTop: 8 },
  list: { gap: 14, paddingVertical: 28 },
  card: { minHeight: 150 },
  number: { color: '#7C4D9E', fontSize: 12, fontWeight: '900', marginBottom: 18 },
  cardTitle: { fontSize: 22, fontWeight: '900', marginBottom: 8 },
  copy: { fontSize: 14, lineHeight: 20 },
  link: { color: '#7C4D9E', fontSize: 13, fontWeight: '900', marginTop: 18 },
});
