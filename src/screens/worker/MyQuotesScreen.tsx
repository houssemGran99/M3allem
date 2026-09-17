import React, { useState } from 'react';
import { View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import AppText from '../../components/AppText';
import { Row, Between } from '../../components/Row';
import Card from '../../components/Card';
import Chip from '../../components/Chip';
import Pill from '../../components/Pill';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useWorkerData } from '../../state/WorkerDataContext';

const tabs = ['pending', 'accepted', 'done'] as const;
type Tab = (typeof tabs)[number];
const tabLabelKey: Record<Tab, 'w3_tab_pending' | 'w3_tab_accepted' | 'w3_tab_done'> = {
  pending: 'w3_tab_pending',
  accepted: 'w3_tab_accepted',
  done: 'w3_tab_done',
};

export default function MyQuotesScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { quotesSent } = useWorkerData();
  const [tab, setTab] = useState<Tab>('pending');

  const visible = tab === 'done' ? [] : quotesSent.filter((q) => q.status === tab);
  const acceptedCount = quotesSent.filter((q) => q.status === 'accepted').length;

  return (
    <ScreenContainer>
      <AppText weight="bold" size={16}>
        {t('w3_title')}
      </AppText>
      <AppText size={11} color={colors.ink2} style={{ marginTop: 2, marginBottom: 12 }}>
        {quotesSent.length} {t('w3_sub')}
      </AppText>

      <Row gap={6} style={{ marginBottom: 12 }}>
        {tabs.map((tb) => (
          <Chip key={tb} label={t(tabLabelKey[tb])} active={tab === tb} onPress={() => setTab(tb)} />
        ))}
      </Row>

      {visible.map((q) => (
        <Card key={q.id} style={{ marginBottom: 9 }} borderColor={q.highlighted ? colors.brand : colors.line}>
          <Between>
            <AppText weight="semibold" size={13}>
              {t(q.titleKey)}
            </AppText>
            <Pill label={t(q.status === 'pending' ? 'w3_status_pending' : 'w3_status_accepted')} tone={q.status === 'pending' ? 'a' : 'g'} />
          </Between>
          <AppText size={11} color={colors.ink2} style={{ marginTop: 3 }}>
            {q.clientName} · {q.price} {t('cur')}
          </AppText>
          <AppText size={11} color={colors.ink2}>
            {t(q.sentKey)}
          </AppText>
        </Card>
      ))}

      {visible.length === 0 && (
        <Card soft style={{ alignItems: 'center', padding: 20 }}>
          <AppText size={12} color={colors.ink2}>
            —
          </AppText>
        </Card>
      )}

      <View style={{ marginTop: 6 }}>
        <Card soft style={{ alignItems: 'center', padding: 12 }}>
          <AppText weight="semibold" size={12}>
            {acceptedCount} / {quotesSent.length}
          </AppText>
          <AppText size={11} color={colors.ink2}>
            {t('w3_stat_l')}
          </AppText>
        </Card>
      </View>
    </ScreenContainer>
  );
}
