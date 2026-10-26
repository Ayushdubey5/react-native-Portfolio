import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
  Platform, 
  Pressable 
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const CYBER_COLORS = {
  bg: '#0a0e27',
  card: '#131936',
  cardLight: '#1c234a',
  border: '#222b54',
  primary: '#00d9ff',
  accent: '#9d4edd',
  purple: '#a855f7',
  gold: '#ffb703',
  green: '#38b000',
  text: '#ffffff',
  textMuted: '#8a95b2',
};

const GAMES = [
  {
    id: 'tap-dot',
    title: 'Tap the Dot',
    subtitle: 'Reflexes',
    desc: 'Glowing particles appear and vanish. Tap fast. Build combos. Beat the leaderboard.',
    route: '/game/tap-dot', // FIXED: Changed /games/ to /game/ to match your folder tree
    backupBg: '#132152',
    accentColor: CYBER_COLORS.primary,
    icon: 'zap',
    badge: '🏆 Top Recruiter Score',
  },
  {
    id: 'memory-match',
    title: 'Match the Interface',
    subtitle: 'Memory',
    desc: 'Flip UI cards and find pairs. Complete it to unlock hidden portfolio content.',
    route: '/game/memory-match', // FIXED: Changed /games/ to /game/ to match your folder tree
    backupBg: '#2a1a4a',
    accentColor: CYBER_COLORS.accent,
    icon: 'grid',
    badge: '🔒 Unlocks content',
  },
  {
    id: 'debug-challenge',
    title: 'Debug Challenge',
    subtitle: 'Coding',
    desc: 'Spot the broken component in real code snippets. Shows your technical instinct.',
    route: '/game/debug-challenge', // FIXED: Changed /games/ to /game/ to match your folder tree
    backupBg: '#3d2b11',
    accentColor: CYBER_COLORS.gold,
    icon: 'code',
    badge: '⚡ Tests your skills',
  },
];

const ACHIEVEMENTS = [
  { icon: 'award', label: 'First Win', unlocked: true, color: CYBER_COLORS.gold },
  { icon: 'zap', label: 'Speed Demon', unlocked: true, color: CYBER_COLORS.primary },
  { icon: 'grid', label: 'Memorist', unlocked: false, color: CYBER_COLORS.accent },
  { icon: 'code', label: 'Bug Slayer', unlocked: false, color: CYBER_COLORS.purple },
  { icon: 'star', label: 'Perfect Run', unlocked: false, color: '#EC4899' },
  { icon: 'target', label: 'Sharp Eye', unlocked: false, color: CYBER_COLORS.green },
];

function GameCard({ game }) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(game.route)}
      style={({ pressed }) => [
        styles.cardContainer,
        { 
          opacity: pressed ? 0.92 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }] 
        }
      ]}
    >
      <View style={[styles.cardGradFallback, { backgroundColor: game.backupBg }]}>
        <View style={styles.glowCircleStatic} />

        <View style={styles.cardHead}>
          <View style={styles.iconBox}>
            <Feather name={game.icon} size={24} color="#fff" />
          </View>
          <View style={styles.badgePill}>
            <Text style={styles.badgeText}>{game.subtitle.toUpperCase()}</Text>
          </View>
        </View>

        <Text style={styles.cardTitle}>{game.title}</Text>
        <Text style={styles.cardDesc}>{game.desc}</Text>

        <View style={styles.cardFoot}>
          <Text style={styles.badgeLabel}>{game.badge}</Text>
          <View style={[styles.playBtn, { backgroundColor: game.accentColor }]}>
            <Feather name="play" size={16} color="#fff" style={{ marginLeft: 2 }} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default function GamesScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 40 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 40 : insets.bottom;

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={{ paddingBottom: bottomPad + 120 }} 
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.header, { paddingTop: topPad + 24 }]}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Playground</Text>
          <View style={styles.labBadge}>
            <View style={styles.labDot} />
            <Text style={styles.labText}>INTERACTIVE LAB</Text>
          </View>
        </View>
        <Text style={styles.headerSub}>Games that show who you're hiring. Recruiters remember this.</Text>
      </View>

      <View style={styles.gameListWrap}>
        {GAMES.map((g) => <GameCard key={g.id} game={g} />)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achieveGrid}>
          {ACHIEVEMENTS.map((a) => (
            <View
              key={a.label}
              style={[
                styles.achieveChip,
                {
                  backgroundColor: a.unlocked ? `${a.color}15` : CYBER_COLORS.card,
                  borderColor: a.unlocked ? `${a.color}40` : CYBER_COLORS.border,
                  opacity: a.unlocked ? 1 : 0.5,
                },
              ]}
            >
              <Feather name={a.icon} size={14} color={a.unlocked ? a.color : CYBER_COLORS.textMuted} />
              <Text style={[styles.achieveLabel, { color: a.unlocked ? CYBER_COLORS.text : CYBER_COLORS.textMuted }]}>
                {a.label}
              </Text>
              {!a.unlocked && <Feather name="lock" size={10} color={CYBER_COLORS.textMuted} />}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.hint}>
        <Feather name="info" size={14} color={CYBER_COLORS.primary} />
        <Text style={styles.hintText}>Complete all games to unlock a secret easter egg in the portfolio.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CYBER_COLORS.bg },
  header: { paddingHorizontal: 20, paddingBottom: 20 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  headerTitle: { fontSize: 28, fontWeight: '700', color: CYBER_COLORS.text, letterSpacing: -0.5 },
  labBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 100, borderWidth: 1, backgroundColor: '#9d4edd15', borderColor: '#9d4edd40' },
  labDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: CYBER_COLORS.accent },
  labText: { fontSize: 9, fontWeight: '700', color: CYBER_COLORS.accent, letterSpacing: 1 },
  headerSub: { fontSize: 13, fontWeight: '400', color: CYBER_COLORS.textMuted, lineHeight: 20 },
  gameListWrap: { paddingHorizontal: 20, gap: 14 },
  cardContainer: { borderRadius: 24, overflow: 'hidden' },
  cardGradFallback: { padding: 20, minHeight: 160, position: 'relative', overflow: 'hidden', borderRadius: 24, borderWidth: 1, borderColor: CYBER_COLORS.border },
  glowCircleStatic: { position: 'absolute', right: -30, top: -30, width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.05)' },
  cardHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  iconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  badgePill: { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 100 },
  badgeText: { fontSize: 9, fontWeight: '700', color: '#fff', letterSpacing: 1 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 6 },
  cardDesc: { fontSize: 13, fontWeight: '400', color: 'rgba(255,255,255,0.75)', lineHeight: 19, marginBottom: 16 },
  cardFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  badgeLabel: { fontSize: 11, fontWeight: '500', color: 'rgba(255,255,255,0.8)' },
  playBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  section: { paddingHorizontal: 20, marginTop: 28 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: CYBER_COLORS.text, letterSpacing: -0.3, marginBottom: 14 },
  achieveGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  achieveChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1 },
  achieveLabel: { fontSize: 12, fontWeight: '500' },
  hint: { backgroundColor: '#00d9ff10', borderRadius: 12, borderWidth: 1, borderColor: '#00d9ff25', padding: 14, flexDirection: 'row', gap: 10, marginHorizontal: 20, marginTop: 24 },
  hintText: { flex: 1, fontSize: 12, fontWeight: '400', color: CYBER_COLORS.textMuted, lineHeight: 18 },
});