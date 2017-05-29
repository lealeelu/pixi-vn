export default class Simple {
  // compares two arrays and returns the first intersection
  static firstIntersect(seta, setb) {
    let match = null;
    seta.some((a) => {
      if (setb.includes(a)) {
        match = a;
        return true;
      }
      return false;
    });
    return match;
  }
}
