import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '../../components/AppText';
import { Row, Between } from '../../components/Row';
import Card from '../../components/Card';
import Button from '../../components/Button';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import Field from '../../components/Field';
import { useTheme } from '../../theme/ThemeContext';
import { professionals } from '../../data/mock';
import { ClientStackParamList } from '../../navigation/types';

export default function ReviewScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ClientStackParamList>>();
  const route = useRoute<RouteProp<ClientStackParamList, 'Review'>>();
  const pro = professionals.find((p) => p.id === route.params.proId) ?? professionals[0];
  const [rating, setRating] = useState(5);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.page }} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 8 }} showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center', paddingVertical: 16 }}>
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: colors.brand,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12,
            }}
          >
            <Feather name="check" size={26} color="#fff" />
          </View>
          <AppText weight="bold" size={18}>
            Job complete
          </AppText>
          <AppText size={12} color={colors.ink2}>
            {pro.name.split(' ')[0]} finished at 3:10pm · 55 minutes
          </AppText>
        </View>

        <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Before & after
        </AppText>
        <Row gap={8} style={{ marginBottom: 14 }}>
          <View style={{ flex: 1 }}>
            <ImagePlaceholder height={92} icon="image" />
            <AppText size={11} color={colors.ink2} style={{ marginTop: 4 }}>
              Before · 2:14pm
            </AppText>
          </View>
          <View style={{ flex: 1 }}>
            <ImagePlaceholder height={92} icon="image" />
            <AppText size={11} color={colors.ink2} style={{ marginTop: 4 }}>
              After · 3:08pm
            </AppText>
          </View>
        </Row>

        <Card soft style={{ marginBottom: 14 }}>
          <AppText weight="semibold" size={12} style={{ marginBottom: 3 }}>
            {pro.name.split(' ')[0]}'s notes
          </AppText>
          <AppText size={12} color={colors.ink2} style={{ lineHeight: 18 }}>
            Replaced the P-trap seal and re-seated the waste pipe. No parts charged — seal was from stock.
          </AppText>
        </Card>

        <Card style={{ marginBottom: 14 }}>
          <Between style={{ paddingVertical: 3 }}>
            <AppText size={12.5} color={colors.ink2}>
              Call-out & first hour
            </AppText>
            <AppText size={12.5} weight="semibold">
              £{pro.price.toFixed(2)}
            </AppText>
          </Between>
          <Between style={{ paddingVertical: 3 }}>
            <AppText size={12.5} color={colors.ink2}>
              Parts
            </AppText>
            <AppText size={12.5} weight="semibold">
              £0.00
            </AppText>
          </Between>
          <View style={{ height: 1, backgroundColor: colors.line, marginVertical: 8 }} />
          <Between>
            <AppText weight="semibold" size={12}>
              Paid · Visa 4242
            </AppText>
            <AppText weight="bold" size={14}>
              £{pro.price.toFixed(2)}
            </AppText>
          </Between>
          <Row gap={5} style={{ marginTop: 9 }}>
            <AppText weight="semibold" size={12} color={colors.brand}>
              Download receipt
            </AppText>
            <Feather name="chevron-right" size={12} color={colors.brand} />
          </Row>
        </Card>

        <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Rate {pro.name.split(' ')[0]}
        </AppText>
        <Card style={{ alignItems: 'center' }}>
          <Row gap={9} style={{ marginBottom: 10 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <TouchableOpacity key={i} onPress={() => setRating(i)}>
                <Ionicons name={i <= rating ? 'star' : 'star-outline'} size={26} color={colors.amber} />
              </TouchableOpacity>
            ))}
          </Row>
          <View style={{ width: '100%' }}>
            <Field placeholder="Tell others what the job was like…" />
          </View>
        </Card>
      </ScrollView>
      <View style={{ padding: 16, borderTopWidth: 1, borderTopColor: colors.line }}>
        <Button title="Submit review" onPress={() => navigation.popToTop()} />
      </View>
    </SafeAreaView>
  );
}
