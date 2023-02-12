import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { useTheme } from 'react-native-paper';
import { AntDesign as Icon } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { useStorageData } from '../../hooks/fetchAsyncStorage';
import { HomeCover, CardHolder, Title, Description, Content } from './components/Styles';

export const MainScreen = () => {
  const currentLocation = useCurrentLocation();
  const user = useStorageData();
  //Component key will redraw calendars color switch issue.
  const theme = useTheme();
  const navigation = useNavigation();
  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>only sign up users can see this data :</Text>
        <Text>please sign up to view this website</Text>
        <LottieView
          key="clcker"
          style={{ width: 200, height: 200 }}
          autoPlay
          resizeMode="contain"
          loop
          source={require('../../../assets/animation/signup.json')}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.button}>
          <Text>sign up</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={true}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cards}>
          <View style={styles.card}>
            <Card style={styles.cardContent}>
              <Icon name="Trophy" style={styles.icon} size={30} color={theme.dark} />
              <Text>Total Reports</Text>
              <Text>5</Text>
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
          <HomeCover>
            <CardHolder>
              <Image
                style={{ width: 130, height: 150 }}
                source={require('../../../assets/images/selectLocation.png')}
              />
              <Content>
                <Title>Share Location{'\n'}</Title>
                <Description>Help us know where the </Description>
                <Description>report accured by</Description>
                <Description>allowing us your locations</Description>
              </Content>
            </CardHolder>
          </HomeCover>
        </View>

        <View style={styles.quoteContainer}>
          <Card style={styles.quoteCard}>
            <Title>help us make your life in the city better</Title>

            <CardHolder>
              <HomeCover>
                <TouchableOpacity onPress={() => console.log('navigate')} style={styles.button}>
                  <Text>Send Report</Text>
                </TouchableOpacity>
              </HomeCover>
              <LottieView
                key="clcker"
                style={{ width: 200, height: 200 }}
                autoPlay
                resizeMode="contain"
                loop
                source={require('../../../assets/animation/click.json')}
              />
            </CardHolder>
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
    backgroundColor: '#8EA7E9',
    margin: 10,
    borderRadius: 20,
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
