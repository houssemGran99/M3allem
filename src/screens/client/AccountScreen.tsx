import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ScreenContainer from '../../components/ScreenContainer';
import AppText from '../../components/AppText';
import { Row } from '../../components/Row';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import { useTheme } from '../../theme/ThemeContext';

const menuItems: { icon: React.ComponentProps<typeof Feather>['name']; label: string }[] = [
  { icon: 'map-pin', label: 'Saved addresses' },
  { icon: 'credit-card', label: 'Payment methods' },
  { icon: 'bell', label: 'Notifications' },
  { icon: 'shield', label: 'Privacy & security' },
  { icon: 'help-circle', label: 'Help & support' },
];

export default function AccountScreen() {
  const { colors, setRole } = useTheme();

  return (
    <ScreenContainer>
      <Row gap={12} style={{ marginBottom: 20 }}>
        <Avatar initials="AH" tint="brand" size={56} fontSize={18} />
        <View>
          <AppText weight="semibold" size={16}>
            Alex Hart
          </AppText>
          <AppText size={12} color={colors.ink2}>
            alex.hart@email.com
          </AppText>
        </View>
      </Row>

      <Card style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
        {menuItems.map((item, i) => (
          <Row
            key={item.label}
            gap={10}
            style={{
              padding: 13,
              borderBottomWidth: i === menuItems.length - 1 ? 0 : 1,
              borderBottomColor: colors.line,
            }}
          >
            <Feather name={item.icon} size={16} color={colors.ink2} />
            <AppText size={13} style={{ flex: 1 }}>
              {item.label}
            </AppText>
            <Feather name="chevron-right" size={14} color={colors.ink3} />
          </Row>
        ))}
      </Card>

      <Card bg={colors.brandSoft} borderColor="transparent" style={{ marginBottom: 16 }}>
        <Row gap={9} style={{ marginBottom: 8 }}>
          <Feather name="briefcase" size={16} color={colors.brandInk} />
          <AppText weight="semibold" size={13} color={colors.brandInk}>
            Are you a tradesperson?
          </AppText>
        </Row>
        <AppText size={12} color={colors.brandInk} style={{ opacity: 0.85, marginBottom: 12, lineHeight: 18 }}>
          Switch to the worker app to browse jobs, manage your diary and track earnings.
        </AppText>
        <Button title="Switch to worker app" onPress={() => setRole('worker')} />
      </Card>

      <Button title="Log out" variant="ghost" onPress={() => {}} />
    </ScreenContainer>
  );
}
