import { useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = ['Bilgisayar', 'Yazıcı', 'Ağ', 'E-posta'];
const statuses = ['Bekliyor', 'İşlemde', 'Tamamlandı'];
const initialRequests = [
  { id: 'ARZ-1001', title: 'Bilgisayar açılmıyor', description: 'Öğrenci İşleri bilgisayarında güç verilmiyor.', category: 'Bilgisayar', status: 'Bekliyor' },
  { id: 'ARZ-1002', title: 'Yazıcı bağlantı sorunu', description: 'Personel dairesindeki yazıcı ağa bağlanmıyor.', category: 'Yazıcı', status: 'İşlemde' },
];

export default function Index() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [requests, setRequests] = useState(initialRequests);
  const [selected, setSelected] = useState(initialRequests[0]);
  const [statusFilter, setStatusFilter] = useState('Tümü');
  const [search, setSearch] = useState('');

  const filteredRequests = useMemo(() => requests.filter((item) => {
    const matchesStatus = statusFilter === 'Tümü' || item.status === statusFilter;
    const matchesSearch = item.title.toLocaleLowerCase('tr-TR').includes(search.toLocaleLowerCase('tr-TR'));
    return matchesStatus && matchesSearch;
  }), [requests, statusFilter, search]);

  const completedCount = requests.filter((item) => item.status === 'Tamamlandı').length;

  const saveRequest = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Eksik bilgi', 'Başlık ve açıklama yalnızca boşluklardan oluşamaz.');
      return;
    }
    const request = {
      id: `ARZ-${1000 + requests.length + 1}`,
      title: title.trim(),
      description: description.trim(),
      category,
      status: 'Bekliyor',
    };
    setRequests((previous) => [request, ...previous]);
    setSelected(request);
    setTitle('');
    setDescription('');
    setCategory(categories[0]);
    Alert.alert('Talep kaydedildi', `${request.id} numaralı talep oluşturuldu.`);
  };

  const deleteRequest = (request) => {
    Alert.alert('Talebi sil', `${request.title} kaydı silinsin mi?`, [
      { text: 'Vazgeç', style: 'cancel' },
      { text: 'Sil', style: 'destructive', onPress: () => {
        setRequests((previous) => {
          const remaining = previous.filter((item) => item.id !== request.id);
          if (selected?.id === request.id) setSelected(remaining[0] ?? null);
          return remaining;
        });
        Alert.alert('Silme tamamlandı', 'Seçili talep kaldırıldı.');
      } },
    ]);
  };

  const changeStatus = (requestId, status) => {
    setRequests((previous) => previous.map((item) => item.id === requestId ? { ...item, status } : item));
    setSelected((previous) => previous?.id === requestId ? { ...previous, status } : previous);
  };

  const statusColor = (status) => status === 'Bekliyor' ? '#C87519' : status === 'İşlemde' ? '#3978B9' : '#2E8B57';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headingRow}>
          <View>
            <Text style={styles.eyebrow}>AKILLI ARIZA TAKİP</Text>
            <Text style={styles.title}>Yeni talep</Text>
          </View>
          <View style={styles.completed}><Text style={styles.completedNumber}>{completedCount}</Text><Text style={styles.completedLabel}>Tamamlandı</Text></View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Talep başlığı</Text>
          <TextInput value={title} onChangeText={setTitle} placeholder="Kısa başlık girin" style={styles.input} />
          <Text style={styles.label}>Açıklama</Text>
          <TextInput value={description} onChangeText={setDescription} placeholder="Sorunu açıklayın" multiline style={[styles.input, styles.textArea]} />
          <Text style={styles.label}>Kategori</Text>
          <View style={styles.categoryRow}>{categories.map((item) => (
            <Pressable key={item} onPress={() => setCategory(item)} style={[styles.category, category === item && styles.categoryActive]}>
              <Text style={[styles.categoryText, category === item && styles.categoryTextActive]}>{item}</Text>
            </Pressable>
          ))}</View>
          <Pressable onPress={saveRequest} style={styles.saveButton}><Text style={styles.saveText}>Talebi Kaydet</Text></Pressable>
        </View>

        <Text style={styles.sectionTitle}>Talep listesi</Text>
        <TextInput value={search} onChangeText={setSearch} placeholder="Arıza başlığında ara" style={styles.search} />
        <View style={styles.filters}>{['Tümü', ...statuses].map((item) => (
          <Pressable key={item} onPress={() => setStatusFilter(item)} style={[styles.filter, statusFilter === item && styles.filterActive]}>
            <Text style={[styles.filterText, statusFilter === item && styles.filterTextActive]}>{item}</Text>
          </Pressable>
        ))}</View>

        <FlatList
          data={filteredRequests}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setSelected(item)}
              onLongPress={() => deleteRequest(item)}
              delayLongPress={500}
              style={[styles.request, selected?.id === item.id && styles.requestActive]}
            >
              <View style={styles.requestTop}>
                <Text style={styles.requestId}>{item.id}</Text>
                <Text style={[styles.status, { color: statusColor(item.status) }]}>{item.status}</Text>
              </View>
              <Text style={styles.requestTitle}>{item.title}</Text>
              <Text style={styles.requestMeta}>{item.category}</Text>
            </Pressable>
          )}
          ListEmptyComponent={<Text style={styles.empty}>Kayıt bulunamadı.</Text>}
        />

        {selected ? (
          <View style={styles.detail}>
            <Text style={styles.detailId}>{selected.id}</Text>
            <Text style={styles.detailTitle}>{selected.title}</Text>
            <Text style={styles.detailText}>{selected.description}</Text>
            <Text style={styles.detailMeta}>Kategori: {selected.category}</Text>
            <Text style={[styles.detailStatus, { color: statusColor(selected.status) }]}>Durum: {selected.status}</Text>
            <Text style={styles.statusLabel}>Durumu değiştir</Text>
            <View style={styles.statusRow}>{statuses.map((item) => (
              <Pressable key={item} onPress={() => changeStatus(selected.id, item)} style={[styles.statusButton, selected.status === item && { backgroundColor: statusColor(item), borderColor: statusColor(item) }]}>
                <Text style={[styles.statusButtonText, selected.status === item && styles.statusButtonTextActive]}>{item}</Text>
              </Pressable>
            ))}</View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF4DF' },
  content: { padding: 20, paddingBottom: 36 },
  headingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  eyebrow: { color: '#7C4D9E', fontSize: 10, fontWeight: '900', letterSpacing: 1.3 },
  title: { color: '#30233B', fontSize: 32, fontWeight: '900', marginTop: 4 },
  completed: { alignItems: 'center', justifyContent: 'center', width: 82, height: 82, borderRadius: 41, backgroundColor: '#F7F1FF', borderWidth: 1, borderColor: '#D8C8E5' },
  completedNumber: { color: '#7C4D9E', fontSize: 24, fontWeight: '900' },
  completedLabel: { color: '#766A80', fontSize: 9, fontWeight: '900' },
  card: { borderRadius: 22, backgroundColor: '#F7F1FF', borderWidth: 1, borderColor: '#D8C8E5', padding: 16 },
  label: { color: '#30233B', fontSize: 12, fontWeight: '900', marginBottom: 7, marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#D8C8E5', borderRadius: 10, backgroundColor: '#FFFDF8', color: '#30233B', paddingHorizontal: 12, paddingVertical: 11 },
  textArea: { height: 82, textAlignVertical: 'top' },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  category: { borderRadius: 9, borderWidth: 1, borderColor: '#D8C8E5', backgroundColor: '#FFFDF8', paddingHorizontal: 9, paddingVertical: 8 },
  categoryActive: { backgroundColor: '#7C4D9E', borderColor: '#7C4D9E' },
  categoryText: { color: '#766A80', fontSize: 11, fontWeight: '800' },
  categoryTextActive: { color: 'white' },
  saveButton: { alignItems: 'center', borderRadius: 12, backgroundColor: '#7C4D9E', marginTop: 18, paddingVertical: 13 },
  saveText: { color: 'white', fontSize: 14, fontWeight: '900' },
  sectionTitle: { color: '#30233B', fontSize: 21, fontWeight: '900', marginTop: 24, marginBottom: 10 },
  search: { borderRadius: 10, borderWidth: 1, borderColor: '#D8C8E5', backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 11 },
  filters: { flexDirection: 'row', gap: 6, marginTop: 10 },
  filter: { flex: 1, alignItems: 'center', borderRadius: 9, borderWidth: 1, borderColor: '#D8C8E5', backgroundColor: 'white', paddingVertical: 8 },
  filterActive: { backgroundColor: '#30233B', borderColor: '#30233B' },
  filterText: { color: '#766A80', fontSize: 10, fontWeight: '900' },
  filterTextActive: { color: 'white' },
  list: { gap: 9, paddingTop: 12 },
  request: { borderRadius: 14, borderWidth: 1, borderColor: '#D8C8E5', backgroundColor: '#F7F1FF', padding: 13 },
  requestActive: { borderColor: '#7C4D9E', borderWidth: 2 },
  requestTop: { flexDirection: 'row', justifyContent: 'space-between' },
  requestId: { color: '#766A80', fontSize: 10, fontWeight: '900' },
  status: { fontSize: 11, fontWeight: '900' },
  requestTitle: { color: '#30233B', fontSize: 16, fontWeight: '900', marginTop: 7 },
  requestMeta: { color: '#766A80', fontSize: 12, marginTop: 3 },
  empty: { color: '#766A80', paddingVertical: 20, textAlign: 'center' },
  detail: { borderRadius: 20, backgroundColor: '#30233B', marginTop: 18, padding: 18 },
  detailId: { color: '#DDBCF1', fontSize: 10, fontWeight: '900' },
  detailTitle: { color: 'white', fontSize: 21, fontWeight: '900', marginTop: 7 },
  detailText: { color: '#F7EFFA', fontSize: 13, lineHeight: 20, marginTop: 8 },
  detailMeta: { color: '#F7EFFA', fontSize: 12, marginTop: 12 },
  detailStatus: { fontSize: 12, fontWeight: '900', marginTop: 5 },
  statusLabel: { color: '#F7EFFA', fontSize: 11, fontWeight: '900', marginTop: 14 },
  statusRow: { flexDirection: 'row', gap: 6, marginTop: 8 },
  statusButton: { flex: 1, alignItems: 'center', borderRadius: 8, borderWidth: 1, borderColor: '#B9A8C2', paddingVertical: 8 },
  statusButtonText: { color: '#F7EFFA', fontSize: 9, fontWeight: '900' },
  statusButtonTextActive: { color: 'white' },
});
