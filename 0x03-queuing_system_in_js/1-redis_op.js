import { createClient, print } from 'redis';

const client = createClient();

client.on('error', (err) =>
  console.log(`Redis client not connected to the server: ${err}`)
);
client.on('connect', () => console.log('Redis client connected to the server'));

async function setNewSchool(schoolName, value) {
  await client.set(schoolName, value, print);
}

function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, reply) => {
    if (!err) {
      return console.log(reply);
    }
    console.log(err.message);
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
