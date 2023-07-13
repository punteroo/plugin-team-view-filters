import { useState } from "react";
import { Checkbox } from "@twilio-paste/core/checkbox";

/**
 * Represents a single checkbox element for the group.
 *
 * @param {{
 *   handleChange: Function,
 *   optionName: string,
 * }} props The component properties.
 *
 * @returns
 */
export const GroupCheckbox = ({
  handleChange,
  optionName,
}) => {
  /** React state for keeping a controller checkbox (Twilio-Paste requirement) */
  const [checked, setChecked] = useState(false);

  const _handleChange = (e) => {
    // Set the checked state.
    setChecked(e.target.checked);

    // Also reflect this on the parent component.
    // Everytime the checkbox is changed, the parent component will set the state of the option that was changed (at the root component level)
    // This way, all changes are instant on the root component and forwarded back to Flex UI for query building.
    handleChange({ queue: optionName, state: e.target.checked });
  };

  return (
    <Checkbox
      id={`${optionName}-checkbox`}
      value={`${optionName}-checkbox`}
      name={`${optionName}-checkbox`}
      checked={checked}
      onChange={_handleChange}
    >
      {optionName ?? "Unknown"}
    </Checkbox>
  );
};
