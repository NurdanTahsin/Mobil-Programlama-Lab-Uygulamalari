import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const butonaBasildi = () => console.log('Nurdan’ın profil kartı görüntülendi');
  const iletisimeBasildi = () => console.log('İletişim butonuna basıldı');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.kart}>
        <Image source={{ uri: 'https://i.pravatar.cc/300?img=47' }} style={styles.resim} />
        <Text style={styles.baslik}>Nurdan Tahsin</Text>
        <Text style={styles.altBaslik}>Mobil Programlama Öğrencisi</Text>
        <View style={styles.konum}>
          <Ionicons name="map" size={20} color="#5B3E75" />
          <Text style={styles.konumYazi}>Karabük</Text>
        </View>
        <Pressable style={({ pressed }) => [styles.buton, pressed && styles.butonBasili]} onPress={butonaBasildi}>
          <Ionicons name="person-circle" size={20} color="white" />
          <Text style={styles.butonYazi}>Profili Gör</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.iletisimButonu, pressed && styles.butonBasili]} onPress={iletisimeBasildi}>
          <Ionicons name="mail" size={20} color="white" />
          <Text style={styles.butonYazi}>İletişim</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEE9F3' },
  kart: { alignItems: 'center', width: 300, padding: 25, borderRadius: 15, backgroundColor: 'white', elevation: 3 },
  resim: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  baslik: { fontSize: 24, fontWeight: '900', color: '#30233B' },
  altBaslik: { fontSize: 16, color: '#766A80', marginTop: 5, marginBottom: 15 },
  konum: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  konumYazi: { marginLeft: 5, fontSize: 16, color: '#30233B' },
  buton: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#7C4D9E', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  iletisimButonu: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#4C7A67', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, marginTop: 12 },
  butonBasili: { opacity: 0.75 },
  butonYazi: { color: 'white', fontSize: 16, fontWeight: '900' },
});
