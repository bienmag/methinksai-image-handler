const API_KEY = import.meta.env.VITE_API_KEY;

const API = {
  async getImages() {
    try {
      const response = await fetch('https://perenual.com/api/species-list?page=1&key=' + API_KEY);
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await response.json();
      return data.data;
    } catch (e) {
      console.error(e);
      return [];
    }
  },
};

export default API;

export const dicoms = [
  { id: 'vhm.1129.dcm' },
  { id: 'vhm.1150.dcm' },
  { id: 'vhm.1158.dcm' },
  { id: 'vhm.1164.dcm' },
  { id: 'vhm.1173.dcm' },
  { id: 'vhm.1178.dcm' },
  { id: 'vhm.1186.dcm' },
  { id: 'vhm.1190.dcm' },
  { id: 'vhm.1194.dcm' },
  { id: 'vhm.1195.dcm' },
  { id: 'vhm.1204.dcm' },
  { id: 'vhm.1208.dcm' },
  { id: 'vhm.1215.dcm' },
  { id: 'vhm.1219.dcm' },
  { id: 'vhm.1222.dcm' },
  { id: 'vhm.1227.dcm' },
  { id: 'vhm.1235.dcm' },
  { id: 'vhm.1240.dcm' },
];
