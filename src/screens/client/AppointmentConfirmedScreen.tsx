import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
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
import { getArtisan } from '../../api/artisans';
import { completeRequest, getRequest } from '../../api/requests';
import { ApiArtisanProfile, ApiServiceRequest, ApiUser } from '../../api/types';
import { ApiClientError } from '../../api/client';
import { ClientStackParamList } from '../../navigation/types';

export default function AppointmentConfirmedScreen() {
  const { colors } = useTheme();
  const { t, lang } = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<ClientStackParamList>>();
  const route = useRoute<RouteProp<ClientStackParamList, 'AppointmentConfirmed'>>();
  const { requestId, artisanId } = route.params;

  const [user, setUser] = useState<ApiUser | null>(null);
  const [profile, setProfile] = useState<ApiArtisanProfile | null>(null);
  const [request, setRequest] = useState<ApiServiceRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getArtisan(artisanId), getRequest(requestId)])
      .then(([artisanResult, requestResult]) => {
        setUser(artisanResult.user);
        setProfile(artisanResult.profile);
        setRequest(requestResult.request);
      })
      .finally(() => setLoading(false));
  }, [artisanId, requestId]);

  const handleComplete = async () => {
    setError(null);
    setCompleting(true);
    try {
      await completeRequest(requestId);
      navigation.navigate('CompletedReview', { requestId, artisanId });
    } catch (e) {
      setError(e instanceof ApiClientError ? e.message : 'Something went wrong');
    } finally {
      setCompleting(false);
    }
  };

  if (loading || !user || !profile || !request) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.page, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.brand} size="large" />
      </SafeAreaView>
    );
  }

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
            <Avatar initials={user.name.slice(0, 2).toUpperCase()} tint="brand" size={38} fontSize={13} />
            <View style={{ flex: 1 }}>
              <AppText weight="semibold" size={13}>
                {user.name}
              </AppText>
              <AppText size={11} color={colors.ink2}>
                {profile.roleLabel[lang]}
              </AppText>
            </View>
            <Pill label={t('pill_confirmed')} tone="g" />
          </Row>
        </Card>

        <Card style={{ marginBottom: 14 }}>
          <Row gap={8}>
            <Feather name="map" size={14} color={colors.ink2} />
            <AppText size={12}>
              {request.address.line}, {request.address.city}
            </AppText>
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

        {error && (
          <AppText size={12} color={colors.red} style={{ marginBottom: 10 }}>
            {error}
          </AppText>
        )}

        <Button title={t('c5_whatsapp')} onPress={handleComplete} loading={completing} />
        <AppText size={11} color={colors.ink2} style={{ textAlign: 'center', marginTop: 10 }} onPress={() => navigation.popToTop()}>
          {t('c5_cancel')}
        </AppText>
      </ScrollView>
    </SafeAreaView>
  );
}
