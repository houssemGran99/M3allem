import React from 'react';
import { ScrollView, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../../components/AppBar';
import AppText from '../../components/AppText';
import { Row, Between } from '../../components/Row';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import IconButton from '../../components/IconButton';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import { useTheme } from '../../theme/ThemeContext';
import { workerJobs } from '../../data/mock';
import { WorkerStackParamList } from '../../navigation/types';

export default function JobDetailScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<WorkerStackParamList>>();
  const route = useRoute<RouteProp<WorkerStackParamList, 'JobDetail'>>();
  const job = workerJobs.find((j) => j.id === route.params.jobId) ?? workerJobs[0];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.page }} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        <AppBar title="Job details" tag={job.status === 'urgent' ? 'Urgent' : undefined} tagTone="a" />

        <Card soft style={{ alignItems: 'center', padding: 14, marginBottom: 12 }}>
          <AppText size={11} color={colors.ink2}>
            You'll be paid
          </AppText>
          <AppText weight="bold" size={26}>
            £{job.payout.toFixed(2)}
          </AppText>
          <AppText size={11} color={colors.ink2}>
            £{job.jobTotal} job · {job.feePct}% Trady fee · paid within 24h
          </AppText>
        </Card>

        <AppText weight="semibold" size={13} style={{ marginBottom: 3 }}>
          {job.title}
        </AppText>
        <AppText size={12} color={colors.ink2} style={{ marginBottom: 10, lineHeight: 18 }}>
          {job.description}
        </AppText>
        <Row gap={6} style={{ marginBottom: 14 }}>
          <ImagePlaceholder width={64} height={64} icon="image" />
          <ImagePlaceholder width={64} height={64} icon="image" />
        </Row>

        <Card style={{ marginBottom: 10 }}>
          <Row gap={10}>
            <Avatar initials={job.clientInitials} tint={job.clientTint} size={36} fontSize={12} />
            <View style={{ flex: 1 }}>
              <AppText weight="semibold" size={13}>
                {job.clientName}
              </AppText>
              <AppText size={11} color={colors.ink2}>
                {job.clientRating}★ · {job.jobsBooked ?? 1} jobs booked · pays on time
              </AppText>
            </View>
          </Row>
        </Card>

        <Card style={{ marginBottom: 10 }}>
          <Between>
            <View>
              <AppText size={11} color={colors.ink2}>
                Address
              </AppText>
              <AppText weight="semibold" size={13}>
                {job.address}
              </AppText>
              <AppText size={11} color={colors.ink2}>
                Parking: {job.parking}
              </AppText>
            </View>
            <IconButton name="navigation" size={38} color={colors.brand} borderColor={colors.brand} />
          </Between>
        </Card>

        <Row gap={8} style={{ marginBottom: 14 }}>
          <Card soft padding={10} style={{ flex: 1 }}>
            <AppText size={11} color={colors.ink2}>
              Arrive
            </AppText>
            <AppText weight="semibold" size={13}>
              {job.arrival}
            </AppText>
          </Card>
          <Card soft padding={10} style={{ flex: 1 }}>
            <AppText size={11} color={colors.ink2}>
              Est. duration
            </AppText>
            <AppText weight="semibold" size={13}>
              {job.duration}
            </AppText>
          </Card>
        </Row>

        <Row gap={8}>
          <Button title="Ask a question" variant="ghost" style={{ flex: 1 }} onPress={() => {}} />
          <Button title="Accept job" style={{ flex: 1.3 }} onPress={() => navigation.navigate('ActiveJob', { jobId: job.id })} />
        </Row>
        <AppText size={11} color={colors.ink2} style={{ textAlign: 'center', marginTop: 8 }}>
          Declining won't affect your ranking
        </AppText>
      </ScrollView>
    </SafeAreaView>
  );
}
