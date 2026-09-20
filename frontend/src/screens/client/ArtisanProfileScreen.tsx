import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '../../components/AppText';
import { Row, Between } from '../../components/Row';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import IconButton from '../../components/IconButton';
import Button from '../../components/Button';
import StatTile from '../../components/StatTile';
import VerifiedBadge from '../../components/VerifiedBadge';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { getArtisan } from '../../api/artisans';
import { acceptQuote } from '../../api/requests';
import { ApiArtisanProfile, ApiReview, ApiUser } from '../../api/types';
import { ApiClientError } from '../../api/client';
import { ClientStackParamList } from '../../navigation/types';

export default function ArtisanProfileScreen() {
  const { colors } = useTheme();
  const { t, lang } = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<ClientStackParamList>>();
  const route = useRoute<RouteProp<ClientStackParamList, 'ArtisanProfile'>>();
  const { artisanId, requestId, quoteId } = route.params;

  const [user, setUser] = useState<ApiUser | null>(null);
  const [profile, setProfile] = useState<ApiArtisanProfile | null>(null);
  const [reviews, setReviews] = useState<ApiReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getArtisan(artisanId);
      setUser(result.user);
      setProfile(result.profile);
      setReviews(result.reviews);
    } finally {
      setLoading(false);
    }
  }, [artisanId]);

  useEffect(() => {
    load();
  }, [load]);

  const handlePrimaryAction = async () => {
    if (!requestId || !quoteId) {
      // No quote in context (e.g. viewed from "recently contacted") — nothing to accept.
      navigation.goBack();
      return;
    }
    setError(null);
    setAccepting(true);
    try {
      await acceptQuote(requestId, quoteId);
      navigation.navigate('AppointmentConfirmed', { requestId, quoteId, artisanId });
    } catch (e) {
      setError(e instanceof ApiClientError ? e.message : 'Something went wrong');
    } finally {
      setAccepting(false);
    }
  };

  if (loading || !user || !profile) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.page, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.brand} size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.page }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <View style={{ height: 118, backgroundColor: colors.sub }}>
          <View style={{ position: 'absolute', top: 12, left: 16, right: 16 }}>
            <IconButton name="arrow-left" size={32} bg={colors.card} onPress={() => navigation.goBack()} />
          </View>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <Row gap={11} style={{ marginTop: -24, alignItems: 'flex-end' }}>
            <Avatar initials={user.name.slice(0, 2).toUpperCase()} tint="brand" size={62} fontSize={19} borderWidth={3} />
            <View style={{ paddingBottom: 5 }}>
              <Row gap={5}>
                <AppText weight="semibold" size={16}>
                  {user.name}
                </AppText>
                {profile.verified && <VerifiedBadge size={14} />}
              </Row>
              <AppText size={11} color={colors.ink2}>
                {profile.roleLabel[lang]}
              </AppText>
            </View>
          </Row>

          <Row gap={8} style={{ marginVertical: 14 }}>
            <StatTile label={t('c4_stat_reviews')} value={`${profile.rating.toFixed(1)}★`} valueColor={colors.amber} />
            <StatTile label={t('c4_stat_jobs')} value={`${profile.jobCount}`} />
            <StatTile label={t('c4_stat_reply')} value={`<${Math.max(1, Math.round(profile.replyTimeMinutes / 60))}h`} />
          </Row>

          {profile.verified && (
            <Card bg={colors.brandSoft} borderColor="transparent" style={{ marginBottom: 16 }}>
              <Row gap={7} style={{ marginBottom: 8 }}>
                <VerifiedBadge size={14} />
                <AppText weight="semibold" size={12} color={colors.brandInk}>
                  {t('c4_verif_title')}
                </AppText>
              </Row>
              {profile.credentials.map((c) => (
                <Row key={c.type} gap={6} style={{ marginBottom: 5 }}>
                  <Feather name="check" size={12} color={colors.brandInk} />
                  <AppText size={11} color={colors.brandInk} style={{ flex: 1 }}>
                    {c.label[lang]}
                  </AppText>
                </Row>
              ))}
            </Card>
          )}

          <AppText weight="semibold" size={15} style={{ marginBottom: 8 }}>
            {t('c4_portfolio')}
          </AppText>
          <Row gap={7} style={{ marginBottom: 16 }}>
            <ImagePlaceholder height={74} icon="image" />
            <ImagePlaceholder height={74} icon="image" />
            <ImagePlaceholder height={74} icon="image" />
          </Row>

          <AppText weight="semibold" size={15} style={{ marginBottom: 8 }}>
            {t('c4_reviews')}
          </AppText>
          {reviews.length === 0 && (
            <AppText size={12} color={colors.ink2}>
              —
            </AppText>
          )}
          {reviews.map((review) => {
            const author = typeof review.client === 'object' ? review.client.name : '—';
            return (
              <Card key={review._id} style={{ marginBottom: 8 }}>
                <Between>
                  <AppText weight="semibold" size={12}>
                    {author}
                  </AppText>
                  <AppText weight="bold" size={11} color={colors.amber}>
                    {review.rating.toFixed(1)} ★
                  </AppText>
                </Between>
                {review.text && (
                  <AppText size={12} color={colors.ink2} style={{ marginTop: 4, lineHeight: 18 }}>
                    {review.text}
                  </AppText>
                )}
              </Card>
            );
          })}
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.line,
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
          paddingHorizontal: 16,
          paddingTop: 14,
          paddingBottom: 22,
        }}
      >
        {error && (
          <AppText size={11} color={colors.red} style={{ marginBottom: 8 }}>
            {error}
          </AppText>
        )}
        <Between>
          <View>
            <AppText size={11} color={colors.ink2}>
              {t('c4_price_lbl')}
            </AppText>
            <AppText weight="bold" size={16}>
              {profile.priceMin}–{profile.priceMax} {t('cur')}
            </AppText>
          </View>
          <Button
            title={t('c4_whatsapp')}
            fullWidth={false}
            style={{ paddingHorizontal: 22 }}
            onPress={handlePrimaryAction}
            loading={accepting}
          />
        </Between>
      </View>
    </SafeAreaView>
  );
}
