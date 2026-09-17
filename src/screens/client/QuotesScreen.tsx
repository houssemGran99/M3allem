import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../components/ScreenContainer';
import AppText from '../../components/AppText';
import { Row, Between } from '../../components/Row';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import Chip from '../../components/Chip';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { quotes } from '../../data/mock';
import { ClientStackParamList } from '../../navigation/types';

export default function QuotesScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<ClientStackParamList>>();

  return (
    <ScreenContainer>
      <AppText weight="semibold" size={17}>
        {t('c3_title')}
      </AppText>
      <AppText size={11} color={colors.ink2} style={{ marginTop: 2, marginBottom: 10 }}>
        {t('c3_sub')}
      </AppText>
      <Row gap={6} style={{ marginBottom: 12 }}>
        <Chip label={t('c3_sort')} active />
      </Row>

      {quotes.map((quote, index) => (
        <TouchableOpacity
          key={quote.id}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('ArtisanProfile', { artisanId: quote.artisanId })}
        >
          <Card borderColor={quote.highlighted ? colors.brand : colors.line} style={{ marginBottom: 9 }}>
            <Row gap={10} style={{ alignItems: 'flex-start' }}>
              <Avatar initials={quote.initials} tint={quote.avatarTint} size={44} fontSize={14} />
              <View style={{ flex: 1 }}>
                <Between>
                  <AppText weight="semibold" size={13}>
                    {quote.artisanName}
                  </AppText>
                  <AppText weight="semibold" size={13}>
                    {quote.price} {t('cur')}
                  </AppText>
                </Between>
                <Row gap={6} style={{ marginTop: 2 }}>
                  <AppText weight="bold" size={11} color={colors.amber}>
                    {quote.rating.toFixed(1)} ★
                  </AppText>
                  <AppText size={11} color={colors.ink2}>
                    · {quote.distanceKm} km
                  </AppText>
                </Row>
                {quote.noteKey && (
                  <AppText size={11} color={colors.ink2} style={{ marginTop: 5 }}>
                    {t(quote.noteKey)}
                  </AppText>
                )}
              </View>
            </Row>
            {index < 2 && (
              <>
                <View style={{ height: 1, backgroundColor: colors.line, marginVertical: 10 }} />
                <Between>
                  <Row gap={5}>
                    <Feather name="clock" size={13} color={quote.highlighted ? colors.brand : colors.ink2} />
                    <AppText size={12} weight={quote.highlighted ? 'bold' : 'regular'} color={quote.highlighted ? colors.brand : colors.ink2}>
                      {t(quote.timeKey)}
                    </AppText>
                  </Row>
                  <Button
                    title={t('c3_chat')}
                    size="sm"
                    fullWidth={false}
                    variant={quote.highlighted ? 'primary' : 'ghost'}
                    onPress={() => navigation.navigate('ArtisanProfile', { artisanId: quote.artisanId })}
                  />
                </Between>
              </>
            )}
          </Card>
        </TouchableOpacity>
      ))}
    </ScreenContainer>
  );
}
