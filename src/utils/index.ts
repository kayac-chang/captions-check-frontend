type Map = HTMLElementEventMap;
type Events = keyof Map;

interface Listener<K extends Events> {
  (this: HTMLElement, ev: Map[K]): any;
}

export interface Vector {
  x: number;
  y: number;
}

export function listen<T extends HTMLElement>(element: T) {
  const map: Partial<Record<Events, any[]>> = {};

  return {
    add<K extends Events>(event: K, func: Listener<K>) {
      if (!map[event]) map[event] = [];

      map[event]?.push(func);

      element.addEventListener(event, func);

      return this;
    },
    clear() {
      Object.entries(map).forEach(([event, listeners]) =>
        listeners.forEach((listener) =>
          element.removeEventListener(event, listener)
        )
      );

      return this;
    },
  };
}
