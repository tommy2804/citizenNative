import { Text } from 'react-native';
import styled from 'styled-components';
import { theme } from '../../theme';

const defaultTextStyles = () => `
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = () => `
  font-size: ${theme.fontSizes.body};
`;

const hint = () => `
  font-size: ${theme.fontSizes.body};
`;

const error = () => `
  color: ${theme.colors.text.error};
`;

const caption = () => `
  font-size: ${theme.fontSizes.caption};
  font-weight: ${theme.fontWeights.bold};
`;

const label = () => `
  font-size: ${theme.fontSizes.body};
  font-weight: ${theme.fontWeights.medium};
`;

const variants = {
  body,
  hint,
  error,
  label,
  caption,
};

export const CustomText = styled(Text)`
  ${({ theme }) => defaultTextStyles(theme)};
  ${({ variant }) => variants[variant](theme)};
`;

Text.defaultProps = {
  variant: 'body',
};
