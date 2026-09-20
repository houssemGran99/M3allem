import React, { useCallback, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ScreenContainer from '../../components/ScreenContainer';
import AppText from '../../components/AppText';
import { Row, Between } from '../../components/Row';
import Card from '../../components/Card';
import Chip from '../../components/Chip';
import Pill from '../../components/Pill';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useWorkerData } from '../../state/WorkerDataContext';
import { timeAgo } from '../../utils/timeAgo';
import { ApiQuoteStatus } from '../../api/types';

const tabs = ['pending', 'accepted', 'done'] as const;
type Tab = (typeof tabs)[number];
const tabLabelKey: Record<Tab, 'w3_tab_pending' | 'w3_tab_accepted' | 'w3_tab_done'> = {
  pending: 'w3_tab_pending',
  accepted: 'w3_tab_accepted',
  done: 'w3_tab_done',
};
const statusForTab: Record<Tab, ApiQuoteStatus> = { pending: 'pending', accepted: 'accepted', done: 'declined' };

export default function MyQuotesScreen() {
  const { colors } = useTheme();
  const { t, lang } = useLanguage();
  const { quotesSent, quotesLoading, refreshQuotes } = useWorkerData();
  const [tab, setTab] = useState<Tab>('pending');

  useFocusEffect(
    useCallback(() => {
      refreshQuotes();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  const visible = quotesSent.filter((q) => q.status === statusForTab[tab]);
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

      {quotesLoading && <ActivityIndicator color={colors.brand} style={{ marginVertical: 20 }} />}

      {!quotesLoading &&
        visible.map((q) => {
          const request = typeof q.request === 'object' ? q.request : null;
          const client = request && typeof request.client === 'object' ? request.client : null;
          const title = request?.description ? request.description.slice(0, 48) : '—';
          return (
            <Card key={q._id} style={{ marginBottom: 9 }} borderColor={q.status === 'accepted' ? colors.brand : colors.line}>
              <Between>
                <AppText weight="semibold" size={13} style={{ flex: 1 }} numberOfLines={1}>
                  {title}
                </AppText>
                <Pill label={t(q.status === 'pending' ? 'w3_status_pending' : 'w3_status_accepted')} tone={q.status === 'pending' ? 'a' : 'g'} />
              </Between>
              <AppText size={11} color={colors.ink2} style={{ marginTop: 3 }}>
                {client && 'name' in client ? client.name : '—'} · {q.price} {t('cur')}
              </AppText>
              <AppText size={11} color={colors.ink2}>
                {timeAgo(q.createdAt, lang)}
              </AppText>
            </Card>
          );
        })}

      {!quotesLoading && visible.length === 0 && (
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
