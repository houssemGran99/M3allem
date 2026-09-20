import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '../../components/AppText';
import { Row, Between } from '../../components/Row';
import Card from '../../components/Card';
import Button from '../../components/Button';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import TextField from '../../components/TextField';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { getRequest, reviewRequest } from '../../api/requests';
import { ApiServiceRequest } from '../../api/types';
import { ApiClientError } from '../../api/client';
import { ClientStackParamList } from '../../navigation/types';

export default function CompletedReviewScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<ClientStackParamList>>();
  const route = useRoute<RouteProp<ClientStackParamList, 'CompletedReview'>>();
  const { requestId } = route.params;

  const [request, setRequest] = useState<ApiServiceRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRequest(requestId)
      .then(({ request: fetched }) => setRequest(fetched))
      .finally(() => setLoading(false));
  }, [requestId]);

  const price = request && typeof request.acceptedQuote === 'object' ? request.acceptedQuote.price : undefined;

  const submit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await reviewRequest(requestId, rating, text.trim() || undefined);
      navigation.popToTop();
    } catch (e) {
      setError(e instanceof ApiClientError ? e.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !request) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.page, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.brand} size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.page }} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 8 }} showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center', paddingVertical: 12 }}>
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: colors.brand,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12,
            }}
          >
            <Feather name="check" size={26} color="#fff" />
          </View>
          <AppText weight="bold" size={18}>
            {t('c6_title')}
          </AppText>
          <AppText size={12} color={colors.ink2}>
            {t('c6_sub')}
          </AppText>
        </View>

        <Row gap={8} style={{ marginBottom: 14 }}>
          <View style={{ flex: 1 }}>
            <ImagePlaceholder height={86} icon="image" />
            <AppText size={11} color={colors.ink2} style={{ marginTop: 4 }}>
              {t('lbl_before')}
            </AppText>
          </View>
          <View style={{ flex: 1 }}>
            <ImagePlaceholder height={86} icon="image" />
            <AppText size={11} color={colors.ink2} style={{ marginTop: 4 }}>
              {t('lbl_after')}
            </AppText>
          </View>
        </Row>

        <Card style={{ marginBottom: 14 }}>
          <Between>
            <AppText weight="semibold" size={12}>
              {t('c6_paid_v')}
            </AppText>
            {price !== undefined && (
              <AppText weight="bold" size={14}>
                {price} {t('cur')}
              </AppText>
            )}
          </Between>
          <AppText size={11} color={colors.ink2} style={{ marginTop: 3 }}>
            {t('c6_paid_note')}
          </AppText>
        </Card>

        <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {t('c6_rate')}
        </AppText>
        <Card style={{ alignItems: 'center', marginBottom: 12 }}>
          <Row gap={9} style={{ marginBottom: 10 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <TouchableOpacity key={i} onPress={() => setRating(i)}>
                <Ionicons name={i <= rating ? 'star' : 'star-outline'} size={26} color={colors.amber} />
              </TouchableOpacity>
            ))}
          </Row>
          <View style={{ width: '100%' }}>
            <TextField value={text} onChangeText={setText} placeholder={t('c6_review_ph')} multiline numberOfLines={3} />
          </View>
        </Card>

        {error && (
          <AppText size={12} color={colors.red} style={{ marginBottom: 10 }}>
            {error}
          </AppText>
        )}

        <Card bg={colors.brandSoft} borderColor="transparent">
          <Row gap={8}>
            <Feather name="gift" size={14} color={colors.brandInk} />
            <AppText size={11} color={colors.brandInk} style={{ flex: 1 }}>
              {t('c6_referral')}
            </AppText>
          </Row>
        </Card>
      </ScrollView>
      <View style={{ padding: 16, borderTopWidth: 1, borderTopColor: colors.line }}>
        <Button title={t('c6_submit')} onPress={submit} loading={submitting} />
      </View>
    </SafeAreaView>
  );
}
