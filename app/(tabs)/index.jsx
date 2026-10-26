import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';

const { width: W } = Dimensions.get('window');

const CYBER_COLORS = {
  bg: '#0a0e27',
  card: '#131936',
  border: '#222b54',
  primary: '#00d9ff',
  accent: '#9d4edd',
  purple: '#a855f7',
  green: '#38b000',
  text: '#ffffff',
  textMuted: '#8a95b2',
};

const IDENTITIES = [
  'BUILDING EXPERIENCES',
  'CRAFTING MERN WEB APPS',
  'DESIGNING FULL-STACK SYSTEMS',
  'OPTIMIZING CLIENT INFRASTRUCTURE',
  'SHIPPING EDGE PRODUCTS',
];

const STATS = [
  { label: 'Projects', value: '15+', color: CYBER_COLORS.primary },
  { label: 'Contests', value: '200+', color: CYBER_COLORS.accent },
  { label: 'Rating', value: '1450+', color: CYBER_COLORS.purple },
];

const FEATURED_PROJECTS = [
  { id: '1', title: 'Rapid Chat App', category: 'Socket.io • MERN', color: CYBER_COLORS.primary , image: require('../../assets/images/project1.png')},
  { id: '2', title: 'GramZo E-Commerce', category: 'Next.js • Node', color: CYBER_COLORS.accent , image: require('../../assets/images/project2.png') },
  { id: '3', title: 'VisionAI Recognition', category: 'TensorFlow • JS', color: CYBER_COLORS.purple, image: require('../../assets/images/project3.png') },
];

