export default class Simple {
  // compares two arrays and returns the first intersection
  static firstIntersect(seta, setb) {
    let match = -1;
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
