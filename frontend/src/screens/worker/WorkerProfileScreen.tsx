import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ScreenContainer from '../../components/ScreenContainer';
import AppText from '../../components/AppText';
import { Row, Between } from '../../components/Row';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import Pill from '../../components/Pill';
import ProgressBar from '../../components/ProgressBar';
import VerifiedBadge from '../../components/VerifiedBadge';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../state/AuthContext';

export default function WorkerProfileScreen() {
  const { colors } = useTheme();
  const { t, lang } = useLanguage();
  const { user, artisanProfile, logout } = useAuth();

  if (!user || !artisanProfile) return null;

  const shownCredentials = artisanProfile.credentials.filter((c) => c.type !== 'referral');
  const replyLabel =
    artisanProfile.replyTimeMinutes < 60
      ? `<${artisanProfile.replyTimeMinutes} min`
      : `<${Math.round(artisanProfile.replyTimeMinutes / 60)}h`;

  return (
    <ScreenContainer>
      <Row gap={12} style={{ marginBottom: 14 }}>
        <Avatar initials={user.name.slice(0, 2).toUpperCase()} tint="brand" size={56} fontSize={18} />
        <View style={{ flex: 1 }}>
          <Row gap={5}>
            <AppText weight="semibold" size={16}>
              {user.name}
            </AppText>
            {artisanProfile.verified && <VerifiedBadge size={14} />}
          </Row>
          <AppText size={11} color={colors.ink2}>
            {artisanProfile.roleLabel[lang]}
          </AppText>
          <Row gap={6} style={{ marginTop: 2 }}>
            <AppText weight="bold" size={12} color={colors.amber}>
              {artisanProfile.rating.toFixed(1)}★
            </AppText>
            <AppText size={12} color={colors.ink2}>
              · {artisanProfile.jobCount} {t('w6_jobs_l')}
            </AppText>
          </Row>
        </View>
      </Row>

      <Card style={{ marginBottom: 12 }}>
        <Between style={{ marginBottom: 9 }}>
          <AppText weight="semibold" size={13}>
            {t('w6_score')}
          </AppText>
          {artisanProfile.verified && <Pill label={t('w6_top')} tone="g" />}
        </Between>
        <View style={{ marginBottom: 9 }}>
          <ProgressBar pct={artisanProfile.completionPct} color={colors.brand} />
        </View>
        <Between>
          <View>
            <AppText size={11} color={colors.ink2}>
              {t('w6_stat1')}
            </AppText>
            <AppText weight="semibold" size={13}>
              {artisanProfile.completionPct}%
            </AppText>
          </View>
          <View>
            <AppText size={11} color={colors.ink2}>
              {t('w6_stat2')}
            </AppText>
            <AppText weight="semibold" size={13}>
              {artisanProfile.onTimePct}%
            </AppText>
          </View>
          <View>
            <AppText size={11} color={colors.ink2}>
              {t('w6_stat3')}
            </AppText>
            <AppText weight="semibold" size={13}>
              {replyLabel}
            </AppText>
          </View>
        </Between>
      </Card>

      <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {t('w6_lbl_verif')}
      </AppText>
      {shownCredentials.length > 0 ? (
        <Card padding={0} style={{ overflow: 'hidden', marginBottom: 12 }}>
          {shownCredentials.map((c, i) => (
            <Row key={c.type} gap={9} style={{ padding: 11, borderBottomWidth: i === shownCredentials.length - 1 ? 0 : 1, borderBottomColor: colors.line }}>
              <Feather name="shield" size={15} color={c.status === 'live' ? colors.brand : colors.amber} />
              <AppText size={13} weight="semibold" style={{ flex: 1 }}>
                {c.label[lang]}
              </AppText>
              <Pill label={t(c.status === 'live' ? 'w6_live' : 'w3_status_pending')} tone={c.status === 'live' ? 'g' : 'a'} />
            </Row>
          ))}
        </Card>
      ) : (
        <Card soft style={{ marginBottom: 12 }}>
          <AppText size={12} color={colors.ink2}>
            —
          </AppText>
        </Card>
      )}

      <Card style={{ marginBottom: 16 }}>
        <Row gap={9}>
          <View style={{ width: 32, height: 32, borderRadius: 9, backgroundColor: colors.sub, alignItems: 'center', justifyContent: 'center' }}>
            <Feather name="gift" size={15} color={colors.ink2} />
          </View>
          <View style={{ flex: 1 }}>
            <AppText weight="semibold" size={13}>
              {t('w6_invite_t')}
            </AppText>
            <AppText size={11} color={colors.ink2}>
              {t('w6_invite_s')}
            </AppText>
          </View>
        </Row>
      </Card>

      <Button title={t('common_logout')} variant="ghost" onPress={() => logout()} />
    </ScreenContainer>
  );
}
