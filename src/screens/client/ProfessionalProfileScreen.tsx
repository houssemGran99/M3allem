import React from 'react';
import { ScrollView, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
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
import ProgressBar from '../../components/ProgressBar';
import { useTheme } from '../../theme/ThemeContext';
import { professionals, reviews } from '../../data/mock';
import { ClientStackParamList } from '../../navigation/types';

export default function ProfessionalProfileScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ClientStackParamList>>();
  const route = useRoute<RouteProp<ClientStackParamList, 'ProfessionalProfile'>>();
  const pro = professionals.find((p) => p.id === route.params.proId) ?? professionals[0];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.page }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <View style={{ height: 128, backgroundColor: colors.sub }}>
          <View style={{ position: 'absolute', top: 12, left: 16 }}>
            <IconButton name="arrow-left" size={32} bg={colors.card} onPress={() => navigation.goBack()} />
          </View>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <Row gap={11} style={{ marginTop: -24, alignItems: 'flex-end' }}>
            <Avatar initials={pro.initials} tint={pro.avatarTint} size={62} fontSize={19} borderWidth={3} />
            <View style={{ paddingBottom: 5 }}>
              <Row gap={5}>
                <AppText weight="semibold" size={16}>
                  {pro.name}
                </AppText>
                {pro.verified && <VerifiedBadge size={14} />}
              </Row>
              <AppText size={11} color={colors.ink2}>
                {pro.trade} · {pro.yearsExperience ?? 3} yrs
              </AppText>
            </View>
          </Row>

          <Row gap={8} style={{ marginVertical: 14 }}>
            <StatTile label="reviews" value={`${pro.rating.toFixed(1)}★`} valueColor={colors.amber} />
            <StatTile label="Completed" value={`${pro.completedPct ?? 95}%`} />
            <StatTile label="Replies" value={pro.replyTime ?? '<2h'} />
          </Row>

          {pro.verified && (
            <Card bg={colors.brandSoft} borderColor="transparent" style={{ marginBottom: 16 }}>
              <Row gap={7} style={{ marginBottom: 6 }}>
                <VerifiedBadge size={14} />
                <AppText weight="semibold" size={12} color={colors.brandInk}>
                  Verified by Trady
                </AppText>
              </Row>
              <AppText size={11} color={colors.brandInk} style={{ opacity: 0.85, lineHeight: 18 }}>
                {pro.credentials?.map((c) => c.label).join(' · ') || 'ID checked · Background verified'}
              </AppText>
            </Card>
          )}

          <AppText weight="semibold" size={15} style={{ marginBottom: 8 }}>
            Recent work
          </AppText>
          <Row gap={7} style={{ marginBottom: 16 }}>
            <ImagePlaceholder height={74} icon="image" />
            <ImagePlaceholder height={74} icon="image" />
            <ImagePlaceholder height={74} icon="image" />
          </Row>

          <AppText weight="semibold" size={15} style={{ marginBottom: 10 }}>
            Reviews
          </AppText>
          <Row gap={12} style={{ marginBottom: 10, alignItems: 'flex-start' }}>
            <View style={{ alignItems: 'center' }}>
              <AppText weight="bold" size={24}>
                {pro.rating.toFixed(1)}
              </AppText>
              <Row gap={2}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Ionicons key={i} name="star" size={11} color={colors.amber} />
                ))}
              </Row>
            </View>
            <View style={{ flex: 1, gap: 5 }}>
              {(pro.ratingBreakdown ?? [{ stars: 5, pct: 80 }]).map((r) => (
                <Row key={r.stars} gap={6}>
                  <AppText size={11} color={colors.ink2}>
                    {r.stars}
                  </AppText>
                  <View style={{ flex: 1 }}>
                    <ProgressBar pct={r.pct} />
                  </View>
                </Row>
              ))}
            </View>
          </Row>

          {reviews.map((review) => (
            <Card key={review.id} style={{ marginBottom: 9 }}>
              <Between>
                <AppText weight="semibold" size={12}>
                  {review.author}
                </AppText>
                <AppText weight="bold" size={11} color={colors.amber}>
                  {review.rating.toFixed(1)} ★
                </AppText>
              </Between>
              <AppText size={12} color={colors.ink2} style={{ marginTop: 4, lineHeight: 18 }}>
                {review.text}
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
              Typical call-out
            </AppText>
            <Row gap={5}>
              <AppText weight="bold" size={16}>
                £{pro.price}
              </AppText>
              <AppText size={11} color={colors.ink2}>
                · 1–2 hrs
              </AppText>
            </Row>
          </View>
          <Row gap={8}>
            <IconButton name="message-circle" size={46} />
            <Button title={`Book ${pro.name.split(' ')[0]}`} fullWidth={false} style={{ paddingHorizontal: 26 }} onPress={() => navigation.navigate('Booking', { proId: pro.id })} />
          </Row>
        </Between>
      </View>
    </SafeAreaView>
  );
}
