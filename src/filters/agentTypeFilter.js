const options = [
  {
    label: "academic",
    value: "academic",
    default: false,
  },
  {
    label: "commercial",
    value: "commercial",
    default: false,
  },
];

/**
 * Filters agents by their queueing type.
 *
 * This is for legacy testing purposes and should be ignored.
 */
export const AgentTypeFilter = () => ({
  title: "Rubro de Agente",
  id: "data.attributes.type",
  fieldName: "type",
  type: "multiValue",
  options,
  condition: "IN",
});
