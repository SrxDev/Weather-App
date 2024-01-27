import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Widget, { WidgetDimensionsProps } from "./base/Widget";
import {FontAwesome5} from '@expo/vector-icons';

const RainFallWidget = ({width,height}:WidgetDimensionsProps) => {
  return (
    <Widget width={width} height={height}>
      <Widget.Header
        contentText="Rainfall"
        Icon={FontAwesome5}
        iconProps={{ name: "cloud-rain" }}
      />
      <Widget.Body
        contentText="1.8 mm"
        contentSize="Large"
        subContentText="in last hour"
      ></Widget.Body>
      <Widget.Footer contentText="1.2 mm expected in next 24 hours." />
    </Widget>
  );
};

export default RainFallWidget;

const styles = StyleSheet.create({});
