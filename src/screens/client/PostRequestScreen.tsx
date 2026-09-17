import React, { useState } from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../components/ScreenContainer';
import AppText from '../../components/AppText';
import { Row } from '../../components/Row';
import Chip from '../../components/Chip';
import Card from '../../components/Card';
import IconButton from '../../components/IconButton';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import Button from '../../components/Button';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { categories } from '../../data/mock';
import { ClientStackParamList } from '../../navigation/types';

export default function PostRequestScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const navigation = useNavigation<NativeStackNavigationProp<ClientStackParamList>>();
  const [activeCat, setActiveCat] = useState(categories[0].id);

  return (
    <ScreenContainer contentStyle={{ paddingBottom: 100 }}>
      <AppText weight="semibold" size={17} style={{ marginBottom: 16 }}>
        {t('c2_title')}
      </AppText>

      <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {t('c2_lbl_cat')}
      </AppText>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {categories.slice(0, 4).map((cat) => (
          <Chip key={cat.id} label={t(cat.nameKey)} active={activeCat === cat.id} onPress={() => setActiveCat(cat.id)} />
        ))}
      </View>

      <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {t('c2_lbl_desc')}
      </AppText>
      <Card soft style={{ marginBottom: 10, minHeight: 70 }}>
        <AppText size={12} color={colors.ink2}>
          {t('c2_desc_ph')}
        </AppText>
      </Card>
      <Row gap={10} style={{ marginBottom: 16 }}>
        <View style={{ flex: 1, flexDirection: 'row', gap: 8, backgroundColor: colors.brand, borderRadius: 13, height: 46, alignItems: 'center', justifyContent: 'center' }}>
          <Feather name="mic" size={15} color="#fff" />
          <AppText weight="semibold" size={12} color="#fff">
            {t('c2_record')}
          </AppText>
        </View>
        <IconButton name="camera" size={46} />
      </Row>

      <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {t('c2_lbl_photos')}
      </AppText>
      <Row gap={6} style={{ marginBottom: 16 }}>
        <ImagePlaceholder width={60} height={60} icon="image" />
        <ImagePlaceholder width={60} height={60} dashed icon="plus" />
      </Row>

      <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {t('c2_lbl_addr')}
      </AppText>
      <Card style={{ marginBottom: 16 }}>
        <Row gap={10}>
          <Feather name="map-pin" size={15} color={colors.brand} />
          <View style={{ flex: 1 }}>
            <AppText weight="semibold" size={13}>
              {t('c1_loc')}
            </AppText>
            <AppText size={11} color={colors.ink2}>
              {t('c2_addr_sub')}
            </AppText>
          </View>
          <AppText weight="semibold" size={11} color={colors.brand}>
            {t('common_edit')}
          </AppText>
        </Row>
      </Card>

      <Card soft style={{ alignItems: 'center' }}>
        <AppText size={11} color={colors.ink2} style={{ textAlign: 'center' }}>
          {t('c2_note')}
        </AppText>
      </Card>

      <View style={{ marginTop: 20 }}>
        <Button title={t('c2_submit')} onPress={() => navigation.navigate('Quotes')} />
      </View>
    </ScreenContainer>
  );
}
