import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Platform, 
  Pressable, 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const CYBER_COLORS = {
  bg: '#0a0e27',
  card: '#131936',
  border: '#222b54',
  primary: '#00d9ff',
  accent: '#9d4edd',
  gold: '#ffb703',
  text: '#ffffff',
  textMuted: '#8a95b2',
};

const ICONS = [
  { name: 'heart', color: '#EC4899' },
  { name: 'star', color: CYBER_COLORS.gold },
  { name: 'zap', color: CYBER_COLORS.primary },
  { name: 'sun', color: '#F97316' },
  { name: 'moon', color: CYBER_COLORS.accent },
  { name: 'cloud', color: '#6366F1' },
  { name: 'droplet', color: '#22D3EE' },
  { name: 'leaf', color: '#22C55E' },
];

function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

function createDeck() {
  return ICONS.flatMap((ic, i) => [
    { id: genId(), pairId: i, ...ic, flipped: false, matched: false },
    { id: genId(), pairId: i, ...ic, flipped: false, matched: false },
  ]).sort(() => Math.random() - 0.5);
}

const CARD_SIZE = 74;

function CardTile({ card, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.cardWrap}>
      <View style={[
        styles.cardFaceInner, 
        {
          backgroundColor: card.flipped || card.matched ? (card.matched ? `${card.color}20` : CYBER_COLORS.card) : '#1A1A4E',
          borderColor: card.flipped || card.matched ? (card.matched ? `${card.color}dd` : card.color) : `${CYBER_COLORS.primary}40`,
        }
      ]}>
        {card.flipped || card.matched ? (
          <Feather name={card.name} size={24} color={card.color} />
        ) : (
          <Feather name="grid" size={18} color={`${CYBER_COLORS.primary}70`} />
        )}
      </View>
    </Pressable>
  );
}

