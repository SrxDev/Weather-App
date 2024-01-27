import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Widget, { WidgetDimensionsProps } from "./base/Widget";
import {MaterialIcons} from '@expo/vector-icons';

const VisibilityWidget = ({width,height}:WidgetDimensionsProps) => {
  return (
    <Widget width={width} height={height}>
      <Widget.Header
        contentText="Rainfall"
        Icon={MaterialIcons}
        iconProps={{ name: "visibility" }}
      />
      <Widget.Body
        contentText="8 km"
        contentSize="Large"
       
      ></Widget.Body>
      <Widget.Footer contentText="Great visibility." />
    </Widget>
  );
};

export default VisibilityWidget;

const styles = StyleSheet.create({});
