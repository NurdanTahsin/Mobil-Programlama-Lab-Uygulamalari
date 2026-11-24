import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import UrunKarti from '../components/UrunKarti';
import { useSepet } from '../context/SepetContext';
import { Colors } from '../constants/Colors';

export default function AnaSayfa() {
  const router = useRouter();
  const { toplamAdet, sepeteEkle } = useSepet();
  const [urunler, setUrunler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState('');
  const theme = Colors[useColorScheme()] ?? Colors.light;

  async function urunleriGetir() {
    try {
      setYukleniyor(true);
      setHata('');

      const cevap = await fetch(
        'https://dummyjson.com/products?limit=100'
      );

      if (!cevap.ok) {
        throw new Error('Ürünler alınamadı.');
      }

      const veri = await cevap.json();
      const atelyeKategorileri = ['beauty', 'fragrances', 'furniture', 'groceries', 'home-decoration'];
      setUrunler(veri.products.filter((urun) => atelyeKategorileri.includes(urun.category)).slice(0, 20));
    } catch (error) {
      setHata(error.message);
    } finally {
      setYukleniyor(false);
    }
  }

  useEffect(() => {
    urunleriGetir();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top', 'left', 'right']}>
      <View style={styles.ustAlan}>
        <View>
          <Text style={[styles.ustYazi, { color: theme.muted }]}>SEÇİLİ YAŞAM NESNELERİ</Text>
          <Text style={[styles.baslik, { color: theme.text }]}>MORA Atelier</Text>
        </View>

        <Pressable
          onPress={() => router.push('/sepet')}
          style={({ pressed }) => [
            styles.sepetButon,
            { backgroundColor: theme.primary },
            pressed && styles.basilmis,
          ]}
        >
          <Text style={[styles.sepetYazi, { color: theme.surface }]}>Sepet</Text>
          {toplamAdet > 0 && (
            <View style={[styles.sepetRozeti, { backgroundColor: theme.surface, borderColor: theme.primary }]}>
              <Text style={[styles.sepetRozetYazi, { color: theme.primary }]}>{toplamAdet}</Text>
            </View>
          )}
        </Pressable>
      </View>

      {yukleniyor ? (
        <ActivityIndicator
          size="large"
          color={theme.primary}
          style={styles.yukleme}
        />
      ) : hata ? (
        <View style={styles.mesajAlani}>
          <Text style={styles.hata}>{hata}</Text>
          <Pressable
            onPress={urunleriGetir}
            style={({ pressed }) => [
              styles.tekrarButon,
              pressed && styles.basilmis,
            ]}
          >
            <Text style={styles.butonYazi}>Tekrar Dene</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={urunler}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.liste}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.bosYazi}>Gösterilecek ürün bulunamadı.</Text>
          }
          renderItem={({ item }) => (
            <UrunKarti
              urun={item}
              onPress={() => router.push(`/urun/${item.id}`)}
              onAdd={() => sepeteEkle(item)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4DF',
  },
  ustAlan: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 14,
  },
  ustYazi: {
    color: '#766A80',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 3,
  },
  baslik: {
    color: '#30233B',
    fontSize: 24,
    fontWeight: '800',
  },
  sepetButon: {
    alignItems: 'center',
    backgroundColor: '#7C4D9E',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    minWidth: 74,
    paddingHorizontal: 14,
    paddingVertical: 11,
    position: 'relative',
  },
  sepetYazi: {
    color: '#FFFDF9',
    fontSize: 13,
    fontWeight: '800',
  },
  sepetRozeti: {
    alignItems: 'center',
    backgroundColor: '#FFF4DF',
    borderColor: '#7C4D9E',
    borderRadius: 12,
    borderWidth: 2,
    height: 24,
    justifyContent: 'center',
    position: 'absolute',
    right: -8,
    top: -8,
    width: 24,
  },
  sepetRozetYazi: {
    color: '#7C4D9E',
    fontSize: 11,
    fontWeight: '900',
  },
  basilmis: {
    opacity: 0.86,
  },
  liste: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  yukleme: {
    flex: 1,
  },
  mesajAlani: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  hata: {
    color: '#60356F',
    fontSize: 15,
    marginBottom: 16,
    textAlign: 'center',
  },
  tekrarButon: {
    backgroundColor: '#7C4D9E',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  butonYazi: {
    color: '#FFFDF9',
    fontWeight: '800',
  },
  bosYazi: {
    color: '#766A80',
    textAlign: 'center',
  },
});
