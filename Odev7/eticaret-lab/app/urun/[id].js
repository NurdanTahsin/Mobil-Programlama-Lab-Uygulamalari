import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useSepet } from '../../context/SepetContext';
import { Colors } from '../../constants/Colors';

export default function UrunDetay() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { sepeteEkle } = useSepet();
  const [urun, setUrun] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState('');
  const theme = Colors[useColorScheme()] ?? Colors.light;

  useEffect(() => {
    let aktif = true;

    async function urunGetir() {
      try {
        setYukleniyor(true);
        setHata('');
        setUrun(null);

        const cevap = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        if (!cevap.ok) {
          throw new Error('Ürün bulunamadı.');
        }

        const veri = await cevap.json();
        if (aktif) {
          setUrun(veri);
        }
      } catch (error) {
        if (aktif) {
          setHata(error.message);
        }
      } finally {
        if (aktif) {
          setYukleniyor(false);
        }
      }
    }

    if (id) {
      urunGetir();
    }

    return () => {
      aktif = false;
    };
  }, [id]);

  const indirimliFiyat = urun
    ? urun.price * (1 - (urun.discountPercentage || 0) / 100)
    : 0;

  return (
    <>
      <Stack.Screen
        options={{ title: urun ? urun.title : 'Ürün Detayı' }}
      />
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
        edges={['bottom', 'left', 'right']}
      >
        {yukleniyor ? (
          <ActivityIndicator
            size="large"
            color={theme.primary}
            style={styles.yukleme}
          />
        ) : hata ? (
          <View style={styles.mesajAlani}>
            <Text style={styles.hata}>{hata}</Text>
          </View>
        ) : urun ? (
          <ScrollView
            contentContainerStyle={styles.icerik}
            showsVerticalScrollIndicator={false}
          >
            <View style={[styles.resimCerceve, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Image
                source={{ uri: urun.thumbnail }}
                style={styles.resim}
                resizeMode="contain"
              />
            </View>

            <View style={styles.rozetSatiri}>
              <Text style={[styles.kategori, { backgroundColor: theme.surfaceAlt, color: theme.primary }]}>{urun.category}</Text>
              <Text style={[styles.puan, { backgroundColor: theme.surfaceAlt, borderColor: theme.border, color: theme.text }]}>★ {urun.rating}</Text>
            </View>

            <Text style={[styles.baslik, { color: theme.text }]}>{urun.title}</Text>

            <View style={styles.fiyatAlani}>
              <View>
                <Text style={styles.indirimYazi}>
                  %{urun.discountPercentage ? urun.discountPercentage.toFixed(0) : 0} indirim
                </Text>
                <Text style={[styles.fiyat, { color: theme.primary }]}>${indirimliFiyat.toFixed(2)}</Text>
              </View>
              {urun.discountPercentage > 0 && (
                <Text style={styles.eskiFiyat}>${urun.price.toFixed(2)}</Text>
              )}
            </View>

            <View style={[styles.aciklamaKarti, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Text style={[styles.aciklamaBaslik, { color: theme.text }]}>Ürün Açıklaması</Text>
              <Text style={[styles.aciklama, { color: theme.muted }]}>{urun.description}</Text>
            </View>

            <Pressable
              onPress={() => {
                sepeteEkle(urun);
                router.push('/sepet');
              }}
              style={({ pressed }) => [
                styles.buton,
                { backgroundColor: theme.primary },
                pressed && styles.basilmis,
              ]}
            >
              <Text style={styles.butonYazi}>Sepete Ekle</Text>
            </Pressable>
          </ScrollView>
        ) : (
          <Text style={styles.hata}>Ürün bilgisi bulunamadı.</Text>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4DF',
  },
  yukleme: {
    flex: 1,
  },
  mesajAlani: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  icerik: {
    padding: 18,
    paddingBottom: 36,
  },
  resimCerceve: {
    alignItems: 'center',
    backgroundColor: '#F7F1FF',
    borderColor: '#D8C8E5',
    borderRadius: 22,
    borderWidth: 1,
    height: 290,
    justifyContent: 'center',
    marginBottom: 18,
  },
  resim: {
    height: 260,
    width: '92%',
  },
  rozetSatiri: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  kategori: {
    backgroundColor: '#FFF4DF',
    borderRadius: 20,
    color: '#7C4D9E',
    fontSize: 12,
    fontWeight: '800',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 6,
    textTransform: 'capitalize',
  },
  puan: {
    backgroundColor: '#FFF4DF',
    borderColor: '#D8C8E5',
    borderRadius: 20,
    borderWidth: 1,
    color: '#30233B',
    fontSize: 12,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  baslik: {
    color: '#30233B',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 31,
    marginBottom: 14,
  },
  fiyatAlani: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  indirimYazi: {
    color: '#7C4D9E',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 3,
  },
  fiyat: {
    color: '#7C4D9E',
    fontSize: 28,
    fontWeight: '900',
  },
  eskiFiyat: {
    color: '#766A80',
    fontSize: 15,
    textDecorationLine: 'line-through',
  },
  aciklamaKarti: {
    backgroundColor: '#F7F1FF',
    borderColor: '#D8C8E5',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 18,
    padding: 16,
  },
  aciklamaBaslik: {
    color: '#30233B',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
  },
  aciklama: {
    color: '#766A80',
    fontSize: 14,
    lineHeight: 22,
  },
  buton: {
    alignItems: 'center',
    backgroundColor: '#7C4D9E',
    borderRadius: 14,
    paddingVertical: 16,
  },
  butonYazi: {
    color: '#FFFDF9',
    fontSize: 16,
    fontWeight: '800',
  },
  basilmis: {
    opacity: 0.86,
  },
  hata: {
    color: '#60356F',
    fontSize: 16,
    textAlign: 'center',
  },
});
