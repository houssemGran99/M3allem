import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../../components/AppBar';
import AppText from '../../components/AppText';
import { Row } from '../../components/Row';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import TextField from '../../components/TextField';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useCredits } from '../../state/CreditsContext';
import { useWorkerData } from '../../state/WorkerDataContext';
import { ApiClientError } from '../../api/client';
import { WorkerStackParamList } from '../../navigation/types';

export default function LeadDetailScreen() {
  const { colors } = useTheme();
  const { t, lang } = useLanguage();
  const { balance } = useCredits();
  const { leads, unlockLead, submitQuote } = useWorkerData();
  const navigation = useNavigation<NativeStackNavigationProp<WorkerStackParamList>>();
  const route = useRoute<RouteProp<WorkerStackParamList, 'LeadDetail'>>();
  const lead = leads.find((l) => l._id === route.params.leadId);

  const [unlocking, setUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState<string | null>(null);

  const [price, setPrice] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  if (!lead) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.page, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.brand} size="large" />
      </SafeAreaView>
    );
  }

  const handleUnlock = async () => {
    setUnlockError(null);
    setUnlocking(true);
    try {
      await unlockLead(lead._id);
    } catch (e) {
      setUnlockError(e instanceof ApiClientError ? e.message : 'Something went wrong');
    } finally {
      setUnlocking(false);
    }
  };

  const handleSubmitQuote = async () => {
    const priceNum = Number(price);
    if (!priceNum || priceNum <= 0 || !timeSlot.trim()) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      await submitQuote(lead._id, { price: priceNum, timeSlot: timeSlot.trim(), message: message.trim() || undefined });
      setSent(true);
    } catch (e) {
      setSubmitError(e instanceof ApiClientError ? e.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (!lead.unlocked) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.page }} edges={['top']}>
        <View style={{ padding: 16, flex: 1 }}>
          <AppBar title={lead.category.name[lang]} />
          <Card soft style={{ alignItems: 'center', padding: 24, marginTop: 20 }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: colors.brandSoft,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 14,
              }}
            >
              <Feather name="lock" size={20} color={colors.brand} />
            </View>
            <AppText weight="semibold" size={14} style={{ textAlign: 'center', marginBottom: 6 }}>
              {t('w1_unlock')}
            </AppText>
            <AppText size={12} color={colors.ink2} style={{ textAlign: 'center', marginBottom: 18 }}>
              {t('w1_cap')}
            </AppText>
            {unlockError && (
              <AppText size={12} color={colors.red} style={{ marginBottom: 10, textAlign: 'center' }}>
                {unlockError}
              </AppText>
            )}
            <Button
              title={`${t('w1_unlock')} (${balance ?? '…'} ${t('wnav_credits')})`}
              onPress={handleUnlock}
              loading={unlocking}
              disabled={balance !== null && balance < 1}
            />
          </Card>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.page }} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        <AppBar title={t('w2_title')} tag={t('w2_unlocked')} tagTone="g" />

        {lead.client && (
          <Card style={{ marginBottom: 12 }}>
            <Row gap={10}>
              <Avatar initials={lead.client.name.slice(0, 2).toUpperCase()} tint="ochre" size={36} fontSize={12} />
              <View style={{ flex: 1 }}>
                <AppText weight="semibold" size={13}>
                  {lead.client.name}
                </AppText>
              </View>
            </Row>
          </Card>
        )}

        <AppText weight="semibold" size={13} style={{ marginBottom: 3 }}>
          {lead.category.name[lang]}
        </AppText>
        <AppText size={12} color={colors.ink2} style={{ marginBottom: 10, lineHeight: 18 }}>
          {lead.description}
        </AppText>
        <Row gap={6} style={{ marginBottom: 14 }}>
          <ImagePlaceholder width={60} height={60} icon="image" />
          <ImagePlaceholder width={60} height={60} icon="image" />
        </Row>

        <Card style={{ marginBottom: 14 }}>
          <Row gap={10}>
            <Feather name="map-pin" size={14} color={colors.ink2} />
            <View style={{ flex: 1 }}>
              <AppText weight="semibold" size={13}>
                {lead.address?.line}
              </AppText>
              <AppText size={11} color={colors.ink2}>
                {lead.address?.city}
              </AppText>
            </View>
            <Feather name="map" size={16} color={colors.ink2} />
          </Row>
        </Card>

        {sent ? (
          <Card bg={colors.brandSoft} borderColor="transparent" style={{ alignItems: 'center', padding: 20 }}>
            <Feather name="check-circle" size={22} color={colors.brand} style={{ marginBottom: 8 }} />
            <AppText weight="semibold" size={13} color={colors.brandInk} style={{ textAlign: 'center' }}>
              {t('w2_sent_confirm')}
            </AppText>
            <View style={{ marginTop: 14, width: '100%' }}>
              <Button
                title={t('wnav_quotes')}
                variant="ghost"
                onPress={() => navigation.navigate('WorkerTabs', { screen: 'MyQuotes' } as never)}
              />
            </View>
          </Card>
        ) : (
          <>
            <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {t('w2_lbl_quote')}
            </AppText>
            <Row gap={8}>
              <View style={{ flex: 1 }}>
                <TextField value={price} onChangeText={setPrice} placeholder={t('w2_price_ph')} keyboardType="numeric" />
              </View>
              <View style={{ flex: 1 }}>
                <TextField value={timeSlot} onChangeText={setTimeSlot} placeholder={t('w2_time_ph')} />
              </View>
            </Row>
            <TextField value={message} onChangeText={setMessage} placeholder={t('w2_msg_ph')} multiline numberOfLines={2} />
            <AppText size={11} color={colors.ink2} style={{ textAlign: 'center', marginBottom: 16 }}>
              {t('w2_note')}
            </AppText>
            {submitError && (
              <AppText size={12} color={colors.red} style={{ marginBottom: 10 }}>
                {submitError}
              </AppText>
            )}
            <Button
              title={t('w2_submit')}
              onPress={handleSubmitQuote}
              loading={submitting}
              disabled={!price || !timeSlot.trim()}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
