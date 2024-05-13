import {
  Admin,
  Resource,
  ListGuesser,
  radiantDarkTheme,
  radiantLightTheme
} from "react-admin";
import { dataProvider } from "./dataProvider";
import Dashboard from './Dashboard';
const darkTheme = { ...radiantLightTheme, ...radiantDarkTheme };

export const App = () => (
  <Admin dataProvider={dataProvider} 
    dashboard={Dashboard}
    theme={radiantLightTheme}
    darkTheme={darkTheme}
  >

    <Resource
      name="inventories"
      options={{ label: 'Table View' }} 
      list={ListGuesser}
    />
  </Admin>
);
