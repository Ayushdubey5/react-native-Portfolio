import React, { useState, useRef, useEffect } from 'react';
import { 
  Platform, 
  Pressable, 
  ScrollView, 
  StyleSheet, 
  Text, 
  View,
  Animated
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
  green: '#38b000',
  red: '#ff4d4d',
  text: '#ffffff',
  textSub: '#abb7d6',
  textMuted: '#8a95b2',
};

const CHALLENGES = [
  {
    id: 1,
    title: 'The Missing Key',
    desc: 'A list renders but React throws a warning. Spot the issue:',
    code: `const List = ({ items }) => (
  <ul>
    {items.map((item) => (
      <li>{item.name}</li>
    ))}
  </ul>
);`,
    options: [
      'items is undefined',
      'Missing key prop on <li>',
      '<ul> should be <div>',
      'Arrow function syntax error',
    ],
    answer: 1,
    explain: '`key` prop is required on list items so React can efficiently diff the DOM.',
  },
  {
    id: 2,
    title: 'Async State Bug',
    desc: 'This component always shows "Loading..." even after data arrives:',
    code: `function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser().then(data => {
      user = data; // direct mutation
    });
  }, []);

  if (!user) return <Text>Loading...</Text>;
  return <Text>{user.name}</Text>;
}`,
    options: [
      'fetchUser is not defined',
      'useEffect missing cleanup',
      'State mutated directly instead of setUser()',
      'Dependency array should be [user]',
    ],
    answer: 2,
    explain: 'React state must be updated with the setter function. Directly mutating user doesn\'t trigger a re-render.',
  },
  {
    id: 3,
    title: 'Infinite Loop',
    desc: 'This component causes an infinite re-render loop:',
    code: `function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  }, [count]);

  return <Text>{count}</Text>;
}`,
    options: [
      'useState initial value is wrong',
      'setCount should use functional form',
      'count in dependency array triggers loop',
      'useEffect should have empty deps []',
    ],
    answer: 2,
    explain: 'Adding count to deps causes effect → setCount → re-render → effect again. Remove count from deps or use empty [].',
  },
  {
    id: 4,
    title: 'Style Crash',
    desc: 'This React Native component crashes on render:',
    code: `const Card = () => (
  <View style={styles.card}>
    <Text style={{ fontWeight: 'Bold' }}>
      Hello World
    </Text>
  </View>
);`,
    options: [
      '<View> cannot contain <Text>',
      'fontWeight value must be lowercase: "bold"',
      'styles.card is not defined',
      'JSX requires className not style',
    ],
    answer: 1,
    explain: 'React Native\'s fontWeight only accepts lowercase strings like "bold", "600", etc. "Bold" with capital B is invalid.',
  },
  {
    id: 5,
    title: 'Promise Pitfall',
    desc: 'This async function never actually awaits the result:',
    code: `async function loadData() {
  try {
    const res = fetch('/api/user');
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}`,
    options: [
      'fetch() URL is wrong',
      'try/catch can\'t catch async errors',
      'Missing await before fetch()',
      '.json() should be .text()',
    ],
    answer: 2,
    explain: 'fetch() returns a Promise. Without await, res is a Promise object — calling .json() on it throws.',
  },
];

