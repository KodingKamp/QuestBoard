import { v4 as uuid } from "uuid";

/**
 * Creates a new Campaign object
 * @returns A Campaign object.
 */
export const createNewCampaign = () => {
  return {
    name: '',
    version: 0,
    lastModifiedDate: null,
    nodes: {
      Root: {
        id: 'Root',
        childrenIds: [],
        name: 'Root'
      },
    },
    quests: [],
    activityLog: {} // {'2023-08-18': [{activityItem}]}
  };
};

/**
 * Creates a new Note object.
 * @param {string} description The description of the note.
 * @returns A Note object.
 */
export const createNoteItem = (
  description,
) => {
  let now = new Date();
  return {
    description: description,
    timeStamp: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`
  }
};

/**
 * Create a new Quest object.
 * @param {string} name The display name of the Quest.
 * @param {string} description The description of the Quest.
 * @returns A Quest object.
 */
export const createNewQuest = (
  name,
  description = ''
) => {
  return {
    id: uuid(),
    name: name,
    description: description,
    notes: [],
    isAvailable: true,
    isComplete: false,
  };
};

/**
 * Creates a new Activity Item object for the Activity Log of a Campaign.
 * @param {string} description 
 * @param {string} type The type of the parent entity.
 * @param {string} parentEntityId The ID of the parent entity.
 * @returns An Activity Item object.
 */
export const createNewActivityItem = (
  type,
  parentEntityId,
  description = '',
) => {
  let now = new Date();
  return {
    id: uuid(),
    description: description,
    type: type,
    parentId: parentEntityId,
    timestamp: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
  };
};

/**
 * Creates a new Node object.
 * @param {string} parentNode The UUID of the parent Node.
 * @returns An Node object.
 */
export const createNewNode = (
  parentNode = 'Root'
) => {
  return {
    id: uuid(),
    name: '',
    description: '',
    type: 'GenericNode',
    parentId: parentNode,
    childrenIds: [],
    intel: [],
    notes: [], 
    isUnlocked: false, // Where or not players can visit this node.
    hasVisited: false, // Whether or not players have visited this node yet.
    isAvailable: true, // Whether or not players can visit this anymore.
  };
};

/**
 * Creates a new Intel object.
 * @param {string} parentNode UUID of the parent Node.
 * @param {string} intelName The display name of the Intel.
 * @param {string} intelDescription The description of the Intel.
 * @returns A Intel object.
 */
export const createNewIntel = (
  parentNode, 
  intelName = '', 
  intelDescription = '',
) => {
  return {
    id: uuid(),
    name: intelName,
    description: intelDescription,
    type: 'Intel',
    parentId: parentNode,
    hasObtained: false,
    linkedQuestId: null, // The ID of a quest.
  };
};
