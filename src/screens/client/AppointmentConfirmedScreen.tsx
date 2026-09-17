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
import Button from '../../components/Button';
import Pill from '../../components/Pill';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { mohamed } from '../../data/mock';
import { ClientStackParamList } from '../../navigation/types';

export default function AppointmentConfirmedScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<ClientStackParamList>>();
  const artisan = mohamed;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.page }} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center', paddingVertical: 20 }}>
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
          <AppText weight="semibold" size={17}>
            {t('c5_title')}
          </AppText>
          <AppText size={12} color={colors.ink2}>
            {t('c5_sub')}
          </AppText>
        </View>

        <Card style={{ marginBottom: 12 }}>
          <Row gap={10}>
            <Avatar initials={artisan.initials} tint={artisan.avatarTint} size={38} fontSize={13} />
            <View style={{ flex: 1 }}>
              <AppText weight="semibold" size={13}>
                {artisan.name}
              </AppText>
              <AppText size={11} color={colors.ink2}>
                {t(artisan.roleKey)}
              </AppText>
            </View>
            <Pill label={t('pill_confirmed')} tone="g" />
          </Row>
        </Card>

        <Row gap={8} style={{ marginBottom: 12 }}>
          <Card soft padding={10} style={{ flex: 1 }}>
            <AppText size={11} color={colors.ink2}>
              {t('lbl_date')}
            </AppText>
            <AppText weight="semibold" size={13}>
              {t('c5_date')}
            </AppText>
          </Card>
          <Card soft padding={10} style={{ flex: 1 }}>
            <AppText size={11} color={colors.ink2}>
              {t('lbl_time')}
            </AppText>
            <AppText weight="semibold" size={13}>
              15:00 – 15:30
            </AppText>
          </Card>
        </Row>

        <Card style={{ marginBottom: 14 }}>
          <Row gap={8}>
            <Feather name="map" size={14} color={colors.ink2} />
            <AppText size={12}>{t('c2_addr_sub')}</AppText>
          </Row>
        </Card>

        <Card bg={colors.ochreSoft} borderColor="transparent" style={{ marginBottom: 16 }}>
          <Row gap={8}>
            <Feather name="credit-card" size={14} color={colors.ochre} />
            <AppText size={11} color={colors.ochre} style={{ flex: 1 }}>
              {t('c5_cash_note')}
            </AppText>
          </Row>
        </Card>

        <Button title={t('c5_whatsapp')} onPress={() => navigation.navigate('CompletedReview', { artisanId: artisan.id })} />
        <AppText size={11} color={colors.ink2} style={{ textAlign: 'center', marginTop: 10 }} onPress={() => navigation.popToTop()}>
          {t('c5_cancel')}
        </AppText>
      </ScrollView>
    </SafeAreaView>
  );
}
