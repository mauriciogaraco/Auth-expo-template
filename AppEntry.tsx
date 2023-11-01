import React from 'react'
import {Linking, View} from 'react-native'
import MainNavigatior from './MainNavigator'
import { useInitialLoad } from './src/hooks/useInitialLoad';
//import { useAppDispatch } from './Redux/hooks';
import {
  ErrorBoundary,
  ErrorBoundaryPropsWithFallback,
  FallbackProps,
} from "react-error-boundary";
import { ThemeContext } from './src/Context/theme/ThemeContext';
//import SpInAppUpdates, { IAUUpdateKind } from "sp-react-native-in-app-updates"
import { LoadingPage } from './src/components/containers/LoadingPage';
import { ErrorPage } from './src/components/containers/ErrorPage';
import { EmptyData } from './src/components/containers/EmptyData';
import MainNavigator from './MainNavigator';







export default function AppEntry() {
   //Initial Load
 /*  const {
    isLoading,
    error,
    loadHandler,
    needUpdate,
    storeUrl,
    isInMaintenance,
    isInAppUpdate,
  } = useInitialLoad();
  const dispatch = useAppDispatch();
*/

 /* //Configuring inAppUpdate
  const dispatchInAppUpdate = () => {
    try {
      const inAppUpdates = new SpInAppUpdates(false);
      inAppUpdates.startUpdate({
        updateType: IAUUpdateKind.IMMEDIATE,
      });
    } catch (error: any) {
      crashlytics().log("While excecuting inAppUpdate");
      crashlytics().recordError(error);
    }
  };

  const { theme } = useContext(ThemeContext);

  const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.
    return (
      <ErrorPage
        onRecovery={resetErrorBoundary}
        message={"Upps... ha ocurrido un error. Si periste contáctenos."}
      />
    );
  };

  const logError = (error: Error, info: { componentStack: string }) => {
    // Do something with the error, e.g. log to an external API
    crashlytics().log(info.componentStack);
    crashlytics().recordError(error);
  };
  // useEffect(() => {
  //   const removeNetInfoSubscription = NetInfo.addEventListener(state => {
  //     const online = state.isConnected && state.isInternetReachable
  //     dispatch(isConnected(online))
  //   })

  //   return () => removeNetInfoSubscription()
  // }, [])

  if (isLoading) {
    return <LoadingPage title="" />;
  }

  if (error) {
    return <ErrorPage onRecovery={loadHandler} message={error} />;
  }
  if (isInMaintenance) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <EmptyData
          type="logo"
          title="Nos encontramos en mantenimiento"
          subtitle="Se están realizando algunos ajustes. Por favor, vuelva más tarde."
        />
      </View>
    );
  }

  if (needUpdate) {
    if (isInAppUpdate) {
      dispatchInAppUpdate();
    }

    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <EmptyData
          type="logo"
          title="Actualización importante"
          subtitle="Una importante actualización de TECOPOS - Gestión se encuentra disponible en la tienda, por favor actualice para poder continuar."
          onPress={() => Linking.openURL(storeUrl)}
        />
      </View>
    );
  }*/

  return (
    <View style={{ flex: 1 }}>
    {/*  <ErrorBoundary
        FallbackComponent={Fallback}
        onReset={loadHandler}
        onError={logError}
  >*/}
        <MainNavigator />
        
    
    </View>
  );
}
/*<View>
       <MainNavigatior/>
    </View>*/