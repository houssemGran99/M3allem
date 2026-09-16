import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Row, Between } from '../../components/Row';
import AppText from '../../components/AppText';
import Field from '../../components/Field';
import Card from '../../components/Card';
import IconButton from '../../components/IconButton';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import Chip from '../../components/Chip';
import Pill from '../../components/Pill';
import VerifiedBadge from '../../components/VerifiedBadge';
import { useTheme } from '../../theme/ThemeContext';
import { professionals } from '../../data/mock';
import { ClientStackParamList } from '../../navigation/types';

const filters = ['Today', '4.5★ +', 'Under £100', 'Insured'];

export default function SearchScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ClientStackParamList>>();
  const route = useRoute<RouteProp<ClientStackParamList, 'Search'>>();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const trade = route.params?.categoryName ?? 'Plumbing';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.page }} edges={['top']}>
      <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
        <Row gap={8} style={{ marginBottom: 10 }}>
          {navigation.canGoBack() && <IconButton name="arrow-left" size={32} onPress={() => navigation.goBack()} />}
          <View style={{ flex: 1 }}>
            <Field icon="search" value={trade} placeholder={trade} />
          </View>
        </Row>

        <FlatList
          data={filters}
          horizontal
          keyExtractor={(f) => f}
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 10, height: 28, flexGrow: 0 }}
          ItemSeparatorComponent={() => <View style={{ width: 6 }} />}
          ListHeaderComponent={
            <Chip
              label="3"
              active
              icon={<Feather name="sliders" size={11} color="#fff" />}
              onPress={() => {}}
            />
          }
          ListHeaderComponentStyle={{ marginRight: 6 }}
          renderItem={({ item }) => (
            <Chip label={item} active={activeFilter === item} onPress={() => setActiveFilter(activeFilter === item ? null : item)} />
          )}
        />

        <Between style={{ marginBottom: 8 }}>
          <AppText size={12} color={colors.ink2}>
            <AppText weight="bold" size={12} color={colors.ink}>
              {professionals.length * 9}
            </AppText>{' '}
            {trade.toLowerCase()} pros near you
          </AppText>
          <Row gap={4}>
            <AppText weight="semibold" size={12} color={colors.brand}>
              Soonest
            </AppText>
            <Feather name="chevron-down" size={12} color={colors.brand} />
          </Row>
        </Between>
      </View>

      <FlatList
        data={professionals}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View style={{ height: 9 }} />}
        renderItem={({ item, index }) => (
          <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('ProfessionalProfile', { proId: item.id })}>
            <Card borderColor={index === 0 ? colors.brand : colors.line}>
              <Row gap={10} style={{ alignItems: 'flex-start' }}>
                <Avatar initials={item.initials} tint={item.avatarTint} size={46} fontSize={15} />
                <View style={{ flex: 1 }}>
                  <Between>
                    <Row gap={5}>
                      <AppText weight="semibold" size={13}>
                        {item.name}
                      </AppText>
                      {item.verified && <VerifiedBadge size={13} />}
                    </Row>
                    <AppText weight="semibold" size={13}>
                      £{item.price}
                    </AppText>
                  </Between>
                  <Row gap={6} style={{ marginTop: 2 }}>
                    <AppText weight="bold" size={11} color={colors.amber}>
                      {item.rating.toFixed(1)} ★
                    </AppText>
                    <AppText size={11} color={colors.ink2}>
                      {item.reviewCount} reviews · {item.distanceMiles} mi
                    </AppText>
                  </Row>
                  {item.badges.length > 0 && (
                    <Row gap={5} style={{ marginTop: 6 }}>
                      {item.badges.map((b) => (
                        <Pill key={b} label={b} tone={b === 'Emergency' ? 'a' : b.startsWith('Insur') ? 'b' : 'g'} />
                      ))}
                    </Row>
                  )}
                </View>
              </Row>
              {index < 2 && (
                <>
                  <View style={{ height: 1, backgroundColor: colors.line, marginVertical: 10 }} />
                  <Between>
                    <Row gap={5}>
                      <Feather name="clock" size={13} color={index === 0 ? colors.brand : colors.ink2} />
                      <AppText size={12} weight={index === 0 ? 'bold' : 'regular'} color={index === 0 ? colors.brand : colors.ink2}>
                        {item.availability}
                      </AppText>
                    </Row>
                    <Button
                      title="Book"
                      size="sm"
                      fullWidth={false}
                      variant={index === 0 ? 'primary' : 'ghost'}
                      onPress={() => navigation.navigate('Booking', { proId: item.id })}
                    />
                  </Between>
                </>
              )}
            </Card>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
