import React from 'react';
import 'simplebar/dist/simplebar.min.css';
import type { MutableRefObject } from 'react';
import { forwardRef } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import type { Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import type { SxProps } from '@mui/system';
interface ScrollbarProps extends SimpleBar.Props {
    ref: MutableRefObject<SimpleBar>;
    sx?: SxProps<Theme>;
}

const ScrollbarRoot = styled(SimpleBar)``;

export const Scrollbar = forwardRef<MutableRefObject<SimpleBar>, ScrollbarProps>((props, ref) => {
    return (
        <ScrollbarRoot
            // @ts-ignore
            ref={ref}
            {...props}
        />
    );
});
