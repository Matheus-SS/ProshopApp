import React, {useCallback} from 'react';
import {DrawerNavigationProp} from '@react-navigation/drawer';

import {
  View,
  Text,
  TouchableOpacity,
  ImageURISource,
  Image,
} from 'react-native';

import {createStyles} from '../../../styles/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RouteProp, useRoute} from '@react-navigation/native';

import {AirbnbRating} from 'react-native-ratings';

interface IProductDTO {
  item: {
    id: number;
    image: ImageURISource;
    title: string;
    description: string;
    price: number;
    rating: number;
    quantity: number;
  };
}

interface IHomeProps {
  navigation: DrawerNavigationProp<any, any>;
}
type ParamList = {
  ProductDetail: IProductDTO;
};

type ProductDetailScreenRouteProp = RouteProp<ParamList, 'ProductDetail'>;

const ProductDetailScreen = ({navigation}: IHomeProps) => {
  const {item} = useRoute<ProductDetailScreenRouteProp>().params;

  const navigateToCart = useCallback(() => {
    navigation.navigate('Cart');
  }, [navigation]);

  console.log(item);

  function Header() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginBottom: 30,
        }}>
        <View>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={navigateToCart}>
            <Icon name="shopping" size={20} color="#ddd" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  function ProductImage() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            height: 200,
            width: 200,
            shadowColor: '#eee',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            elevation: 3,
            borderRadius: 8,
          }}>
          <Image
            source={item.image}
            resizeMode="cover"
            style={{
              height: '100%',
              width: '100%',
              borderRadius: 8,
            }}
          />
        </View>
      </View>
    );
  }

  function Title() {
    return (
      <View style={{marginTop: 20}}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  }

  function Description() {
    return (
      <View style={{marginTop: 20}}>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  }

  function Rating() {
    return (
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <AirbnbRating
          count={5}
          size={20}
          showRating={false}
          isDisabled={true}
          defaultRating={item.rating}
        />
      </View>
    );
  }

  function PlusAndMinusButton() {
    return (
      <View
        style={{
          backgroundColor: '#eee',
          borderRadius: 8,
          padding: 8,
          elevation: 5,
          marginTop: 20,

          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <View>
          <Text style={styles.price}>$ {item.price}</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              padding: 4,
              backgroundColor: '#eee',
            }}>
            <Icon name="minus" size={20} color="#000" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#eee',
              padding: 4,
            }}>
            <Icon name="plus" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function AddItemToCart() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          backgroundColor: '#eee',
          borderRadius: 8,
          padding: 20,
          elevation: 5,
          marginTop: 20,

          paddingHorizontal: 20,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}}>
            <Text style={styles.addToCartText}>ADD TO CART</Text>
          </View>
          <View>
            <Icon name="cart" size={30} color="#000" />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#232323',
          paddingTop: 30,
          paddingHorizontal: 20,
        }}>
        {Header()}
        {ProductImage()}
        {Title()}
        {Description()}
        {Rating()}
        {PlusAndMinusButton()}
        {AddItemToCart()}
      </View>
    </>
  );
};

export default ProductDetailScreen;

const styles = createStyles({
  title: {
    fontSize: '2rem',
    fontFamily: 'Roboto-Bold',
    color: '#fff',
    textAlign: 'center',
  },
  description: {
    fontSize: '1.2rem',
    fontFamily: 'Roboto-Bold',
    color: '#fff',
    textAlign: 'center',
  },
  price: {
    fontSize: '1.6rem',
    fontFamily: 'Roboto-Bold',
    color: '#000',
    textAlign: 'center',
  },
  quantity: {
    fontSize: '1.6rem',
    fontFamily: 'Roboto-Bold',
    color: '#000',
    textAlign: 'center',
  },
  addToCartText: {
    fontSize: '1.2rem',
    fontFamily: 'Roboto-Bold',
    color: '#000',
    textAlign: 'center',
  },
});
