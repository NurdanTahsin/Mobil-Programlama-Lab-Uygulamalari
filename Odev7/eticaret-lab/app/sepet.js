import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSepet } from '../context/SepetContext';
import { Colors } from '../constants/Colors';

export default function SepetSayfasi() {
  const router = useRouter();
  const {
    sepet,
    urunSil,
    adetArtir,
    adetAzalt,
    toplamTutar,
    toplamAdet,
  } = useSepet();
  const theme = Colors[useColorScheme()] ?? Colors.light;

  function urunuKaldirmayiOnayla(id, urunAdi) {
    Alert.alert(
      'Ürünü kaldır',
      `${urunAdi} sepetten kaldırılsın mı?`,
      [
        { text: 'Vazgeç', style: 'cancel' },
        {
          text: 'Kaldır',
          style: 'destructive',
          onPress: () => urunSil(id),
        },
      ]
    );
  }

  function sepetUrunuGoster({ item }) {
    return (
      <View style={[styles.kart, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <View style={[styles.resimCerceve, { backgroundColor: theme.surfaceAlt, borderColor: theme.border }]}>
          <Image
            source={{ uri: item.thumbnail }}
            style={styles.resim}
            resizeMode="contain"
          />
        </View>

        <View style={styles.bilgiler}>
          <Text style={[styles.urunAdi, { color: theme.text }]} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={[styles.fiyat, { color: theme.primary }]}>${(item.price * (1 - (item.discountPercentage || 0) / 100)).toFixed(2)}</Text>

          <View style={styles.adetSatiri}>
            <View style={styles.adetAlani}>
              <Pressable
                onPress={() => adetAzalt(item.id)}
                style={({ pressed }) => [
                  styles.adetButon,
                  item.adet === 1 && styles.adetButonPasif,
                  pressed && styles.basilmis,
                ]}
              >
                <Text style={styles.adetButonYazi}>−</Text>
              </Pressable>
              <Text style={styles.adet}>{item.adet}</Text>
              <Pressable
                onPress={() => adetArtir(item.id)}
                style={({ pressed }) => [
                  styles.adetButon,
                  pressed && styles.basilmis,
                ]}
              >
                <Text style={styles.adetButonYazi}>+</Text>
              </Pressable>
            </View>

            <Pressable
              onPress={() => urunuKaldirmayiOnayla(item.id, item.title)}
              style={({ pressed }) => [
                styles.silButon,
                pressed && styles.basilmis,
              ]}
            >
              <Text style={styles.silYazi}>Kaldır</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['bottom', 'left', 'right']}>
      {sepet.length === 0 ? (
        <View style={styles.bosSepet}>
          <View style={styles.bosRozet}>
            <Text style={styles.bosIkon}>0</Text>
          </View>
          <Text style={styles.bosBaslik}>Sepetiniz boş</Text>
          <Text style={styles.bosYazi}>
            Beğendiğiniz teknoloji ürünlerini buraya ekleyebilirsiniz.
          </Text>
          <Pressable
            onPress={() => router.navigate('/')}
            style={({ pressed }) => [
              styles.alisverisButon,
              pressed && styles.basilmis,
            ]}
          >
            <Text style={styles.butonYazi}>Alışverişe Dön</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <View style={[styles.ustAlan, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
            <Text style={[styles.baslik, { color: theme.text }]}>Sepetim</Text>
            <Text style={[styles.altBaslik, { color: theme.muted }]}>
              Toplam ürün adedi: {toplamAdet}
            </Text>
          </View>

          <FlatList
            data={sepet}
            keyExtractor={(item) => item.id.toString()}
            renderItem={sepetUrunuGoster}
            contentContainerStyle={styles.liste}
            showsVerticalScrollIndicator={false}
          />

          <View style={[styles.altAlan, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
            <View style={styles.toplamSatiri}>
              <Text style={styles.toplamEtiket}>Toplam</Text>
              <Text style={styles.toplam}>${toplamTutar.toFixed(2)}</Text>
            </View>
            <Pressable
              onPress={() => router.navigate('/')}
              style={({ pressed }) => [
                styles.alisverisButon,
                pressed && styles.basilmis,
              ]}
            >
              <Text style={styles.butonYazi}>Alışverişe Devam Et</Text>
            </Pressable>
          </View>
        </>
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
    backgroundColor: '#F7F1FF',
    borderBottomColor: '#D8C8E5',
    borderBottomWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  baslik: {
    color: '#30233B',
    fontSize: 22,
    fontWeight: '800',
  },
  altBaslik: {
    color: '#766A80',
    fontSize: 13,
    marginTop: 4,
  },
  liste: {
    padding: 12,
  },
  kart: {
    backgroundColor: '#F7F1FF',
    borderColor: '#D8C8E5',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 12,
    padding: 12,
    shadowColor: '#30233B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  resimCerceve: {
    alignItems: 'center',
    backgroundColor: '#FFF4DF',
    borderColor: '#D8C8E5',
    borderRadius: 14,
    borderWidth: 1,
    height: 108,
    justifyContent: 'center',
    marginRight: 12,
    width: 108,
  },
  resim: {
    height: 92,
    width: 92,
  },
  bilgiler: {
    flex: 1,
  },
  urunAdi: {
    color: '#30233B',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 5,
  },
  fiyat: {
    color: '#7C4D9E',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
  },
  adetSatiri: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  adetAlani: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  adetButon: {
    alignItems: 'center',
    backgroundColor: '#FFF4DF',
    borderRadius: 8,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  adetButonPasif: {
    opacity: 0.55,
  },
  adetButonYazi: {
    color: '#7C4D9E',
    fontSize: 19,
    fontWeight: '800',
  },
  adet: {
    color: '#30233B',
    fontSize: 15,
    fontWeight: '800',
    marginHorizontal: 12,
  },
  silButon: {
    backgroundColor: '#FFF4DF',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 7,
  },
  silYazi: {
    color: '#7C4D9E',
    fontSize: 12,
    fontWeight: '800',
  },
  altAlan: {
    backgroundColor: '#F7F1FF',
    borderTopColor: '#D8C8E5',
    borderTopWidth: 1,
    padding: 16,
  },
  toplamSatiri: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  toplamEtiket: {
    color: '#766A80',
    fontSize: 14,
  },
  toplam: {
    color: '#30233B',
    fontSize: 22,
    fontWeight: '900',
  },
  alisverisButon: {
    alignItems: 'center',
    backgroundColor: '#7C4D9E',
    borderRadius: 12,
    paddingVertical: 14,
  },
  butonYazi: {
    color: '#FFFDF9',
    fontSize: 15,
    fontWeight: '800',
  },
  bosSepet: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 28,
  },
  bosRozet: {
    alignItems: 'center',
    backgroundColor: '#FFF4DF',
    borderColor: '#D8C8E5',
    borderRadius: 36,
    borderWidth: 1,
    height: 72,
    justifyContent: 'center',
    marginBottom: 16,
    width: 72,
  },
  bosIkon: {
    color: '#7C4D9E',
    fontSize: 24,
    fontWeight: '900',
  },
  bosBaslik: {
    color: '#30233B',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  bosYazi: {
    color: '#766A80',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 20,
    textAlign: 'center',
  },
  basilmis: {
    opacity: 0.86,
  },
});
