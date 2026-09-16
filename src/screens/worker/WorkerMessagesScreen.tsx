import React from 'react';
import { View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import AppText from '../../components/AppText';
import { Row } from '../../components/Row';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import { useTheme } from '../../theme/ThemeContext';
import { workerJobs } from '../../data/mock';

const previews = ['Great, see you then', 'Is the part still £0?', 'Thanks for the quick fix!'];

export default function WorkerMessagesScreen() {
  const { colors } = useTheme();

  return (
    <ScreenContainer>
      <AppText weight="bold" size={20} style={{ marginBottom: 16 }}>
        Messages
      </AppText>
      {workerJobs.map((job, i) => (
        <Card key={job.id} style={{ marginBottom: 9 }}>
          <Row gap={10}>
            <Avatar initials={job.clientInitials} tint={job.clientTint} size={40} fontSize={13} />
            <View style={{ flex: 1 }}>
              <AppText weight="semibold" size={13}>
                {job.clientName}
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
