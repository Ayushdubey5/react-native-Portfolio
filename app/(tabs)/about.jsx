import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
  Platform, 
  Pressable, 
  Linking,
  Image
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';

const CYBER_COLORS = {
  bg: '#0a0e27',
  bgSecondary: '#111638',
  card: '#131936',
  cardLight: '#1c234a',
  border: '#222b54',
  primary: '#00d9ff',
  primaryLight: '#a6f3ff',
  accent: '#9d4edd',
  purple: '#a855f7',
  gold: '#ffb703',
  green: '#38b000',
  text: '#ffffff',
  textSub: '#abb7d6',
  textMuted: '#8a95b2',
};

// Updated from your portfolio profile details
const SKILLS = [
  { label: 'Frontend Architecture', pct: 92, color: CYBER_COLORS.primary },
  { label: 'Full-Stack Development', pct: 88, color: CYBER_COLORS.accent },
  { label: 'REST & API Integration', pct: 85, color: CYBER_COLORS.purple },
  { label: 'Database Design', pct: 80, color: CYBER_COLORS.gold },
  { label: 'UI/UX Engineering', pct: 86, color: '#22C55E' },
  { label: 'Competitive Programming', pct: 75, color: '#EC4899' },
];

const TECH = [
  { name: 'React.js', icon: 'code', color: '#61DAFB' },
  { name: 'Next.js', icon: 'triangle', color: '#fff' },
  { name: 'Node.js', icon: 'server', color: '#68A063' },
  { name: 'MongoDB', icon: 'database', color: '#47A248' },
  { name: 'TypeScript', icon: 'shield', color: '#3178C6' },
  { name: 'Socket.io', icon: 'zap', color: '#010101' },
  { name: 'Tailwind', icon: 'wind', color: '#38BDF8' },
  { name: 'C++', icon: 'cpu', color: '#00599C' },
];

const EXP = [
  { role: 'Full-Stack Engineer', company: 'Self-Employed / Freelance', period: '2023 – Now', color: CYBER_COLORS.primary },
  { role: 'MERN Developer Intern', company: 'E-Commerce Solutions', period: '2023', color: CYBER_COLORS.accent },
];

const CONTACTS = [
  { icon: 'mail', label: 'dubeyayush545@gmail.com', sub: 'Email', color: CYBER_COLORS.primary, action: () => Linking.openURL('mailto:ayush@example.com') },
  { icon: 'github', label: 'https://github.com/Ayushdubey5', sub: 'GitHub', color: CYBER_COLORS.textSub, action: () => Linking.openURL('https://github.com') },
  { icon: 'linkedin', label: 'https://www.linkedin.com/in/ayush-dubey-694629307/', sub: 'LinkedIn', color: '#0077B5', action: () => Linking.openURL('https://linkedin.com') },
];

function SkillBar({ skill }) {
  return (
    <View style={sk.row}>
      <View style={sk.labelRow}>
        <Text style={sk.label}>{skill.label}</Text>
        <Text style={[sk.pct, { color: skill.color }]}>{skill.pct}%</Text>
      </View>
      <View style={sk.track}>
        <View style={[sk.fill, { backgroundColor: skill.color, width: `${skill.pct}%` }]}>
          <View style={sk.glow} />
        </View>
      </View>
    </View>
  );
}

