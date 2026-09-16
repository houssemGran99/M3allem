import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '../../components/AppText';
import { Row, Between } from '../../components/Row';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import IconButton from '../../components/IconButton';
import Timeline from '../../components/Timeline';
import Button from '../../components/Button';
import { useTheme } from '../../theme/ThemeContext';
import { professionals } from '../../data/mock';
import { ClientStackParamList } from '../../navigation/types';

export default function TrackingScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ClientStackParamList>>();
  const route = useRoute<RouteProp<ClientStackParamList, 'Tracking'>>();
  const pro = professionals.find((p) => p.id === route.params.proId) ?? professionals[0];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.sub }} edges={['top', 'bottom']}>
      <View style={{ flex: 1, backgroundColor: colors.sub }}>
        <View
          style={{
            position: 'absolute',
            left: 30,
            right: 40,
            top: 90,
            height: 12,
            backgroundColor: colors.line,
            borderRadius: 6,
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: 60,
            right: 20,
            top: 220,
            height: 8,
            backgroundColor: colors.line,
            borderRadius: 4,
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: 55,
            top: 60,
            width: 14,
            height: 14,
            borderRadius: 7,
            backgroundColor: colors.brand,
            borderWidth: 3,
            borderColor: colors.card,
          }}
        />
        <View
          style={{
            position: 'absolute',
            right: 60,
            top: 210,
            width: 14,
            height: 14,
            borderRadius: 7,
            backgroundColor: colors.red,
            borderWidth: 3,
            borderColor: colors.card,
          }}
        />

        <View style={{ position: 'absolute', left: 16, right: 16, top: 12 }}>
          <Row gap={8}>
            <IconButton name="arrow-left" size={38} bg={colors.card} onPress={() => navigation.popToTop()} />
            <Card style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10 }}>
              <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: colors.brand }} />
              <AppText weight="semibold" size={13}>
                On the way
              </AppText>
              <AppText size={13} color={colors.ink2}>
                · arrives 2:08pm
              </AppText>
            </Card>
          </Row>
        </View>

        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: colors.card,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            padding: 16,
            paddingBottom: 24,
          }}
        >
          <View style={{ width: 34, height: 4, borderRadius: 2, backgroundColor: colors.line, alignSelf: 'center', marginBottom: 12 }} />
          <Row gap={10} style={{ marginBottom: 12 }}>
            <Avatar initials={pro.initials} tint={pro.avatarTint} size={44} fontSize={14} />
            <View style={{ flex: 1 }}>
              <AppText weight="semibold" size={13}>
                {pro.name.split(' ')[0]} is 8 minutes away
              </AppText>
              <AppText size={11} color={colors.ink2}>
                1.4 mi · white Transit, BD21 KXR
              </AppText>
            </View>
            <IconButton name="phone" size={40} bg={colors.brand} borderColor={colors.brand} color="#fff" />
            <IconButton name="message-circle" size={40} />
          </Row>

          <Timeline
            steps={[
              { id: '1', title: 'Booking confirmed', detail: '1:02pm', state: 'done' },
              { id: '2', title: `${pro.name.split(' ')[0]} set off`, detail: '1:52pm', state: 'done' },
              { id: '3', title: 'En route', detail: 'ETA 2:08pm', state: 'now' },
              { id: '4', title: 'Work in progress', state: 'upcoming' },
              { id: '5', title: 'Job complete', state: 'upcoming' },
            ]}
          />

          <View style={{ height: 1, backgroundColor: colors.line, marginVertical: 12 }} />
          <Between style={{ marginBottom: 14 }}>
            <Row gap={6}>
              <Feather name="credit-card" size={13} color={colors.ink2} />
              <AppText size={12} color={colors.ink2}>
                £85 held until complete
              </AppText>
            </Row>
            <AppText weight="semibold" size={12} color={colors.red} onPress={() => navigation.popToTop()}>
              Cancel
            </AppText>
          </Between>
          <Button title="Job complete (simulate)" variant="ghost" onPress={() => navigation.navigate('Review', { proId: pro.id })} />
        </View>
      </View>
    </SafeAreaView>
  );
}