const SKILLS = ['React.js', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'TypeScript', 'C++', 'Socket.io'];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [identityIdx, setIdentityIdx] = useState(0);

  const topPad = Platform.OS === 'web' ? 40 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 40 : insets.bottom;

  useEffect(() => {
    const cycle = setInterval(() => {
      setIdentityIdx((i) => (i + 1) % IDENTITIES.length);
    }, 2500);
    return () => clearInterval(cycle);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: topPad + 24, paddingBottom: bottomPad + 120 }}
      >
        {/* Hero Segment */}
        <View style={styles.hero}>
          {/* Status badge */}
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Available for Work</Text>
          </View>

          {/* Avatar Ring Structure */}
          <View style={styles.avatarWrap}>
            <View style={styles.avatarRing} />
            <View style={styles.avatarFallback}>
              <Image
                source={require('../../assets/images/avatar.png')}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Name & Subtitle Core Layout */}
          <Text style={styles.name}>AYUSH DUBEY</Text>
          <Text style={styles.subTitle}>Full-Stack Developer  •  UI/UX Engineer</Text>

          {/* Identity Text Blocks */}
          <View style={styles.identityBox}>
            <Text style={styles.identity}>{IDENTITIES[identityIdx]}</Text>
          </View>
        </View>

        {/* Deep Detailed About Me Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutText}>
              I am a passionate Full-Stack Web Developer driven by the art of clean architectural layout engineering and high-performance backend infrastructure.
            </Text>
            <Text style={styles.aboutText}>
              By balancing robust modular logic frameworks with responsive frontends, I design scalable web ecosystems that deliver production-ready, beautiful interactions.
            </Text>
          </View>
        </View>

        {/* Stats Grid Layout */}
        <View style={styles.statsRow}>
          {STATS.map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={[styles.statVal, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Featured Case Studies */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Featured Work</Text>
            <Pressable onPress={() => router.push('/work')} style={styles.seeAll}>
              <Text style={styles.seeAllText}>See all</Text>
              <Feather name="arrow-right" size={12} color={CYBER_COLORS.accent} />
            </Pressable>
          </View>

          {FEATURED_PROJECTS.map((p) => (
            <Pressable
              key={p.id}
              onPress={() => router.push('/work')}
              style={styles.projectCard}
            >
              <View style={styles.projectCardInner}>
                <View style={styles.projectThumb}>
                  {/* Left colored border accent strip */}
                  <View style={[styles.projectColorBar, { backgroundColor: p.color }]} />

                  {/* Clean, full-bleed absolute project layout image replacement */}
                  <Image
                    source={p.image}
                    style={styles.projectImg}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.projectText}>
                  <Text style={[styles.projectCat, { color: p.color }]}>{p.category}</Text>
                  <Text style={styles.projectTitle}>{p.title}</Text>
                </View>
                <Feather name="arrow-up-right" size={16} color={CYBER_COLORS.textMuted} style={{ marginRight: 16 }} />
              </View>
            </Pressable>
          ))}
        </View>

        {/* Skills Layout Matrix */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Core Skills</Text>
          <View style={styles.pillsWrap}>
            {SKILLS.map((s) => (
              <View key={s} style={styles.pill}>
                <Text style={styles.pillText}>{s}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Ongoing Timeline Segment */}
        <View style={[styles.section, { marginBottom: 12 }]}>
          <Text style={styles.sectionTitle}>Right Now</Text>
          {[
            { icon: 'code', label: 'Building', val: 'Real-time collaborative nodes' },
            { icon: 'zap', label: 'Solving', val: 'Competitive optimization challenges' },
            { icon: 'moon', label: 'Late night', val: 'Dark UI pattern layout design' },
          ].map((item) => (
            <View key={item.label} style={styles.nowRow}>
              <View style={styles.nowIcon}>
                <Feather name={item.icon} size={14} color={CYBER_COLORS.primary} />
              </View>
              <Text style={styles.nowLabel}>{item.label}</Text>
              <Text style={styles.nowVal}>{item.val}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CYBER_COLORS.bg },
  hero: { alignItems: 'center', paddingHorizontal: 24, paddingBottom: 8 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20, backgroundColor: '#38b00020', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 100, borderWidth: 1, borderColor: '#38b00040' },
  statusDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: CYBER_COLORS.green },
  statusText: { fontSize: 11, fontWeight: '500', color: CYBER_COLORS.green, letterSpacing: 0.5 },
  avatarWrap: { position: 'relative', marginBottom: 20, width: 88, height: 88, justifyContent: 'center', alignItems: 'center' },
  avatarRing: { position: 'absolute', top: -4, left: -4, right: -4, bottom: -4, borderRadius: 54, borderWidth: 1.5, borderColor: '#00d9ff60' },
  avatarFallback: { width: 88, height: 88, borderRadius: 44, backgroundColor: '#131936', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#222b54', overflow: 'hidden' },
  avatarImage: { width: '100%', height: '100%' },
  name: { fontSize: 24, fontWeight: '700', color: CYBER_COLORS.text, letterSpacing: 3, textAlign: 'center', marginBottom: 6 },
  subTitle: { fontSize: 12, fontWeight: '400', color: CYBER_COLORS.textMuted, letterSpacing: 1.2, marginBottom: 16 },
  identityBox: { backgroundColor: '#00d9ff15', borderWidth: 1, borderColor: '#00d9ff40', borderRadius: 100, paddingHorizontal: 18, paddingVertical: 8 },
  identity: { fontSize: 11, fontWeight: '700', color: CYBER_COLORS.primary, letterSpacing: 2 },
  aboutCard: { backgroundColor: CYBER_COLORS.card, borderRadius: 16, borderWidth: 1, borderColor: CYBER_COLORS.border, padding: 16, gap: 12 },
  aboutText: { color: CYBER_COLORS.textMuted, fontSize: 13, lineHeight: 20 },
  statsRow: { flexDirection: 'row', marginHorizontal: 20, marginTop: 28, gap: 10 },
  statCard: { flex: 1, backgroundColor: CYBER_COLORS.card, borderRadius: 16, borderWidth: 1, borderColor: CYBER_COLORS.border, padding: 16, alignItems: 'center' },
  statVal: { fontSize: 22, fontWeight: '700', letterSpacing: -0.5 },
  statLabel: { fontSize: 11, fontWeight: '400', color: CYBER_COLORS.textMuted, marginTop: 2 },
  section: { marginHorizontal: 20, marginTop: 28 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: CYBER_COLORS.text, letterSpacing: -0.3, marginBottom: 10 },
  seeAll: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  seeAllText: { fontSize: 12, fontWeight: '500', color: CYBER_COLORS.accent },
  projectCard: { marginBottom: 12 },
  projectCardInner: { backgroundColor: CYBER_COLORS.card, borderRadius: 18, borderWidth: 1, borderColor: CYBER_COLORS.border, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', height: 75 },
  projectThumb: { width: 60, height: '100%', flexDirection: 'row', alignItems: 'center', position: 'relative' },
  projectColorBar: { position: 'absolute', top: 0, left: 0, width: 4, height: '100%' },
  projectText: { flex: 1, paddingHorizontal: 12, justifyContent: 'center' },
  projectCat: { fontSize: 10, fontWeight: '600', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 2 },
  projectTitle: { fontSize: 14, fontWeight: '700', color: CYBER_COLORS.text },
  pillsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: { paddingHorizontal: 14, paddingVertical: 7, backgroundColor: '#00d9ff15', borderRadius: 100, borderWidth: 1, borderColor: '#00d9ff30' },
  pillText: { fontSize: 12, fontWeight: '500', color: CYBER_COLORS.primary },
  nowRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10, backgroundColor: CYBER_COLORS.card, borderRadius: 14, borderWidth: 1, borderColor: CYBER_COLORS.border, padding: 12 },
  nowIcon: { width: 30, height: 30, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00d9ff15' },
  nowLabel: { fontSize: 12, fontWeight: '500', color: CYBER_COLORS.textMuted, width: 70 },
  nowVal: { flex: 1, fontSize: 13, fontWeight: '500', color: CYBER_COLORS.text },
});