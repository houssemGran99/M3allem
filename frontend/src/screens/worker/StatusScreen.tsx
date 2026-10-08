import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import ScreenContainer from '../../components/ScreenContainer';
import AppText from '../../components/AppText';
import { Row } from '../../components/Row';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Timeline from '../../components/Timeline';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { advanceJourney, getJourney } from '../../api/aeJourney';
import { ApiAEStep } from '../../api/types';
import { ApiClientError } from '../../api/client';

export default function StatusScreen() {
  const { colors } = useTheme();
  const { t, lang } = useLanguage();

  const [steps, setSteps] = useState<ApiAEStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [advancing, setAdvancing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    getJourney()
      .then(({ aeJourney }) => setSteps(aeJourney))
      .finally(() => setLoading(false));
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const handleAdvance = async () => {
    setError(null);
    setAdvancing(true);
    try {
      const { aeJourney } = await advanceJourney();
      setSteps(aeJourney);
    } catch (e) {
      setError(e instanceof ApiClientError ? e.message : 'Something went wrong');
    } finally {
      setAdvancing(false);
    }
  };

  if (loading) {
    return (
      <ScreenContainer scroll={false} contentStyle={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator color={colors.brand} size="large" />
      </ScreenContainer>
    );
  }

  const hasInProgress = steps.some((s) => s.state === 'now');

  return (
    <ScreenContainer>
      <AppText weight="bold" size={16} style={{ marginBottom: 12 }}>
        {t('w5_title')}
      </AppText>

      <Card bg={colors.brandSoft} borderColor="transparent" style={{ marginBottom: 20 }}>
        <AppText weight="semibold" size={13} color={colors.brandInk} style={{ marginBottom: 3 }}>
          {t('w5_banner_t')}
        </AppText>
        <AppText size={11} color={colors.brandInk} style={{ opacity: 0.85 }}>
          {t('w5_banner_s')}
        </AppText>
      </Card>

      <Timeline
        steps={steps.map((step) => ({
          id: step.key,
          title: step.title[lang],
          detail: step.sub[lang],
          state: step.state,
        }))}
      />

      <Card soft style={{ marginTop: 20, marginBottom: 20 }}>
        <Row gap={8}>
          <Feather name="user" size={15} color={colors.brand} />
          <AppText size={12} style={{ flex: 1 }}>
            {t('w5_advisor')}
          </AppText>
        </Row>
      </Card>

      {error && (
        <AppText size={12} color={colors.red} style={{ marginBottom: 10 }}>
          {error}
        </AppText>
      )}

      <Button title={t('w5_continue')} onPress={handleAdvance} loading={advancing} disabled={!hasInProgress} />
    </ScreenContainer>
  );
}
