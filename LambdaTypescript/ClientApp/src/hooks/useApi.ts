import { createMicrosoftGraphClient, TeamsFx } from '@microsoft/teamsfx';
import { useAppDispatch } from '../app/state-management/hooks';
import { setUserTeams, setUserProfile, setUserCurrentFileItems } from '../app/state-management/user/user-slice';

const teamsfx = new TeamsFx();

const scopes = ['User.Read', 'User.ReadBasic.All', 'Files.ReadWrite.All', 'Directory.ReadWrite.All'];

const graphClient = createMicrosoftGraphClient(teamsfx, scopes);

const useApi = (state: any) => {
    const dispatch = useAppDispatch();

    /**
     * Makes API call and returns the files and folders within a given folder
     * @param drive_id
     */
    const _getTeamChannelDriveItems = async function (drive_id: string) {
        let url =
            '/groups/' +
            state.user.currentGroupId +
            '/drive/items/' +
            drive_id +
            '/children?$select=id,name,file,folder,webUrl';
        const items = await graphClient.api(url).get();
        dispatch(setUserCurrentFileItems(items.value));
        console.log('folders: ', items);
    };

    /**
     * Makes API call and returns the subfolders within a specific Team
     * @param group_id
     */
    const _getTeamDriveRootItems = async function (group_id: string) {
        let url = '/groups/' + group_id + '/drive/root/children?$select=id,name,file,folder,webUrl';
        const items = await graphClient.api(url).get();
        dispatch(setUserCurrentFileItems(items.value));
    };

    //Returns a user's Teams
    async function getTeams() {
        const teams = await graphClient
            .api('/me/joinedTeams?$select=id,displayName')
            .get()
            .catch((reason) => {
                teamsfx.login(scopes);
                teamsfx.getCredential().getToken(scopes);
            });
        dispatch(setUserTeams(teams.value));
    }

    //Returns a user's profile information
    async function getProfile() {
        const profile = await graphClient
            .api('/me')
            .get()
            .catch((reason) => {});
        dispatch(setUserProfile(profile));
    }

    return {
        dispatch,
        _getTeamChannelDriveItems,
        _getTeamDriveRootItems,
        getTeams,
        getProfile,
    };
};

export default useApi;
