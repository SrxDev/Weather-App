import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import React, {
  ElementType,
  ReactElement,
  ReactNode,
  cloneElement,
} from "react";

export interface WidgetDimensionsProps {
  width: number;
  height: number;
}
interface IconComponentProps {
  name: string;
  size?: number;
  color?: string;
}

interface WidgetPanelProps extends ViewProps {
  contentText: string;
  Icon: ElementType<any>;
  iconProps: IconComponentProps;
  style?: StyleProp<ViewStyle>;
}
interface WidgetHeaderProps extends WidgetPanelProps {}
interface WidgetFooterProps {
  borderTopWidth?: number;
  borderTopColor?: string;
  paddingTop?: number;
  contentText: string;
  Icon?: ElementType<any>;
  iconProps?: IconComponentProps;
  style?: StyleProp<ViewStyle>;
}

interface WidgetProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  // Additional custom style properties
  width: number;
  height: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  padding?: number;
  children: ReactNode;
}

const Widget = ({
  children,
  style,
  width,
  height,
  borderRadius = 22,
  borderWidth = 0.25,
  borderColor = "#E0D9FF",
  backgroundColor = "#201C48",
  padding = 15,
}: WidgetProps) => {
  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          borderWidth,
          borderColor,
          backgroundColor,
          padding,
          alignSelf: "center",
          justifyContent: "space-between",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

Widget.Header = ({
  Icon,
  iconProps,
  contentText,
  style,
}: WidgetHeaderProps) => {
  const finalProps = {
    ...iconProps,
    color: iconProps.color || "rgba(235,235,245,0.6)",
    size: iconProps.size || 24,
  };
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 10,
        },
        style,
      ]}
    >
      <Icon {...finalProps} />
      <Text style={styles.title}>{contentText.toUpperCase()}</Text>
    </View>
  );
};
interface WidgetBodyProps {
  children?: ReactNode;
  contentText?: string;
  subContentText?: string;
  contentSize?: "Normal" | "Large";
}
Widget.Body = ({
  children,
  contentText,
  contentSize = "Normal",
  subContentText,
}: WidgetBodyProps) => {
  return (
    <View style={{ flex: 1 }}>
      {contentText && (
        <Text
          style={
            contentSize === "Normal"
              ? styles.contentText
              : styles.largeContentText
          }
        >
          {contentText}
        </Text>
      )}
      {subContentText && (
        <Text style={styles.subContentText}>{subContentText}</Text>
      )}
      {children}
    </View>
  );
};

Widget.Footer = ({
  Icon,
  iconProps,
  contentText,
  borderTopWidth = 0.5,
  borderTopColor = "rgba(0,0,0,0.2)",
  paddingTop = 10,
  style,
}: WidgetFooterProps) => {
  const finalProps = {
    ...iconProps,
    color: iconProps?.color || "white",
    size: iconProps?.size || 24,
  };
  return (
    <View
      style={[
        {
          borderTopWidth,
          borderTopColor,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop,
        },
        style,
      ]}
    >
      <Text style={styles.footer}>{contentText}</Text>
      {Icon && <Icon {...finalProps} />}
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontFamily: "SF-Semibold",
    fontSize: 18,
    lineHeight: 20,
    color: "rgba(235,235,245,0.6)",
    paddingLeft: 10,
  },
  contentText: {
    fontFamily: "SF-Regular",
    fontSize: 20,
    lineHeight: 20,
    color: "white",
  },
  largeContentText: {
    fontFamily: "SF-Semibold",
    fontSize: 34,
    lineHeight: 34,
    color: "white",
  },
  subContentText: {
    fontFamily: "SF-Semibold",
    fontSize: 26,
    color: "white",
    lineHeight: 28,
  },
  footer: {
    fontFamily: "SF-Regular",
    fontSize: 18,
    color: "white",
    lineHeight: 18,
  },
});
export default Widget;
