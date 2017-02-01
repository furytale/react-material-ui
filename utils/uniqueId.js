export default {
  generate(pref: string = '') {
    return pref + (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
  },
};
