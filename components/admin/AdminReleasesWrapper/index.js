/**
 *
 * AdminReleasesWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FaSave } from 'react-icons/fa';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import moment from 'moment';

import { Body, H2 } from '../../shared/typogrophy';
import AdminPageWrapper from '../AdminWrapper/AdminPageWrapper';
import BlackButton from '../../shared/buttons/BlackButton';

const Wrapper = styled.div`
  min-height: calc(100vh - 50px);
  padding: 36px 0;
  max-width: ${({ theme }) => theme.breakpointsPixels.contentMax};
  margin: 0 auto;
`;

const Header = styled(Body)`
  background-color: #eee;
  font-weight: bold;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const Field = styled.div`
  background-color: #f8f8f8;
  padding: 0.5rem;
`;

const initialState = {
  releaseDate: moment().format('YYYY-MM-DD'),
  releaseType: '',
  releaseNote: '',
  isOnline: false,
};

function AdminReleasesWrapper({
  createCallback,
  releases,
  editCallback,
  deleteCallback,
}) {
  const [state, setState] = useState(initialState);
  const [editRelease, setEditTopic] = useState(false);
  const onChangeField = (key, value) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const onChangeEdit = (key, value) => {
    setEditTopic({
      ...editRelease,
      [key]: value,
    });
  };

  const handleCreate = () => {
    createCallback(state);
    setState(initialState);
  };

  const canSave = () => state.name !== '' && state.description !== '';

  const handleEdit = () => {
    editCallback(editRelease);
    setEditTopic(false);
  };
  const possibleTags = ['Campaigns', 'Voters'];
  const releasesCopy = JSON.parse(JSON.stringify(releases));
  const sortedReleases = releasesCopy?.sort(
    (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate),
  );
  return (
    <AdminPageWrapper>
      <Wrapper>
        <br />
        <H2 className="text-center">Releases</H2>

        <br />
        <br />
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Header>Date</Header>
          </Grid>
          <Grid item xs={2}>
            <Header>Type</Header>
          </Grid>
          <Grid item xs={4}>
            <Header>Note</Header>
          </Grid>
          <Grid item xs={2}>
            <Header>Audience</Header>
          </Grid>
          <Grid item xs={1}>
            <Header>Online?</Header>
          </Grid>
          <Grid item xs={1}>
            <Header>Actions</Header>
          </Grid>
          <Grid item xs={2}>
            <TextField
              type="date"
              fullWidth
              variant="outlined"
              // label="Date"
              value={state.releaseDate}
              onChange={(e) => onChangeField('releaseDate', e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={state.releaseType}
                onChange={(e) => onChangeField('releaseType', e.target.value)}
                label="Age"
              >
                <MenuItem value="fix">Fix</MenuItem>
                <MenuItem value="update">Update</MenuItem>
                <MenuItem value="new">New</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Note"
              multiline
              rows={3}
              onChange={(e) => onChangeField('releaseNote', e.target.value)}
              value={state.releaseNote}
            />
          </Grid>
          <Grid item xs={2}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={possibleTags}
              defaultValue={[]}
              filterSelectedOptions
              onChange={(event, options) => {
                onChangeField('tags', options);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Audience"
                  placeholder="Tag"
                />
              )}
            />
          </Grid>
          <Grid item xs={1}>
            <Checkbox
              color="primary"
              value={state.isOnline}
              onChange={(e) => onChangeField('isOnline', e.target.checked)}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </Grid>
          <Grid item xs={1} style={{ alignSelf: 'center' }}>
            <BlackButton fullWidth disabled={!canSave()} onClick={handleCreate}>
              <FaSave size={24} />
            </BlackButton>
          </Grid>
          {sortedReleases &&
            sortedReleases.map((release) => (
              <React.Fragment key={release.id}>
                <>
                  {editRelease.id === release.id ? (
                    <>
                      <Grid item xs={2}>
                        <Field>
                          <Body>
                            <TextField
                              type="date"
                              fullWidth
                              variant="outlined"
                              // label="Date"
                              value={editRelease.releaseDate}
                              onChange={(e) =>
                                onChangeEdit('releaseDate', e.target.value)
                              }
                            />
                          </Body>
                        </Field>
                      </Grid>
                      <Grid item xs={2}>
                        <Field>
                          <Body>
                            <FormControl fullWidth variant="outlined">
                              <InputLabel id="demo-simple-select-outlined-label">
                                Type
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={editRelease.releaseType}
                                onChange={(e) =>
                                  onChangeEdit('releaseType', e.target.value)
                                }
                                label="Age"
                              >
                                <MenuItem value="fix">Fix</MenuItem>
                                <MenuItem value="update">Update</MenuItem>
                                <MenuItem value="new">New</MenuItem>
                              </Select>
                            </FormControl>
                          </Body>
                        </Field>
                      </Grid>
                      <Grid item xs={4}>
                        <Field>
                          <Body>
                            <TextField
                              fullWidth
                              variant="outlined"
                              label="Note"
                              multiline
                              rows={3}
                              onChange={(e) =>
                                onChangeEdit('releaseNote', e.target.value)
                              }
                              value={editRelease.releaseNote}
                            />
                          </Body>
                        </Field>
                      </Grid>
                      <Grid item xs={2}>
                        <Autocomplete
                          multiple
                          id="tags-outlined"
                          options={possibleTags}
                          defaultValue={[]}
                          value={editRelease.tags || []}
                          filterSelectedOptions
                          onChange={(event, options) => {
                            onChangeEdit('tags', options);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Audience"
                              placeholder="Tag"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <Field>
                          <Body>
                            <Checkbox
                              color="primary"
                              value={editRelease.isOnline}
                              onChange={(e) =>
                                onChangeEdit('isOnline', e.target.checked)
                              }
                              inputProps={{
                                'aria-label': 'secondary checkbox',
                              }}
                            />
                          </Body>
                        </Field>
                      </Grid>
                      <Grid item xs={1} style={{ alignSelf: 'center' }}>
                        <div className="text-center">
                          <FaSave size={18} onClick={handleEdit} />
                        </div>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={2}>
                        <Field>
                          <Body>{release.releaseDate}</Body>
                        </Field>
                      </Grid>
                      <Grid item xs={2}>
                        <Field>
                          <Body>{release.releaseType}</Body>
                        </Field>
                      </Grid>
                      <Grid item xs={4}>
                        <Field>
                          <Body>{release.releaseNote}</Body>
                        </Field>
                      </Grid>
                      <Grid item xs={2}>
                        <Field>
                          {release.tags?.map((tag) => (
                            <Chip label={tag} key={tag} />
                          ))}
                        </Field>
                      </Grid>
                      <Grid item xs={1}>
                        <Field>
                          <Body>
                            <Checkbox
                              color="primary"
                              value={editRelease.isOnline}
                              disabled
                              inputProps={{
                                'aria-label': 'secondary checkbox',
                              }}
                            />
                          </Body>
                        </Field>
                      </Grid>
                      <Grid
                        item
                        xs={1}
                        style={{ alignSelf: 'center', cursor: 'pointer' }}
                      >
                        <div className="text-center">
                          <EditIcon onClick={() => setEditTopic(release)} />{' '}
                          &nbsp;
                          <DeleteIcon
                            onClick={() => {
                              deleteCallback(release.id);
                            }}
                          />
                        </div>
                      </Grid>
                    </>
                  )}
                </>
              </React.Fragment>
            ))}
        </Grid>
      </Wrapper>
    </AdminPageWrapper>
  );
}

AdminReleasesWrapper.propTypes = {
  createCallback: PropTypes.func,
  editCallback: PropTypes.func,
  deleteCallback: PropTypes.func,
  releases: PropTypes.array,
};

export default AdminReleasesWrapper;
