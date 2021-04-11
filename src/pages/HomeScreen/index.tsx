import React, {useCallback, useContext} from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageURISource,
} from 'react-native';

import {createStyles} from '../../../styles/index';
import {products} from '../../../constants/products';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardProduct from '../../components/CardProducts';
import {AuthContext} from '../../components/Context';

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
const HomeScreen = () => {
  const layoutWidth = '70%';
  const {signOut} = useContext(AuthContext);

  const navigation = useNavigation();

  const navigateToCart = useCallback(() => {
    navigation.navigate('Cart');
  }, [navigation]);

  function Header() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: layoutWidth,
            paddingLeft: 40,
            paddingVertical: 15,
          }}>
          <TouchableOpacity onPress={() => signOut()}>
            <Icon name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <TouchableOpacity onPress={navigateToCart}>
            <Icon name="shopping" size={20} color="#ddd" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function Title() {
    return (
      <View
        style={{
          paddingLeft: 40,
          paddingVertical: 10,
        }}>
        <Text style={styles.title}>Products</Text>
      </View>
    );
  }

  const renderItem = ({item}: IProductDTO) => {
    return <CardProduct item={item} />;
  };

  function ProductList() {
    return (
      <View style={{height: '100%'}}>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{paddingBottom: 140}}
        />
      </View>
    );
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#232323',
          width: layoutWidth,
        }}
      />
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
        }}>
        {Header()}
        {Title()}
        {ProductList()}
      </View>
    </>
  );
};

export default HomeScreen;

const styles = createStyles({
  title: {
    fontSize: '2rem',
    fontFamily: 'Roboto-Bold',
    color: '#fff',
  },
});
