import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  SafeAreaView, 
  StyleSheet,
  Animated 
} from 'react-native';

const CYBER_COLORS = {
  bg: '#0a0e27',
  card: '#131936',
  border: '#222b54',
  primary: '#00d9ff',
  text: '#ffffff',
  textSub: '#abb7d6',
  textMuted: '#8a95b2',
};

const SKILLS = [
  { id: '1', name: 'React Native', level: 'Expert', category: 'Frontend' },
  { id: '2', name: 'TypeScript', level: 'Advanced', category: 'Languages' },
  { id: '3', name: 'Node.js', level: 'Intermediate', category: 'Backend' },
  { id: '4', name: 'Next.js', level: 'Advanced', category: 'Frontend' },
  { id: '5', name: 'Python', level: 'Intermediate', category: 'Languages' },
  { id: '6', name: 'UI/UX Design', level: 'Advanced', category: 'Design' },
  { id: '7', name: 'GraphQL', level: 'Intermediate', category: 'Backend' },
  { id: '8', name: 'Figma', level: 'Expert', category: 'Design' },
];

export default function SkillsScreen() {
  const categories = Array.from(new Set(SKILLS.map((s) => s.category)));
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.mainTitle}>Skills</Text>
          <Text style={styles.subtitle}>Technologies and expertise</Text>

          <View style={styles.categoryGap}>
            {categories.map((category) => (
              <View key={category}>
                <Text style={styles.categoryTitle}>{category}</Text>
                
                <View style={styles.skillsGrid}>
                  {SKILLS.filter((s) => s.category === category).map((skill) => (
                    <View key={skill.id} style={styles.skillChip}>
                      <Text style={styles.skillName}>{skill.name}</Text>
                      <View style={styles.levelBadge}>
                        <Text style={styles.skillLevel}>{skill.level}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CYBER_COLORS.bg },
  scrollContent: { paddingHorizontal: 16, paddingVertical: 24 },
  mainTitle: { fontSize: 26, fontWeight: '700', color: CYBER_COLORS.text, marginBottom: 8 },
  subtitle: { fontSize: 14, color: CYBER_COLORS.textMuted, marginBottom: 24 },
  categoryGap: { gap: 24 },
  categoryTitle: { fontSize: 16, fontWeight: '700', color: CYBER_COLORS.primary, marginBottom: 12, letterSpacing: -0.3 },
  skillsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillChip: { backgroundColor: CYBER_COLORS.card, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: CYBER_COLORS.border, minWidth: '47%', flexGrow: 1 },
  skillName: { fontSize: 13, fontWeight: '600', color: CYBER_COLORS.text },
  levelBadge: { alignSelf: 'flex-start', backgroundColor: `${CYBER_COLORS.primary}12`, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, marginTop: 6 },
  skillLevel: { fontSize: 10, fontWeight: '600', color: CYBER_COLORS.primary },
});