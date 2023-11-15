import React, { Component, MouseEvent, FC } from 'react';
import {map}  from 'lodash';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Wrapper from './Wrapper';

interface GlobalPaginationProps {
  count: number;
  onChangeParams: (params: { target: { name: any; value: any } }) => void;
  params: {
    _page: number;
    _limit: number;
  };
}

const GlobalPagination: FC<GlobalPaginationProps> = ({ count, onChangeParams, params }) => {
  const getLastPageNumber = (): number => Math.ceil(count / params._limit) || 1;

  const handleDotsClick = (e: MouseEvent): void => {
    e.preventDefault();
  };

  const handlePreviousPageClick = (e: MouseEvent): void => {
    e.preventDefault();

    if (!isFirstPage()) {
      const target = {
        name: 'params._page',
        value: params._page - 1,
      };
      onChangeParams({ target });
    }
  };

  const handleNextPageClick = (e: MouseEvent): void => {
    e.preventDefault();

    if (!isLastPage()) {
      const target = {
        name: 'params._page',
        value: params._page + 1,
      };
      onChangeParams({ target });
    }
  };

  const handleFirstPageClick = (e: MouseEvent): void => {
    e.preventDefault();
    const target = {
      name: 'params._page',
      value: 1,
    };
    onChangeParams({ target });
  };

  const handleLastPageClick = (e: MouseEvent): void => {
    e.preventDefault();
    const target = {
      name: 'params._page',
      value: getLastPageNumber(),
    };
    onChangeParams({ target });
  };

  const isFirstPage = (): boolean => params._page === 1;

  const isLastPage = (): boolean => params._page === getLastPageNumber();

  const needAfterLinksDots = (): boolean => params._page < getLastPageNumber() - 1;

  const needPreviousLinksDots = (): boolean => params._page > 3;

  const renderLinks = (): JSX.Element[] => {
    // Init variables
    const linksOptions: {
      value: number;
      isActive: boolean;
      handleClick: (e: MouseEvent) => void;
    }[] = [];

    // Add active page link
    linksOptions.push({
      value: params._page,
      isActive: true,
      handleClick: (e: MouseEvent) => e.preventDefault(),
    });

    // Add previous page link
    if (!isFirstPage()) {
      linksOptions.unshift({
        value: params._page - 1,
        isActive: false,
        handleClick: handlePreviousPageClick,
      });
    }

    // Add next page link
    if (!isLastPage() && count > params._limit) {
      linksOptions.push({
        value: params._page + 1,
        isActive: false,
        handleClick: handleNextPageClick,
      });
    }

    if (needPreviousLinksDots()) {
      linksOptions.unshift({
        value: 1,
        isActive: false,
        handleClick: handleFirstPageClick,
      });
    }

    if (needAfterLinksDots()) {
      linksOptions.push({
        value: getLastPageNumber(),
        isActive: false,
        handleClick: handleLastPageClick,
      });
    }

    // Generate links
    return linksOptions.map((linksOption, key) => (
      <li className={cn(linksOption.isActive && 'navLiActive')} key={key}>
        <a href="#" onClick={linksOption.handleClick}>
          {linksOption.value}
        </a>
      </li>
    ));
  };

  return (
    <Wrapper>
      <div>
        <a
          href="#"
          className={`paginationNavigator ${isFirstPage() ? 'disabled' : ''}`}
          onClick={handlePreviousPageClick}
        >
          <i className="fa fa-chevron-left" aria-hidden="true" />
        </a>
        <nav className="navWrapper">
          <ul className="navUl">{renderLinks()}</ul>
        </nav>
        <a
          href="#"
          className={`paginationNavigator ${isLastPage() ? 'disabled' : ''}`}
          onClick={handleNextPageClick}
        >
          <i className="fa fa-chevron-right" aria-hidden="true" />
        </a>
      </div>
    </Wrapper>
  );
};

GlobalPagination.defaultProps = {
  count: 0,
  onChangeParams: () => {},
  params: {
    _page: 1,
    _limit: 10,
  },
};



export default GlobalPagination;
