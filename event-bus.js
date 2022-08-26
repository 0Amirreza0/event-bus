import deepClone from './utilities/deep-clone.js';

class EventBus {
  #eventsSubscriptionMap;

  constructor() {
    this.#eventsSubscriptionMap = {};
  }

  _getEvent(eventName, { createIfAbsent = false } = {}) {
    if (!eventName) throw new Error('eventName is required');

    let subscriptionMap = this.#eventsSubscriptionMap[eventName];

    if (!subscriptionMap && createIfAbsent)
      this.#eventsSubscriptionMap[eventName] = {};

    return this.#eventsSubscriptionMap[eventName];
  }

  _unsubscribe(eventName, subscriptionId) {
    console.log('unsubscribing ', subscriptionId);
    //TODO: Implement unsubscribe
  }

  subscribeOn(eventName, callback) {
    const event = this._getEvent(eventName, { createIfAbsent: true });
    const subscriptionId = Symbol(eventName);

    event[subscriptionId] = callback;

    return {
      id: subscriptionId,
      eventName,
      unsubscribe: () => this._unsubscribe(eventName, subscriptionId),
    };
  }

  // TODO: subscribeOnceOn

  publish(eventName, ...args) {
    const event = this._getEvent(eventName);

    if (!event) throw new Error(`Found no event named: ${eventName}`);

    const subscriberIdList = Object.getOwnPropertySymbols(event);

    subscriberIdList.forEach((subscriberId) => {
      const subscription = event[subscriberId];

      const subscriptionArguments = deepClone(args);
      subscription(...subscriptionArguments);
    });
  }
}

export default EventBus;
