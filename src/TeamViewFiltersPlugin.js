import { TeamsView } from "@twilio/flex-ui";
import { FlexPlugin } from "@twilio/flex-plugin";
import { CustomizationProvider } from '@twilio-paste/core/customization';

import { QueueGroupFilter } from "./filters";

const PLUGIN_NAME = "TeamViewFiltersPlugin";

export default class TeamViewFiltersPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    // Load twilio-paste theme.
    flex.setProviders({
      PasteThemeProvider: CustomizationProvider,
    });

    // PD: This might be deprecated, just placing it in case it works as backwards compatibility. It doesn't affect if it's not present.
    manager.updateConfig({
      componentProps: {
        TeamsView: {
          filters: [TeamsView.activitiesFilter, QueueGroupFilter],
        },
      },
    });

    // Add the filter.
    TeamsView.defaultProps.filters = [TeamsView.activitiesFilter, QueueGroupFilter];
  }
}
