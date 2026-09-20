import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '../../components/AppText';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import Chip from '../../components/Chip';
import { Row } from '../../components/Row';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../state/AuthContext';
import { AuthStackParamList } from '../../navigation/types';
import { ApiClientError } from '../../api/client';

export default function RegisterScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { register } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'client' | 'worker'>('client');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    setLoading(true);
    try {
      await register({ name, email, password, phone: phone || undefined, role });
    } catch (e) {
      setError(e instanceof ApiClientError ? e.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = name.length >= 2 && email.includes('@') && password.length >= 6;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.page }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1, justifyContent: 'center' }}>
          <AppText weight="bold" size={22} style={{ marginBottom: 4 }}>
            {t('auth_register_title')}
          </AppText>
          <AppText size={13} color={colors.ink2} style={{ marginBottom: 20 }}>
            {t('auth_register_sub')}
          </AppText>

          <AppText size={11} weight="semibold" color={colors.ink3} style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {t('auth_i_am')}
          </AppText>
          <Row gap={8} style={{ marginBottom: 16 }}>
            <Chip label={t('auth_role_client')} active={role === 'client'} onPress={() => setRole('client')} />
            <Chip label={t('auth_role_worker')} active={role === 'worker'} onPress={() => setRole('worker')} />
          </Row>

          <TextField label={t('auth_name')} value={name} onChangeText={setName} placeholder="Amira Haddad" autoCapitalize="words" />
          <TextField label={t('auth_email')} value={email} onChangeText={setEmail} placeholder="amira.haddad@email.com" keyboardType="email-address" />
          <TextField label={t('auth_phone')} value={phone} onChangeText={setPhone} placeholder="+216 20 123 456" keyboardType="phone-pad" />
          <TextField label={t('auth_password')} value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />

          {error && (
            <AppText size={12} color={colors.red} style={{ marginBottom: 10 }}>
              {error}
            </AppText>
          )}

          <Button title={t('auth_register_btn')} onPress={submit} loading={loading} disabled={!canSubmit} />

          <Row gap={6} style={{ justifyContent: 'center', marginTop: 16 }}>
            <AppText size={12} color={colors.ink2}>
              {t('auth_have_account')}
            </AppText>
            <AppText size={12} weight="semibold" color={colors.brand} onPress={() => navigation.navigate('Login')}>
              {t('auth_login_link')}
            </AppText>
          </Row>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
