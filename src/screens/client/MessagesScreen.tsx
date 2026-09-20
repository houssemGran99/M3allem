import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../components/ScreenContainer';
import AppText from '../../components/AppText';
import { Row } from '../../components/Row';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useClientData } from '../../state/ClientDataContext';
import { listQuotesForRequest } from '../../api/requests';
import { ApiQuote } from '../../api/types';
import { ClientStackParamList } from '../../navigation/types';

export default function MessagesScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { activeRequest } = useClientData();
  const navigation = useNavigation<NativeStackNavigationProp<ClientStackParamList>>();

  const [quotes, setQuotes] = useState<ApiQuote[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!activeRequest) {
      setQuotes([]);
      return;
    }
    setLoading(true);
    try {
      const { quotes: rows } = await listQuotesForRequest(activeRequest._id);
      setQuotes(rows.map((r) => r.quote));
    } finally {
      setLoading(false);
    }
  }, [activeRequest?._id]);

  useEffect(() => {
    load();
  }, [load]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  return (
    <ScreenContainer>
      <AppText weight="bold" size={20} style={{ marginBottom: 16 }}>
        {t('nav_msg')}
      </AppText>

      {loading && <ActivityIndicator color={colors.brand} style={{ marginVertical: 20 }} />}

      {!loading &&
        quotes.map((quote) => {
          const artisan = typeof quote.artisan === 'object' ? quote.artisan : null;
          const artisanId = typeof quote.artisan === 'string' ? quote.artisan : quote.artisan._id;
          return (
            <TouchableOpacity
              key={quote._id}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('ArtisanProfile', { artisanId, requestId: activeRequest?._id, quoteId: quote._id })}
            >
              <Card style={{ marginBottom: 9 }}>
                <Row gap={10}>
                  <Avatar initials={(artisan?.name ?? '??').slice(0, 2).toUpperCase()} tint="brand" size={40} fontSize={13} />
                  <View style={{ flex: 1 }}>
                    <AppText weight="semibold" size={13}>
                      {artisan?.name ?? '—'}
                    </AppText>
                    {quote.message && (
                      <AppText size={12} color={colors.ink2} numberOfLines={1}>
                        {quote.message}
                      </AppText>
                    )}
                  </View>
                </Row>
              </Card>
            </TouchableOpacity>
          );
        })}

      {!loading && quotes.length === 0 && (
        <Card soft style={{ alignItems: 'center', padding: 24 }}>
          <AppText size={12} color={colors.ink2} style={{ textAlign: 'center' }}>
            {t('c3_empty_no_quotes')}
          </AppText>
        </Card>
      )}
    </ScreenContainer>
  );
}
