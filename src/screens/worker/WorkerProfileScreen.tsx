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
import { mohamed } from '../../data/mock';

export default function WorkerProfileScreen() {
  const { colors, setRole } = useTheme();
  const { t } = useLanguage();
  const artisan = mohamed;
  const shownCredentials = artisan.credentials.filter((c) => c.id !== 'ref');

  return (
    <ScreenContainer>
      <Row gap={12} style={{ marginBottom: 14 }}>
        <Avatar initials={artisan.initials} tint={artisan.avatarTint} size={56} fontSize={18} />
        <View style={{ flex: 1 }}>
          <Row gap={5}>
            <AppText weight="semibold" size={16}>
              {artisan.name}
            </AppText>
            <VerifiedBadge size={14} />
          </Row>
          <AppText size={11} color={colors.ink2}>
            {t(artisan.roleKey)}
          </AppText>
          <Row gap={6} style={{ marginTop: 2 }}>
            <AppText weight="bold" size={12} color={colors.amber}>
              {artisan.rating.toFixed(1)}★
            </AppText>
            <AppText size={12} color={colors.ink2}>
              · {artisan.jobCount} {t('w6_jobs_l')}
            </AppText>
          </Row>
        </View>
      </Row>

      <Card style={{ marginBottom: 12 }}>
        <Between style={{ marginBottom: 9 }}>
          <AppText weight="semibold" size={13}>
            {t('w6_score')}
          </AppText>
          <Pill label={t('w6_top')} tone="g" />
        </Between>
        <View style={{ marginBottom: 9 }}>
          <ProgressBar pct={94} color={colors.brand} />
        </View>
        <Between>
          <View>
            <AppText size={11} color={colors.ink2}>
              {t('w6_stat1')}
            </AppText>
            <AppText weight="semibold" size={13}>
              98%
            </AppText>
          </View>
          <View>
            <AppText size={11} color={colors.ink2}>
              {t('w6_stat2')}
            </AppText>
            <AppText weight="semibold" size={13}>
              96%
            </AppText>
          </View>
          <View>
            <AppText size={11} color={colors.ink2}>
              {t('w6_stat3')}
            </AppText>
            <AppText weight="semibold" size={13}>
              {t('w6_stat3_v')}
            </AppText>
          </View>
        </Between>
      </Card>

      <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {t('w6_lbl_verif')}
      </AppText>
      <Card padding={0} style={{ overflow: 'hidden', marginBottom: 12 }}>
        {shownCredentials.map((c, i) => (
          <Row key={c.id} gap={9} style={{ padding: 11, borderBottomWidth: i === shownCredentials.length - 1 ? 0 : 1, borderBottomColor: colors.line }}>
            <Feather name="shield" size={15} color={colors.brand} />
            <AppText size={13} weight="semibold" style={{ flex: 1 }}>
              {t(c.labelKey)}
            </AppText>
            <Pill label={t('w6_live')} tone="g" />
          </Row>
        ))}
      </Card>

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

      <Card bg={colors.brandSoft} borderColor="transparent" style={{ marginBottom: 12 }}>
        <Row gap={9} style={{ marginBottom: 8 }}>
          <Feather name="user" size={16} color={colors.brandInk} />
          <AppText weight="semibold" size={13} color={colors.brandInk}>
            {t('account_switch_client_t')}
          </AppText>
        </Row>
        <AppText size={12} color={colors.brandInk} style={{ opacity: 0.85, marginBottom: 12, lineHeight: 18 }}>
          {t('account_switch_client_s')}
        </AppText>
        <Button title={t('account_switch_client_btn')} onPress={() => setRole('client')} />
      </Card>
    </ScreenContainer>
  );
}
