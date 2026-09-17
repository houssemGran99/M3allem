import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ScreenContainer from '../../components/ScreenContainer';
import AppText from '../../components/AppText';
import { Row } from '../../components/Row';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';

const menuItems: { icon: React.ComponentProps<typeof Feather>['name']; labelFr: string }[] = [
  { icon: 'map-pin', labelFr: 'Adresses enregistrées' },
  { icon: 'bell', labelFr: 'Notifications' },
  { icon: 'shield', labelFr: 'Confidentialité et sécurité' },
  { icon: 'help-circle', labelFr: 'Aide et support' },
];

export default function AccountScreen() {
  const { colors, radii, setRole } = useTheme();
  const { t, lang, setLang, isRTL } = useLanguage();

  return (
    <ScreenContainer>
      <Row gap={12} style={{ marginBottom: 20 }}>
        <Avatar initials="AH" tint="brand" size={56} fontSize={18} />
        <View>
          <AppText weight="semibold" size={16}>
            Amira Haddad
          </AppText>
          <AppText size={12} color={colors.ink2}>
            amira.haddad@email.com
          </AppText>
        </View>
      </Row>

      <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {t('common_language')}
      </AppText>
      <Row
        gap={4}
        style={{
          backgroundColor: colors.sub,
          borderWidth: 1,
          borderColor: colors.line,
          borderRadius: radii.pill,
          padding: 4,
          marginBottom: 20,
          alignSelf: isRTL ? 'flex-end' : 'flex-start',
        }}
      >
        {(['fr', 'ar'] as const).map((code) => (
          <TouchableOpacity key={code} onPress={() => setLang(code)}>
            <View
              style={{
                paddingHorizontal: 18,
                paddingVertical: 8,
                borderRadius: radii.pill,
                backgroundColor: lang === code ? colors.card : 'transparent',
              }}
            >
              <AppText weight="medium" size={14} color={lang === code ? colors.ink : colors.ink2}>
                {code === 'fr' ? 'Français' : 'العربية'}
              </AppText>
            </View>
          </TouchableOpacity>
        ))}
      </Row>

      <Card style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
        {menuItems.map((item, i) => (
          <Row
            key={item.labelFr}
            gap={10}
            style={{
              padding: 13,
              borderBottomWidth: i === menuItems.length - 1 ? 0 : 1,
              borderBottomColor: colors.line,
            }}
          >
            <Feather name={item.icon} size={16} color={colors.ink2} />
            <AppText size={13} style={{ flex: 1 }}>
              {item.labelFr}
            </AppText>
            <Feather name={isRTL ? 'chevron-left' : 'chevron-right'} size={14} color={colors.ink3} />
          </Row>
        ))}
      </Card>

      <Card bg={colors.brandSoft} borderColor="transparent" style={{ marginBottom: 16 }}>
        <Row gap={9} style={{ marginBottom: 8 }}>
          <Feather name="briefcase" size={16} color={colors.brandInk} />
          <AppText weight="semibold" size={13} color={colors.brandInk}>
            {t('account_switch_worker_t')}
          </AppText>
        </Row>
        <AppText size={12} color={colors.brandInk} style={{ opacity: 0.85, marginBottom: 12, lineHeight: 18 }}>
          {t('account_switch_worker_s')}
        </AppText>
        <Button title={t('account_switch_worker_btn')} onPress={() => setRole('worker')} />
      </Card>

      <Button title={t('common_logout')} variant="ghost" onPress={() => {}} />
    </ScreenContainer>
  );
}
