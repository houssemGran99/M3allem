import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
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
import { listPacks } from '../../api/credits';
import { ApiCreditPack } from '../../api/types';
import { ApiClientError } from '../../api/client';

export default function CreditsScreen() {
  const { colors } = useTheme();
  const { t, lang } = useLanguage();
  const { balance, purchase } = useCredits();

  const [packs, setPacks] = useState<ApiCreditPack[]>([]);
  const [loadingPacks, setLoadingPacks] = useState(true);
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listPacks()
      .then(({ packs: fetched }) => {
        setPacks(fetched);
        setSelectedPack((prev) => prev ?? fetched.find((p) => p.popular)?._id ?? fetched[0]?._id ?? null);
      })
      .finally(() => setLoadingPacks(false));
  }, []);

  const handleRecharge = async () => {
    if (!selectedPack) return;
    setError(null);
    setPurchasing(true);
    try {
      await purchase(selectedPack);
    } catch (e) {
      setError(e instanceof ApiClientError ? e.message : 'Something went wrong');
    } finally {
      setPurchasing(false);
    }
  };

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
          {balance ?? '…'}
        </AppText>
        <AppText size={11} color={colors.ink2}>
          {t('w4_balance_sub')}
        </AppText>
      </Card>

      <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {t('w4_lbl_packs')}
      </AppText>

      {loadingPacks && <ActivityIndicator color={colors.brand} style={{ marginVertical: 20 }} />}

      {!loadingPacks &&
        packs.map((pack) => (
          <TouchableOpacity key={pack._id} activeOpacity={0.85} onPress={() => setSelectedPack(pack._id)}>
            <Card borderColor={selectedPack === pack._id ? colors.brand : colors.line} style={{ marginBottom: 8 }}>
              <Between>
                <Row gap={6}>
                  <AppText weight="semibold" size={13}>
                    {pack.name[lang]}
                  </AppText>
                  {pack.popular && <Pill label={t('w4_popular')} tone="g" />}
                </Row>
                <AppText weight="semibold" size={13}>
                  {pack.price} {t('cur')}
                </AppText>
              </Between>
              <AppText size={11} color={colors.ink2} style={{ marginTop: 3 }}>
                {pack.credits} credits
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

      {error && (
        <AppText size={12} color={colors.red} style={{ marginBottom: 10 }}>
          {error}
        </AppText>
      )}

      <View style={{ marginTop: 4 }}>
        <Button title={t('w4_recharge')} onPress={handleRecharge} loading={purchasing} disabled={!selectedPack} />
      </View>
    </ScreenContainer>
  );
}
