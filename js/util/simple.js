module.exports = class Simple{

  //compares two arrays and returns the first intersection
  static compare_return(seta, setb) {
    for (let a of seta) {
      if (setb.includes(a)) {
        return a;
      }
    }
  }
}
