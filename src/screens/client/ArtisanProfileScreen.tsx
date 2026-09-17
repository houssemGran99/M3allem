import React from 'react';
import { ScrollView, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
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
import { mohamed, reviews } from '../../data/mock';
import { ClientStackParamList } from '../../navigation/types';

export default function ArtisanProfileScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<ClientStackParamList>>();
  const artisan = mohamed;

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
            <Avatar initials={artisan.initials} tint={artisan.avatarTint} size={62} fontSize={19} borderWidth={3} />
            <View style={{ paddingBottom: 5 }}>
              <Row gap={5}>
                <AppText weight="semibold" size={16}>
                  {artisan.name}
                </AppText>
                {artisan.verified && <VerifiedBadge size={14} />}
              </Row>
              <AppText size={11} color={colors.ink2}>
                {t(artisan.roleKey)}
              </AppText>
            </View>
          </Row>

          <Row gap={8} style={{ marginVertical: 14 }}>
            <StatTile label={t('c4_stat_reviews')} value={`${artisan.rating.toFixed(1)}★`} valueColor={colors.amber} />
            <StatTile label={t('c4_stat_jobs')} value={`${artisan.jobCount}`} />
            <StatTile label={t('c4_stat_reply')} value={t(artisan.replyTimeKey)} />
          </Row>

          {artisan.verified && (
            <Card bg={colors.brandSoft} borderColor="transparent" style={{ marginBottom: 16 }}>
              <Row gap={7} style={{ marginBottom: 8 }}>
                <VerifiedBadge size={14} />
                <AppText weight="semibold" size={12} color={colors.brandInk}>
                  {t('c4_verif_title')}
                </AppText>
              </Row>
              {artisan.credentials.map((c) => (
                <Row key={c.id} gap={6} style={{ marginBottom: 5 }}>
                  <Feather name="check" size={12} color={colors.brandInk} />
                  <AppText size={11} color={colors.brandInk} style={{ flex: 1 }}>
                    {t(c.labelKey)}
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
          {reviews.map((review) => (
            <Card key={review.id}>
              <Between>
                <AppText weight="semibold" size={12}>
                  {review.author}
                </AppText>
                <AppText weight="bold" size={11} color={colors.amber}>
                  {review.rating.toFixed(1)} ★
                </AppText>
              </Between>
              <AppText size={12} color={colors.ink2} style={{ marginTop: 4, lineHeight: 18 }}>
                {t(review.textKey)}
              </AppText>
            </Card>
          ))}
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
        <Between>
          <View>
            <AppText size={11} color={colors.ink2}>
              {t('c4_price_lbl')}
            </AppText>
            <AppText weight="bold" size={16}>
              {artisan.priceMin}–{artisan.priceMax} {t('cur')}
            </AppText>
          </View>
          <Button
            title={t('c4_whatsapp')}
            fullWidth={false}
            style={{ paddingHorizontal: 22 }}
            onPress={() => navigation.navigate('AppointmentConfirmed', { artisanId: artisan.id })}
          />
        </Between>
      </View>
    </SafeAreaView>
  );
}
