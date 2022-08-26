const EventBus = require('./event-bus.js');

const eventBus = new EventBus();

const something = (numberA, numberB) => {
  console.log("i'm a subscription", numberA, numberB);

  return numberA + numberB;
};

const subscriber = eventBus.subscribeOn('sum', something);
const subscriber2 = eventBus.subscribeOn('sum', something);
