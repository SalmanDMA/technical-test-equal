// Fungsi untuk enkripsi data
async function encryptedData(data: string): Promise<string> {
  return new Promise((resolve) => {
    const encryptedData = btoa(data);
    resolve(encryptedData);
  });
}

async function decryptedData(encryptedData: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const decryptedData = atob(encryptedData);
      resolve(decryptedData);
    } catch (error) {
      reject("Invalid encrypted data");
    }
  });
}

export { encryptedData, decryptedData };
