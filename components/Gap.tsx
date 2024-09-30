import { View, type ViewProps } from 'react-native';

export type GapProps = ViewProps & {
    height?: number;
    width?: number;
  };

  export function Gap({ style, height, width, ...otherProps }: GapProps) {
  
    return <View style={{height: height, width: width}} {...otherProps} />;
  }