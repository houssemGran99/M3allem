import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '../../components/AppText';
import { Row, Between } from '../../components/Row';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import IconButton from '../../components/IconButton';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import ChecklistRow from '../../components/ChecklistRow';
import Field from '../../components/Field';
import { useTheme } from '../../theme/ThemeContext';
import { workerJobs } from '../../data/mock';
import { WorkerStackParamList } from '../../navigation/types';

const initialChecklist = [
  { id: 'c1', label: 'Isolate water at stopcock', done: true },
  { id: 'c2', label: 'Photograph before state', done: true },
  { id: 'c3', label: 'Replace P-trap seal', done: false },
  { id: 'c4', label: 'Run tap 2 min, check for drips', done: false },
];

export default function ActiveJobScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<WorkerStackParamList>>();
  const route = useRoute<RouteProp<WorkerStackParamList, 'ActiveJob'>>();
  const job = workerJobs.find((j) => j.id === route.params.jobId) ?? workerJobs[0];
  const [checklist, setChecklist] = useState(initialChecklist);

  const toggle = (id: string) =>
    setChecklist((prev) => prev.map((c) => (c.id === id ? { ...c, done: !c.done } : c)));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.page }} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        <Card bg={colors.brand} borderColor={colors.brand} style={{ marginBottom: 14 }}>
          <Between>
            <View>
              <AppText size={11} color="#FFFFFF" style={{ opacity: 0.85 }}>
                In progress · started 2:15pm
              </AppText>
              <AppText weight="bold" size={26} color="#FFFFFF">
                47:12
              </AppText>
            </View>
            <Button title="Pause" size="sm" fullWidth={false} style={{ backgroundColor: 'rgba(255,255,255,0.18)', borderColor: 'transparent' }} onPress={() => {}} />
          </Between>
        </Card>

        <Between style={{ marginBottom: 16 }}>
          <Row gap={9}>
            <Avatar initials={job.clientInitials} tint={job.clientTint} size={34} fontSize={12} />
            <View>
              <AppText weight="semibold" size={13}>
                {job.clientName}
              </AppText>
              <AppText size={11} color={colors.ink2}>
                {job.address}
              </AppText>
            </View>
          </Row>
          <Row gap={6}>
            <IconButton name="phone" size={38} />
            <IconButton name="message-circle" size={38} />
          </Row>
        </Between>

        <AppText weight="semibold" size={15} style={{ marginBottom: 8 }}>
          Job checklist
        </AppText>
        <Card padding={4} style={{ paddingHorizontal: 12, marginBottom: 16 }}>
          {checklist.map((item, i) => (
            <ChecklistRow key={item.id} label={item.label} done={item.done} isLast={i === checklist.length - 1} onPress={() => toggle(item.id)} />
          ))}
        </Card>

        <AppText weight="semibold" size={15} style={{ marginBottom: 8 }}>
          Photos
        </AppText>
        <Row gap={7} style={{ marginBottom: 16 }}>
          <View style={{ flex: 1 }}>
            <ImagePlaceholder height={66} icon="image" />
            <AppText size={11} color={colors.ink2} style={{ marginTop: 3 }}>
              Before
            </AppText>
          </View>
          <View style={{ flex: 1 }}>
            <ImagePlaceholder height={66} icon="image" />
            <AppText size={11} color={colors.ink2} style={{ marginTop: 3 }}>
              Problem
            </AppText>
          </View>
          <View style={{ flex: 1 }}>
            <ImagePlaceholder height={66} dashed icon="camera" />
            <AppText size={11} color={colors.ink2} style={{ marginTop: 3, textAlign: 'center' }}>
              Add
            </AppText>
          </View>
        </Row>

        <AppText weight="semibold" size={15} style={{ marginBottom: 8 }}>
          Add parts used
        </AppText>
        <Row gap={8} style={{ marginBottom: 20 }}>
          <View style={{ flex: 1 }}>
            <Field placeholder="P-trap seal" value="P-trap seal" />
          </View>
          <View style={{ width: 78 }}>
            <Field placeholder="£0.00" value="£0.00" />
          </View>
          <IconButton name="plus" size={42} color={colors.brand} />
        </Row>
      </ScrollView>
      <View style={{ padding: 16, borderTopWidth: 1, borderTopColor: colors.line }}>
        <Button title="Mark job complete" onPress={() => navigation.popToTop()} />
      </View>
    </SafeAreaView>
  );
}
