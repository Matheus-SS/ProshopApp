import React, {useCallback} from 'react';
import {DrawerNavigationProp} from '@react-navigation/drawer';

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageURISource,
} from 'react-native';

import {createStyles} from '@styles/index';
import {products} from '../../../constants/products';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardProduct from '@components/CardProducts';
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

const HomeScreen = ({navigation}: IHomeProps) => {
  const layoutWidth = '50%';

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
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            paddingRight: 40,
          }}>
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
          decelerationRate="fast"
          contentContainerStyle={{paddingBottom: 140}}
          initialNumToRender={6}
          maxToRenderPerBatch={3}
          windowSize={5}
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
