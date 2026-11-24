import { FlatList, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { products } from '../../data/products';
import ProductCard from '../../components/ProductCard';
import ThemedText from '../../components/ThemedText';
import ThemedView from '../../components/ThemedView';

export default function ProductList() {
  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <Pressable onPress={() => router.back()}><ThemedText style={styles.back}>← Ana menü</ThemedText></Pressable>
        <ThemedText title style={styles.title}>Mini Ürün Kataloğu</ThemedText>
        <ThemedText style={styles.subtitle}>Teknoloji mağazasındaki ürünler.</ThemedText>
        <FlatList data={products} keyExtractor={(item) => item.id} renderItem={({ item }) => <ProductCard product={item} />} contentContainerStyle={styles.list} />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1, padding: 24 },
  back: { fontSize: 13, fontWeight: '900', marginTop: 16 },
  title: { fontSize: 30, fontWeight: '900', marginTop: 22 },
  subtitle: { fontSize: 14, marginTop: 6 },
  list: { gap: 12, paddingVertical: 24 },
});
