import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './image-cropper.css';
import * as mui from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setCropData, setCropper } from '../uploader/uploader-slice';

export default function ImageCropper() {
    const uploaderState = useAppSelector((state) => state.uploader);
    const dispatch = useAppDispatch();

    const getCurrentStateUrl = () => {
        return uploaderState.previewImageDataObjectUrl;
    };
    const getCropData = () => {
        if (typeof uploaderState.cropper !== 'undefined') {
            dispatch(setCropData(uploaderState.cropper.getCroppedCanvas().toDataURL()));
        }
    };

    return (
        <div>
            <div className="cropperContainer">
                <br />
                <mui.Grid container spacing={2}>
                    <mui.Grid item xs={12} md={7}>
                        <div>
                            <h1>Image</h1>

                            <Cropper
                                style={{ height: 300, width: '100%' }}
                                zoomTo={-0.9}
                                aspectRatio={1}
                                initialAspectRatio={1}
                                preview=".img-preview"
                                src={getCurrentStateUrl()}
                                viewMode={0}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={true}
                                responsive={true}
                                autoCropArea={5}
                                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                                onInitialized={(instance) => {
                                    dispatch(setCropper(instance));
                                }}
                                guides={true}
                            />
                        </div>
                    </mui.Grid>
                    <mui.Grid item xs={12} md={5}>
                        <div>
                            <h1>Preview</h1>
                            <div className="img-preview" style={{ width: '100%', height: '300px' }} />
                        </div>
                    </mui.Grid>
                    <mui.Grid xs={12}>
                        <mui.Button
                            fullWidth
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                getCropData();
                            }}
                        >
                            Crop Image
                        </mui.Button>
                    </mui.Grid>
                </mui.Grid>
            </div>
        </div>
    );
}
