import React from 'react';
import { Image, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Colors } from '../constants/Colors';

export default function UrunKarti({ urun, onPress, onAdd }) {
  const theme = Colors[useColorScheme()] ?? Colors.light;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.kart, { backgroundColor: theme.surface, borderColor: theme.border }, pressed && styles.basilmis]}
    >
      <View style={[styles.resimCerceve, { backgroundColor: theme.surfaceAlt, borderColor: theme.border }]}>
        <Image
          source={{ uri: urun.thumbnail }}
          style={styles.resim}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bilgiler}>
        <View style={styles.ustRozetSatiri}>
          <Text style={[styles.kategori, { backgroundColor: theme.surfaceAlt, color: theme.primary }]} numberOfLines={1}>
            {urun.category}
          </Text>
          <View style={[styles.puanRozeti, { backgroundColor: theme.surfaceAlt, borderColor: theme.border }]}>
            <Text style={[styles.puanYazi, { color: theme.text }]}>★ {urun.rating}</Text>
          </View>
        </View>
        <Text style={[styles.baslik, { color: theme.text }]} numberOfLines={2}>
          {urun.title}
        </Text>

        <View style={styles.altSatir}>
          <Text style={[styles.fiyat, { color: theme.primary }]}>${urun.price.toFixed(2)}</Text>
          <Pressable
            onPress={(event) => {
              event?.stopPropagation?.();
              onAdd();
            }}
            style={({ pressed }) => [
              styles.ekleButon,
              { backgroundColor: theme.primary },
              pressed && styles.ekleBasilmis,
            ]}
          >
            <Text style={[styles.ekleYazi, { color: theme.surface }]}>+ Sepete ekle</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  kart: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F1FF',
    borderColor: '#D8C8E5',
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#30233B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  basilmis: {
    opacity: 0.92,
    transform: [{ scale: 0.985 }],
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
    height: 94,
    width: 94,
  },
  bilgiler: {
    flex: 1,
  },
  ustRozetSatiri: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  kategori: {
    backgroundColor: '#FFF4DF',
    borderRadius: 20,
    color: '#7C4D9E',
    fontSize: 11,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 4,
    textTransform: 'capitalize',
  },
  baslik: {
    color: '#30233B',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 21,
    marginBottom: 10,
  },
  altSatir: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  fiyat: {
    color: '#7C4D9E',
    fontSize: 17,
    fontWeight: '800',
  },
  puanRozeti: {
    backgroundColor: '#FFF4DF',
    borderRadius: 20,
    borderColor: '#D8C8E5',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  puanYazi: {
    color: '#30233B',
    fontSize: 12,
    fontWeight: '700',
  },
  ekleButon: {
    backgroundColor: '#7C4D9E',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  ekleYazi: {
    color: '#FFFDF9',
    fontSize: 12,
    fontWeight: '800',
  },
  ekleBasilmis: {
    opacity: 0.78,
  },
});
