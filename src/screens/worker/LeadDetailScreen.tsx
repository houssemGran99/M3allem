import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
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
import Field from '../../components/Field';
import Pill from '../../components/Pill';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useCredits } from '../../state/CreditsContext';
import { useWorkerData } from '../../state/WorkerDataContext';
import { workerLeads } from '../../data/mock';
import { WorkerStackParamList } from '../../navigation/types';

export default function LeadDetailScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { balance, spendCredit } = useCredits();
  const { leads, unlockLead, submitQuote } = useWorkerData();
  const navigation = useNavigation<NativeStackNavigationProp<WorkerStackParamList>>();
  const route = useRoute<RouteProp<WorkerStackParamList, 'LeadDetail'>>();
  const lead = leads.find((l) => l.id === route.params.leadId) ?? workerLeads[0];
  const [sent, setSent] = useState(false);

  const handleUnlock = () => {
    spendCredit(lead.unlockCost);
    unlockLead(lead.id);
  };

  const handleSubmitQuote = () => {
    submitQuote({
      id: `mq-${Date.now()}`,
      titleKey: lead.titleKey,
      clientName: 'Sarra M.',
      price: 35,
      status: 'pending',
      sentKey: 'w3_sent1',
    });
    setSent(true);
  };

  if (!lead.unlocked) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.page }} edges={['top']}>
        <View style={{ padding: 16, flex: 1 }}>
          <AppBar title={t(lead.titleKey)} />
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
            <Button title={`${t('w1_unlock')} (${balance} ${t('wnav_credits')})`} onPress={handleUnlock} disabled={balance < lead.unlockCost} />
          </Card>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.page }} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        <AppBar title={t('w2_title')} tag={t('w2_unlocked')} tagTone="g" />

        <Card style={{ marginBottom: 12 }}>
          <Row gap={10}>
            <Avatar initials="SM" tint="ochre" size={36} fontSize={12} />
            <View style={{ flex: 1 }}>
              <AppText weight="semibold" size={13}>
                Sarra M.
              </AppText>
              <AppText size={11} color={colors.ink2}>
                {t('w2_client_meta')}
              </AppText>
            </View>
          </Row>
        </Card>

        <AppText weight="semibold" size={13} style={{ marginBottom: 3 }}>
          {t(lead.titleKey)}
        </AppText>
        <AppText size={12} color={colors.ink2} style={{ marginBottom: 10, lineHeight: 18 }}>
          {t('w2_desc')}
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
                {t('c1_loc')}
              </AppText>
              <AppText size={11} color={colors.ink2}>
                {t('c2_addr_sub')}
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
              <Button title={t('wnav_quotes')} variant="ghost" onPress={() => navigation.navigate('WorkerTabs', { screen: 'MyQuotes' } as never)} />
            </View>
          </Card>
        ) : (
          <>
            <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {t('w2_lbl_quote')}
            </AppText>
            <Row gap={8} style={{ marginBottom: 8 }}>
              <View style={{ flex: 1 }}>
                <Field placeholder={t('w2_price_ph')} />
              </View>
              <View style={{ flex: 1 }}>
                <Field placeholder={t('w2_time_ph')} />
              </View>
            </Row>
            <View style={{ marginBottom: 6 }}>
              <Field placeholder={t('w2_msg_ph')} multiline />
            </View>
            <AppText size={11} color={colors.ink2} style={{ textAlign: 'center', marginBottom: 16 }}>
              {t('w2_note')}
            </AppText>
            <Button title={t('w2_submit')} onPress={handleSubmitQuote} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
