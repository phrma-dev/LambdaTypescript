import React, { useEffect } from 'react';
import * as mui from '@mui/material';
import * as muiIcon from '@mui/icons-material';
import Uploader from '../uploader/uploader';
import UploaderPreview from '../uploader/uploader-preview';
import ImageCropper from '../image-cropper/image-cropper';
import styles from './form-stepper.module.scss';

import { useAppSelector, useAppDispatch } from '../../hooks';
import FileMetadataForm from '../form-file-metadata/form-file-metadata';
import { toggleBannerIsOpen } from '../../banner/banner-slice';
import { toggleIsCreatingPreviewImage } from '../uploader/uploader-slice';
import { CreateFile, GetPreviewImages, UploadFile } from '../uploader/uploader-services';
const steps = ['Select File', 'Select Preview Image', 'Crop Preview Image', 'Submit'];

export default function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [alert, setAlert] = React.useState(false);
    const [previewImages, setPreviewImages] = React.useState([]);

    const state = useAppSelector((state) => state);
    const dispatch = useAppDispatch();

    const components = [<Uploader />, <UploaderPreview />, <ImageCropper />, <FileMetadataForm />];
    useEffect(() => {
        if (state.banner.isOpen) {
            dispatch(toggleBannerIsOpen());
        }
        GetPreviewImages().then((data: any) => {
            setPreviewImages(data);
        });
    }, [dispatch, state.banner.isOpen]);

    const handleNext = () => {
        activeStep === 0 ? dispatch(toggleIsCreatingPreviewImage(false)) : dispatch(toggleIsCreatingPreviewImage(true));

        switch (true) {
            case activeStep === 0 && state.uploader.files.length > 0:
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setAlert(false);
                break;
            case activeStep === 0 && state.uploader.files.length === 0:
                setAlert(true);
                break;
            case activeStep === 1 && state.uploader.previewFiles.length > 0:
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setAlert(false);
                break;
            case activeStep === 1 && state.uploader.previewFiles.length === 0:
                setAlert(true);
                break;
            case activeStep === 2 && state.uploader.cropData !== '#':
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setAlert(false);
                break;
            case activeStep === 2 && state.uploader.cropData === '#':
                setAlert(true);
                break;
            case activeStep === 3:
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setAlert(false);
                break;
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <>
            <mui.Box className={styles.formStepperContainer}>
                <>
                    <mui.Box sx={{ mb: 3, mt: 2 }}>
                        {alert ? (
                            <mui.Alert
                                variant="filled"
                                severity="error"
                                action={
                                    <mui.IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setAlert(false);
                                        }}
                                    >
                                        <muiIcon.Close fontSize="inherit" />
                                    </mui.IconButton>
                                }
                            >
                                Please complete this step to continue..
                            </mui.Alert>
                        ) : (
                            <></>
                        )}
                    </mui.Box>

                    <mui.Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps: { completed?: boolean } = {};
                            const labelProps: {
                                optional?: React.ReactNode;
                            } = {};

                            return (
                                <mui.Step sx={{ fontSize: 50 }} key={label} {...stepProps}>
                                    <mui.StepLabel sx={{ fontSize: 50 }} {...labelProps}>
                                        {label}
                                    </mui.StepLabel>
                                </mui.Step>
                            );
                        })}
                    </mui.Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <mui.Typography sx={{ mt: 2, mb: 1 }}>
                                <>
                                    <mui.Button
                                        color="primary"
                                        onClick={() => {
                                            CreateFile(
                                                state.uploader.files[0].filename,
                                                state.uploader.cropData,
                                                state.uploader.currentFilePath.join('/')
                                            );
                                            UploadFile(
                                                state.uploader.files,
                                                state.uploader.currentFilePath,
                                                state.uploader.cropData
                                            );
                                        }}
                                    >
                                        Submit
                                    </mui.Button>
                                    {previewImages.map((item: any) => (
                                        <img src={item.previewImage} height={300} width={300} alt="" />
                                    ))}
                                </>
                            </mui.Typography>
                            <mui.Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <mui.Box sx={{ flex: '1 1 auto' }} />
                                <mui.Button onClick={handleReset}>Reset</mui.Button>
                            </mui.Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <mui.Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <mui.Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </mui.Button>
                                <mui.Box sx={{ flex: '1 1 auto' }} />
                                <mui.Button onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </mui.Button>
                            </mui.Box>
                            {components[activeStep]}
                        </React.Fragment>
                    )}
                </>
            </mui.Box>
        </>
    );
}
