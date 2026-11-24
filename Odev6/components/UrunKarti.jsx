import { Image, Pressable, StyleSheet, View } from 'react-native';
import ThemedCard from './ThemedCard';
import ThemedText from './ThemedText';

export default function UrunKarti({ urun, onDetay, onSepeteEkle }) {
  return (
    <ThemedCard style={styles.card}>
      <Image source={urun.gorsel} style={styles.image} resizeMode="contain" />
      <View style={styles.info}><ThemedText title style={styles.name}>{urun.ad}</ThemedText><ThemedText style={styles.price}>{urun.fiyat} TL</ThemedText><ThemedText style={styles.stock}>{urun.stok > 0 ? `Stokta ${urun.stok} adet` : 'Stokta yok'}</ThemedText></View>
      <View style={styles.actions}><Pressable onPress={onDetay} style={styles.secondary}><ThemedText style={styles.secondaryText}>Detay</ThemedText></Pressable>{urun.stok > 0 && <Pressable onPress={onSepeteEkle} style={styles.primary}><ThemedText style={styles.primaryText}>Sepete ekle</ThemedText></Pressable>}</View>
    </ThemedCard>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'center', flexDirection: 'row', gap: 12 },
  image: { height: 68, width: 68 },
  info: { flex: 1, gap: 4 },
  name: { fontSize: 17, fontWeight: '900' },
  price: { fontSize: 14, fontWeight: '900' },
  stock: { fontSize: 12 },
  actions: { gap: 8 },
  primary: { backgroundColor: '#7C4D9E', borderRadius: 9, paddingHorizontal: 9, paddingVertical: 7 },
  primaryText: { color: '#FFFDF8', fontSize: 10, fontWeight: '900' },
  secondary: { borderColor: '#D8C8E5', borderRadius: 9, borderWidth: 1, paddingHorizontal: 9, paddingVertical: 7 },
  secondaryText: { fontSize: 10, fontWeight: '900' },
});
