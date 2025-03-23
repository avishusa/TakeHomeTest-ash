const admin = require('../config/firebaseConfig');
const db = admin.database();
const usersRef = db.ref('users');

exports.createUser = async (userData) => {
  return new Promise((resolve, reject) => {
    const newUserRef = usersRef.push();
    newUserRef.set(userData, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve({ id: newUserRef.key, ...userData });
      }
    });
  });
};
