function generators(params) {
  let i = 0;

  return {
    next() {
      if (i === params.length) {
        return {
          value: undefined,
          done: true,
        };
      }

      const res = {
        value: params[i],
        done: false,
      };

      i++;

      return res;
    },
  };
}

const gener = {
  [Symbol.iterator](n = 10) {
    let i = 0;
    return {
      next() {
        if (i === n) {
          return {
            value: undefined,
            done: true,
          };
        }

        const res = {
          value: i,
          done: false,
        };

        i++;

        return res;
      },
    };
  },
};

for (const k of gener) {
  console.log(k);
}
