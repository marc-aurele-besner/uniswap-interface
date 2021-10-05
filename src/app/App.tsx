import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ThemeProvider } from '@shopify/restyle'
import React from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { useAppSelector } from 'src/app/hooks'
import { RootStackParamList } from 'src/app/navTypes'
import { store } from 'src/app/store'
import { HomeScreen } from 'src/features/home/HomeScreen'
import { ImportAccountScreen } from 'src/features/onboarding/ImportAccountScreen'
import { WelcomeScreen } from 'src/features/onboarding/WelcomeScreen'
import { TransferTokenScreen } from 'src/features/transfer/TransferTokenScreen'
import { darkTheme, theme } from 'src/styles/theme'

const Stack = createNativeStackNavigator<RootStackParamList>()

export function App() {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
          <NavStack isDarkMode={isDarkMode} />
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  )
}

function NavStack({ isDarkMode }: { isDarkMode: boolean }) {
  const isUnlocked = useAppSelector((state) => state.wallet.isUnlocked)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isUnlocked ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'Uniswap | Home' }}
            />
            <Stack.Screen
              name="Transfer"
              component={TransferTokenScreen}
              options={{ title: 'Uniswap | Send' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ title: 'Uniswap | Welcome' }}
            />
            <Stack.Screen
              name="ImportAccount"
              component={ImportAccountScreen}
              options={{ title: 'Uniswap | Import' }}
            />
          </>
        )}
      </Stack.Navigator>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </NavigationContainer>
  )
}
