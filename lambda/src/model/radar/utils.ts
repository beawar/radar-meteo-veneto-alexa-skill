export function buildRadarUrls() {
  const requests = [];
  const timestamp = new Date().getTime();
  for (let i = 6; i > 0; i--) {
    const url = `https://www.arpa.veneto.it/bollettini/meteo/radar/imgs/teolo/${i.toString()}_BASE.jpg?${timestamp.toString()}`;
    requests.push(url);
  }
  return requests;
}
