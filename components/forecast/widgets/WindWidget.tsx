import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Widget, { WidgetDimensionsProps } from "./base/Widget";
import { Feather,Fontisto } from "@expo/vector-icons";

const WindWidget = ({ width, height }: WidgetDimensionsProps) => {
  return (
    <Widget width={width} height={height}>
      <Widget.Header
        contentText="Wind"
        Icon={Feather}
        iconProps={{ name: "wind" }}
      />
      <Widget.Body>
          <View style={{flex:1,
            
            alignItems:'center',justifyContent:'center'}}>
        <Fontisto name="compass-alt" size={100} color="white" />
        </View>
      </Widget.Body>
    </Widget>
  );
};

export default WindWidget;

const styles = StyleSheet.create({});
