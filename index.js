import EventBus from './event-bus.js';

const eventBus = new EventBus();

const something = (theThing, num, theOtherThing) => {
  console.log("i'm a subscription", theThing, num, theOtherThing);
  if (theThing.a === 10) {
    theThing.a = 11;
    theThing.b.c = 1;
    theOtherThing[0] = 1;
  }
};

const subscriber = eventBus.subscribeOn('sum', something);
const subscriber2 = eventBus.subscribeOn('sum', something);

const subscriber3 = eventBus.subscribeOn('multiple', something);

const theThing = { a: 10, b: { c: 0 } };
const theOtherThing = [2];

eventBus.publish('sum', theThing, 3, theOtherThing);

subscriber.unsubscribe();
subscriber2.unsubscribe();
subscriber3.unsubscribe();

eventBus.publish('sum', 10, 20);
