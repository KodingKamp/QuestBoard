import { v4 as uuid } from "uuid";

/**
 * Creates a new Quest object
 * @returns A Quest object.
 */
export const createNewQuest = () => {
  return {
    version: 0,
    lastModifiedDate: null,
    entities: {
      Root: {
        id: 'Root',
        children: [],
      },
    },
  };
};

/**
 * Creates a new Entity object.
 * @param {string} entityName The display name of the Entity.
 * @param {string} description The description of the Entity.
 * @param {string} type The type of the Entity. Cannot be 'Intel'
 * @param {string} parentEntity The UUID of the parent Entity.
 * @returns An Entity object.
 */
export const createNewEntity = (
  entityName,
  description,
  type,
  parentEntity = 'Root',
) => {
  return {
    id: uuid(),
    name: entityName,
    description: description,
    type: type === 'Intel' ? null : type,
    parent: parentEntity,
    children: [],
    intel: [],
    unlocked: false,
  };
};

/**
 * Creates a new Intel object.
 * @param {string} parentEntity UUID of the parent Entity.
 * @param {string} intelName The display name of the Intel.
 * @param {string} intelDescription The description of the Intel.
 * @returns A Intel object.
 */
export const createNewIntel = (
  parentEntity, 
  intelName = '', 
  intelDescription = '',
) => {
  return {
    id: uuid(),
    name: intelName,
    description: intelDescription,
    type: 'Intel',
    parent: parentEntity,
    unlocked: false,
  };
};