export default function MemoryMatchGame() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const topPad = Platform.OS === 'web' ? 40 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 40 : insets.bottom;

  const [gameState, setGameState] = useState('idle');
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matched, setMatched] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [bestTime, setBestTime] = useState(null);
  
  const timerRef = useRef(null);
  const lockRef = useRef(false);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const start = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCards(createDeck());
    setSelected([]);
    setMoves(0);
    setMatched(0);
    setSeconds(0);
    setGameState('playing');
    lockRef.current = false;
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  };

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const press = useCallback((card) => {
    if (lockRef.current || card.flipped || card.matched || selected.length >= 2) return;

    const nextSelected = [...selected, card];
    setSelected(nextSelected);
    setCards((prev) => prev.map((c) => c.id === card.id ? { ...c, flipped: true } : c));

    if (nextSelected.length === 2) {
      lockRef.current = true;
      setMoves((m) => m + 1);
      const [a, b] = nextSelected;

      if (a.pairId === b.pairId) {
        setCards((prev) => prev.map((c) => c.pairId === a.pairId ? { ...c, matched: true } : c));
        const newMatched = matched + 1;
        setMatched(newMatched);
        setSelected([]);
        lockRef.current = false;
        
        if (newMatched === ICONS.length) {
          clearInterval(timerRef.current);
          setGameState('done');
          setBestTime((prev) => prev === null || seconds < prev ? seconds : prev);
        }
      } else {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => c.id === a.id || c.id === b.id ? { ...c, flipped: false } : c));
          setSelected([]);
          lockRef.current = false;
        }, 800);
      }
    }
  }, [selected, matched, seconds]);

  return (
    <View style={styles.container}>
      {/* Header Segments */}
      <View style={[styles.header, { paddingTop: topPad + 16 }]}>
        <Pressable onPress={() => { clearInterval(timerRef.current); router.back(); }} style={styles.closeBtn}>
          <Feather name="x" size={20} color={CYBER_COLORS.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Match Interface</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{moves}</Text>
            <Text style={styles.statLbl}>MOVES</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{fmt(seconds)}</Text>
            <Text style={styles.statLbl}>TIME</Text>
          </View>
        </View>
      </View>

      {/* Progress metrics */}
      {gameState === 'playing' && (
        <View style={styles.progress}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${(matched / ICONS.length) * 100}%` }]} />
          </View>
          <Text style={styles.progressTxt}>{matched}/{ICONS.length}</Text>
        </View>
      )}

      {(gameState === 'idle' || gameState === 'done') && (
        <View style={styles.overlay}>
          {gameState === 'idle' ? (
            <>
              <View style={styles.sampleRow}>
                {ICONS.slice(0, 4).map((ic) => (
                  <View key={ic.name} style={[styles.sample, { backgroundColor: `${ic.color}15` }]}>
                    <Feather name={ic.name} size={22} color={ic.color} />
                  </View>
                ))}
              </View>
              <Text style={styles.overlayTitle}>Match the Interface</Text>
              <Text style={styles.overlaySub}>Flip cards, find matching UI icons. Complete to unlock hidden portfolio content.</Text>
              {bestTime !== null && <Text style={styles.bestTxt}>Best: {fmt(bestTime)}</Text>}
            </>
          ) : (
            <>
              <Text style={styles.wonEmoji}>🎉</Text>
              <Text style={styles.overlayTitle}>Portfolio Unlocked!</Text>
              <View style={styles.resultRow}>
                <View style={styles.resultItem}>
                  <Text style={styles.resultNum}>{moves}</Text>
                  <Text style={styles.resultLbl}>Moves</Text>
                </View>
                <View style={styles.resultItem}>
                  <Text style={styles.resultNum}>{fmt(seconds)}</Text>
                  <Text style={styles.resultLbl}>Time</Text>
                </View>
              </View>
            </>
          )}
          <Pressable onPress={start} style={styles.startWrap}>
            <View style={[styles.startBtn, { backgroundColor: CYBER_COLORS.accent }]}>
              <Text style={styles.startTxt}>{gameState === 'idle' ? 'START GAME' : 'PLAY AGAIN'}</Text>
            </View>
          </Pressable>
        </View>
      )}

      {/* Primary gameplay matrix board view */}
      {gameState === 'playing' && (
        <View style={styles.grid}>
          {cards.map((card) => (
            <CardTile key={card.id} card={card} onPress={() => press(card)} />
          ))}
        </View>
      )}
      <View style={{ paddingBottom: bottomPad + 16 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CYBER_COLORS.bg },
  header: { paddingHorizontal: 20, paddingBottom: 14 },
  closeBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: CYBER_COLORS.card, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: CYBER_COLORS.text, marginBottom: 12 },
  statsRow: { flexDirection: 'row', gap: 32 },
  statBox: { alignItems: 'center' },
  statNum: { fontSize: 24, fontWeight: '700', color: CYBER_COLORS.text, letterSpacing: -1 },
  statLbl: { fontSize: 9, fontWeight: '700', color: CYBER_COLORS.textMuted, letterSpacing: 1.5 },
  progress: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 20, marginBottom: 24 },
  progressTrack: { flex: 1, height: 4, backgroundColor: CYBER_COLORS.border, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: CYBER_COLORS.accent },
  progressTxt: { fontSize: 12, color: CYBER_COLORS.textMuted, width: 40, textAlign: 'right' },
  overlay: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14, paddingHorizontal: 32 },
  sampleRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  sample: { width: 50, height: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  overlayTitle: { fontSize: 24, fontWeight: '700', color: CYBER_COLORS.text },
  overlaySub: { fontSize: 13, color: CYBER_COLORS.textMuted, textAlign: 'center', lineHeight: 21 },
  bestTxt: { fontSize: 13, fontWeight: '600', color: CYBER_COLORS.accent },
  wonEmoji: { fontSize: 50 },
  resultRow: { flexDirection: 'row', gap: 40, marginVertical: 10 },
  resultItem: { alignItems: 'center' },
  resultNum: { fontSize: 32, fontWeight: '700', color: CYBER_COLORS.text },
  resultLbl: { fontSize: 11, color: CYBER_COLORS.textMuted, marginTop: 2 },
  startWrap: { borderRadius: 100, overflow: 'hidden', marginTop: 10 },
  startBtn: { paddingHorizontal: 36, paddingVertical: 14, borderRadius: 100 },
  startTxt: { fontSize: 13, fontWeight: '700', color: '#fff', letterSpacing: 1 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10, paddingHorizontal: 16 },
  cardWrap: { width: CARD_SIZE, height: CARD_SIZE },
  cardFaceInner: { flex: 1, borderRadius: 14, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
});