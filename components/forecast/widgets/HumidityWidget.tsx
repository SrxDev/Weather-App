import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Widget, { WidgetDimensionsProps } from "./base/Widget";
import {MaterialCommunityIcons} from '@expo/vector-icons';

const HumidityWidget = ({width,height}:WidgetDimensionsProps) => {
  return (
    <Widget width={width} height={width}>
      <Widget.Header
        contentText="Humidity"
        Icon={MaterialCommunityIcons}
        iconProps={{ name: "water" }}
      />
      <Widget.Body
        contentText="90%"
        contentSize="Large"
      ></Widget.Body>
      <Widget.Footer contentText="The dew point is 17 right now." />
    </Widget>
  );
};

export default HumidityWidget;

const styles = StyleSheet.create({});
