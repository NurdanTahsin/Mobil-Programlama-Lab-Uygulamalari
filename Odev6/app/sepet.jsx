import { FlatList, Image, Pressable, StyleSheet, View, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import SepetOzeti from '../components/SepetOzeti';
import ThemedCard from '../components/ThemedCard';
import ThemedText from '../components/ThemedText';
import ThemedView from '../components/ThemedView';
import { Colors } from '../constants/Colors';
import { useSepet } from '../context/SepetContext';

export default function CartScreen() {
  const theme = Colors[useColorScheme()] ?? Colors.light;
  const { sepet, toplamAdet, toplamTutar, adetArtir, adetAzalt, urunKaldir, sepetiBosalt } = useSepet();
  return (
    <ThemedView style={styles.root}>
      <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.safe}>
        <Pressable onPress={() => router.back()}><ThemedText style={styles.link}>← Ürünlere dön</ThemedText></Pressable>
        {sepet.length === 0 ? <View style={styles.empty}><ThemedText title style={styles.title}>Sepetiniz boş</ThemedText><ThemedText style={styles.copy}>Ürünler sayfasından sepete ürün ekleyebilirsiniz.</ThemedText><Pressable onPress={() => router.replace('/')} style={[styles.button, { backgroundColor: theme.primary }]}><ThemedText style={styles.buttonText}>Ürünlere git</ThemedText></Pressable></View> : <><FlatList data={sepet} keyExtractor={(item) => item.id} renderItem={({ item }) => <ThemedCard style={styles.item}><Image source={item.gorsel} style={styles.thumb} /><View style={styles.itemInfo}><ThemedText title style={styles.itemName}>{item.ad}</ThemedText><ThemedText>{item.fiyat} TL · {item.adet} adet</ThemedText><View style={styles.controls}><Pressable onPress={() => adetAzalt(item.id)} style={styles.control}><ThemedText>-</ThemedText></Pressable><ThemedText>{item.adet}</ThemedText><Pressable onPress={() => adetArtir(item.id)} style={styles.control}><ThemedText>+</ThemedText></Pressable><Pressable onPress={() => urunKaldir(item.id)}><ThemedText style={styles.remove}>Kaldır</ThemedText></Pressable></View></View></ThemedCard>} contentContainerStyle={styles.list} /><SepetOzeti toplamAdet={toplamAdet} toplamTutar={toplamTutar} /><Pressable onPress={sepetiBosalt}><ThemedText style={styles.clear}>Sepeti boşalt</ThemedText></Pressable></>}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1, padding: 20 },
  link: { fontSize: 13, fontWeight: '900', marginBottom: 16 },
  list: { gap: 12, paddingBottom: 16 },
  item: { alignItems: 'center', flexDirection: 'row', gap: 12 },
  thumb: { height: 70, width: 70 },
  itemInfo: { flex: 1, gap: 6 },
  itemName: { fontSize: 17, fontWeight: '900' },
  controls: { alignItems: 'center', flexDirection: 'row', gap: 12 },
  control: { alignItems: 'center', borderColor: '#D8C8E5', borderRadius: 8, borderWidth: 1, minWidth: 28, padding: 4 },
  remove: { color: '#B04444', fontSize: 12, fontWeight: '900', marginLeft: 8 },
  clear: { fontSize: 12, fontWeight: '900', padding: 12, textAlign: 'center' },
  empty: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: '900' },
  copy: { fontSize: 14, marginTop: 8, textAlign: 'center' },
  button: { borderRadius: 14, marginTop: 24, padding: 14, width: '100%' },
  buttonText: { color: '#FFFDF8', fontWeight: '900', textAlign: 'center' },
});
