import React from 'react';
import { Switch, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ScreenContainer from '../../components/ScreenContainer';
import AppText from '../../components/AppText';
import { Row, Between } from '../../components/Row';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import Pill from '../../components/Pill';
import ProgressBar from '../../components/ProgressBar';
import { useTheme } from '../../theme/ThemeContext';
import { professionals } from '../../data/mock';

export default function WorkerProfileScreen() {
  const { colors, setRole } = useTheme();
  const pro = professionals[0];

  return (
    <ScreenContainer>
      <Row gap={12} style={{ marginBottom: 14 }}>
        <Avatar initials={pro.initials} tint={pro.avatarTint} size={56} fontSize={18} />
        <View style={{ flex: 1 }}>
          <Row gap={5}>
            <AppText weight="semibold" size={16}>
              {pro.name}
            </AppText>
            <Feather name="shield" size={14} color={colors.brand} />
          </Row>
          <AppText size={11} color={colors.ink2}>
            {pro.trade} · Bristol
          </AppText>
          <Row gap={6} style={{ marginTop: 2 }}>
            <AppText weight="bold" size={12} color={colors.amber}>
              {pro.rating.toFixed(1)}★
            </AppText>
            <AppText size={12} color={colors.ink2}>
              {pro.reviewCount} reviews
            </AppText>
          </Row>
        </View>
      </Row>

      <Card style={{ marginBottom: 12 }}>
        <Between style={{ marginBottom: 9 }}>
          <AppText weight="semibold" size={13}>
            Trady score
          </AppText>
          <Pill label="Top rated" tone="g" />
        </Between>
        <View style={{ marginBottom: 9 }}>
          <ProgressBar pct={94} color={colors.brand} />
        </View>
        <Between>
          <View>
            <AppText size={11} color={colors.ink2}>
              Completion
            </AppText>
            <AppText weight="semibold" size={13}>
              {pro.completedPct ?? 98}%
            </AppText>
          </View>
          <View>
            <AppText size={11} color={colors.ink2}>
              On time
            </AppText>
            <AppText weight="semibold" size={13}>
              96%
            </AppText>
          </View>
          <View>
            <AppText size={11} color={colors.ink2}>
              Reply time
            </AppText>
            <AppText weight="semibold" size={13}>
              42 min
            </AppText>
          </View>
        </Between>
        <AppText size={11} color={colors.ink2} style={{ marginTop: 9, lineHeight: 17 }}>
          Top rated pros appear above standard listings and get first refusal on emergency jobs.
        </AppText>
      </Card>

      <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        Credentials
      </AppText>
      <Card padding={0} style={{ overflow: 'hidden', marginBottom: 12 }}>
        {(pro.credentials ?? []).map((c, i, arr) => (
          <Row key={c.id} gap={9} style={{ padding: 11, borderBottomWidth: i === arr.length - 1 ? 0 : 1, borderBottomColor: colors.line }}>
            <Feather name={c.status === 'live' ? 'shield' : 'clock'} size={15} color={c.status === 'live' ? colors.brand : colors.amber} />
            <View style={{ flex: 1 }}>
              <AppText weight="semibold" size={13}>
                {c.label}
              </AppText>
              <AppText size={11} color={colors.ink2}>
                {c.detail}
              </AppText>
            </View>
            <Pill label={c.status === 'live' ? 'Live' : 'Renew'} tone={c.status === 'live' ? 'g' : 'a'} />
          </Row>
        ))}
      </Card>

      <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        Availability
      </AppText>
      <Card style={{ marginBottom: 16 }}>
        <Between style={{ paddingVertical: 3 }}>
          <AppText size={12.5}>Mon – Fri</AppText>
          <AppText size={12.5} weight="semibold">
            8:00am – 6:00pm
          </AppText>
        </Between>
        <Between style={{ paddingVertical: 3 }}>
          <AppText size={12.5}>Saturday</AppText>
          <AppText size={12.5} weight="semibold">
            9:00am – 1:00pm
          </AppText>
        </Between>
        <Between style={{ paddingVertical: 3 }}>
          <AppText size={12.5}>Sunday</AppText>
          <AppText size={12.5} color={colors.ink2}>
            Unavailable
          </AppText>
        </Between>
        <View style={{ height: 1, backgroundColor: colors.line, marginVertical: 8 }} />
        <Between>
          <AppText size={13}>Emergency call-outs</AppText>
          <Switch value trackColor={{ true: colors.brand, false: colors.line }} thumbColor="#fff" />
        </Between>
      </Card>

      <Card bg={colors.brandSoft} borderColor="transparent" style={{ marginBottom: 12 }}>
        <Row gap={9} style={{ marginBottom: 8 }}>
          <Feather name="user" size={16} color={colors.brandInk} />
          <AppText weight="semibold" size={13} color={colors.brandInk}>
            Looking for work done?
          </AppText>
        </Row>
        <AppText size={12} color={colors.brandInk} style={{ opacity: 0.85, marginBottom: 12, lineHeight: 18 }}>
          Switch to the client app to browse trades and book a job.
        </AppText>
        <Button title="Switch to client app" onPress={() => setRole('client')} />
      </Card>
    </ScreenContainer>
  );
}
