import { FlatList, Pressable, StyleSheet, TextInput, View, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { urunler } from '../data/urunler';
import UrunKarti from '../components/UrunKarti';
import ThemedText from '../components/ThemedText';
import ThemedView from '../components/ThemedView';
import { Colors } from '../constants/Colors';
import { useSepet } from '../context/SepetContext';
import { useState } from 'react';

export default function ProductsScreen() {
  const [arama, setArama] = useState('');
  const theme = Colors[useColorScheme()] ?? Colors.light;
  const { toplamAdet, sepeteEkle } = useSepet();
  const filtreliUrunler = urunler.filter((urun) => urun.ad.toLocaleLowerCase('tr-TR').includes(arama.toLocaleLowerCase('tr-TR')));

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.safe}>
        <View style={styles.topRow}>
          <ThemedText style={styles.subtitle}>Kampüs içi teknoloji ihtiyaçları</ThemedText>
          <Pressable onPress={() => router.push('/sepet')} style={[styles.cartButton, { backgroundColor: theme.primary }]}>
            <ThemedText style={styles.cartText}>Sepet ({toplamAdet})</ThemedText>
          </Pressable>
        </View>
        <TextInput
          value={arama}
          onChangeText={setArama}
          placeholder="Ürün ara..."
          placeholderTextColor={theme.muted}
          style={[styles.search, { backgroundColor: theme.surface, borderColor: theme.border, color: theme.text }]}
        />
        <FlatList
          data={filtreliUrunler}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <UrunKarti urun={item} onDetay={() => router.push({ pathname: '/urun/[id]', params: { id: item.id } })} onSepeteEkle={() => sepeteEkle(item, 1)} />}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<ThemedText style={styles.empty}>Aramanıza uygun ürün bulunamadı</ThemedText>}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1, padding: 20 },
  topRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  subtitle: { flex: 1, fontSize: 14, marginRight: 12 },
  cartButton: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 9 },
  cartText: { color: '#FFFDF8', fontSize: 12, fontWeight: '900' },
  search: { borderRadius: 14, borderWidth: 1, fontSize: 15, paddingHorizontal: 14, paddingVertical: 12 },
  list: { gap: 12, paddingVertical: 18 },
  empty: { fontSize: 14, paddingTop: 24, textAlign: 'center' },
});
