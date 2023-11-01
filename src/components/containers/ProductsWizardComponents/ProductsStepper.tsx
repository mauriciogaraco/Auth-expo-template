import { StyleSheet, View } from "react-native";
import React from "react";
import Layout from "../../../utils/Layout";
import BubblesWizard from "../../atoms/BubblesWizard";
import WizardStep from "../../atoms/WizardStep";
import { palette } from "../../../theme/colors";
import { useAppDispatch } from "../../../store/hooks";
import { updateStep } from "../../../store/slices/productFormSlice";

interface Props {
  activeStep: number;
}

const stepTitles = ["Tipo de Producto", "Detalles del Producto", "Imagen"];

const width = Layout.window.width;

export default function ProductsStepper({ activeStep }: Props) {
  const bgColor = palette.primary;
  const stepWidth = width / 3.2;
  const dispatch = useAppDispatch();
  const goToStep = (step: 0 | 1 | 2) => {
    dispatch(updateStep(step));
  };
  return (
    <View style={styles.container}>
      <BubblesWizard
        active={activeStep === 0}
        completed={activeStep > 0}
        onPress={() => goToStep(0)}
      />
      <WizardStep
        completed={activeStep > 0}
        icon={"layer-group"}
        bgColor={bgColor}
        width={stepWidth}
      />

      <BubblesWizard
        active={activeStep >= 1}
        completed={activeStep > 1}
        onPress={() => goToStep(1)}
      />
      <WizardStep
        completed={activeStep > 1}
        icon={"boxes"}
        bgColor={"#FFFFFF"}
        width={stepWidth}
      />
      <BubblesWizard active={activeStep === 2} completed={activeStep > 2} />
      {/* <WizardStep active={activeStep === 1} completed={activeStep >= 1}  /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
