export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === '230408002@ogr.uludag.edu.tr' && password === 'demo123456') {
        resolve({ username });
      } else if (username === 'demo' && password === 'demo123456') {
        resolve({ username });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
}
