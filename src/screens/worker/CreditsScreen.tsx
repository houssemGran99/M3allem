import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
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
import { creditPacks } from '../../data/mock';

export default function CreditsScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { balance, addCredits } = useCredits();
  const [selectedPack, setSelectedPack] = useState('pack2');

  return (
    <ScreenContainer>
      <AppText weight="bold" size={16} style={{ marginBottom: 12 }}>
        {t('w4_title')}
      </AppText>

      <Card style={{ alignItems: 'center', padding: 16, marginBottom: 16 }}>
        <AppText size={11} color={colors.ink2}>
          {t('w4_balance_lbl')}
        </AppText>
        <AppText weight="bold" size={32} style={{ marginVertical: 2 }}>
          {balance}
        </AppText>
        <AppText size={11} color={colors.ink2}>
          {t('w4_balance_sub')}
        </AppText>
      </Card>

      <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {t('w4_lbl_packs')}
      </AppText>
      {creditPacks.map((pack) => (
        <TouchableOpacity key={pack.id} activeOpacity={0.85} onPress={() => setSelectedPack(pack.id)}>
          <Card borderColor={selectedPack === pack.id ? colors.brand : colors.line} style={{ marginBottom: 8 }}>
            <Between>
              <Row gap={6}>
                <AppText weight="semibold" size={13}>
                  {t(pack.nameKey)}
                </AppText>
                {pack.popular && <Pill label={t('w4_popular')} tone="g" />}
              </Row>
              <AppText weight="semibold" size={13}>
                {pack.price} {t('cur')}
              </AppText>
            </Between>
            <AppText size={11} color={colors.ink2} style={{ marginTop: 3 }}>
              {t(pack.subKey)}
            </AppText>
          </Card>
        </TouchableOpacity>
      ))}

      <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginTop: 6, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {t('w4_lbl_pay')}
      </AppText>
      <Row gap={6} style={{ marginBottom: 16 }}>
        <Chip label="Flouci" />
        <Chip label="D17" />
        <Chip label={t('w4_post')} />
      </Row>

      <Card bg={colors.brandSoft} borderColor="transparent" style={{ marginBottom: 20 }}>
        <Row gap={8}>
          <AppText size={11} color={colors.brandInk} style={{ flex: 1 }}>
            {t('w4_referral')}
          </AppText>
        </Row>
      </Card>

      <View style={{ marginTop: 4 }}>
        <Button
          title={t('w4_recharge')}
          onPress={() => {
            const pack = creditPacks.find((p) => p.id === selectedPack);
            if (pack) addCredits(pack.credits);
          }}
        />
      </View>
    </ScreenContainer>
  );
}
