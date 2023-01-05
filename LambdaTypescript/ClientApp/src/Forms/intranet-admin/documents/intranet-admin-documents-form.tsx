import React from 'react';
import {
	Button,
	Card,
	CardContent,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	Stack,
	TextField,
	Typography,
	Link,
	List,
	ListItem,
	styled,
	Box,
	Autocomplete
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { useEffect, useState } from "react";
import { FormikConsumer, useFormik } from "formik";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import * as Yup from "yup";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import { useAppSelector, useAppDispatch } from '../../../app/state-management/hooks';
import { uploadFiles } from '../../../app/state-management/file-management/uploader/uploader-slice';
import './uploader.css';
import FileDropzone from '../../../Components/file-dropzone/file-dropzone';
import { UploadFile } from '../../../app/state-management/file-management/uploader/uploader-services';
import * as mui from '@mui/material';
import './uploader.css';

// Import React FilePond //
import { FilePond, registerPlugin } from 'react-filepond';
import { FilePondFile } from 'filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateSize);


const Input = styled("input")({
	display: "none"
});

export const IntranetAdminDocumentsForm = () => {

	let initFiles: any = [];
	const [files, setFiles] = React.useState(initFiles);
	const SignupSchema = Yup.object().shape({
		friendlyFileName: Yup.string().required("Friendly Name Required")
	});

	const formik = useFormik({
		initialValues: {
			friendlyFileName: "",
			file: [],

		},
		validationSchema: SignupSchema,
		onSubmit: (values) => {
			let response = UploadFile(values.file, ["root"], "");
			response.then((value: any) => {
				console.log(JSON.stringify(value));
				alert(JSON.stringify(value, null, 2));
			});
		
		}
	});

	const handleFileUpload = (newValue: any) => {
		formik.setFieldTouched("file");
		formik.setFieldValue("file", [newValue[0].file]);
	}






	return (
		<Box style={{ padding: 20 }}>
			<div>{JSON.stringify(formik.values)}</div>
		
			<Paper>
				 <form onSubmit={formik.handleSubmit}>
							<List>
								<ListItem>
									<FormControl fullWidth>
										<TextField
											name="friendlyFileName"
											label="Friendly File Name"
											id="outlined-required"
											placeholder="Friendly File Name"
											value={formik.values.friendlyFileName}
											onChange={formik.handleChange}
											onBlur={() => {
												formik.setFieldTouched("friendlyFileName");
											}}
											error={formik.touched.friendlyFileName && Boolean(formik.errors.friendlyFileName)}
											helperText={formik.touched.friendlyFileName && formik.errors.friendlyFileName}
										/>
									</FormControl>
								</ListItem>
								<ListItem>
									<Typography variant="h6" component="div">
										File
									</Typography>
						</ListItem>
								<ListItem>
									<FormControl fullWidth>
								<FilePond
									files={files}
									onupdatefiles={(fileList: FilePondFile[]) => {
										formik.setFieldValue("file", fileList);
										formik.setFieldTouched("file");
										if (fileList.length > 0) {
											setFiles(fileList);
										}
									}}
							
											allowMultiple={false}
											maxFiles={1}
											name="files"
											labelIdle="Drag and Drop your files or <span class='browse'>browse</span>"
										/>
									
										
											
										
									</FormControl>
						
								</ListItem>
		 
							</List>
							<Grid item xs={12}>
								<Grid container spacing={1}>
									<Grid item xs={12}>
										<Button
											variant="contained"
											size="medium"
											type="submit"
											disabled={!(formik.isValid && formik.dirty)}
									fullWidth
						
											style={{
												backgroundColor: "#27b027",
												padding: "6px",
												borderRadius: "5px"
											}}
										>
											Submit
										</Button>
									</Grid>
								</Grid>
							</Grid>
						</form>
			</Paper>
	 
		</Box>
	);
}
export default IntranetAdminDocumentsForm;