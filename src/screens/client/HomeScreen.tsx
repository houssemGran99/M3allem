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
import { useLanguage } from '../../i18n/LanguageContext';
import { categories, mohamed } from '../../data/mock';
import { ClientStackParamList } from '../../navigation/types';

const tintMap = { blue: 'blueSoft', amber: 'amberSoft', brand: 'brandSoft', sub: 'sub' } as const;
const fgMap = { blue: 'blue', amber: 'amber', brand: 'brand', sub: 'ink2' } as const;

export default function HomeScreen() {
  const { colors } = useTheme();
  const { t, isRTL } = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<ClientStackParamList>>();

  return (
    <ScreenContainer>
      <Between style={{ marginBottom: 14 }}>
        <View>
          <AppText size={11} color={colors.ink2}>
            {t('lbl_addr')}
          </AppText>
          <Row gap={5} style={{ marginTop: 2 }}>
            <Feather name="map-pin" size={14} color={colors.brand} />
            <AppText weight="semibold" size={14}>
              {t('c1_loc')}
            </AppText>
            <Feather name={isRTL ? 'chevron-left' : 'chevron-right'} size={12} color={colors.ink3} style={{ transform: [{ rotate: '90deg' }] }} />
          </Row>
        </View>
        <IconButton name="bell" size={32} />
      </Between>

      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('PostRequest')}>
        <View style={{ marginBottom: 14 }}>
          <Field icon="search" placeholder={t('c1_search')} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('PostRequest')}>
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
              <Feather name="mic" size={16} color={colors.brand} />
            </View>
            <View style={{ flex: 1 }}>
              <AppText weight="semibold" size={13} color={colors.brandInk}>
                {t('c1_banner_t')}
              </AppText>
              <AppText size={11} color={colors.brandInk} style={{ opacity: 0.8, marginTop: 1 }}>
                {t('c1_banner_s')}
              </AppText>
            </View>
            <Feather name={isRTL ? 'chevron-left' : 'chevron-right'} size={16} color={colors.brandInk} />
          </Row>
        </Card>
      </TouchableOpacity>

      <Between style={{ marginBottom: 10 }}>
        <AppText weight="semibold" size={15}>
          {t('c1_cat_title')}
        </AppText>
        <AppText weight="semibold" size={11} color={colors.brand}>
          {t('common_see_all')}
        </AppText>
      </Between>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
        {categories.map((cat) => (
          <TouchableOpacity key={cat.id} activeOpacity={0.8} onPress={() => navigation.navigate('PostRequest')} style={{ width: '31%' }}>
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
                {t(cat.nameKey)}
              </AppText>
              <AppText size={11} color={colors.ink2}>
                {t(cat.countKey)}
              </AppText>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      <AppText weight="semibold" size={15} style={{ marginBottom: 8 }}>
        {t('c1_recent_title')}
      </AppText>
      <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('ArtisanProfile', { artisanId: mohamed.id })}>
        <Card padding={11}>
          <Row gap={10}>
            <Avatar initials={mohamed.initials} tint={mohamed.avatarTint} size={40} />
            <View style={{ flex: 1 }}>
              <Row gap={5}>
                <AppText weight="semibold" size={13}>
                  {mohamed.name}
                </AppText>
                {mohamed.verified && <VerifiedBadge size={13} />}
              </Row>
              <AppText size={11} color={colors.ink2}>
                {t('cat_plumb')} · {mohamed.rating} ★ · {t('c1_last')}
              </AppText>
            </View>
            <Button
              title={t('c1_rebook')}
              size="sm"
              fullWidth={false}
              onPress={() => navigation.navigate('ArtisanProfile', { artisanId: mohamed.id })}
            />
          </Row>
        </Card>
      </TouchableOpacity>
    </ScreenContainer>
  );
}
