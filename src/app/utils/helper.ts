class Helper {
  public static enumValues(obj: any) {
    return Object.keys(obj).map((key) => {
      return obj[key];
    });
  }
}

export default Helper;
