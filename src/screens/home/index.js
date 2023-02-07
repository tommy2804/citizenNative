import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { useTheme } from 'react-native-paper';
import { AntDesign as Icon } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { LottieAnimationWrapper } from '../../components/styles/lottieAnimtions';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';

export const MainScreen = () => {
  const currentLocation = useCurrentLocation();

  //Component key will redraw calendars color switch issue.
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={true}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cards}>
          <View style={styles.card}>
            <Card style={styles.cardContent}>
              <Icon name="Trophy" style={styles.icon} size={30} color={theme.dark} />
              <Text>Current Streak</Text>
              <Text>day</Text>
            </Card>
          </View>
          <View style={styles.card}>
            <Card style={styles.cardContent}>
              <Icon name="calendar" style={styles.icon} size={30} color={theme.dark} />
              <Text>Total Sessions</Text>
              <Text>session</Text>
            </Card>
          </View>
          <View style={styles.card}>
            <Card style={styles.cardContent}>
              <Icon name="clockcircleo" style={styles.icon} size={30} color={theme.dark} />
              <Text>Time </Text>
              <Text>stat</Text>
            </Card>
          </View>
        </ScrollView>

        <View style={styles.quoteContainer}>
          <Card style={styles.quoteCard}>
            <Text>help us make your life in the city better</Text>

            <Card style={styles.cardContent}>
              <Text style={styles.quoteText}>click here to influence</Text>
            </Card>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ReportForm', {
                  location: currentLocation,
                });
              }}
              style={styles.button}>
              <Text style={styles.quoteText}>Send Report</Text>
            </TouchableOpacity>
          </Card>
        </View>

        <View style={styles.quoteContainer}>
          <Card style={styles.quoteCard}>
            <Card style={styles.cardContent}>
              <Text style={styles.quoteText}>author</Text>
              <Text style={styles.quoteText}>quote</Text>
            </Card>
          </Card>
        </View>
      </ScrollView>

      <View style={styles.Animation}>
        <LottieView
          key="animation"
          style={{ width: 100, height: 100, position: 'absolute', bottom: 0, right: 0 }}
          autoPlay
          resizeMode="contain"
          loop
          source={require('../../../assets/animation/headAnimation.json')}
        />
      </View>

      <View pointerEvents="box-none" style={StyleSheet.absoluteFill}></View>
    </>
  );
};

const styles = StyleSheet.create({
  cards: {
    marginBottom: 10,
  },
  Animation: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    height: '40%',
  },
  card: {
    width: 150,
    marginRight: 10,

    textAlign: 'center',
  },
  quoteContainer: { marginRight: 10, marginBottom: 30 },
  quoteCard: {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  quoteText: {
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.brand.primary,
    margin: 10,
    borderRadius: 20,
    shadowRadius: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,

    width: 100,
    height: 50,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
});
