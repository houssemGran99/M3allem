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
import Pill from '../../components/Pill';
import { useTheme } from '../../theme/ThemeContext';
import { bookedJob, professionals } from '../../data/mock';
import { ClientStackParamList } from '../../navigation/types';

export default function BookingsScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ClientStackParamList>>();
  const pro = professionals[0];

  return (
    <ScreenContainer>
      <AppText weight="bold" size={20} style={{ marginBottom: 16 }}>
        Bookings
      </AppText>

      <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        Upcoming
      </AppText>
      <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('Tracking', { proId: pro.id })}>
        <Card style={{ marginBottom: 20 }}>
          <Between style={{ marginBottom: 8 }}>
            <Pill label="In progress" tone="g" />
            <AppText weight="semibold" size={13}>
              £{bookedJob.price}
            </AppText>
          </Between>
          <AppText weight="semibold" size={13}>
            {bookedJob.title}
          </AppText>
          <Row gap={10} style={{ marginTop: 8 }}>
            <Avatar initials={pro.initials} tint={pro.avatarTint} size={30} fontSize={11} />
            <AppText size={12} color={colors.ink2}>
              {pro.name} · {bookedJob.date}, {bookedJob.arrivalWindow}
            </AppText>
          </Row>
        </Card>
      </TouchableOpacity>

      <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        Past
      </AppText>
      {professionals.slice(1).map((p) => (
        <Card key={p.id} style={{ marginBottom: 9 }}>
          <Row gap={10}>
            <Avatar initials={p.initials} tint={p.avatarTint} size={34} fontSize={12} />
            <View style={{ flex: 1 }}>
              <AppText weight="semibold" size={13}>
                {p.trade}
              </AppText>
              <AppText size={11} color={colors.ink2}>
                {p.name} · completed
              </AppText>
            </View>
            <Feather name="chevron-right" size={14} color={colors.ink3} />
          </Row>
        </Card>
      ))}
    </ScreenContainer>
  );
}
