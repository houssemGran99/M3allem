import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../components/ScreenContainer';
import AppText from '../../components/AppText';
import { Row, Between } from '../../components/Row';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import Chip from '../../components/Chip';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useClientData } from '../../state/ClientDataContext';
import { listQuotesForRequest } from '../../api/requests';
import { ApiArtisanProfile, ApiQuote } from '../../api/types';
import { ClientStackParamList } from '../../navigation/types';

type QuoteRow = { quote: ApiQuote; artisanProfile: ApiArtisanProfile | null };

export default function QuotesScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { activeRequest, refresh } = useClientData();
  const navigation = useNavigation<NativeStackNavigationProp<ClientStackParamList>>();

  const [rows, setRows] = useState<QuoteRow[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    await refresh();
    if (!activeRequest) {
      setRows([]);
      return;
    }
    setLoading(true);
    try {
      const { quotes } = await listQuotesForRequest(activeRequest._id);
      setRows(quotes);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRequest?._id]);

  useEffect(() => {
    load();
  }, [load]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  if (!activeRequest) {
    return (
      <ScreenContainer>
        <AppText weight="semibold" size={17} style={{ marginBottom: 8 }}>
          {t('nav_quotes')}
        </AppText>
        <Card soft style={{ alignItems: 'center', padding: 24 }}>
          <AppText size={12} color={colors.ink2} style={{ textAlign: 'center' }}>
            {t('c3_empty_no_request')}
          </AppText>
        </Card>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <AppText weight="semibold" size={17}>
        {rows.length} {t('c3_title_suffix')}
      </AppText>
      <AppText size={11} color={colors.ink2} numberOfLines={1} style={{ marginTop: 2, marginBottom: 10 }}>
        {activeRequest.description}
      </AppText>
      <Row gap={6} style={{ marginBottom: 12 }}>
        <Chip label={t('c3_sort')} active />
      </Row>

      {loading && <ActivityIndicator color={colors.brand} style={{ marginVertical: 20 }} />}

      {!loading &&
        rows.map(({ quote, artisanProfile }, index) => {
          const artisan = typeof quote.artisan === 'object' ? quote.artisan : null;
          const artisanId = typeof quote.artisan === 'string' ? quote.artisan : quote.artisan._id;
          const highlighted = index === 0;
          return (
            <TouchableOpacity
              key={quote._id}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate('ArtisanProfile', { artisanId, requestId: activeRequest._id, quoteId: quote._id })
              }
            >
              <Card borderColor={highlighted ? colors.brand : colors.line} style={{ marginBottom: 9 }}>
                <Row gap={10} style={{ alignItems: 'flex-start' }}>
                  <Avatar initials={(artisan?.name ?? '??').slice(0, 2).toUpperCase()} tint="brand" size={44} fontSize={14} />
                  <View style={{ flex: 1 }}>
                    <Between>
                      <AppText weight="semibold" size={13}>
                        {artisan?.name ?? '—'}
                      </AppText>
                      <AppText weight="semibold" size={13}>
                        {quote.price} {t('cur')}
                      </AppText>
                    </Between>
                    {artisanProfile && (
                      <Row gap={6} style={{ marginTop: 2 }}>
                        <AppText weight="bold" size={11} color={colors.amber}>
                          {artisanProfile.rating.toFixed(1)} ★
                        </AppText>
                      </Row>
                    )}
                    {quote.message && (
                      <AppText size={11} color={colors.ink2} style={{ marginTop: 5 }}>
                        « {quote.message} »
                      </AppText>
                    )}
                  </View>
                </Row>
                <View style={{ height: 1, backgroundColor: colors.line, marginVertical: 10 }} />
                <Between>
                  <Row gap={5}>
                    <Feather name="clock" size={13} color={highlighted ? colors.brand : colors.ink2} />
                    <AppText size={12} weight={highlighted ? 'bold' : 'regular'} color={highlighted ? colors.brand : colors.ink2}>
                      {quote.timeSlot}
                    </AppText>
                  </Row>
                  <Button
                    title={t('c3_chat')}
                    size="sm"
                    fullWidth={false}
                    variant={highlighted ? 'primary' : 'ghost'}
                    onPress={() =>
                      navigation.navigate('ArtisanProfile', { artisanId, requestId: activeRequest._id, quoteId: quote._id })
                    }
                  />
                </Between>
              </Card>
            </TouchableOpacity>
          );
        })}

      {!loading && rows.length === 0 && (
        <Card soft style={{ alignItems: 'center', padding: 24 }}>
          <AppText size={12} color={colors.ink2} style={{ textAlign: 'center' }}>
            {t('c3_empty_no_quotes')}
          </AppText>
        </Card>
      )}
    </ScreenContainer>
  );
}
