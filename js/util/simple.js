export default class Simple {
  // compares two arrays and returns the first intersection
  static compareReturn(seta, setb) {
    for (const a of seta) {
      if (setb.includes(a)) {
        return a;
      }
    }
    return null;
  }
}
