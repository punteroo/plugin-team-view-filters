import React, { useState } from "react";
import { GroupCheckbox } from "./Checkbox";
import { CheckboxGroup as PasteCheckboxGroup } from '@twilio-paste/core/checkbox';

/**
 * Handles checking a group of options displaying a proper label.
 *
 * This is a workaround to not display checkboxes where label and value must be the same for the filter to work (bug in Flex UI), thus allowing a proper visualization of the options.
 *
 * @param {{
 *  handleChange: Function,
 *  options: Array<{ label: string, value: string, default?: boolean, metadata?: any }>,
 *  name: string,
 * }} props Destructured component properties, first three properties are required and injected from Flex UI.
 *
 * @returns
 */
export const QueueCheckboxGroup = ({ handleChange, options, name }) => {
  /** Keep track of checked options. */
  const [checkedOptions, setCheckedOptions] = useState(
    options.map((o) => ({
      queue: o.metadata?.queue ?? "Unknown",
      state: o.default ?? false,
    }))
  );

  /**
   * Handles the change of each checkbox into a single value.
   *
   * @param {{ queue: string, state: boolean }} option The option that was changed.
   * @noreturn
   */
  const handleChangeGlobally = (option) => {
    // Reflect the option state change on the array.
    setCheckedOptions((previous) => {
      // Clone the array to avoid mutating the state (for now)
      const clone = [...previous];

      // Search for the option in the array and change it.
      const objOption = clone.find((o) => o.queue === option.queue);

      // If found, apply the mutation logic.
      if (objOption) {
        // Change the root option state.
        objOption.state = option.state;

        // Find all options that have been checked.
        const checked = options.filter((opt) =>
          clone.find((o) => o.queue === opt.metadata?.queue && o.state)
        );

        // Map the checked options to their string value into an array.
        const final = checked.map((o) => o.value);

        // Set the final result as an array of multivalues.
        // handleChange is provided by Flex UI onto the TeamsView component, and is expecting either a full string or an array of strings.
        //
        //  - If an array is passed, the query is formed as 'field IN ["value1", "value2", "value3"]'.
        //  - If a string is passed, the query is formed as 'field IN "value1", "value2", "value3"'.
        //
        // Keep in mind, for this filter as default, it's comparing a worker attribute (array of strings) against a multivalue field (array of strings).
        // This can work both ways depending on your use case, but it's important to keep in mind.
        handleChange(checked?.length ? final : "");
      }

      // Finally set the state (for other uses if needed)
      return clone;
    });
  };

  return (
    /** Read more at: https://paste.twilio.design/components/checkbox#checkbox-group */
    <PasteCheckboxGroup>
      {
        // Start rendering checkboxes for each grouped multivalue option set.
        options.map((value, index) => (
          <GroupCheckbox
            key={index}
            // Passed on from the root component (current file) for the checkbox to solely change the state of their option on root.
            handleChange={handleChangeGlobally}
            optionName={value.metadata?.queue ?? "Unknown"}
          />
        ))
      }
    </PasteCheckboxGroup>
  );
};

/**
 * Controls the label displayed for the checkbox group.
 */
export const QueueCheckboxGroupLabel = ({ currentValue }) => {
  return currentValue?.length ? <>{currentValue.length} enabled</> : <>None</>;
};
