import React, { Component } from 'react'
import PropTypes from 'prop-types'
import bind from 'lodash/bind'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'

import TransferOwnershipStepper from './transferOwnershipStepper'

const styles = {
  root: {
    flexGrow: 1
  },
  heading: {
    margin: '20px'
  },
  paper: {
    padding: '20px',
    margin: '20px'
  }
}

class SettingsPanel extends Component {
  render () {
    const {classes} = this.props

    return (
      <div>
        <Grid
          container
          className={classes.root}
          spacing={16}
          justify='center'
          alignItems='flex-start'>
          <Grid item xs={12} md={6}>
            <div className={classes.heading}>
              <Typography variant='display3' component='h1'>Settings</Typography>
              <a href='#Feed' onClick={bind(this._onBackToFeedClicked, this)}>
                {this.props.feedName}
              </a>
              <Typography variant='body1' gutterBottom>
                Contract Address: {this.props.contractAddress}
              </Typography></div>
            <Paper className={classes.paper}>
              <Typography variant='headline' component='h3'>
                Lock Feed
              </Typography>
              <Typography variant='body1' component='p'>
                Stop new posts to the feed <strong>{this.props.feedName}</strong> and indicate to users no new posts should be expected currently.
              </Typography>
              <FormGroup row>
                <FormControlLabel disabled control={<Switch value='checkedD' />} label='Lock' />
              </FormGroup>
            </Paper>

            <TransferOwnershipStepper onOwnershipTransfer={this.props.onOwnershipTransfer} />

            <Paper className={classes.paper}>
              <Typography variant='headline' component='h3'>
                Destroy
              </Typography>
              <Typography variant='body1' component='p'>
                Destroy the feed <strong>{this.props.feedName}</strong>, making its entries inaccessible. The feed will no longer be accessible through OpenWit, though entries may still exist on IPFS. This is irreversible.
              </Typography>
              <div>
                <Button disabled variant='contained' color='secondary' className={classes.button}>
                  Destroy Feed
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }

  _onBackToFeedClicked (e) {
    e.preventDefault()

    const {history, match} = this.props
    history.push(match.url.replace('/settings', ''))
  }
}

SettingsPanel.propTypes = {
  feedName: PropTypes.string.isRequired,
  contractAddress: PropTypes.string.isRequired,
  onOwnershipTransfer: PropTypes.func.isRequired
}

export default withStyles(styles)(SettingsPanel)
