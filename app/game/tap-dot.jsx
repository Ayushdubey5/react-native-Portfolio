import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Dimensions, 
  Platform, 
  Pressable, 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const { width: W, height: H } = Dimensions.get('window');
const DOT_SIZE = 56;
const DURATION = 30;

const CYBER_COLORS = {
  bg: '#0a0e27',
  card: '#131936',
  border: '#222b54',
  primary: '#00d9ff',
  accent: '#9d4edd',
  purple: '#a855f7',
  gold: '#ffb703',
  text: '#ffffff',
  textMuted: '#8a95b2',
};

const DOT_COLORS = [CYBER_COLORS.primary, CYBER_COLORS.accent, CYBER_COLORS.purple, CYBER_COLORS.gold, '#EC4899', '#22C55E'];

function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

export default function TapDotGame() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const topPad = Platform.OS === 'web' ? 40 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 40 : insets.bottom;
  
  const SAFE_TOP = topPad + 110;
  const SAFE_BOT = H - bottomPad - 120;

  const [state, setState] = useState('idle');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [combo, setCombo] = useState(0);
  const [dots, setDots] = useState([]);
  
  const scoreRef = useRef(0);
  const timerRef = useRef(null);
  const spawnRef = useRef(null);

  const clearAll = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (spawnRef.current) clearTimeout(spawnRef.current);
  };

  const spawnDot = useCallback(() => {
    const id = genId();
    const x = Math.random() * (W - DOT_SIZE - 40) + 20;
    const y = Math.random() * (SAFE_BOT - SAFE_TOP - DOT_SIZE) + SAFE_TOP;
    const color = DOT_COLORS[Math.floor(Math.random() * DOT_COLORS.length)];

    const lifetime = Math.max(800, 2000 - scoreRef.current * 20);
    
    const tid = setTimeout(() => {
      setDots((prev) => prev.filter((d) => d.id !== id));
      setCombo(0);
    }, lifetime);

    setDots((prev) => [...prev, { id, x, y, color, tid }]);
    
    const nextSpawnRate = Math.max(300, 900 - scoreRef.current * 15);
    spawnRef.current = setTimeout(spawnDot, nextSpawnRate);
  }, [SAFE_TOP, SAFE_BOT]);

  const start = () => {
    clearAll();
    setDots([]);
    setScore(0);
    scoreRef.current = 0;
    setCombo(0);
    setTimeLeft(DURATION);
    setState('playing');
    
    spawnDot();

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearAll();
          setState('done');
          setDots([]);
          setBest((b) => Math.max(b, scoreRef.current));
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const handleTapDot = (id, tid) => {
    clearTimeout(tid);
    scoreRef.current += 1;
    setScore(scoreRef.current);
    setCombo((c) => c + 1);
    setDots((prev) => prev.filter((d) => d.id !== id));
  };

  const handleMissTap = () => {
    if (state !== 'playing') return;
    setCombo(0);
  };

  useEffect(() => () => clearAll(), []);

  return (
    <Pressable onPress={handleMissTap} style={styles.container}>
      {/* HUD Header Bar */}
      <View style={[styles.header, { paddingTop: topPad + 16 }]}>
        <Pressable onPress={() => { clearAll(); router.back(); }} style={styles.closeBtn}>
          <Feather name="x" size={20} color={CYBER_COLORS.text} />
        </Pressable>
        <View style={styles.hudRow}>
          <View style={styles.hudBox}>
            <Text style={styles.hudVal}>{score}</Text>
            <Text style={styles.hudLbl}>SCORE</Text>
          </View>
          <View style={styles.hudBox}>
            <Text style={[styles.hudVal, { color: timeLeft < 10 ? '#ff4d4d' : CYBER_COLORS.primary }]}>{timeLeft}s</Text>
            <Text style={styles.hudLbl}>TIME LEFT</Text>
          </View>
          <View style={styles.hudBox}>
            <Text style={[styles.hudVal, { color: CYBER_COLORS.gold }]}>{combo}</Text>
            <Text style={styles.hudLbl}>COMBO</Text>
          </View>
        </View>
      </View>

      {/* Dynamic Render Field */}
      {state === 'playing' && (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          {dots.map((d) => (
            <Pressable
              key={d.id}
              onPress={() => handleTapDot(d.id, d.tid)}
              style={[
                styles.targetDot,
                {
                  left: d.x,
                  top: d.y,
                  backgroundColor: d.color,
                  shadowColor: d.color,
                },
              ]}
            />
          ))}
        </View>
      )}

      {(state === 'idle' || state === 'done') && (
        <View style={styles.centerOverlay}>
          <View style={[styles.iconBox, { backgroundColor: `${CYBER_COLORS.primary}15` }]}>
            <Feather name="zap" size={36} color={CYBER_COLORS.primary} />
          </View>
          <Text style={styles.title}>{state === 'idle' ? 'Tap the Dot' : 'Game Over!'}</Text>
          <Text style={styles.sub}>
            {state === 'idle' 
              ? 'Test your core response mechanics. Tap dots before they vanish to maintain your streak.' 
              : `Awesome run! You managed to lock down a score of ${score}.`}
          </Text>
          <Text style={styles.bestScore}>Personal Best: {best}</Text>
          <Pressable onPress={start} style={styles.btnWrap}>
            <View style={[styles.btn, { backgroundColor: CYBER_COLORS.primary }]}>
              <Text style={styles.btnText}>{state === 'idle' ? 'START ROUND' : 'PLAY AGAIN'}</Text>
            </View>
          </Pressable>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CYBER_COLORS.bg },
  header: { paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', gap: 16 },
  closeBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: CYBER_COLORS.card, alignItems: 'center', justifyContent: 'center' },
  hudRow: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10 },
  hudBox: { alignItems: 'center' },
  hudVal: { fontSize: 22, fontWeight: '700', color: CYBER_COLORS.text },
  hudLbl: { fontSize: 9, fontWeight: '700', color: CYBER_COLORS.textMuted, letterSpacing: 1, marginTop: 2 },
  targetDot: { position: 'absolute', width: DOT_SIZE, height: DOT_SIZE, borderRadius: DOT_SIZE / 2, shadowOpacity: 0.6, shadowRadius: 10, elevation: 6 },
  centerOverlay: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 36, gap: 14 },
  iconBox: { width: 74, height: 74, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: '700', color: CYBER_COLORS.text },
  sub: { fontSize: 13, color: CYBER_COLORS.textMuted, textAlign: 'center', lineHeight: 21 },
  bestScore: { fontSize: 13, fontWeight: '600', color: CYBER_COLORS.gold },
  btnWrap: { borderRadius: 100, overflow: 'hidden', marginTop: 10 },
  btn: { paddingHorizontal: 36, paddingVertical: 14, borderRadius: 100 },
  btnText: { fontSize: 13, fontWeight: '700', color: '#fff', letterSpacing: 1 },
});