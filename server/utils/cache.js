const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient(process.env.REDIS_URL);

// Set a key-value pair in Redis with an optional expiration time (in seconds)
function set(key, value, ttl = null) {
  const setAsync = promisify(client.set).bind(client);
  const expireAsync = promisify(client.expire).bind(client);
  return setAsync(key, JSON.stringify(value)).then(() => {
    if (ttl) {
      return expireAsync(key, ttl);
    }
  });
}

// Get a value from Redis and parse it as JSON
function get(key) {
  const getAsync = promisify(client.get).bind(client);
  return getAsync(key).then((value) => {
    return JSON.parse(value);
  });
}

module.exports = {
  set,
  get,
};