export default function AboutScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 40 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 40 : insets.bottom;

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={{ paddingBottom: bottomPad + 120 }} 
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Header Area */}
      <View style={[styles.hero, { paddingTop: topPad + 24 }]}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatarPulseStatic} />
          <View style={styles.avatarFallback}>
            {/* Replaced Ionicons icon placeholder with responsive Image asset */}
            <Image 
              source={require('../../assets/images/avatar.png')} 
              style={styles.avatarImage}
              resizeMode="cover"
            />
          </View>
          <View style={[styles.activeDot, { backgroundColor: CYBER_COLORS.green }]} />
        </View>
        
        <Text style={styles.heroName}>Ayush Dubey</Text>
        <Text style={styles.heroRole}>Full-Stack Developer  •  UI/UX Engineer</Text>
        <Text style={styles.heroBio}>
          Based in India. Dedicated to bridging the gap between functional design and scalable code infrastructure. Specializing in highly interactive frontend apps, reliable real-time server backends, and robust schemas.
        </Text>
        
        <View style={styles.heroBadges}>
          {['MERN Stack', 'Next.js / SSR', 'Open to Work'].map((b) => (
            <View key={b} style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>{b}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Skill Matrix Segment */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skill Matrix</Text>
        {SKILLS.map((s) => <SkillBar key={s.label} skill={s} />)}
      </View>

      {/* Tech Stack Grid Layout */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tech Stack</Text>
        <View style={styles.techGrid}>
          {TECH.map((t) => (
            <View key={t.name} style={styles.techCard}>
              <View style={[styles.techIcon, { backgroundColor: `${t.color}15` }]}>
                <Feather name={t.icon} size={20} color={t.color} />
              </View>
              <Text style={styles.techName}>{t.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Professional Timeline History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {EXP.map((e, i) => (
          <View key={e.role} style={styles.expRow}>
            <View style={styles.expLeft}>
              <View style={[styles.expDot, { backgroundColor: e.color }]} />
              {i < EXP.length - 1 && <View style={styles.expLine} />}
            </View>
            <View style={[styles.expCard, { borderColor: `${e.color}25` }]}>
              <Text style={[styles.expCompany, { color: e.color }]}>{e.company}</Text>
              <Text style={styles.expRole}>{e.role}</Text>
              <Text style={styles.expPeriod}>{e.period}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Command Contact Center Blocks */}
      <View style={styles.section}>
        <View style={styles.commandHead}>
          <Text style={styles.sectionTitle}>Command Center</Text>
          <View style={styles.onlineBadge}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Online</Text>
          </View>
        </View>
        
        {CONTACTS.map((c) => (
          <Pressable
            key={c.label}
            onPress={() => c.action()}
            style={({ pressed }) => [
              styles.contactCard, 
              { backgroundColor: pressed ? CYBER_COLORS.cardLight : CYBER_COLORS.card }
            ]}
          >
            <View style={[styles.contactIcon, { backgroundColor: `${c.color}15` }]}>
              <Feather name={c.icon} size={18} color={c.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.contactSub}>{c.sub}</Text>
              <Text style={styles.contactLabel}>{c.label}</Text>
            </View>
            <Feather name="arrow-up-right" size={16} color={CYBER_COLORS.textMuted} />
          </Pressable>
        ))}
      </View>

      {/* Mission Brief Area */}
      <View style={[styles.section, { marginBottom: 8 }]}>
        <Pressable style={styles.resumeBtn}>
          <View style={styles.resumeCardFallback}>
            <Feather name="download" size={18} color="#fff" />
            <Pressable 
  style={({ pressed }) => [
    styles.resumeBtn,
    { backgroundColor: pressed ? CYBER_COLORS.cardLight : CYBER_COLORS.card }
  ]}
  onPress={async () => {
    // Replace this string with the actual cloud storage or Vercel link where your PDF is hosted
    const resumeUrl = 'https://ui-ux-portfolio-zeta.vercel.app/'; 
    
    const canOpen = await Linking.canOpenURL(resumeUrl);
    if (canOpen) {
      Linking.openURL(resumeUrl);
    } else {
      console.log("Don't know how to open URI: " + resumeUrl);
    }
  }}
>
  <View style={styles.resumeCardInner}>
    {/* Left Icon */}
    <Feather name="download" size={18} color={CYBER_COLORS.primary} />
    
    {/* Middle Text Descriptions */}
    <View style={{ flex: 1, marginLeft: 14 }}>
      <Text style={styles.resumeTitle}>DOWNLOAD MISSION BRIEF</Text>
      <Text style={styles.resumeSub}>Resume  •  PDF  •  MERN Profile</Text>
    </View>
    
    {/* Right Action Arrow Indicator */}
    <View style={styles.resumeArrow}>
      <Feather name="arrow-right" size={16} color="#fff" />
    </View>
  </View>
</Pressable>
            <View style={styles.resumeArrow}>
              <Feather name="arrow-right" size={16} color="#fff" />
            </View>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CYBER_COLORS.bg },
  hero: { alignItems: 'center', paddingHorizontal: 24, paddingBottom: 32, backgroundColor: CYBER_COLORS.bgSecondary, borderBottomWidth: 1, borderColor: CYBER_COLORS.border },
  avatarWrap: { position: 'relative', marginBottom: 16, width: 96, height: 96, justifyContent: 'center', alignItems: 'center' },
  avatarPulseStatic: { position: 'absolute', top: -6, left: -6, right: -6, bottom: -6, borderRadius: 60, borderWidth: 1, borderColor: '#00d9ff40', backgroundColor: '#00d9ff08' },
  avatarFallback: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#131936', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#222b54', overflow: 'hidden' },
  avatarImage: { width: '100%', height: '100%' },
  activeDot: { position: 'absolute', bottom: 2, right: 2, width: 13, height: 13, borderRadius: 6.5, borderWidth: 2, borderColor: CYBER_COLORS.bg, backgroundColor: CYBER_COLORS.green },
  heroName: { fontSize: 24, fontWeight: '700', color: CYBER_COLORS.text, letterSpacing: -0.5, marginBottom: 4 },
  heroRole: { fontSize: 13, fontWeight: '500', color: CYBER_COLORS.primary, marginBottom: 12, letterSpacing: 0.3 },
  heroBio: { fontSize: 13, fontWeight: '400', color: CYBER_COLORS.textMuted, textAlign: 'center', lineHeight: 21, marginBottom: 16, maxWidth: 320 },
  heroBadges: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'center' },
  heroBadge: { backgroundColor: '#00d9ff12', borderWidth: 1, borderColor: '#00d9ff30', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 100 },
  heroBadgeText: { fontSize: 11, fontWeight: '500', color: CYBER_COLORS.primaryLight },
  section: { paddingHorizontal: 20, marginTop: 28 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: CYBER_COLORS.text, letterSpacing: -0.3, marginBottom: 16 },
  techGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  techCard: { width: '22%', alignItems: 'center', backgroundColor: CYBER_COLORS.card, borderRadius: 14, borderWidth: 1, borderColor: CYBER_COLORS.border, paddingVertical: 14, gap: 8 },
  techIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  techName: { fontSize: 10, fontWeight: '500', color: CYBER_COLORS.textSub, textAlign: 'center' },
  expRow: { flexDirection: 'row', gap: 14, marginBottom: 8 },
  expLeft: { alignItems: 'center', paddingTop: 6 },
  expDot: { width: 10, height: 10, borderRadius: 5 },
  expLine: { flex: 1, width: 1.5, marginTop: 4, marginBottom: -4, backgroundColor: CYBER_COLORS.border },
  expCard: { flex: 1, backgroundColor: CYBER_COLORS.card, borderRadius: 14, borderWidth: 1, padding: 14, marginBottom: 6 },
  expCompany: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5, marginBottom: 2 },
  expRole: { fontSize: 14, fontWeight: '600', color: CYBER_COLORS.text, marginBottom: 4 },
  expPeriod: { fontSize: 11, fontWeight: '400', color: CYBER_COLORS.textMuted },
  commandHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  onlineBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 100, borderWidth: 1, backgroundColor: '#38b00015', borderColor: '#38b00040' },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: CYBER_COLORS.green },
  onlineText: { fontSize: 10, fontWeight: '600', color: CYBER_COLORS.green },
  contactCard: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: 14, borderWidth: 1, borderColor: CYBER_COLORS.border, padding: 14, marginBottom: 10 },
  contactIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  contactSub: { fontSize: 10, fontWeight: '400', color: CYBER_COLORS.textMuted, marginBottom: 2 },
  contactLabel: { fontSize: 14, fontWeight: '500', color: CYBER_COLORS.text },
  resumeBtn: { borderRadius: 16, overflow: 'hidden' },
  resumeCardFallback: { flexDirection: 'row', alignItems: 'center', padding: 18, backgroundColor: CYBER_COLORS.card, borderWidth: 1, borderColor: CYBER_COLORS.border, borderRadius: 16 },
  resumeTitle: { fontSize: 13, fontWeight: '700', color: '#fff', letterSpacing: 1 },
  resumeSub: { fontSize: 11, fontWeight: '400', color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  resumeArrow: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
});

const sk = StyleSheet.create({
  row: { marginBottom: 14 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { fontSize: 13, fontWeight: '500', color: CYBER_COLORS.text },
  pct: { fontSize: 12, fontWeight: '700' },
  track: { height: 5, backgroundColor: CYBER_COLORS.card, borderRadius: 3, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 3, position: 'relative' },
  glow: { position: 'absolute', right: 0, top: -2, width: 12, height: 9, backgroundColor: '#fff', borderRadius: 4, opacity: 0.5 },
});