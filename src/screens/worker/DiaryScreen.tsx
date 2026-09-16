import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ScreenContainer from '../../components/ScreenContainer';
import AppText from '../../components/AppText';
import { Row, Between } from '../../components/Row';
import Card from '../../components/Card';
import Button from '../../components/Button';
import IconButton from '../../components/IconButton';
import { useTheme } from '../../theme/ThemeContext';
import { diaryEntries } from '../../data/mock';

const accentColorKey = { amber: 'amber', blue: 'blue', brand: 'brand' } as const;

export default function DiaryScreen() {
  const { colors } = useTheme();
  const days = Array.from(new Set(diaryEntries.map((e) => e.day)));

  return (
    <ScreenContainer>
      <Between style={{ marginBottom: 14 }}>
        <View>
          <AppText weight="bold" size={17}>
            This week
          </AppText>
          <AppText size={11} color={colors.ink2}>
            15–21 September
          </AppText>
        </View>
        <IconButton name="calendar" size={36} />
      </Between>

      <Row gap={8} style={{ marginBottom: 16 }}>
        <Card soft padding={10} style={{ flex: 1 }}>
          <AppText size={11} color={colors.ink2}>
            Booked
          </AppText>
          <AppText weight="bold" size={16}>
            6 jobs
          </AppText>
        </Card>
        <Card soft padding={10} style={{ flex: 1 }}>
          <AppText size={11} color={colors.ink2}>
            Expected
          </AppText>
          <AppText weight="bold" size={16}>
            £486
          </AppText>
        </Card>
        <Card soft padding={10} style={{ flex: 1 }}>
          <AppText size={11} color={colors.ink2}>
            Free slots
          </AppText>
          <AppText weight="bold" size={16}>
            9
          </AppText>
        </Card>
      </Row>

      <Card bg={colors.brandSoft} borderColor="transparent" style={{ marginBottom: 14 }}>
        <Row gap={8}>
          <Feather name="navigation" size={15} color={colors.brandInk} />
          <View style={{ flex: 1 }}>
            <AppText weight="semibold" size={12} color={colors.brandInk}>
              Route tip
            </AppText>
            <AppText size={11} color={colors.brandInk} style={{ opacity: 0.85 }}>
              Swap your 2pm and 4pm — saves 22 min of driving
            </AppText>
          </View>
        </Row>
      </Card>

      {days.map((day) => (
        <View key={day} style={{ marginBottom: 12 }}>
          <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {day}
          </AppText>
          <Card padding={0} style={{ overflow: 'hidden' }}>
            {diaryEntries
              .filter((e) => e.day === day)
              .map((entry, i, arr) => (
                <Row
                  key={entry.id}
                  gap={11}
                  style={{
                    padding: 11,
                    borderLeftWidth: 3,
                    borderLeftColor: colors[accentColorKey[entry.accent]],
                    borderBottomWidth: i === arr.length - 1 ? 0 : 1,
                    borderBottomColor: colors.line,
                  }}
                >
                  <View style={{ width: 42, alignItems: 'center' }}>
                    <AppText weight="semibold" size={13}>
                      {entry.time}
                    </AppText>
                    <AppText size={11} color={colors.ink2}>
                      {entry.meridiem}
                    </AppText>
                  </View>
                  <View style={{ flex: 1 }}>
                    <AppText weight="semibold" size={13}>
                      {entry.title}
                    </AppText>
                    <AppText size={11} color={colors.ink2}>
                      {entry.area} · {entry.clientName} · £{entry.price}
                      {entry.recurring ? ' · weekly' : ''}
                    </AppText>
                  </View>
                  <Feather name="chevron-right" size={14} color={colors.ink3} />
                </Row>
              ))}
          </Card>
        </View>
      ))}

      <Card soft style={{ alignItems: 'center', padding: 14, marginTop: 4 }}>
        <AppText weight="semibold" size={13} style={{ marginBottom: 2 }}>
          Thursday is empty
        </AppText>
        <AppText size={11} color={colors.ink2} style={{ marginBottom: 10 }}>
          4 jobs in your area are unassigned
        </AppText>
        <Button title="Browse jobs" size="sm" fullWidth={false} onPress={() => {}} />
      </Card>
    </ScreenContainer>
  );
}
