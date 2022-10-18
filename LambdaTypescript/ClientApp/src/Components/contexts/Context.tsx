import { TeamsFx } from '@microsoft/teamsfx';
import { createContext } from 'react';

export const TeamsFxContext = createContext<{
    teamsfx?: TeamsFx;
}>({
    teamsfx: undefined,
});
