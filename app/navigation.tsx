import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InventoryScreen from '../screens/InventoryScreen';
import AboutMeScreen from '../screens/aboutMeScreen';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            // 🔧 Inicializamos con valor por defecto
            let iconName: keyof typeof Ionicons.glyphMap = 'help';

            if (route.name === 'Inicio') {
                iconName = 'home';
              } else if (route.name === 'Productos') {
                iconName = 'pricetags';
              } else if (route.name === 'Perfil') {
                iconName = 'person';
              } else if (route.name === 'Inventario') {
                iconName = 'cube';
              } else if (route.name === 'AcercaDe') {
                iconName = 'information-circle-outline';
              }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Inicio" component={HomeScreen} />
        <Tab.Screen name="Productos" component={ProductScreen} />
        <Tab.Screen name="Perfil" component={ProfileScreen} />
        <Tab.Screen name="Inventario" component={InventoryScreen} />
        <Tab.Screen name="AcercaDe" component={AboutMeScreen} />


      </Tab.Navigator>
    </NavigationContainer>
  );
}
