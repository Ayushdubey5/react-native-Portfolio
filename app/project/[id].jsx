import React, { useRef } from 'react';
import { 
  Animated, 
  Image, 
  Platform, 
  Pressable, 
  ScrollView, 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

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

const PROJECTS = [
  {
    id: '1',
    title: 'Rapid Chat App',
    category: 'Full-Stack MERN',
    year: '2024',
    color: CYBER_COLORS.primary,
    image: require('../../assets/images/project1.png'),
    tags: ['Socket.io', 'Node.js', 'Express', 'React', 'MongoDB'],
    desc: 'An ultra-fast real-time collaborative communication app engineered to handle instant packet transfers seamlessly. Features complex room-joining workflows, state preservation, and instant data persistence.',
    role: 'Full-Stack Lead',
    duration: '2 months',
    tools: ['React.js', 'Node.js', 'Socket.io', 'Tailwind CSS'],
    outcomes: ['Real-time connection syncing', 'Sub-50ms message latency', 'Robust session handlers'],
    perf: 97, seo: 94,
  },
  {
    id: '2',
    title: 'E-Commerce App',
    category: 'Next.js Platform',
    year: '2024',
    color: CYBER_COLORS.accent,
    image: require('../../assets/images/project2.png'),
    tags: ['E-Commerce', 'SSR Layouts', 'REST Framework', 'Auth'],
    desc: 'A production-grade web storefront engineered with Next.js Server Components for seamless, high-velocity page loads. Built with modular component structures, complex product filtering logic, and custom layout optimizations.',
    role: 'Backend & Frontend Dev',
    duration: '3 months',
    tools: ['Next.js', 'React.js', 'MongoDB', 'Node.js'],
    outcomes: ['Optimized Core Web Vitals', 'Modular atomic state control', 'Responsive fluid scaling UI'],
    perf: 96, seo: 98,
  },
  {
    id: '3',
    title: 'VisualAI Recognition',
    category: 'Intelligent App',
    year: '2023',
    color: CYBER_COLORS.purple,
    image: require('../../assets/images/project3.png'),
    tags: ['TensorFlow', 'Neural Nets', 'JavaScript', 'Edge Processing'],
    desc: 'An interactive analytical client tool built to process real-time input layouts directly in the viewport. Leverages client-side models to scan, map, and decode user interactions seamlessly.',
    role: 'Systems Engineer',
    duration: '6 weeks',
    tools: ['TensorFlow.js', 'React.js', 'Tailwind CSS', 'Vite'],
    outcomes: ['Zero-server inference calls', 'Pixel-accurate input maps', 'Lightweight runtime bundle'],
    perf: 94, seo: 91,
  }
];

export default function ProjectDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const topPad = Platform.OS === 'web' ? 40 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 40 : insets.bottom;

  // Graceful fallback logic to capture match failures smoothly
  const project = PROJECTS.find((p) => p.id === id) ?? PROJECTS[0];

  const headerOpacity = scrollY.interpolate({ inputRange: [160, 220], outputRange: [0, 1], extrapolate: 'clamp' });
  const imageScale = scrollY.interpolate({ inputRange: [-100, 0], outputRange: [1.1, 1], extrapolate: 'clamp' });

  return (
    <View style={styles.container}>
      {/* Floating mini header on scroll */}
      <Animated.View style={[styles.stickyHeader, { paddingTop: topPad + 12, opacity: headerOpacity, backgroundColor: CYBER_COLORS.bg }]}>
        <Pressable onPress={() => router.back()} style={styles.stickyBack}>
          <Feather name="arrow-left" size={18} color={CYBER_COLORS.text} />
        </Pressable>
        <Text style={styles.stickyTitle} numberOfLines={1}>{project.title}</Text>
      </Animated.View>

      <Animated.ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomPad + 32 }}
      >
        {/* Hero Image Container Block */}
        <View style={styles.imageWrap}>
          <Animated.Image
            source={project.image}
            style={[styles.heroImg, { transform: [{ scale: imageScale }] }]}
            resizeMode="cover"
          />
          
          <Pressable
            onPress={() => router.back()}
            style={[styles.backBtn, { top: topPad + 12 }]}
          >
            <Feather name="arrow-left" size={20} color="#fff" />
          </Pressable>
          
          <View style={[styles.catBadge, { backgroundColor: project.color }]}>
            <Text style={styles.catText}>{project.category}</Text>
          </View>
        </View>

        {/* Core Content Body */}
        <View style={styles.content}>
          <View style={styles.metaRow}>
            <Text style={styles.year}>{project.year}</Text>
            <View style={styles.perfRow}>
              <View style={[styles.perfChip, { backgroundColor: `${CYBER_COLORS.green}15`, borderColor: `${CYBER_COLORS.green}30` }]}>
                <Text style={[styles.perfVal, { color: CYBER_COLORS.green }]}>Perf {project.perf}</Text>
              </View>
              <View style={[styles.perfChip, { backgroundColor: `${CYBER_COLORS.accent}15`, borderColor: `${CYBER_COLORS.accent}30` }]}>
                <Text style={[styles.perfVal, { color: CYBER_COLORS.accent }]}>SEO {project.seo}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.title}>{project.title}</Text>

          {/* Dynamic Badges Tags Row */}
          <View style={styles.tags}>
            {project.tags.map((t) => (
              <View key={t} style={[styles.tag, { backgroundColor: `${project.color}12`, borderColor: `${project.color}30` }]}>
                <Text style={[styles.tagTxt, { color: project.color }]}>{t}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.desc}>{project.desc}</Text>

          {/* Grid Meta Metrics Information */}
          <View style={styles.infoGrid}>
            <View style={[styles.infoCell, { borderColor: CYBER_COLORS.border }]}>
              <Text style={styles.infoLabel}>Role</Text>
              <Text style={styles.infoVal}>{project.role}</Text>
            </View>
            <View style={[styles.infoCell, { borderColor: CYBER_COLORS.border, borderLeftWidth: 1 }]}>
              <Text style={styles.infoLabel}>Duration</Text>
              <Text style={styles.infoVal}>{project.duration}</Text>
            </View>
          </View>

          {/* Applied Stack Tools Used Section */}
          <Text style={styles.subHead}>Tools & Technologies</Text>
          <View style={styles.toolsRow}>
            {project.tools.map((t) => (
              <View key={t} style={[styles.toolChip, { backgroundColor: CYBER_COLORS.card, borderColor: CYBER_COLORS.border }]}>
                <Text style={styles.toolTxt}>{t}</Text>
              </View>
            ))}
          </View>

          {/* Business/Product Metrics Outcomes */}
          <Text style={styles.subHead}>Project Impact</Text>
          {project.outcomes.map((o) => (
            <View key={o} style={styles.outcomeRow}>
              <View style={[styles.outcomeDot, { backgroundColor: project.color }]} />
              <Text style={styles.outcomeTxt}>{o}</Text>
            </View>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CYBER_COLORS.bg },
  stickyHeader: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: CYBER_COLORS.border },
  stickyBack: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  stickyTitle: { flex: 1, fontSize: 16, fontWeight: '700', color: CYBER_COLORS.text },
  imageWrap: { height: 300, position: 'relative', overflow: 'hidden' },
  heroImg: { width: '100%', height: '100%' },
  backBtn: { position: 'absolute', left: 16, width: 40, height: 40, borderRadius: 20, backgroundColor: '#00000070', alignItems: 'center', justifyContent: 'center' },
  catBadge: { position: 'absolute', bottom: 20, left: 20, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 100 },
  catText: { fontSize: 11, fontWeight: '700', color: '#fff', letterSpacing: 1 },
  content: { paddingHorizontal: 20, paddingTop: 24 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  year: { fontSize: 13, color: CYBER_COLORS.textMuted },
  perfRow: { flexDirection: 'row', gap: 8 },
  perfChip: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 100, borderWidth: 1 },
  perfVal: { fontSize: 11, fontWeight: '700' },
  title: { fontSize: 26, fontWeight: '700', color: CYBER_COLORS.text, letterSpacing: -0.5, marginBottom: 14 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 18 },
  tag: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 100, borderWidth: 1 },
  tagTxt: { fontSize: 11, fontWeight: '500' },
  desc: { fontSize: 14, color: CYBER_COLORS.textSub, lineHeight: 23, marginBottom: 24 },
  infoGrid: { flexDirection: 'row', borderWidth: 1, borderColor: CYBER_COLORS.border, borderRadius: 16, overflow: 'hidden', marginBottom: 24, backgroundColor: CYBER_COLORS.card },
  infoCell: { flex: 1, padding: 16 },
  infoLabel: { fontSize: 11, color: CYBER_COLORS.textMuted, marginBottom: 4 },
  infoVal: { fontSize: 14, fontWeight: '700', color: CYBER_COLORS.text },
  subHead: { fontSize: 16, fontWeight: '700', color: CYBER_COLORS.text, marginBottom: 12 },
  toolsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  toolChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 100, borderWidth: 1 },
  toolTxt: { fontSize: 12, fontWeight: '500', color: CYBER_COLORS.text },
  outcomeRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  outcomeDot: { width: 7, height: 7, borderRadius: 3.5 },
  outcomeTxt: { flex: 1, fontSize: 14, color: CYBER_COLORS.textSub },
});