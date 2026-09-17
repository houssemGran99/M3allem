import React from 'react';
import { Feather } from '@expo/vector-icons';
import ScreenContainer from '../../components/ScreenContainer';
import AppText from '../../components/AppText';
import { Row } from '../../components/Row';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Timeline from '../../components/Timeline';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { aeJourney } from '../../data/mock';

export default function StatusScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();

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
        steps={aeJourney.map((step) => ({
          id: step.id,
          title: t(step.titleKey),
          detail: t(step.subKey),
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

      <Button title={t('w5_continue')} onPress={() => {}} />
    </ScreenContainer>
  );
}
