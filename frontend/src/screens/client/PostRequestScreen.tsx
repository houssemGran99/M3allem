import React, { useEffect, useState } from 'react';
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
import TextField from '../../components/TextField';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../state/AuthContext';
import { useClientData } from '../../state/ClientDataContext';
import { listCategories } from '../../api/categories';
import { ApiCategory } from '../../api/types';
import { ApiClientError } from '../../api/client';
import { ClientStackParamList } from '../../navigation/types';

export default function PostRequestScreen() {
  const { colors } = useTheme();
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  const { createRequest } = useClientData();
  const navigation = useNavigation<NativeStackNavigationProp<ClientStackParamList>>();

  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listCategories().then(({ categories: fetched }) => {
      setCategories(fetched);
      setActiveCat((prev) => prev ?? fetched[0]?._id ?? null);
    });
  }, []);

  const canSubmit = Boolean(activeCat) && description.trim().length >= 5 && addressLine.trim().length >= 2;

  const submit = async () => {
    if (!activeCat) return;
    setError(null);
    setSubmitting(true);
    try {
      await createRequest({
        categoryId: activeCat,
        description: description.trim(),
        photos: [],
        address: { line: addressLine.trim(), city: user?.city ?? 'Tunis' },
      });
      setDescription('');
      setAddressLine('');
      navigation.navigate('Quotes');
    } catch (e) {
      setError(e instanceof ApiClientError ? e.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScreenContainer contentStyle={{ paddingBottom: 100 }}>
      <AppText weight="semibold" size={17} style={{ marginBottom: 16 }}>
        {t('c2_title')}
      </AppText>

      <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {t('c2_lbl_cat')}
      </AppText>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {categories.map((cat) => (
          <Chip key={cat._id} label={cat.name[lang]} active={activeCat === cat._id} onPress={() => setActiveCat(cat._id)} />
        ))}
      </View>

      <TextField
        label={t('c2_lbl_desc')}
        value={description}
        onChangeText={setDescription}
        placeholder={t('c2_desc_ph')}
        multiline
        numberOfLines={4}
      />

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

      <TextField label={t('c2_lbl_addr')} value={addressLine} onChangeText={setAddressLine} placeholder={t('c2_addr_sub')} />

      {error && (
        <AppText size={12} color={colors.red} style={{ marginBottom: 10 }}>
          {error}
        </AppText>
      )}

      <Card soft style={{ alignItems: 'center', marginBottom: 20 }}>
        <AppText size={11} color={colors.ink2} style={{ textAlign: 'center' }}>
          {t('c2_note')}
        </AppText>
      </Card>

      <Button title={t('c2_submit')} onPress={submit} loading={submitting} disabled={!canSubmit} />
    </ScreenContainer>
  );
}
