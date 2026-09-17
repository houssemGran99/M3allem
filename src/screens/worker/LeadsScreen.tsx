import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../components/ScreenContainer';
import AppText from '../../components/AppText';
import { Row, Between } from '../../components/Row';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Chip from '../../components/Chip';
import Pill, { PillTone } from '../../components/Pill';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useCredits } from '../../state/CreditsContext';
import { useWorkerData } from '../../state/WorkerDataContext';
import { WorkerStackParamList } from '../../navigation/types';
import { LeadStatus } from '../../types';

const statusTone: Record<LeadStatus, PillTone> = { urgent: 'a', recurring: 'g', new: 'b' };
const statusLabelKey: Record<LeadStatus, 'w1_urgent_pill' | 'w1_recur_pill' | 'w1_new_pill'> = {
  urgent: 'w1_urgent_pill',
  recurring: 'w1_recur_pill',
  new: 'w1_new_pill',
};

export default function LeadsScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { balance } = useCredits();
  const { leads } = useWorkerData();
  const navigation = useNavigation<NativeStackNavigationProp<WorkerStackParamList>>();
  const [activeChip, setActiveChip] = useState('all');
  const unlockedCount = leads.filter((l) => !l.unlocked).length;

  return (
    <ScreenContainer>
      <Between style={{ marginBottom: 14 }}>
        <View>
          <AppText weight="bold" size={16}>
            {t('w1_title')}
          </AppText>
          <AppText size={11} color={colors.ink2}>
            {unlockedCount} {t('w1_sub')}
          </AppText>
        </View>
        <Chip label={`${balance}`} active icon={<Feather name="circle" size={11} color="#fff" />} />
      </Between>

      <Row gap={6} style={{ marginBottom: 14 }}>
        <Chip label={t('common_all')} active={activeChip === 'all'} onPress={() => setActiveChip('all')} />
        <Chip label={t('cat_plumb')} active={activeChip === 'plumb'} onPress={() => setActiveChip('plumb')} />
        <Chip label={t('w1_urgent')} active={activeChip === 'urgent'} onPress={() => setActiveChip('urgent')} />
      </Row>

      {leads.map((lead) => (
        <TouchableOpacity key={lead.id} activeOpacity={0.85} onPress={() => navigation.navigate('LeadDetail', { leadId: lead.id })}>
          <Card borderColor={lead.status === 'urgent' ? colors.amber : colors.line} style={{ marginBottom: 9 }}>
            <Between style={{ marginBottom: 7 }}>
              <Pill label={t(statusLabelKey[lead.status])} tone={statusTone[lead.status]} />
              <AppText size={11} color={colors.ink2}>
                {t(lead.postedKey)}
              </AppText>
            </Between>
            <AppText weight="semibold" size={13}>
              {t(lead.titleKey)}
            </AppText>
            <Row gap={6} style={{ marginTop: 3 }}>
              <Feather name="map-pin" size={11} color={colors.ink2} />
              <AppText size={11} color={colors.ink2}>
                {lead.area} · {lead.distanceKm} km
              </AppText>
            </Row>
            {lead.budgetKey && (
              <AppText size={11} color={colors.ink2} style={{ marginTop: 4 }}>
                {t(lead.budgetKey)}
              </AppText>
            )}
            <View style={{ height: 1, backgroundColor: colors.line, marginVertical: 10 }} />
            <Button
              title={lead.unlocked ? t('w2_unlocked') : `${t('w1_unlock')}`}
              size="sm"
              variant={lead.status === 'urgent' ? 'primary' : 'ghost'}
              onPress={() => navigation.navigate('LeadDetail', { leadId: lead.id })}
            />
          </Card>
        </TouchableOpacity>
      ))}
    </ScreenContainer>
  );
}
