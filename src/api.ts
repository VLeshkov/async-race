import { Car, Winner } from './interfaces';

const URL = 'http://127.0.0.1:3000/';

async function getCars(page?: number, limit?: number) {
  const url = (page) ? URL + `garage?_page=${page}&_limit=${limit}` : URL + 'garage';
  const response = await fetch(url);

  const cars = await response.json();

  return cars;
}

async function writeCar(data: Car) {
  const url = URL + 'garage';

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

async function deleteCar(id: number) {
  const url = URL + 'garage/' + id;

  await fetch(url, {
    method: 'DELETE',
  });
}

async function getTotalCarsNumber() {
  const response = await getCars();
  return response.length;
}

async function startStopEngine(id: number, status: string) {
  const url = URL + `engine?id=${id}&status=${status}`;
  const response = await fetch(url, {
    method: 'PATCH',
  });
  return response.json();
}

async function checkEngine(id: number) {
  const url = URL + `engine?id=${id}&status=drive`;
  const response = await fetch(url, {
    method: 'PATCH',
  });
  return response;
}

// async function getWinners(page?: number, limit?: number, sort?: ['id' | 'wins' | 'time'], order?: ['ASC' | 'DESC']) {
//   const url = URL + 'winners';
//   const response = await fetch(url);
//   return response.json();
// }

async function getWinner(id: number) {
  const url = URL + `winners?id=${id}`;
  const response = await fetch(url);
  return response.json();
}

async function createWinner(winnerObj: Winner) {
  const url = URL + 'winners';
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(winnerObj),
  });
}

async function deleteWinner(id: number) {
  const url = URL + `winners?id=${id}`;
  await fetch(url, {
    method: 'DELETE',
  });
}

async function updateWinner(id: number, winnerObj: Winner) {
  const url = URL + `winners/${id}`;
  await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(winnerObj),
  });
}

export { getCars, writeCar, deleteCar, getTotalCarsNumber, startStopEngine, checkEngine, getWinner, createWinner, deleteWinner, updateWinner };