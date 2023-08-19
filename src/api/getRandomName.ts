import axios from 'axios';

export const getRandomName =  async () => {
    const {data} = await axios<[0]>('https://random-word-api.herokuapp.com/word');

    // console.log(data[0]);
    return data[0];
}