import { useState } from 'react';
import { Card, CardContent, Collapse, Divider, Slide } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import './timeline.css';
import * as Icon from '@mui/icons-material';

export default function BasicTimeline() {
    const [open, setOpen] = useState(false);
    return (
        <Slide direction="up" in={true} timeout={{ appear: 100, enter: 1000 }}>
            <Timeline position="right">
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot
                            sx={{ cursor: 'pointer' }}
                            onClick={() => {
                                setOpen(!open);
                            }}
                        >
                            <Icon.SupervisedUserCircle />
                        </TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Card elevation={3} style={{ height: '170px', marginTop: 5 }}>
                            <CardContent>
                                Employee Joins
                                <Divider />
                            </CardContent>
                        </Card>
                        <Divider />
                    </TimelineContent>
                </TimelineItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot
                                onClick={() => {
                                    setOpen(!open);
                                }}
                            >
                                <Icon.StayCurrentPortrait />
                            </TimelineDot>
                        </TimelineSeparator>
                        <TimelineContent>
                            <Card
                                elevation={3}
                                style={{ height: '170px', marginTop: 5, marginLeft: 20, marginBottom: 30 }}
                            >
                                <CardContent>
                                    Content
                                    <Divider />
                                </CardContent>
                            </Card>
                        </TimelineContent>
                    </TimelineItem>
                </Collapse>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot
                            onClick={() => {
                                setOpen(!open);
                            }}
                        >
                            <Icon.Numbers />
                        </TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Card elevation={3} style={{ height: '170px', marginTop: 5 }}>
                            <CardContent>
                                Content
                                <Divider />
                            </CardContent>
                        </Card>
                    </TimelineContent>
                </TimelineItem>
            </Timeline>
        </Slide>
    );
}
