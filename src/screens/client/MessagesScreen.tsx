import React from 'react';
import { View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import AppText from '../../components/AppText';
import { Row } from '../../components/Row';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { quotes } from '../../data/mock';

export default function MessagesScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <ScreenContainer>
      <AppText weight="bold" size={20} style={{ marginBottom: 16 }}>
        {t('nav_msg')}
      </AppText>
      {quotes.map((quote) => (
        <Card key={quote.id} style={{ marginBottom: 9 }}>
          <Row gap={10}>
            <Avatar initials={quote.initials} tint={quote.avatarTint} size={40} fontSize={13} />
            <View style={{ flex: 1 }}>
              <AppText weight="semibold" size={13}>
                {quote.artisanName}
              </AppText>
              {quote.noteKey && (
                <AppText size={12} color={colors.ink2} numberOfLines={1}>
                  {t(quote.noteKey)}
                </AppText>
              )}
            </View>
          </Row>
        </Card>
      ))}
    </ScreenContainer>
  );
}
