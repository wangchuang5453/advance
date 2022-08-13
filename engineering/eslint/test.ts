type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}

const test = (a) => {
  console.log(a);
  return true 
}
test.description = '111'
doSomething(test)
