import React, {useCallback, useState} from 'react';
import {DrawerNavigationProp} from '@react-navigation/drawer';

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageURISource,
} from 'react-native';

import {
  Transition,
  Transitioning,
  TransitioningView,
} from 'react-native-reanimated';

import {createStyles} from '../../../styles/index';
import {products} from '../../../constants/products';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CartItems from '../../components/CartItems';

interface ICartItemsDTO {
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

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

const CartScreen = ({navigation}: IHomeProps) => {
  const [open, setIsOpen] = useState(true);

  const ref = React.useRef<TransitioningView | null>(null);

  const navigateToCart = useCallback(() => {
    navigation.navigate('Cart');
  }, [navigation]);

  function Header() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 40,
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

  function Title() {
    return (
      <View
        style={{
          paddingLeft: 40,
          paddingVertical: 10,
          marginTop: 20,
          marginBottom: 20,
        }}>
        <Text style={styles.title}>
          Shopping {'\n'}
          cart
        </Text>
      </View>
    );
  }

  const renderItem = ({item}: ICartItemsDTO) => {
    return <CartItems item={item} />;
  };

  function ProductList() {
    return (
      <View style={{height: '65%'}}>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{paddingBottom: 20}}
        />
      </View>
    );
  }

  function ShoppingCartSummary() {
    return (
      <Transitioning.View
        ref={ref}
        transition={transition}
        style={{
          backgroundColor: '#fff',
          width: '100%',
          position: 'absolute',
          bottom: 0,
          paddingHorizontal: 15,
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.summaryItemsTitle}>Shopping Cart Summary</Text>
          <TouchableOpacity
            onPress={() => {
              ref.current?.animateNextTransition();
              setIsOpen(!open);
            }}>
            <Icon
              name={`${open ? 'chevron-down' : 'chevron-up'}`}
              size={30}
              color="#232323"
            />
          </TouchableOpacity>
        </View>

        {open && (
          <View>
            {/* number of items */}
            <View style={styles.summaryItems}>
              <Text style={styles.summaryItemsText}>Number of items:</Text>
              <Text style={styles.summaryItemsValues}>3</Text>
            </View>
            {/* SUBTOTAL */}
            <View style={styles.summaryItems}>
              <Text style={styles.summaryItemsText}>Subtotal:</Text>
              <Text style={styles.summaryItemsValues}>50.0</Text>
            </View>
            {/* TAX */}
            <View style={styles.summaryItems}>
              <Text style={styles.summaryItemsText}>Tax:</Text>
              <Text style={styles.summaryItemsValues}>2.00</Text>
            </View>
            {/* TOTAL */}
            <View style={styles.summaryItems}>
              <Text style={styles.summaryItemsText}>Total:</Text>
              <Text style={styles.summaryItemsValues}>53.00</Text>
            </View>

            <View
              style={{
                marginTop: 10,
                marginBottom: 20,
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  backgroundColor: '#232323',
                  padding: 10,
                  paddingHorizontal: 40,
                  borderRadius: 30,
                }}>
                <Text style={styles.summaryItemsButtonText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Transitioning.View>
    );
  }

  return (
    <>
      <View
        style={{
          backgroundColor: '#232323',
          paddingTop: 20,
          flex: 1,
        }}>
        {Header()}
        {Title()}
        {ProductList()}
        {ShoppingCartSummary()}
      </View>
    </>
  );
};

export default CartScreen;

const styles = createStyles({
  title: {
    fontSize: '2rem',
    fontFamily: 'Roboto-Bold',
    color: '#fff',
  },
  summaryItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
  },
  summaryItemsText: {
    fontSize: '1.3rem',
    fontFamily: 'Roboto-Regular',
  },
  summaryItemsValues: {
    fontSize: '1.2rem',
    fontFamily: 'Roboto-Regular',
  },
  summaryItemsTitle: {
    fontSize: '1.5rem',
    fontFamily: 'Roboto-Bold',
    marginTop: 20,
    marginBottom: 24,
  },
  summaryItemsButtonText: {
    color: '#fff',
    textAlign: 'right',
    fontSize: '1.1rem',
    fontFamily: 'Roboto-Bold',
  },
});
