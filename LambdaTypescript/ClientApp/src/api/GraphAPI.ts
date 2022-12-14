import { useAppDispatch, useAppSelector } from '../app/state-management/hooks';
import { setCurrentFilePath, setFiles } from '../app/state-management/intranet-documents/intranet-documents-slice';
import axios from 'axios';
import { setUserTeams, setUserProfile, setUserCurrentFileItems } from '../app/state-management/user/user-slice';

const GraphAPI = () => {
	const dispatch = useAppDispatch();
	const state = useAppSelector((state: any) => state);
	const headers = { 'apikey': 'phrm4-api-k3y-2022M11D11' };
	const baseApiUrl = "https://phrmadataapi.azurewebsites.net";



  /**
   * Makes API call and returns the files and folders within a given folder
   * @param drive_id
   */
  async function _getTeamChannelDriveItems(_driveId: string) {
    let url = "https://phrmadataapi.azurewebsites.net/Graph/GetTeamChannelDriveItems/" + state.user.currentGroupId + "/" + _driveId;
    axios({
      method: 'GET',
      url: url,
      headers: {
        'apikey': 'phrm4-api-k3y-2022M11D11'
      }
    }).then((data) => {
      dispatch(setUserCurrentFileItems(data.data));
    });
  };

  /**
   * Makes API call and returns the subfolders within a specific Team
   * @param group_id
   */
  async function _getTeamDriveRootItems(_groupId: string) {
    let url = "https://phrmadataapi.azurewebsites.net/Graph/GetTeamDriveRootItems/" + _groupId;
    axios({
      method: 'GET',
      url: url,
      headers: {
        'apikey': 'phrm4-api-k3y-2022M11D11'
      }
    }).then((data) => {
      dispatch(setUserCurrentFileItems(data.data));
    });

  };

  //async function _getUserPhoto(_userEmail: string) {
  //  axios({
  //    method: 'GET',
  //    url: 'https://phrmadataapi.azurewebsites.net/Graph/GetUserPhoto/kdudley@phrma.org',
  //    headers: {
  //      'apikey': 'phrm4-api-k3y-2022M11D11'
  //    }
  //  }).then((data) => {
  //    dispatch(setUserPhoto(data.data));
  //    _getUserProfile(_userEmail);
  //  });

  //}

  async function _getUserProfile(_userEmail: string) {
    axios({
      method: 'GET',
      url: 'https://phrmadataapi.azurewebsites.net/Graph/GetUserProfile/' + _userEmail,
      headers: {
        'apikey': 'phrm4-api-k3y-2022M11D11'
      }
    }).then((data) => {
      console.info(data.data);
      var result = data.data.value;
      dispatch(setUserProfile(result));
  
    });

  }
  //Returns a user's Teams
  async function _getUserTeams() {
    var url = 'https://phrmadataapi.azurewebsites.net/Graph/GetUserTeams/' + state.user.userEmail
    axios({
      method: 'GET',
      url: url,
      headers: {
        'apikey': 'phrm4-api-k3y-2022M11D11'
      }
    }).then((data) => {
      dispatch(setUserTeams(data.data));
    });

  }

  //Returns a user's profile information
  async function getProfile() {
    //const profile = await graphClient
    //    .api('/me')
    //    .get()
    //    .catch((reason) => {});
    //dispatch(setUserProfile(profile));
  }

  return {
    dispatch,
    _getTeamChannelDriveItems,
    _getTeamDriveRootItems,
    // _getUserPhoto,
    _getUserProfile,
    _getUserTeams
  };
};

export default GraphAPI;
