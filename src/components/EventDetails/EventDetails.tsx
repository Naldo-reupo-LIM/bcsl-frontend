import {
  Typography,
  Grid,
  Button,
  Avatar,
  Fab,
  Chip,
  Box,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { Stack, IconButton } from '@mui/material';
import { imageItems, getDatePart } from '../../shared/tools';
import { EventInfoPageProps } from '../../pages/EventInfo/EventInfo';
import { eventInfoStyles } from '../../pages/EventInfo/EventInfoStyle';
import Carousel from '../Carousel/Carousel';
import { useTranslation } from 'react-i18next';

export interface EventDetailsProps {
  eventDetails: EventInfoPageProps,
  subscribedValidationHandler: () => void
  goBack: () => void
}


const EventDetails: React.FC<EventDetailsProps> = ({ eventDetails, subscribedValidationHandler, goBack }) => {
  const { name, eventDate, status, description, tags, type } = eventDetails;
  const { t } = useTranslation('global')
  const classes = eventInfoStyles();
  const initialName = 'MP';
  const numberSubscriptors = '+15';

  return (
    <>
      <Grid container direction="row" justifyContent={"space-between"} className={classes.titleContainer} >
        <Grid className={classes.eventInfo} alignItems="flex-start">
          <IconButton className={classes.position}
            aria-controls="btn_back"
            aria-haspopup="true"
            onClick={goBack}
          >
            <ArrowBack className={classes.btnBack} />
          </IconButton>
          <Box className={classes.statebtn} >{status}</Box>
          <Typography variant="h4" aria-label='title' className={classes.day}>
            {name}
          </Typography>
        </Grid>
        <Grid className={classes.eventInfo} alignItems="flex-end">
          <Grid container direction="column" className={classes.columns} alignItems="flex-end">
            <Grid item>
              <Typography variant="h5" className={classes.month}>
                {getDatePart(eventDate).month}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" className={classes.day}>
                {getDatePart(eventDate).day}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" className={classes.year}>
                {getDatePart(eventDate).year}
              </Typography>
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={subscribedValidationHandler}
            data-testid="register-button"
          >
            {t('events.register')}
          </Button>
        </Grid>
      </Grid>
      <Grid className={classes.body}>
        <Typography align='justify' >{description}</Typography>
        <Grid className={classes.subscribersSection}>
          <Avatar
            className={classes.boldPinkColor}
          >{initialName}</Avatar>
          <Fab size="small" className={classes.subscribedUserIcon}>
            {numberSubscriptors}
          </Fab>
          <Typography align="center" variant="body1" className={classes.text}>
            {'+Subscribed'}
          </Typography>
        </Grid>
        <Stack spacing={2} direction="row">
          <Chip label={tags} className={classes.pinkColor} />
          <Chip label={type} className={classes.pinkColor} />
        </Stack>
        <Carousel items={imageItems} />
      </Grid>
    </>
  )
}

export default EventDetails;
