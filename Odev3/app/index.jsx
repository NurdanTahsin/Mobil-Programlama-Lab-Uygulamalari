import { useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const initialRequests = [
  { id: 'TLP-1001', title: 'Bilgisayar açılmıyor', category: 'Bilgisayar', unit: 'Öğrenci İşleri', priority: 'Yüksek', status: 'Açık' },
  { id: 'TLP-1002', title: 'Yazıcı bağlantı sorunu', category: 'Yazıcı', unit: 'Personel Daire Başkanlığı', priority: 'Orta', status: 'İşlemde' },
  { id: 'TLP-1003', title: 'Ağ erişimi kesildi', category: 'Ağ', unit: 'Muhasebe', priority: 'Yüksek', status: 'Açık' },
  { id: 'TLP-1004', title: 'Projeksiyon açılmıyor', category: 'Bilgisayar', unit: 'Sınav Birimi', priority: 'Orta', status: 'Tamamlandı' },
];
const categories = ['Bilgisayar', 'Yazıcı', 'Ağ', 'E-posta'];
const filters = ['Tümü', 'Açık', 'İşlemde', 'Tamamlandı'];

export default function Index() {
  const [requests, setRequests] = useState(initialRequests);
  const [filter, setFilter] = useState('Tümü');
  const [screen, setScreen] = useState('panel');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [urgent, setUrgent] = useState(false);
  const { width } = useWindowDimensions();
  const columns = width >= 700 ? 4 : 2;

  const counts = useMemo(() => ({
    all: requests.length,
    open: requests.filter((item) => item.status === 'Açık').length,
    progress: requests.filter((item) => item.status === 'İşlemde').length,
    done: requests.filter((item) => item.status === 'Tamamlandı').length,
  }), [requests]);
  const visible = filter === 'Tümü' ? requests : requests.filter((item) => item.status === filter);

  const createRequest = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Eksik bilgi', 'Başlık ve açıklama alanlarını doldurun.');
      return;
    }
    const request = {
      id: `TLP-${1005 + requests.length}`,
      title: title.trim(),
      category,
      unit: 'Öğrenci İşleri',
      priority: urgent ? 'Acil' : 'Orta',
      status: 'Açık',
      description: description.trim(),
    };
    setRequests((previous) => [request, ...previous]);
    setTitle('');
    setDescription('');
    setCategory(categories[0]);
    setUrgent(false);
    Alert.alert('Talep oluşturuldu', `${request.id} numaralı talep kaydedildi.`);
  };

  const changeStatus = (id) => {
    setRequests((previous) => previous.map((item) => {
      if (item.id !== id) return item;
      const status = item.status === 'Açık' ? 'İşlemde' : item.status === 'İşlemde' ? 'Tamamlandı' : 'Açık';
      return { ...item, status };
    }));
  };

  const statusColor = (status) => status === 'Açık' ? '#DC2626' : status === 'İşlemde' ? '#2563EB' : '#16A34A';

  const summary = [
    ['Toplam Talep', counts.all, '#7C4D9E'],
    ['Açık Talep', counts.open, '#DC2626'],
    ['İşlemde', counts.progress, '#2563EB'],
    ['Tamamlanan', counts.done, '#16A34A'],
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.department}>BİLGİ İŞLEM DAİRE BAŞKANLIĞI</Text>
        <Text style={styles.title}>Teknik Destek Paneli</Text>
        <Text style={styles.subtitle}>Destek taleplerini buradan yönetin.</Text>
        <View style={styles.tabs}>
          <Pressable onPress={() => setScreen('panel')} style={[styles.tab, screen === 'panel' && styles.activeTab]}><Text style={[styles.tabText, screen === 'panel' && styles.activeTabText]}>Yönetim Paneli</Text></Pressable>
          <Pressable onPress={() => setScreen('form')} style={[styles.tab, screen === 'form' && styles.activeTab]}><Text style={[styles.tabText, screen === 'form' && styles.activeTabText]}>Yeni Talep</Text></Pressable>
        </View>
      </View>

      {screen === 'form' ? (
        <ScrollView contentContainerStyle={styles.form}>
          <Text style={styles.sectionTitle}>Yeni Arıza Bildirimi</Text>
          <Text style={styles.label}>Talep başlığı</Text>
          <TextInput value={title} onChangeText={setTitle} placeholder="Örn. Projeksiyon çalışmıyor" style={styles.input} />
          <Text style={styles.label}>Açıklama</Text>
          <TextInput value={description} onChangeText={setDescription} placeholder="Sorunu kısaca açıklayın" multiline style={[styles.input, styles.textArea]} />
          <Text style={styles.label}>Kategori</Text>
          <View style={styles.categoryRow}>{categories.map((item) => <Pressable key={item} onPress={() => setCategory(item)} style={[styles.category, category === item && styles.categoryActive]}><Text style={[styles.categoryText, category === item && styles.categoryTextActive]}>{item}</Text></Pressable>)}</View>
          <View style={styles.switchRow}><Text style={styles.switchLabel}>Acil müdahale</Text><Switch value={urgent} onValueChange={setUrgent} /></View>
          <Pressable onPress={createRequest} style={styles.saveButton}><Text style={styles.saveText}>Talep Oluştur</Text></Pressable>
        </ScrollView>
      ) : (
        <View style={styles.panel}>
          <View style={styles.summaryGrid}>
            {summary.map(([label, value, color]) => <View key={label} style={[styles.summaryCard, { borderTopColor: color }]}><Text style={styles.summaryLabel}>{label}</Text><Text style={[styles.summaryValue, { color }]}>{value}</Text></View>)}
          </View>
          <View style={styles.filters}>{filters.map((item) => <Pressable key={item} onPress={() => setFilter(item)} style={[styles.filter, filter === item && styles.filterActive]}><Text style={[styles.filterText, filter === item && styles.filterTextActive]}>{item}</Text></Pressable>)}</View>
          <FlatList
            data={visible}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.requestCard}>
                <View style={styles.cardTop}><Text style={styles.requestId}>{item.id}</Text><Text style={styles.priority}>{item.priority}</Text></View>
                <Text style={styles.requestTitle}>{item.title}</Text>
                <Text style={styles.requestMeta}>{item.category} · {item.unit}</Text>
                {item.description ? <Text style={styles.description}>{item.description}</Text> : null}
                <View style={styles.cardBottom}><Text style={[styles.status, { color: statusColor(item.status) }]}>{item.status}</Text><Pressable onPress={() => changeStatus(item.id)} style={[styles.statusButton, { borderColor: statusColor(item.status) }]}><Text style={[styles.statusButtonText, { color: statusColor(item.status) }]}>{item.status === 'Açık' ? 'İşleme Al' : item.status === 'İşlemde' ? 'Tamamla' : 'Yeniden Aç'}</Text></Pressable></View>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.empty}>Seçilen duruma ait destek talebi yok.</Text>}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F4F0F7' },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 10, backgroundColor: '#FFFDF8' },
  department: { color: '#7C4D9E', fontSize: 10, fontWeight: '900', letterSpacing: 1.2 },
  title: { color: '#30233B', fontSize: 26, fontWeight: '900', marginTop: 5 },
  subtitle: { color: '#766A80', fontSize: 13, marginTop: 4 },
  tabs: { flexDirection: 'row', gap: 8, marginTop: 14 },
  tab: { flex: 1, alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#D8C8E5', paddingVertical: 9 },
  activeTab: { backgroundColor: '#7C4D9E', borderColor: '#7C4D9E' },
  tabText: { color: '#766A80', fontSize: 12, fontWeight: '900' },
  activeTabText: { color: '#FFFDF8' },
  panel: { flex: 1, paddingHorizontal: 16 },
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingVertical: 12 },
  summaryCard: { flexGrow: 1, width: '23%', minWidth: 82, borderTopWidth: 3, borderRadius: 12, backgroundColor: 'white', padding: 10 },
  summaryLabel: { color: '#766A80', fontSize: 10 },
  summaryValue: { fontSize: 22, fontWeight: '900', marginTop: 5 },
  filters: { flexDirection: 'row', gap: 6, marginBottom: 8 },
  filter: { flex: 1, alignItems: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#D8C8E5', backgroundColor: 'white', paddingVertical: 8 },
  filterActive: { backgroundColor: '#30233B', borderColor: '#30233B' },
  filterText: { color: '#766A80', fontSize: 11, fontWeight: '800' },
  filterTextActive: { color: 'white' },
  list: { gap: 10, paddingBottom: 20 },
  requestCard: { borderRadius: 14, backgroundColor: 'white', borderWidth: 1, borderColor: '#E4DAEA', padding: 14 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between' },
  requestId: { color: '#766A80', fontSize: 11, fontWeight: '900' },
  priority: { color: '#7C4D9E', fontSize: 11, fontWeight: '900' },
  requestTitle: { color: '#30233B', fontSize: 18, fontWeight: '900', marginTop: 8 },
  requestMeta: { color: '#766A80', fontSize: 12, marginTop: 4 },
  description: { color: '#30233B', fontSize: 12, lineHeight: 18, marginTop: 8 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  status: { fontSize: 12, fontWeight: '900' },
  statusButton: { borderRadius: 8, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 7 },
  statusButtonText: { fontSize: 11, fontWeight: '900' },
  empty: { color: '#766A80', textAlign: 'center', paddingTop: 30 },
  form: { padding: 20 },
  sectionTitle: { color: '#30233B', fontSize: 22, fontWeight: '900', marginBottom: 18 },
  label: { color: '#30233B', fontSize: 13, fontWeight: '900', marginBottom: 7, marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#D8C8E5', borderRadius: 12, backgroundColor: 'white', color: '#30233B', paddingHorizontal: 12, paddingVertical: 12 },
  textArea: { height: 100, textAlignVertical: 'top' },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  category: { borderWidth: 1, borderColor: '#D8C8E5', borderRadius: 10, backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 9 },
  categoryActive: { backgroundColor: '#7C4D9E', borderColor: '#7C4D9E' },
  categoryText: { color: '#766A80', fontSize: 12, fontWeight: '800' },
  categoryTextActive: { color: 'white' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 },
  switchLabel: { color: '#30233B', fontSize: 13, fontWeight: '900' },
  saveButton: { alignItems: 'center', backgroundColor: '#7C4D9E', borderRadius: 12, marginTop: 24, paddingVertical: 14 },
  saveText: { color: 'white', fontSize: 15, fontWeight: '900' },
});
