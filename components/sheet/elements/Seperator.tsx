import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Canvas, Line, Shadow, vec } from '@shopify/react-native-skia';
interface SeperatorProps{
    width:number;
    height:number;
}
const Seperator = ({width,height}:SeperatorProps) => {
  return (
   <Canvas style={{height:height}}>
    <Line
        p1={vec(0,0)}
        p2={vec(width,0)}
        color={'rgba(255,255,255,0.3)'}
        strokeWidth={height}/>
    <Shadow dx={0} dy={1} blur={0} color={'rgba(0,0,0,0.2'}/>
   </Canvas>
  )
}

export default Seperator

const styles = StyleSheet.create({})