export default function DebugChallenge() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const topPad = Platform.OS === 'web' ? 40 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 40 : insets.bottom;

  const [state, setState] = useState('idle');
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [showExplain, setShowExplain] = useState(false);
  const [answers, setAnswers] = useState([]);
  
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const challenge = CHALLENGES[idx];
  const total = CHALLENGES.length;

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -6, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const pick = (optIdx) => {
    if (selected !== null) return;
    setSelected(optIdx);
    const correct = optIdx === challenge.answer;
    if (correct) {
      setScore((s) => s + 1);
    } else {
      shake();
    }
    setAnswers((a) => [...a, { correct }]);
    setShowExplain(true);
  };

  const next = () => {
    setSelected(null);
    setShowExplain(false);
    if (idx + 1 >= total) {
      setBest((b) => Math.max(b, score + (selected === challenge.answer ? 1 : 0)));
      setState('done');
    } else {
      setIdx((i) => i + 1);
    }
  };

  const restart = () => {
    setIdx(0);
    setSelected(null);
    setScore(0);
    setAnswers([]);
    setShowExplain(false);
    setState('playing');
  };

  const optColor = (i) => {
    if (selected === null) return { bg: CYBER_COLORS.card, border: CYBER_COLORS.border, text: CYBER_COLORS.text };
    if (i === challenge.answer) return { bg: `${CYBER_COLORS.green}18`, border: CYBER_COLORS.green, text: CYBER_COLORS.green };
    if (i === selected) return { bg: `${CYBER_COLORS.red}18`, border: CYBER_COLORS.red, text: CYBER_COLORS.red };
    return { bg: CYBER_COLORS.card, border: CYBER_COLORS.border, text: CYBER_COLORS.textMuted };
  };

  return (
    <View style={styles.container}>
      {/* Header Container Segment */}
      <View style={[styles.header, { paddingTop: topPad + 16 }]}>
        <Pressable onPress={() => router.back()} style={styles.closeBtn}>
          <Feather name="x" size={20} color={CYBER_COLORS.text} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Debug Challenge</Text>
          {state === 'playing' && (
            <Text style={styles.headerSub}>Question {idx + 1} of {total}  •  Score: {score}</Text>
          )}
        </View>
        <View style={styles.scoreBadge}>
          <Text style={styles.scoreTxt}>{score}/{total}</Text>
        </View>
      </View>

      {/* Progress tracking line */}
      {state === 'playing' && (
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${((idx) / total) * 100}%` }]} />
        </View>
      )}

      {state === 'idle' && (
        <View style={styles.center}>
          <View style={styles.idleIcon}>
            <Feather name="code" size={40} color={CYBER_COLORS.gold} />
          </View>
          <Text style={styles.idleTitle}>Debug Challenge</Text>
          <Text style={styles.idleSub}>Find the broken line in {total} real code snippets. Each correct answer proves your technical instinct.</Text>
          <Text style={styles.bestTxt}>Best: {best}/{total}</Text>
          <Pressable onPress={restart} style={styles.startWrap}>
            <View style={[styles.startBtn, { backgroundColor: CYBER_COLORS.gold }]}>
              <Text style={styles.startTxt}>START DEBUG SESSION</Text>
            </View>
          </Pressable>
        </View>
      )}

      {state === 'done' && (
        <View style={styles.center}>
          <Text style={styles.doneEmoji}>{score === total ? '🏆' : score >= 3 ? '⚡' : '🔧'}</Text>
          <Text style={styles.doneTitle}>
            {score === total ? 'PERFECT SCORE!' : score >= 3 ? 'NICE DEBUGGING!' : 'KEEP PRACTICING'}
          </Text>
          <Text style={styles.doneScore}>{score}/{total}</Text>
          <View style={styles.dotRow}>
            {answers.map((a, i) => (
              <View key={i} style={[styles.dotIndicator, { backgroundColor: a.correct ? CYBER_COLORS.green : CYBER_COLORS.red }]} />
            ))}
          </View>
          <Pressable onPress={restart} style={styles.startWrap}>
            <View style={[styles.startBtn, { backgroundColor: CYBER_COLORS.gold }]}>
              <Text style={styles.startTxt}>TRY AGAIN</Text>
            </View>
          </Pressable>
        </View>
      )}

      {state === 'playing' && (
        <ScrollView contentContainerStyle={[styles.quiz, { paddingBottom: bottomPad + 32 }]} showsVerticalScrollIndicator={false}>
          <Text style={styles.questionTitle}>{challenge.title}</Text>
          <Text style={styles.questionDesc}>{challenge.desc}</Text>

          {/* Code block area */}
          <Animated.View style={[styles.codeBlock, { transform: [{ translateX: shakeAnim }] }]}>
            <View style={styles.codeHeader}>
              {['#FF5F56', '#FFBD2E', '#27C93F'].map((c) => <View key={c} style={[styles.dot, { backgroundColor: c }]} />)}
              <Text style={styles.codeFileName}>component.jsx</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Text style={styles.code}>{challenge.code}</Text>
            </ScrollView>
          </Animated.View>

          {/* Selection options list */}
          <Text style={styles.optLabel}>IDENTIFY THE BUG:</Text>
          {challenge.options.map((opt, i) => {
            const c = optColor(i);
            return (
              <Pressable key={i} onPress={() => pick(i)} style={[styles.option, { backgroundColor: c.bg, borderColor: c.border }]}>
                <View style={[styles.optNum, { backgroundColor: `${c.border}20` }]}>
                  <Text style={[styles.optNumTxt, { color: c.border !== CYBER_COLORS.border ? c.border : CYBER_COLORS.textMuted }]}>
                    {String.fromCharCode(65 + i)}
                  </Text>
                </View>
                <Text style={[styles.optTxt, { color: c.text }]}>{opt}</Text>
                {selected !== null && i === challenge.answer && (
                  <Feather name="check-circle" size={16} color={CYBER_COLORS.green} />
                )}
                {selected === i && i !== challenge.answer && (
                  <Feather name="x-circle" size={16} color={CYBER_COLORS.red} />
                )}
              </Pressable>
            );
          })}

          {/* Explanation block feedback */}
          {showExplain && (
            <View style={[styles.explain, { borderColor: selected === challenge.answer ? CYBER_COLORS.green : CYBER_COLORS.red }]}>
              <Feather name={selected === challenge.answer ? 'check-circle' : 'alert-circle'} size={16} color={selected === challenge.answer ? CYBER_COLORS.green : CYBER_COLORS.red} />
              <Text style={[styles.explainTxt, { color: CYBER_COLORS.textSub }]}>{challenge.explain}</Text>
            </View>
          )}

          {showExplain && (
            <Pressable onPress={next} style={styles.nextWrap}>
              <View style={[styles.nextBtn, { backgroundColor: CYBER_COLORS.primary }]}>
                <Text style={styles.nextTxt}>{idx + 1 >= total ? 'SEE RESULTS' : 'NEXT CHALLENGE'}</Text>
                <Feather name="arrow-right" size={16} color="#fff" />
              </View>
            </Pressable>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CYBER_COLORS.bg },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingBottom: 16 },
  closeBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: CYBER_COLORS.card, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: CYBER_COLORS.text },
  headerSub: { fontSize: 11, color: CYBER_COLORS.textMuted, marginTop: 2 },
  scoreBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 100, borderWidth: 1, backgroundColor: '#ffb70320', borderColor: '#ffb70340' },
  scoreTxt: { fontSize: 13, fontWeight: '700', color: CYBER_COLORS.gold },
  progressTrack: { height: 3, backgroundColor: CYBER_COLORS.border },
  progressFill: { height: '100%', backgroundColor: CYBER_COLORS.gold, borderRadius: 2 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14, paddingHorizontal: 32 },
  idleIcon: { width: 80, height: 80, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffb70315' },
  idleTitle: { fontSize: 26, fontWeight: '700', color: CYBER_COLORS.text, letterSpacing: -0.5 },
  idleSub: { fontSize: 13, color: CYBER_COLORS.textMuted, textAlign: 'center', lineHeight: 21 },
  bestTxt: { fontSize: 13, fontWeight: '600', color: CYBER_COLORS.gold },
  startWrap: { borderRadius: 100, overflow: 'hidden', marginTop: 6 },
  startBtn: { paddingHorizontal: 32, paddingVertical: 14, borderRadius: 100 },
  startTxt: { fontSize: 12, fontWeight: '700', color: '#fff', letterSpacing: 1 },
  doneEmoji: { fontSize: 50, marginBottom: 5 },
  doneTitle: { fontSize: 20, fontWeight: '700', color: CYBER_COLORS.text },
  doneScore: { fontSize: 48, fontWeight: '700', color: CYBER_COLORS.gold, letterSpacing: -1 },
  dotRow: { flexDirection: 'row', gap: 8, marginVertical: 10 },
  dotIndicator: { width: 10, height: 10, borderRadius: 5 },
  quiz: { paddingHorizontal: 20, paddingTop: 16 },
  questionTitle: { fontSize: 20, fontWeight: '700', color: CYBER_COLORS.text, marginBottom: 6 },
  questionDesc: { fontSize: 13, color: CYBER_COLORS.textMuted, lineHeight: 20, marginBottom: 16 },
  codeBlock: { backgroundColor: '#090d22', borderRadius: 14, borderWidth: 1, borderColor: CYBER_COLORS.border, marginBottom: 20, overflow: 'hidden' },
  codeHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: CYBER_COLORS.border },
  dot: { width: 8, height: 8, borderRadius: 4 },
  codeFileName: { fontSize: 11, color: CYBER_COLORS.textMuted, marginLeft: 6 },
  code: { fontSize: 12, color: '#A8B3CF', padding: 14, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  optLabel: { fontSize: 10, fontWeight: '700', color: CYBER_COLORS.textMuted, letterSpacing: 1.5, marginBottom: 10 },
  option: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: 14, borderWidth: 1, padding: 14, marginBottom: 10 },
  optNum: { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  optNumTxt: { fontSize: 12, fontWeight: '700' },
  optTxt: { flex: 1, fontSize: 13, fontWeight: '500', lineHeight: 19 },
  explain: { borderRadius: 12, borderWidth: 1, padding: 14, flexDirection: 'row', gap: 10, marginBottom: 16, backgroundColor: CYBER_COLORS.card },
  explainTxt: { flex: 1, fontSize: 13, lineHeight: 20 },
  nextWrap: { borderRadius: 100, overflow: 'hidden', marginBottom: 16 },
  nextBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 100 },
  nextTxt: { fontSize: 13, fontWeight: '700', color: '#fff', letterSpacing: 1 },
});