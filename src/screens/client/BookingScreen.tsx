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
import Pill from '../../components/Pill';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import { useTheme } from '../../theme/ThemeContext';
import { bookedJob, professionals } from '../../data/mock';
import { ClientStackParamList } from '../../navigation/types';

export default function BookingScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ClientStackParamList>>();
  const route = useRoute<RouteProp<ClientStackParamList, 'Booking'>>();
  const pro = professionals.find((p) => p.id === route.params.proId) ?? professionals[0];
  const job = bookedJob;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.page }} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        <AppBar title="Confirm booking" />
          <Row gap={4} style={{ marginBottom: 16 }}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={{ flex: 1, height: 3, borderRadius: 2, backgroundColor: colors.brand }} />
            ))}
          </Row>

          <Card style={{ marginBottom: 12 }}>
            <Row gap={10}>
              <Avatar initials={pro.initials} tint={pro.avatarTint} size={38} fontSize={13} />
              <View style={{ flex: 1 }}>
                <AppText weight="semibold" size={13}>
                  {pro.name}
                </AppText>
                <AppText size={11} color={colors.ink2}>
                  {pro.trade} · {pro.rating.toFixed(1)}★
                </AppText>
              </View>
              <Pill label="Confirmed" tone="g" />
            </Row>
          </Card>

          <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Job
          </AppText>
          <Card soft style={{ marginBottom: 12 }}>
            <AppText weight="semibold" size={13} style={{ marginBottom: 3 }}>
              {job.title}
            </AppText>
            <AppText size={12} color={colors.ink2} style={{ lineHeight: 18 }}>
              {job.description}
            </AppText>
            <Row gap={6} style={{ marginTop: 9 }}>
              <ImagePlaceholder width={44} height={44} icon="image" />
              <ImagePlaceholder width={44} height={44} icon="image" />
            </Row>
          </Card>

          <Row gap={8} style={{ marginBottom: 12 }}>
            <Card soft padding={10} style={{ flex: 1 }}>
              <AppText size={11} color={colors.ink2}>
                Date
              </AppText>
              <AppText weight="semibold" size={13}>
                {job.date}
              </AppText>
            </Card>
            <Card soft padding={10} style={{ flex: 1 }}>
              <AppText size={11} color={colors.ink2}>
                Arrival
              </AppText>
              <AppText weight="semibold" size={13}>
                {job.arrivalWindow}
              </AppText>
            </Card>
          </Row>

          <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Price
          </AppText>
          <Card style={{ marginBottom: 12 }}>
            <Between style={{ paddingVertical: 4 }}>
              <AppText size={12.5} color={colors.ink2}>
                Call-out & first hour
              </AppText>
              <AppText size={12.5} weight="semibold">
                £{job.price.toFixed(2)}
              </AppText>
            </Between>
            <Between style={{ paddingVertical: 4 }}>
              <AppText size={12.5} color={colors.ink2}>
                Booking fee
              </AppText>
              <AppText size={12.5} weight="semibold" color={colors.brand}>
                £{job.bookingFee.toFixed(2)}
              </AppText>
            </Between>
            <Between style={{ paddingVertical: 4 }}>
              <AppText size={12.5} color={colors.ink2}>
                Parts (if needed)
              </AppText>
              <AppText size={12.5} color={colors.ink2}>
                Quoted on site
              </AppText>
            </Between>
            <View style={{ height: 1, backgroundColor: colors.line, marginVertical: 8 }} />
            <Between>
              <AppText weight="semibold" size={14}>
                Total today
              </AppText>
              <AppText weight="bold" size={19}>
                £{job.price.toFixed(2)}
              </AppText>
            </Between>
            <Row gap={6} style={{ marginTop: 9, padding: 8, backgroundColor: colors.brandSoft, borderRadius: 9 }}>
              <Feather name="shield" size={13} color={colors.brandInk} />
              <AppText size={11} color={colors.brandInk} style={{ flex: 1 }}>
                Held until the job is done. No surge pricing, ever.
              </AppText>
            </Row>
          </Card>

          <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Pay with
          </AppText>
          <Card>
            <Row gap={10}>
              <View style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: colors.blueSoft, alignItems: 'center', justifyContent: 'center' }}>
                <AppText size={9} weight="bold" color={colors.blue}>
                  VISA
                </AppText>
              </View>
              <View style={{ flex: 1 }}>
                <AppText weight="semibold" size={13}>
                  •••• 4242
                </AppText>
                <AppText size={11} color={colors.ink2}>
                  Expires 08/28
                </AppText>
              </View>
              <Feather name="chevron-right" size={14} color={colors.ink3} />
            </Row>
          </Card>
      </ScrollView>
      <SafeAreaView edges={['bottom']} style={{ borderTopWidth: 1, borderTopColor: colors.line, backgroundColor: colors.page }}>
        <View style={{ padding: 16 }}>
          <Button title={`Confirm and pay £${job.price.toFixed(0)}`} onPress={() => navigation.navigate('Tracking', { proId: pro.id })} />
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}
