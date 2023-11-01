import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Toast from "react-native-toast-message";
import Layout from "../../../utils/Layout";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectProducts,
  updateStep,
} from "../../../store/slices/dispatchOperationSlice";
import { palette } from "../../../theme/colors";
import BubblesWizard from "../../atoms/BubblesWizard";
import WizardStep from "../../atoms/WizardStep";
import { getOperationIcon } from "../../../utils/utils";

interface Props {
  activeStep: number;
}

const width = Layout.window.width;

export default function DispatchStepper({ activeStep }: Props) {
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  const canContinue = products.length > 0;
  const bgColor = palette.purple;
  const stepWidth = width / 5.5;

  const goToStep = (step: 0 | 1 | 2) => {
    if (canContinue && step <= 1) {
      Toast.show({
        type: "info",
        text1: "Tiene productos modificados",
        text2:
          "No puede cambiar de operación o área de destino mientras tenga productos modificados",
        position: "top",
        topOffset: 9,
        autoHide: true,
        visibilityTime: 5000,
      });
    } else {
      dispatch(updateStep(step));
    }
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
      <>
        <BubblesWizard
          active={activeStep === 1}
          completed={activeStep > 1}
          onPress={() => goToStep(1)}
        />
        <WizardStep
          completed={activeStep > 1}
          icon={"layer-group"}
          bgColor={bgColor}
          width={stepWidth}
        />
      </>
      <BubblesWizard
        active={activeStep >= 2}
        completed={activeStep > 2}
        onPress={() => goToStep(2)}
      />
      <WizardStep
        completed={activeStep > 3}
        canMoveOn={canContinue}
        icon={"boxes"}
        bgColor={bgColor}
        width={stepWidth}
      />
      <BubblesWizard active={activeStep === 4} completed={activeStep > 4} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
