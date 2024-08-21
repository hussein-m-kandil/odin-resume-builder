import React from "react";

/**
 * Returns an object has an `id` property equal to the given id
 * and `component` property equal to a React component with
 * `id` & `key` props both are equal to the given id,
 * in addition to any optionally given props.
 *
 * @param {string} id - A unique id to be used as the `id` prop
 * @param {React.ComponentType} type - Any React Component
 * @param {object?} props - An optional object of props
 * @returns {object} - Entry object: { id: string, component: React.ComponentType }
 */
export function createEntryObject(id, type, props = {}) {
  return {
    id,
    component: React.createElement(type, { id, key: id, ...props }),
  };
}

export default createEntryObject;
