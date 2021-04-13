import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from '../components/DrawerContent';
import MainStackScreen from './stack.routes';

const RootDrawer = createDrawerNavigator();

const RootDrawerRoutes = () => {
  return (
    <RootDrawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}>
      <RootDrawer.Screen name="HomeRoot" component={MainStackScreen} />
    </RootDrawer.Navigator>
  );
};

export default RootDrawerRoutes;
