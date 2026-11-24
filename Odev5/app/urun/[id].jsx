import { Pressable, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { products } from '../../data/products';
import ThemedCard from '../../components/ThemedCard';
import ThemedText from '../../components/ThemedText';
import ThemedView from '../../components/ThemedView';

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const product = products.find((item) => item.id === id);
  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <Pressable onPress={() => router.back()}><ThemedText style={styles.back}>← Ürün listesine dön</ThemedText></Pressable>
        <ThemedCard style={styles.card}>
          {product ? <><ThemedText style={styles.category}>{product.category}</ThemedText><ThemedText title style={styles.title}>{product.name}</ThemedText><ThemedText style={styles.price}>{product.price} TL</ThemedText><ThemedText style={styles.copy}>{product.description}</ThemedText><ThemedText style={styles.stock}>{product.stock > 0 ? `Stokta · ${product.stock} adet` : 'Stokta yok'}</ThemedText></> : <><ThemedText title style={styles.title}>Ürün bulunamadı</ThemedText><ThemedText style={styles.copy}>#{id} numaralı ürün mevcut değil.</ThemedText></>}
        </ThemedCard>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1, padding: 24 },
  back: { fontSize: 13, fontWeight: '900', marginTop: 16 },
  card: { gap: 14, marginTop: 28 },
  category: { fontSize: 12, fontWeight: '900' },
  title: { fontSize: 28, fontWeight: '900' },
  price: { color: '#7C4D9E', fontSize: 20, fontWeight: '900' },
  copy: { fontSize: 15, lineHeight: 23 },
  stock: { color: '#2E8B57', fontSize: 13, fontWeight: '900' },
});
