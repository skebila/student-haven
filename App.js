import 'react-native-gesture-handler'; //Please make sure no import comes before this one

import { View } from 'react-native-web';
import Home from './screens/Home';

import Navigation from './components/Navigation';
import UserContext from './UserContext';
import NewPostScreen from './screens/NewPostScreen';


export default function App() {
  return (
    <>
      {/*<NewPostScreen/>*/}
      <Navigation />
    </>

    /* Burger Menu */
    
    /* Feed */

    /* Widgets */
  );
}
