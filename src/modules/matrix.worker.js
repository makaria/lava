import Matrix from './matrix';
// import trialAndError from './exhaustion';
// 10*10: 25ms, 100*100: 50000ms
self.addEventListener('message', event => {
  const { state, colNum, rowNum, type } = event.data;
  // console.time('calc');
  const result = Matrix.magic(state, rowNum, colNum);
  // const result = trialAndError(state, rowNum, colNum);
  // console.timeEnd('calc');
  self.postMessage({ result, type });
});
