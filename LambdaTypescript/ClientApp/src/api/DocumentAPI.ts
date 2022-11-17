import { useAppDispatch, useAppSelector } from '../app/state-management/hooks';
import { setCurrentFilePath, setFiles } from '../app/state-management/intranet-documents/intranet-documents-slice';
import axios from 'axios';

const DocumentAPI = () => {
	const dispatch = useAppDispatch();
	const state = useAppSelector((state: any) => state);
	const headers = { 'apikey': 'phrm4-api-k3y-2022M11D11' };
	const baseApiUrl = "https://phrmadataapi.azurewebsites.net";
	
	async function _getFiles(_path: string) {
		
		let url = baseApiUrl + "/Document/GetItems";
		let formData = new FormData();
		formData.append("path", _path);
		axios({
			method: 'POST',
			url: url,
			headers: headers,
			data: formData
		}).then((data) => {
			console.log(data.data);
			dispatch(setFiles(data.data));
		});
	};


	return {

		_getFiles,

	};
};

export default DocumentAPI;
