import { denormalize, normalize, schema } from "normalizr";

const author = new schema.Entity("author", {}, { idAttribute: "email" });

const message = new schema.Entity("message", {
  author: author,
});

const messages = new schema.Entity("messages", {
  messages: [message],
});

export const normalizer = (array) => {
  const normalizedData = normalize(array, messages);

  return normalizedData;
};

export const denormalizer = (array) => {
  const denormalizedData = denormalize(array.result, messages, array.entities);

  return denormalizedData;
};
