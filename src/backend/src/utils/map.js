import config from '#src/config/config'
import openrouteservice from 'openrouteservice-js'

const getCoordinate = async (address, ward, district, province) => {
    const Geocode = new openrouteservice.Geocode({
        api_key: config.OPENROUTESERVICE_API_KEY,
    });
    const result = await Geocode.geocode({
        text: `${address}, ${ward}, ${district}, ${province}`,
        boundary_country: "VN",
        size: 1,
    });
    const [long, lat] = result.features[0].geometry.coordinates;
    const coordinates = [long, lat]
    return coordinates
}

const getDistance = async (srcLong, srcLat, desLong, desLat) => {
    const Directions = new openrouteservice.Directions({
        api_key: config.OPENROUTESERVICE_API_KEY,
    });
    const result = await Directions.calculate({
        coordinates: [[srcLong, srcLat], [desLong, desLat]],
        profile: "driving-car"
    });
    const { distance } = result.routes[0].summary;
    return distance
}

export {
    getCoordinate,
    getDistance
}