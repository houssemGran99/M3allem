import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '../../components/AppText';
import { Row, Between } from '../../components/Row';
import Card from '../../components/Card';
import Button from '../../components/Button';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import Field from '../../components/Field';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { mohamed, quotes } from '../../data/mock';
import { ClientStackParamList } from '../../navigation/types';

export default function CompletedReviewScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<ClientStackParamList>>();
  const [rating, setRating] = useState(5);
  const price = quotes[0].price;

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
            <AppText weight="bold" size={14}>
              {price} {t('cur')}
            </AppText>
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
            <Field placeholder={t('c6_review_ph')} multiline />
          </View>
        </Card>

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
        <Button title={t('c6_submit')} onPress={() => navigation.popToTop()} />
      </View>
    </SafeAreaView>
  );
}
