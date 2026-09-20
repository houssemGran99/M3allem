import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from '../../components/AppText';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import { Row } from '../../components/Row';
import { useTheme } from '../../theme/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../state/AuthContext';
import { AuthStackParamList } from '../../navigation/types';
import { ApiClientError } from '../../api/client';

export default function LoginScreen() {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (emailOverride?: string, passwordOverride?: string) => {
    const useEmail = emailOverride ?? email;
    const usePassword = passwordOverride ?? password;
    setError(null);
    setLoading(true);
    try {
      await login(useEmail, usePassword);
    } catch (e) {
      setError(e instanceof ApiClientError ? e.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.page }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1, justifyContent: 'center' }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              backgroundColor: colors.brand,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}
          >
            <AppText weight="bold" size={20} color="#fff" style={{ fontFamily: 'Cairo_700Bold' }}>
              م
            </AppText>
          </View>

          <AppText weight="bold" size={22} style={{ marginBottom: 4 }}>
            {t('auth_login_title')}
          </AppText>
          <AppText size={13} color={colors.ink2} style={{ marginBottom: 24 }}>
            {t('auth_login_sub')}
          </AppText>

          <TextField label={t('auth_email')} value={email} onChangeText={setEmail} placeholder="amira.haddad@email.com" keyboardType="email-address" />
          <TextField label={t('auth_password')} value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />

          {error && (
            <AppText size={12} color={colors.red} style={{ marginBottom: 10 }}>
              {error}
            </AppText>
          )}

          <Button title={t('auth_login_btn')} onPress={() => submit()} loading={loading} disabled={!email || !password} />

          <Row gap={6} style={{ justifyContent: 'center', marginTop: 16 }}>
            <AppText size={12} color={colors.ink2}>
              {t('auth_no_account')}
            </AppText>
            <AppText size={12} weight="semibold" color={colors.brand} onPress={() => navigation.navigate('Register')}>
              {t('auth_create_account')}
            </AppText>
          </Row>

          <AppText size={11} color={colors.ink3} style={{ textAlign: 'center', marginTop: 28, marginBottom: 10 }}>
            {t('auth_or')}
          </AppText>
          <Row gap={8}>
            <Button
              title={t('auth_demo_client')}
              variant="ghost"
              style={{ flex: 1 }}
              onPress={() => submit('amira.haddad@email.com', 'password123')}
              loading={loading}
            />
            <Button
              title={t('auth_demo_worker')}
              variant="ghost"
              style={{ flex: 1 }}
              onPress={() => submit('mohamed.belhaj@email.com', 'password123')}
              loading={loading}
            />
          </Row>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
