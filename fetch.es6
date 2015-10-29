const timeout = 2000;
export default () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ title: 'hello world', text: 'Here is some text' });
    }, timeout);
  });
};
