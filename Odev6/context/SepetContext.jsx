import { createContext, useContext, useMemo, useState } from 'react';

const SepetContext = createContext(null);

export function SepetProvider({ children }) {
  const [sepet, setSepet] = useState([]);

  const sepeteEkle = (urun, adet) => {
    if (urun.stok < 1) return;
    setSepet((onceki) => {
      const mevcut = onceki.find((item) => item.id === urun.id);
      if (mevcut) return onceki.map((item) => item.id === urun.id ? { ...item, adet: Math.min(item.adet + adet, urun.stok) } : item);
      return [...onceki, { ...urun, adet: Math.min(adet, urun.stok) }];
    });
  };

  const adetArtir = (id) => setSepet((onceki) => onceki.map((item) => item.id === id ? { ...item, adet: Math.min(item.adet + 1, item.stok) } : item));
  const adetAzalt = (id) => setSepet((onceki) => onceki.flatMap((item) => item.id === id && item.adet === 1 ? [] : item.id === id ? [{ ...item, adet: item.adet - 1 }] : [item]));
  const urunKaldir = (id) => setSepet((onceki) => onceki.filter((item) => item.id !== id));
  const sepetiBosalt = () => setSepet([]);
  const toplamAdet = sepet.reduce((toplam, item) => toplam + item.adet, 0);
  const toplamTutar = sepet.reduce((toplam, item) => toplam + item.fiyat * item.adet, 0);
  const value = useMemo(() => ({ sepet, sepeteEkle, adetArtir, adetAzalt, urunKaldir, sepetiBosalt, toplamAdet, toplamTutar }), [sepet, toplamAdet, toplamTutar]);

  return <SepetContext.Provider value={value}>{children}</SepetContext.Provider>;
}

export function useSepet() {
  const context = useContext(SepetContext);
  if (!context) throw new Error('useSepet, SepetProvider içinde kullanılmalıdır.');
  return context;
}
