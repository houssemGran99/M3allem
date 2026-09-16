import React, { useState } from 'react';
import { Switch, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../components/ScreenContainer';
import AppText from '../../components/AppText';
import { Row, Between } from '../../components/Row';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import Chip from '../../components/Chip';
import Pill, { PillTone } from '../../components/Pill';
import { useTheme } from '../../theme/ThemeContext';
import { workerJobs } from '../../data/mock';
import { WorkerStackParamList } from '../../navigation/types';

const chips = ['All', 'Plumbing', 'Emergency', 'Recurring'];
const statusTone: Record<string, PillTone> = { urgent: 'a', recurring: 'g', scheduled: 'b' };
const statusLabel: Record<string, string> = { urgent: 'Urgent · today', recurring: 'Recurring · weekly', scheduled: 'Scheduled' };

export default function JobFeedScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<WorkerStackParamList>>();
  const [online, setOnline] = useState(true);
  const [activeChip, setActiveChip] = useState('All');

  return (
    <ScreenContainer>
      <Between style={{ marginBottom: 14 }}>
        <View>
          <AppText weight="bold" size={17}>
            Jobs near you
          </AppText>
          <AppText size={11} color={colors.ink2}>
            12 open within 10 miles
          </AppText>
        </View>
        <Row gap={6}>
          <AppText weight="semibold" size={11} color={online ? colors.brand : colors.ink3}>
            {online ? 'Online' : 'Offline'}
          </AppText>
          <Switch
            value={online}
            onValueChange={setOnline}
            trackColor={{ true: colors.brand, false: colors.line }}
            thumbColor="#fff"
          />
        </Row>
      </Between>

      <Row gap={6} style={{ marginBottom: 14 }}>
        {chips.map((c) => (
          <Chip key={c} label={c} active={activeChip === c} onPress={() => setActiveChip(c)} />
        ))}
      </Row>

      {workerJobs.map((job) => (
        <TouchableOpacity key={job.id} activeOpacity={0.85} onPress={() => navigation.navigate('JobDetail', { jobId: job.id })}>
          <Card borderColor={job.status === 'urgent' ? colors.amber : colors.line} style={{ marginBottom: 9 }}>
            <Between style={{ marginBottom: 7 }}>
              <Pill label={statusLabel[job.status]} tone={statusTone[job.status]} />
              <Row gap={3}>
                <AppText weight="bold" size={16}>
                  £{job.payout.toFixed(0)}
                </AppText>
                <AppText size={11} color={colors.ink2}>
                  to you
                </AppText>
              </Row>
            </Between>
            <AppText weight="semibold" size={13}>
              {job.title}
            </AppText>
            <Row gap={6} style={{ marginTop: 3 }}>
              <AppText size={11} color={colors.ink2}>
                {job.area} · {job.distanceMiles} mi · {job.duration}
              </AppText>
            </Row>
            <View style={{ height: 1, backgroundColor: colors.line, marginVertical: 10 }} />
            <Between>
              <Row gap={7}>
                <Avatar initials={job.clientInitials} tint={job.clientTint} size={26} fontSize={10} />
                <AppText size={11} color={colors.ink2}>
                  {job.clientName} · {job.clientRating}★
                </AppText>
              </Row>
              <Row gap={7}>
                <Button title="View" size="sm" fullWidth={false} variant="ghost" onPress={() => navigation.navigate('JobDetail', { jobId: job.id })} />
                <Button title="Accept" size="sm" fullWidth={false} onPress={() => navigation.navigate('ActiveJob', { jobId: job.id })} />
              </Row>
            </Between>
          </Card>
        </TouchableOpacity>
      ))}
    </ScreenContainer>
  );
}
