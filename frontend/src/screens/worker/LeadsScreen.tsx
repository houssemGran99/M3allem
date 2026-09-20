import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../components/ScreenContainer';
import AppText from '../../components/AppText';
import { Row, Between } from '../../components/Row';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Chip from '../../components/Chip';
import Pill from '../../components/Pill';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useCredits } from '../../state/CreditsContext';
import { useWorkerData } from '../../state/WorkerDataContext';
import { timeAgo } from '../../utils/timeAgo';
import { WorkerStackParamList } from '../../navigation/types';

const tintMap = { blue: 'blueSoft', amber: 'amberSoft', brand: 'brandSoft', sub: 'sub' } as const;
const fgMap = { blue: 'blue', amber: 'amber', brand: 'brand', sub: 'ink2' } as const;

export default function LeadsScreen() {
  const { colors } = useTheme();
  const { t, lang } = useLanguage();
  const { balance } = useCredits();
  const { leads, leadsLoading, refreshLeads } = useWorkerData();
  const navigation = useNavigation<NativeStackNavigationProp<WorkerStackParamList>>();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      refreshLeads();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  const categoryChips = useMemo(() => {
    const seen = new Map<string, string>();
    leads.forEach((l) => seen.set(l.category._id, l.category.name[lang]));
    return Array.from(seen.entries());
  }, [leads, lang]);

  const visibleLeads = activeCategory ? leads.filter((l) => l.category._id === activeCategory) : leads;
  const unlockedRemaining = leads.filter((l) => !l.unlocked).length;

  return (
    <ScreenContainer>
      <Between style={{ marginBottom: 14 }}>
        <View>
          <AppText weight="bold" size={16}>
            {t('w1_title')}
          </AppText>
          <AppText size={11} color={colors.ink2}>
            {unlockedRemaining} {t('w1_sub')}
          </AppText>
        </View>
        <Chip label={balance === null ? '…' : `${balance}`} active icon={<Feather name="circle" size={11} color="#fff" />} />
      </Between>

      {categoryChips.length > 0 && (
        <Row gap={6} style={{ marginBottom: 14, flexWrap: 'wrap' }}>
          <Chip label={t('common_all')} active={activeCategory === null} onPress={() => setActiveCategory(null)} />
          {categoryChips.map(([id, name]) => (
            <Chip key={id} label={name} active={activeCategory === id} onPress={() => setActiveCategory(id)} />
          ))}
        </Row>
      )}

      {leadsLoading && <ActivityIndicator color={colors.brand} style={{ marginVertical: 20 }} />}

      {!leadsLoading &&
        visibleLeads.map((lead) => (
          <TouchableOpacity
            key={lead._id}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('LeadDetail', { leadId: lead._id })}
          >
            <Card style={{ marginBottom: 9 }}>
              <Between style={{ marginBottom: 7 }}>
                <Pill
                  label={lead.category.name[lang]}
                  tone={lead.category.tint === 'amber' ? 'a' : lead.category.tint === 'blue' ? 'b' : 'g'}
                />
                <AppText size={11} color={colors.ink2}>
                  {timeAgo(lead.createdAt, lang)}
                </AppText>
              </Between>
              <Row gap={6} style={{ marginBottom: 3 }}>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 7,
                    backgroundColor: colors[tintMap[lead.category.tint]],
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Feather name={lead.category.icon as any} size={11} color={colors[fgMap[lead.category.tint]]} />
                </View>
                <AppText weight="semibold" size={13}>
                  {lead.unlocked && lead.description ? lead.description.slice(0, 40) : lead.category.name[lang]}
                </AppText>
              </Row>
              <Row gap={6} style={{ marginTop: 3 }}>
                <Feather name="map-pin" size={11} color={colors.ink2} />
                <AppText size={11} color={colors.ink2}>
                  {lead.city}
                </AppText>
              </Row>
              {(lead.budgetMin || lead.budgetMax) && (
                <AppText size={11} color={colors.ink2} style={{ marginTop: 4 }}>
                  {lead.budgetMin}–{lead.budgetMax} {t('cur')}
                </AppText>
              )}
              <View style={{ height: 1, backgroundColor: colors.line, marginVertical: 10 }} />
              <Button
                title={lead.unlocked ? t('w2_unlocked') : t('w1_unlock')}
                size="sm"
                variant={lead.unlocked ? 'ghost' : 'primary'}
                onPress={() => navigation.navigate('LeadDetail', { leadId: lead._id })}
              />
            </Card>
          </TouchableOpacity>
        ))}

      {!leadsLoading && visibleLeads.length === 0 && (
        <Card soft style={{ alignItems: 'center', padding: 24 }}>
          <AppText size={12} color={colors.ink2} style={{ textAlign: 'center' }}>
            —
          </AppText>
        </Card>
      )}
    </ScreenContainer>
  );
}
