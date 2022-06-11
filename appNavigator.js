import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import Dashboard from './src/components/dashboard/dashboardComponent';
import AddToDo from './src/components/addToDo/addToDoComponent';
import EditToDo from './src/components/editToDo/editToDoComponent';
import AppRoutes from './appRoutes';

// const getInitialRouteName = () => {
//   return 'AddToDo';
// };

const AppNavigator = createSwitchNavigator(
  {
    Dashboard: {screen: Dashboard},
    AddToDo: {screen: AddToDo},
    EditToDo: {screen: EditToDo},
  },
  {
    initialRouteName: AppRoutes.DASHBOARD,
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
