const axios = require('axios');
const admin = require('../config/firebaseConfig');
const API_KEY = PROCESS_ENV_API;

exports.createUser = async (req, res) => {
  const { name, zipcode } = req.body;
  if (!name || !zipcode) {
    return res.status(400).json({ error: 'Name and zipcode are required' });
  }
  
  try {
    const weatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        zip: `${zipcode},us`, 
        appid: API_KEY
      }
    });
    const { coord, timezone } = weatherResponse.data;
    const userData = {
      name,
      zipcode,
      longitude: coord.lon,
      latitude: coord.lat,
      timezone
    };
    
    const newUserRef = admin.database().ref('users').push();
    await newUserRef.set(userData);
    
    return res.status(201).json({ id: newUserRef.key, ...userData });
  } catch (error) {
    console.error("Error in createUser:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const snapshot = await admin.database().ref('users/' + userId).once('value');
    const userData = snapshot.val();
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ id: userId, ...userData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, zipcode, longitude, latitude } = req.body;
  
  try {
    const snapshot = await admin.database().ref('users/' + userId).once('value');
    const currentUser = snapshot.val();
    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    let updatedData = { name, zipcode };

    let newApiData = null;
    if (zipcode !== currentUser.zipcode) {
      const weatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          zip: `${zipcode},us`,
          appid: API_KEY
        }
      });
      newApiData = weatherResponse.data;
    } 
    else if ((longitude != currentUser.longitude) || (latitude != currentUser.latitude)) {
      const weatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          lat: latitude,
          lon: longitude,
          appid: API_KEY
        }
      });
      newApiData = weatherResponse.data;
    }
    
    if (newApiData) {
      const { coord, timezone } = newApiData;
      updatedData.longitude = coord.lon;
      updatedData.latitude = coord.lat;
      updatedData.timezone = timezone;
    } else {
      updatedData.longitude = currentUser.longitude;
      updatedData.latitude = currentUser.latitude;
      updatedData.timezone = currentUser.timezone;
    }
    
    await admin.database().ref('users/' + userId).update(updatedData);
    return res.json({ id: userId, ...updatedData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
