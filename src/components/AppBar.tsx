import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Row } from './Row';
import IconButton from './IconButton';
import AppText from './AppText';
import Pill from './Pill';
import type { PillTone } from './Pill';

export default function AppBar({
  title,
  showBack = true,
  right,
  tag,
  tagTone,
}: {
  title: string;
  showBack?: boolean;
  right?: React.ReactNode;
  tag?: string;
  tagTone?: PillTone;
}) {
  const navigation = useNavigation();
  return (
    <Row gap={10} style={{ paddingBottom: 12 }}>
      {showBack && (
        <IconButton name="arrow-left" size={32} onPress={() => navigation.goBack()} />
      )}
      <AppText weight="semibold" size={16}>
        {title}
      </AppText>
      <Row gap={8} style={{ marginLeft: 'auto' }}>
        {tag && <Pill label={tag} tone={tagTone} />}
        {right}
      </Row>
    </Row>
  );
}
