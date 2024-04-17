import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { ProtectedScreen } from "../screens/ProtectedScreen";
import { HomeNavigation } from "./HomeNavigation";
import { useAppSelector } from "../store/hooks";
import { useSelector } from "react-redux";
import { selectCurrentAuth } from "../store/slices/sessionSlice";
import { RootState } from "../store/root";

const Stack = createStackNavigator();
//const auth = useSelector(selectCurrentAuth);
//const {isAuth} = useSelector((state:any)=> state.session)
export const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "white" },
      }}
    >
      {}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
