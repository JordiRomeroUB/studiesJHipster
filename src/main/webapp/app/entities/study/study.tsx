import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './study.reducer';
import { IStudy } from 'app/shared/model/study.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Study = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const studyList = useAppSelector(state => state.study.entities);
  const loading = useAppSelector(state => state.study.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="study-heading" data-cy="StudyHeading">
        <Translate contentKey="studiesJHipsterApp.study.home.title">Studies</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="studiesJHipsterApp.study.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="studiesJHipsterApp.study.home.createLabel">Create new Study</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {studyList && studyList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="studiesJHipsterApp.study.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="studiesJHipsterApp.study.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="studiesJHipsterApp.study.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="studiesJHipsterApp.study.numParticipants">Num Participants</Translate>
                </th>
                <th>
                  <Translate contentKey="studiesJHipsterApp.study.numForms">Num Forms</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {studyList.map((study, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${study.id}`} color="link" size="sm">
                      {study.id}
                    </Button>
                  </td>
                  <td>{study.title}</td>
                  <td>{study.description}</td>
                  <td>{study.numParticipants}</td>
                  <td>{study.numForms}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${study.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${study.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${study.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="studiesJHipsterApp.study.home.notFound">No Studies found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Study;
