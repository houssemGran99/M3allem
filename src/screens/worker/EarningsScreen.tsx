import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ScreenContainer from '../../components/ScreenContainer';
import AppText from '../../components/AppText';
import { Row, Between } from '../../components/Row';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import { useTheme } from '../../theme/ThemeContext';
import { earningsHistory } from '../../data/mock';

export default function EarningsScreen() {
  const { colors } = useTheme();

  return (
    <ScreenContainer>
      <AppText weight="bold" size={17} style={{ marginBottom: 12 }}>
        Earnings
      </AppText>

      <Card style={{ alignItems: 'center', padding: 16, marginBottom: 12 }}>
        <AppText size={11} color={colors.ink2}>
          Available to withdraw
        </AppText>
        <AppText weight="bold" size={32} style={{ marginVertical: 2 }}>
          £486.50
        </AppText>
        <View style={{ width: '100%', marginTop: 10 }}>
          <Button title="Withdraw to Monzo •••• 8821" onPress={() => {}} />
        </View>
        <AppText size={11} color={colors.ink2} style={{ marginTop: 8 }}>
          Instant · no fee · usually under 60 seconds
        </AppText>
      </Card>

      <Row gap={8} style={{ marginBottom: 16 }}>
        <Card soft padding={10} style={{ flex: 1 }}>
          <AppText size={11} color={colors.ink2}>
            Today
          </AppText>
          <AppText weight="bold" size={15}>
            £72
          </AppText>
        </Card>
        <Card soft padding={10} style={{ flex: 1 }}>
          <AppText size={11} color={colors.ink2}>
            This week
          </AppText>
          <AppText weight="bold" size={15}>
            £486
          </AppText>
        </Card>
        <Card soft padding={10} style={{ flex: 1 }}>
          <AppText size={11} color={colors.ink2}>
            September
          </AppText>
          <AppText weight="bold" size={15}>
            £1,240
          </AppText>
        </Card>
      </Row>

      <AppText weight="semibold" size={15} style={{ marginBottom: 8 }}>
        Recent jobs
      </AppText>
      <Card padding={0} style={{ overflow: 'hidden', marginBottom: 12 }}>
        {earningsHistory.map((e, i) => (
          <Row
            key={e.id}
            gap={10}
            style={{ padding: 11, borderBottomWidth: i === earningsHistory.length - 1 ? 0 : 1, borderBottomColor: colors.line }}
          >
            <Avatar initials={e.clientInitials} tint={e.clientTint} size={32} fontSize={11} />
            <View style={{ flex: 1 }}>
              <AppText weight="semibold" size={13}>
                {e.title}
              </AppText>
              <AppText size={11} color={colors.ink2}>
                {e.date} · {e.duration} · {e.clientName}
              </AppText>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <AppText weight="semibold" size={13}>
                £{e.amount.toFixed(2)}
              </AppText>
              <AppText size={11} color={colors.ink2}>
                Paid
              </AppText>
            </View>
          </Row>
        ))}
      </Card>

      <Card>
        <Row gap={9}>
          <View style={{ width: 32, height: 32, borderRadius: 9, backgroundColor: colors.sub, alignItems: 'center', justifyContent: 'center' }}>
            <Feather name="credit-card" size={15} color={colors.ink2} />
          </View>
          <View style={{ flex: 1 }}>
            <AppText weight="semibold" size={13}>
              Tax summary 2026/27
            </AppText>
            <AppText size={11} color={colors.ink2}>
              Export a Self Assessment-ready CSV
            </AppText>
          </View>
          <Feather name="chevron-right" size={14} color={colors.ink3} />
        </Row>
      </Card>
    </ScreenContainer>
  );
}
