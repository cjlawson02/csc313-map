import './style.css';
import {Map, View, Feature} from 'ol';
import {Point} from 'ol/geom';
import {fromLonLat} from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Circle from 'ol/style/Circle';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

const cpCoord = fromLonLat([-120.66, 35.301]);
const sloCoord = fromLonLat([-120.6596, 35.2828]);
const sbCoord = fromLonLat([-119.6982, 34.4208]);
const laCoord = fromLonLat([-118.2426, 34.0549]);

const sloFeature = new Feature({
  geometry: new Point(sloCoord)
});

const sbFeature = new Feature({
  geometry: new Point(sbCoord)
});

const laFeature = new Feature({
  geometry: new Point(laCoord)
});

function createStyle(population) {

  return new Style({
    image: new Circle({
      fill:  new Fill({
        // color based on population variable
        color: population < 10 ? 'green' : population < 20 ? 'orange' : 'red'
      }),
      stroke: new Stroke({
        color: '#3399CC',
        width: 1.25,
      }),
      radius: Math.sqrt(population) * 10,
    })
  });
}

sloFeature.setStyle(createStyle(5));
sbFeature.setStyle(createStyle(10));
laFeature.setStyle(createStyle(20));

const vectorSource = new VectorSource({
  features: [sloFeature, sbFeature, laFeature],
});

const vectorLayer = new VectorLayer({
  source: vectorSource,
});

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    vectorLayer
  ],
  view: new View({
    center: cpCoord,
    zoom: 8
  })
});
