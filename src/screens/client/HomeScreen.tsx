import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../components/ScreenContainer';
import { Row, Between } from '../../components/Row';
import AppText from '../../components/AppText';
import Field from '../../components/Field';
import Card from '../../components/Card';
import IconButton from '../../components/IconButton';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import VerifiedBadge from '../../components/VerifiedBadge';
import { useTheme } from '../../theme/ThemeContext';
import { categories, professionals } from '../../data/mock';
import { ClientStackParamList } from '../../navigation/types';

const tintMap = { blue: 'blueSoft', amber: 'amberSoft', brand: 'brandSoft', sub: 'sub' } as const;
const fgMap = { blue: 'blue', amber: 'amber', brand: 'brand', sub: 'ink2' } as const;

export default function HomeScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<ClientStackParamList>>();
  const previous = professionals[0];

  return (
    <ScreenContainer>
      <Between style={{ marginBottom: 14 }}>
        <View>
          <AppText size={11} color={colors.ink2}>
            Service address
          </AppText>
          <Row gap={5} style={{ marginTop: 2 }}>
            <Feather name="map-pin" size={14} color={colors.brand} />
            <AppText weight="semibold" size={14}>
              Clifton, Bristol
            </AppText>
            <Feather name="chevron-down" size={12} color={colors.ink3} />
          </Row>
        </View>
        <IconButton name="bell" size={32} />
      </Between>

      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Search')}>
        <View style={{ marginBottom: 14 }}>
          <Field icon="search" placeholder="Leaking tap, rewire, deep clean…" />
        </View>
      </TouchableOpacity>

      <Card bg={colors.brandSoft} borderColor="transparent" style={{ marginBottom: 18 }}>
        <Row gap={9}>
          <View
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              backgroundColor: colors.card,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Feather name="zap" size={16} color={colors.brand} />
          </View>
          <View style={{ flex: 1 }}>
            <AppText weight="semibold" size={13} color={colors.brandInk}>
              Need someone today?
            </AppText>
            <AppText size={11} color={colors.brandInk} style={{ opacity: 0.8, marginTop: 1 }}>
              17 verified trades free this afternoon
            </AppText>
          </View>
          <Feather name="chevron-right" size={16} color={colors.brandInk} />
        </Row>
      </Card>

      <Between style={{ marginBottom: 10 }}>
        <AppText weight="semibold" size={15}>
          Browse trades
        </AppText>
        <AppText weight="semibold" size={11} color={colors.brand}>
          See all
        </AppText>
      </Between>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Search', { categoryId: cat.id, categoryName: cat.name })}
            style={{ width: '31%' }}
          >
            <Card padding={10}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 10,
                  backgroundColor: colors[tintMap[cat.tint]],
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 6,
                }}
              >
                <Feather name={cat.icon as any} size={15} color={colors[fgMap[cat.tint]]} />
              </View>
              <AppText weight="semibold" size={12}>
                {cat.name}
              </AppText>
              <AppText size={11} color={colors.ink2}>
                {cat.proCount} pros
              </AppText>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      <AppText weight="semibold" size={15} style={{ marginBottom: 8 }}>
        Booked before
      </AppText>
      <Card padding={11}>
        <Row gap={10}>
          <Avatar initials={previous.initials} tint={previous.avatarTint} size={40} />
          <View style={{ flex: 1 }}>
            <Row gap={5}>
              <AppText weight="semibold" size={13}>
                {previous.name}
              </AppText>
              {previous.verified && <VerifiedBadge size={13} />}
            </Row>
            <AppText size={11} color={colors.ink2}>
              {previous.trade.replace('Gas Safe ', '')} · {previous.rating} ★ · Last job Mar 2
            </AppText>
          </View>
          <Button
            title="Rebook"
            size="sm"
            fullWidth={false}
            onPress={() => navigation.navigate('ProfessionalProfile', { proId: previous.id })}
          />
        </Row>
      </Card>
    </ScreenContainer>
  );
}
