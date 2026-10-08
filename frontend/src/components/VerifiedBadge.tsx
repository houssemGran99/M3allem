import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

export default function VerifiedBadge({ size = 14 }: { size?: number }) {
  const { colors } = useTheme();
  return <Feather name="shield" size={size} color={colors.brand} />;
}
