import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { MapCard } from './MapCard';
import passportData from '/passport.json'; // Import the JSON data

const Map = () => {
  const coralIcon = new Icon({
    iconUrl: passportData.passport.partner.profile_image, // Use partner's profile image
    iconSize: [55, 55],
    className:
      'rounded-full object-cover border-[3px] hover:border-primary transition-all hover:border-[3px]',
  });

  return (
    <div className="w-full flex justify-center my-20">
      <MapContainer
        center={[13.7563, 100.5018]} // Center around Bangkok
        zoom={12}
        scrollWheelZoom={false}
        className="h-[70vh] w-[80vw] rounded-2xl shadow-2xl"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {passportData.passport.events.map((event) => (
          <Marker
            icon={coralIcon}
            key={event.id}
            position={[event.location.lat, event.location.lng]}
          >
            <Popup closeButton={false} closeOnEscapeKey={true}>
              <MapCard
                img={event.image_url}
                title={passportData.passport.name}
                desc={passportData.passport.description}
              />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;