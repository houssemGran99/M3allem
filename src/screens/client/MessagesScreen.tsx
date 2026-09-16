import React from 'react';
import { View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import AppText from '../../components/AppText';
import { Row } from '../../components/Row';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import { useTheme } from '../../theme/ThemeContext';
import { professionals } from '../../data/mock';

const previews = [
  'Sounds good, see you at 2pm',
  'Boiler service booked in for Thursday',
  "I'll bring the part with me",
];

export default function MessagesScreen() {
  const { colors } = useTheme();

  return (
    <ScreenContainer>
      <AppText weight="bold" size={20} style={{ marginBottom: 16 }}>
        Messages
      </AppText>
      {professionals.map((p, i) => (
        <Card key={p.id} style={{ marginBottom: 9 }}>
          <Row gap={10}>
            <Avatar initials={p.initials} tint={p.avatarTint} size={40} fontSize={13} />
            <View style={{ flex: 1 }}>
              <AppText weight="semibold" size={13}>
                {p.name}
              </AppText>
              <AppText size={12} color={colors.ink2} numberOfLines={1}>
                {previews[i % previews.length]}
              </AppText>
            </View>
            <AppText size={11} color={colors.ink3}>
              {i === 0 ? 'now' : `${i}d`}
            </AppText>
          </Row>
        </Card>
      ))}
    </ScreenContainer>
  );
}
