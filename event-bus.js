class EventBus {
  #eventsSubscriptionMap;

  constructor() {
    this.#eventsSubscriptionMap = {};
  }

  _getEvent(eventName, { createIfAbsent = false } = {}) {
    let subscriptionMap = this.#eventsSubscriptionMap[eventName];

    if (!subscriptionMap && createIfAbsent)
      this.#eventsSubscriptionMap[eventName] = {};

    return this.#eventsSubscriptionMap[eventName];
  }

  _unsubscribe(subscriptionId) {
    console.log('unsubscribing ', subscriptionId);
    //TODO: Implement unsubscribe
  }

  subscribeOn(eventName, callback) {
    const event = this._getEvent(eventName, { createIfAbsent: true });
    const subscriptionId = Symbol(eventName);

    event[subscriptionId] = callback;

    return {
      unsubscribe: () => this._unsubscribe(subscriptionId),
    };
  }

  // TODO: subscribeOnceOn
}

module.exports = EventBus;
