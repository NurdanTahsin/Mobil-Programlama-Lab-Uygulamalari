import { Image, Pressable, StyleSheet, View, useColorScheme } from 'react-native';
import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { urunler } from '../../data/urunler';
import AdetSecici from '../../components/AdetSecici';
import ThemedCard from '../../components/ThemedCard';
import ThemedText from '../../components/ThemedText';
import ThemedView from '../../components/ThemedView';
import { Colors } from '../../constants/Colors';
import { useSepet } from '../../context/SepetContext';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const urun = urunler.find((item) => item.id === id);
  const [adet, setAdet] = useState(1);
  const { sepeteEkle, toplamAdet } = useSepet();
  const theme = Colors[useColorScheme()] ?? Colors.light;

  if (!urun) {
    return <ThemedView style={styles.root}><SafeAreaView style={styles.safe}><ThemedText title style={styles.title}>Ürün bulunamadı</ThemedText><ThemedText style={styles.copy}>{id} kimlikli ürün mevcut değil.</ThemedText><Pressable onPress={() => router.back()} style={styles.back}><ThemedText style={styles.backText}>Geri dön</ThemedText></Pressable></SafeAreaView></ThemedView>;
  }

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.safe}>
        <View style={styles.actions}><Pressable onPress={() => router.back()}><ThemedText style={styles.link}>← Ürünler</ThemedText></Pressable><Pressable onPress={() => router.push('/sepet')}><ThemedText style={styles.link}>Sepet ({toplamAdet})</ThemedText></Pressable></View>
        <ThemedCard style={styles.card}>
          <Image source={urun.gorsel} style={styles.image} resizeMode="contain" />
          <ThemedText style={styles.category}>{urun.kategori}</ThemedText>
          <ThemedText title style={styles.title}>{urun.ad}</ThemedText>
          <ThemedText style={[styles.price, { color: theme.primary }]}>{urun.fiyat} TL</ThemedText>
          <ThemedText style={styles.copy}>{urun.aciklama}</ThemedText>
          <ThemedText style={styles.stock}>{urun.stok > 0 ? `Stokta ${urun.stok} adet var` : 'Stokta yok'}</ThemedText>
          {urun.stok > 0 && <><AdetSecici adet={adet} onArtir={() => setAdet((value) => Math.min(value + 1, urun.stok))} onAzalt={() => setAdet((value) => Math.max(value - 1, 1))} /><Pressable onPress={() => sepeteEkle(urun, adet)} style={[styles.addButton, { backgroundColor: theme.primary }]}><ThemedText style={styles.addText}>Sepete ekle</ThemedText></Pressable></>}
        </ThemedCard>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1, padding: 20 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  link: { fontSize: 13, fontWeight: '900' },
  card: { gap: 12 },
  image: { alignSelf: 'center', height: 150, width: 150 },
  category: { fontSize: 12, fontWeight: '900' },
  title: { fontSize: 28, fontWeight: '900' },
  price: { fontSize: 21, fontWeight: '900' },
  copy: { fontSize: 15, lineHeight: 23 },
  stock: { fontSize: 13, fontWeight: '900' },
  addButton: { alignItems: 'center', borderRadius: 14, padding: 14 },
  addText: { color: '#FFFDF8', fontWeight: '900' },
  back: { backgroundColor: '#7C4D9E', borderRadius: 14, marginTop: 24, padding: 14 },
  backText: { color: '#FFFDF8', textAlign: 'center' },
});
