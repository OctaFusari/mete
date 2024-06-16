import axios from 'axios';

const clientId = '0YymVenSpYZ0STqcIxP4FbwS4r0qtbGm';  // API KEY (octavian.fusari@unitn.studenti.it)
const clientSecret = 'DTLTJB7ll2tWGVcC';  // API Secret (octavian.fusari@unitn.studenti.it)

let accessToken = '';

const authenticate = async () => {
  const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', 
    new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    })
  );

  accessToken = response.data.access_token;
};

const searchFlights = async (origin: any, destination: any, departureDate: any) => {
  if (!accessToken) {
    await authenticate();
  }

  const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
    params: {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults: 1,
      max: 5,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.data;
};

export { searchFlights };