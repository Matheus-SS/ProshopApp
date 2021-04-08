import React, {useState} from 'react';
import {
  View,
  Text,
  ImageURISource,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import {AirbnbRating} from 'react-native-ratings';
import {createStyles} from '../../../styles/index';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Transition,
  Transitioning,
  TransitioningView,
} from 'react-native-reanimated';

interface IProductDTO {
  item: {
    id: number;
    image: ImageURISource;
    title: string;
    description: string;
    price: number;
    rating: number;
  };
}

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

const CardProduct = ({item}: IProductDTO) => {
  const [colorAddButton, setColorAddButton] = useState('white');
  const [colorAddIcon, setColorAddIcon] = useState('#232323');
  const [currentIdItem, setCurrentIdItem] = useState<number | null>(null);

  const ref = React.useRef<TransitioningView | null>(null);

  function HandlePress() {
    console.log('ADICIONAR');
    setColorAddButton('#232323');
    setColorAddIcon('white');
  }
  return (
    <View
      style={{
        marginTop: 10,
        paddingHorizontal: 40,
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          ref.current?.animateNextTransition();
          setCurrentIdItem(item.id === currentIdItem ? null : item.id);
        }}>
        <Transitioning.View
          ref={ref}
          transition={transition}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8,
            backgroundColor: 'white',
            borderRadius: 20,
            flexGrow: 1,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.37,
            shadowRadius: 7.49,

            elevation: 12,
          }}>
          <View
            style={{
              flex: 1,
              right: 25,
              height: 70,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 6,
              },
              elevation: 10,
              borderRadius: 20,
            }}>
            <Image
              source={item.image}
              resizeMode="cover"
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 20,
              }}
            />
          </View>

          <View style={{flex: 3}}>
            <Text style={styles.titleCard} numberOfLines={1}>
              {item.title}
            </Text>
            {item.id === currentIdItem && (
              <View>
                <Text>{item.description}</Text>
              </View>
            )}

            <View style={{alignItems: 'flex-start', marginTop: 5}}>
              <AirbnbRating
                count={5}
                size={20}
                showRating={false}
                isDisabled={true}
                defaultRating={item.rating}
              />
            </View>
            <View>
              <Text style={styles.price}>$ {item.price}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: colorAddButton,
              padding: 4,
              borderRadius: 20,
              left: 15,
              elevation: 5,
            }}
            onPress={HandlePress}>
            <Icon name="plus" size={25} color={colorAddIcon} />
          </TouchableOpacity>
        </Transitioning.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CardProduct;

const styles = createStyles({
  titleCard: {
    fontSize: '1.1rem',
    fontFamily: 'Roboto-Bold',

    paddingRight: 10,
  },
  price: {
    textAlign: 'right',
    fontFamily: 'Roboto-Bold',
    fontSize: '1.2rem',
    color: '#232323',
  },
});
