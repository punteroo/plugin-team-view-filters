import {
  QueueCheckboxGroupLabel,
  QueueCheckboxGroup,
} from "../components/CheckboxGroup";
import { queues } from "../helpers";

/** Name of the field to compare for the filter. */
const field = "data.attributes.queue";

export const QueueGroupFilter = () => ({
  title: "Agent Type",
  id: field,
  fieldName: "queue-grouped",
  type: "multiValue",
  options: Object.keys(queues).map((q) => {
    // Concat all queue names into a multivalue field.
    const queuesConcat = queues[q].join('", "');

    return {
      // Flex UI BUG: If the label is NOT the same as the value, the filter will not work. Bug should be fixed on next release post v2.3.2
      label: queuesConcat,
      value: queuesConcat,
      default: false,
      metadata: {
        queue: q,
        // Send the original array of options to filter later.
        original: queues[q],
      },
    };
  }),
  customStructure: {
    field: <QueueCheckboxGroup />,
    label: <QueueCheckboxGroupLabel />,
  },
  condition: "IN",
});
