import 'react-native-gesture-handler'; //Please make sure no import comes before this one

import { View } from 'react-native-web';
import Home from './screens/Home';

import UserContext from './UserContext';
import NewPost from './screens/NewPost';
import SignedInStack from './components/navigation';


export default function App() {
  return (
    <>
      {/*<Navigation />*/}
      <SignedInStack/>
    </>

    /* Burger Menu */
    
    /* Feed */

    /* Widgets */
  );
}

