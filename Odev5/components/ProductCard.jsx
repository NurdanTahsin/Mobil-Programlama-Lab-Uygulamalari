import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import ThemedCard from './ThemedCard';
import ThemedText from './ThemedText';

export default function ProductCard({ product }) {
  const inStock = product.stock > 0;
  return (
    <Pressable onPress={() => router.push(`/urun/${product.id}`)}>
      <ThemedCard style={styles.card}>
        <View style={styles.row}>
          <ThemedText title style={styles.title}>{product.name}</ThemedText>
          <ThemedText style={styles.price}>{product.price} TL</ThemedText>
        </View>
        <ThemedText style={styles.category}>{product.category}</ThemedText>
        <ThemedText style={[styles.stock, { color: inStock ? '#2E8B57' : '#C87519' }]}>
          {inStock ? `Stokta · ${product.stock} adet` : 'Stokta yok'}
        </ThemedText>
      </ThemedCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { gap: 8 },
  row: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  title: { flex: 1, fontSize: 18, fontWeight: '900' },
  price: { fontSize: 14, fontWeight: '900' },
  category: { fontSize: 13 },
  stock: { fontSize: 12, fontWeight: '900' },
});
