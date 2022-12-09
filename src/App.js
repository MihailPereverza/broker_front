import logo from './logo.svg';
import './App.css';
import BrokerList from "./elements/brokerList/BrokerList";
import CreateBrokerModal from "./elements/createBrokerModal/createBrokerModal";
import {Link, Route, Routes} from 'react-router-dom'
import BrokerListPage from "./brokersListPage/brokerListPage";
import {createStyles, makeStyles} from "@mui/styles";
import MarketSettingsPage from "./marketSettingsPage/marketSettingsPage";
import MarketList from "./elements/marketList/marketList";


function App() {
  return (
      <div>
          <header>
              <nav>
                  <ul>
                      <li>
                          <Link to="admin/broker/list">Список брокеров</Link>
                      </li>
                      <li>
                          <Link to="/admin/market/settings">Настройки биржи</Link>
                      </li>
                      <li>
                          <Link to="/admin/market/list">Акции</Link>
                      </li>
                  </ul>
              </nav>
          </header>
          <Routes>
              <Route path='/admin/broker/list' element={<BrokerListPage/>}/>
              <Route path='/admin/market/settings' element={<MarketSettingsPage/>}/>
              <Route path='/admin/market/list' element={<MarketList/>}/>
          </Routes>
      </div>
  );
}

export default App;
