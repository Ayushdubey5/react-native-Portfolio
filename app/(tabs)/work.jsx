import React, { useState } from 'react';
import { 
  Dimensions, 
  Platform, 
  Pressable, 
  ScrollView, 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';

const { width: W } = Dimensions.get('window');

// Embedded fallback style palette to maintain dark cyber theme layout stability
const CYBER_COLORS = {
  bg: '#0a0e27',
  card: '#131936',
  border: '#222b54',
  primary: '#00d9ff',
  accent: '#9d4edd',
  purple: '#a855f7',
  gold: '#ffb703',
  green: '#38b000',
  text: '#ffffff',
  textSub: '#abb7d6',
  textMuted: '#8a95b2',
};

const CATS = ['All', 'UI', 'UX', 'App', 'Brand'];

const PROJECTS = [
  {
    id: '1', title: 'Nitara Jewels Website', category: 'UI', year: '2026',
    color: CYBER_COLORS.primary,
    tags: ['Dark UI', 'Analytics', 'Glass'], iconName: 'analytics-outline',
    desc: 'Analytics dashboard with glassmorphism UI.', perf: 98, resp: true, seo: 92,
  },
  {
    id: '2', title: 'Vision World', category: 'UX', year: '2024',
    color: CYBER_COLORS.accent,
    tags: ['E-commerce', 'Mobile', 'Minimal'], iconName: 'cart-outline',
    desc: 'Minimal e-commerce with streamlined checkout.', perf: 95, resp: true, seo: 96,
  },
  {
    id: '3', title: 'Chat Assistant (AI Voice Assistant)', category: 'App', year: '2023',
    color: CYBER_COLORS.purple,
    tags: ['Social', 'Dark Mode'], iconName: 'chatbubbles-outline',
    desc: 'Next-gen social for Gen Z creators.', perf: 91, resp: true, seo: 88,
  },
  {
    id: '4', title: 'Vega Finance', category: 'UI', year: '2023',
    color: CYBER_COLORS.gold,
    tags: ['FinTech', 'Charts'], iconName: 'card-outline',
    desc: 'Personal finance tracker with elegant charts.', perf: 96, resp: true, seo: 90,
  },
  {
    id: '5', title: 'Nova Brand Kit', category: 'Brand', year: '2022',
    color: '#EC4899',
    tags: ['Identity', 'Visual'], iconName: 'color-palette-outline',
    desc: 'Complete brand system for a tech startup.', perf: 100, resp: true, seo: 99,
  },
];

function StatChip({ label, val, color }) {
  return (
    <View style={[styles.statChip, { backgroundColor: `${color}15`, borderColor: `${color}30` }]}>
      <Text style={[styles.statVal, { color }]}>{val}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ProjectCard({ project }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  return (
    <Pressable
      onPress={() => router.push(`/project/${project.id}`)}
      onLongPress={() => setExpanded((e) => !e)}
      style={({ pressed }) => [styles.card, { opacity: pressed ? 0.94 : 1 }]}
    >
      {/* Dynamic Image Fallback Container with Modern Vector Design */}
      <View style={[styles.cardImg, { backgroundColor: '#111638' }]}>
        <Ionicons name={project.iconName} size={42} color={`${project.color}bb`} />
        
        <View style={styles.yearBadge}>
          <Text style={styles.yearText}>{project.year}</Text>
        </View>
        <View style={[styles.colorStrip, { backgroundColor: project.color }]} />
      </View>

      {/* Info Body block */}
      <View style={styles.cardBody}>
        <View style={styles.cardTop}>
          <Text style={[styles.cat, { color: project.color }]}>{project.category}</Text>
          <Feather name="arrow-up-right" size={14} color={CYBER_COLORS.textMuted} />
        </View>
        <Text style={styles.cardTitle}>{project.title}</Text>

        {/* Dynamic description toggled via long press context */}
        {expanded && (
          <Text style={styles.cardDesc}>{project.desc}</Text>
        )}

        {/* Tags Row */}
        <View style={styles.tags}>
          {project.tags.map((t) => (
            <View key={t} style={[styles.tag, { backgroundColor: `${project.color}10` }]}>
              <Text style={[styles.tagTxt, { color: project.color }]}>{t}</Text>
            </View>
          ))}
        </View>

        {/* Project Audit Performance Metric Stats */}
        <View style={styles.statsRow}>
          <StatChip label="Perf" val={`${project.perf}`} color={project.color} />
          <StatChip label="Resp" val="✓" color={CYBER_COLORS.green} />
          <StatChip label="SEO" val={`${project.seo}`} color={CYBER_COLORS.accent} />
        </View>
      </View>
    </Pressable>
  );
}

export default function WorkScreen() {
  const insets = useSafeAreaInsets();
  const [cat, setCat] = useState('All');
  const topPad = Platform.OS === 'web' ? 40 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 40 : insets.bottom;

  const filtered = cat === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === cat);

  return (
    <View style={styles.container}>
      {/* Header Container Area */}
      <View style={[styles.header, { paddingTop: topPad + 24 }]}>
        <Text style={styles.headerTitle}>Projects</Text>
        <Text style={styles.headerSub}>{PROJECTS.length} case studies — long press to preview</Text>
      </View>

      {/* Categories Filter Horizonal Tab Bar */}
      <View style={styles.filterBarContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.filterRow}
        >
          {CATS.map((c) => (
            <Pressable 
              key={c} 
              onPress={() => setCat(c)} 
              style={[styles.filterChip, cat === c && styles.filterActive]}
            >
              <Text style={[styles.filterText, cat === c && styles.filterTextActive]}>{c}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Main Vertical Project Feed Scroller */}
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: bottomPad + 120 }}
      >
        {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CYBER_COLORS.bg },
  header: { paddingHorizontal: 20, paddingBottom: 12 },
  headerTitle: { fontSize: 28, fontWeight: '700', color: CYBER_COLORS.text, letterSpacing: -0.5 },
  headerSub: { fontSize: 13, fontWeight: '400', color: CYBER_COLORS.textMuted, marginTop: 4 },
  filterBarContainer: { height: 50, marginBottom: 12 },
  filterRow: { paddingHorizontal: 20, gap: 8, flexDirection: 'row', alignItems: 'center' },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100, backgroundColor: CYBER_COLORS.card, borderWidth: 1, borderColor: CYBER_COLORS.border },
  filterActive: { backgroundColor: '#00d9ff20', borderColor: '#00d9ff50' },
  filterText: { fontSize: 13, fontWeight: '500', color: CYBER_COLORS.textMuted },
  filterTextActive: { color: CYBER_COLORS.primary, fontWeight: '600' },
  card: { backgroundColor: CYBER_COLORS.card, borderRadius: 20, borderWidth: 1, borderColor: CYBER_COLORS.border, overflow: 'hidden', marginBottom: 16 },
  cardImg: { height: 140, position: 'relative', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: CYBER_COLORS.border },
  yearBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: '#00000080', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 100 },
  yearText: { fontSize: 11, fontWeight: '500', color: '#fff' },
  colorStrip: { position: 'absolute', top: 0, left: 0, width: 4, height: '100%' },
  cardBody: { padding: 16 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  cat: { fontSize: 10, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  cardTitle: { fontSize: 19, fontWeight: '700', color: CYBER_COLORS.text, letterSpacing: -0.3, marginBottom: 8 },
  cardDesc: { fontSize: 13, fontWeight: '400', color: CYBER_COLORS.textSub, lineHeight: 19, marginBottom: 10 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 14 },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 100 },
  tagTxt: { fontSize: 11, fontWeight: '500' },
  statsRow: { flexDirection: 'row', gap: 8 },
  statChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, borderWidth: 1, alignItems: 'center', minWidth: 50 },
  statVal: { fontSize: 13, fontWeight: '700' },
  statLabel: { fontSize: 9, fontWeight: '400', color: CYBER_COLORS.textMuted, marginTop: 1 },
});