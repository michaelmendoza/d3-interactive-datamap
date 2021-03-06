import 'normalize.css';
import './App.scss';

import { useReducer } from 'react';
import MapSelect, { MapOptions } from './DataMap/components/MapSelect';
import DataMap from './DataMap/components/DataMap';
import PointMap from './DataMap/components/PointMap';
import FeatureMap from './DataMap/components/FeatureMap';
import { MapTypes } from './DataMap/components/MapConstants';
import { MockFilterData } from './DataMap/services/MockFilterData';

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateContinent':
      return { ...state, continent: action.continent };
    case 'updateMapType':
      return { ...state, mapType: action.mapType }
    default:
      throw new Error();
  }
}

function App() {

  const initialState = { continent:MapOptions.World, mapType: MapTypes.DataMap };
  const [state, dispatch] = useReducer(reducer, initialState);
  const filter = MockFilterData();

  return (
    <div className="App">
      <header className="App-header">
        Interactive Map Playground 
      </header>
      <section>
        <div>
          <button onClick={() => { dispatch({type:"updateMapType", mapType:MapTypes.DataMap})} }> Data Map </button>
          <button onClick={() => { dispatch({type:"updateMapType", mapType:MapTypes.PointMap})} }> Point Map </button>
          <button onClick={() => { dispatch({type:"updateMapType", mapType:MapTypes.SimpleMap})} }> Feature Map </button>

        </div>

        <div> 
          <MapSelect continent={state.continent} setContinent={(d)=>{ dispatch({type:"updateContinent", continent:d})}}></MapSelect>
        </div>
        <div className="layout-row-center">
          {
            state.mapType === MapTypes.DataMap ? <DataMap map={state.continent} filter={filter} width={500} height={500}></DataMap> : null

          }
          {
            state.mapType === MapTypes.PointMap ? <PointMap map={state.continent} filter={filter} max={10000} width={500} height={500}></PointMap> : null
          }
          {
            state.mapType === MapTypes.SimpleMap ? <FeatureMap map={state.continent} features={filter.geoJson.features} width={500} height={500}></FeatureMap> : null

          }
        </div>

      </section>
    </div>
  );
}

export default App;
