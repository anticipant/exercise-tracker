import React from 'react';
import PropTypes from 'prop-types';
import { comparator } from '../../help/util';
import './ResultsRankedTable.scss';

const ResultsRankedTable = ({ data }) => {
  const sortedResults = data.results.slice().sort(comparator);

  return (
    <table className="ResultsRankedTable">
      <caption className="ResultsRankedTable__caption">Рейтинг</caption>
      <thead className="ResultsRankedTable__header">
        <tr>
          <th>Место</th>
          <th>Время</th>
          <th>Дата</th>
        </tr>
      </thead>
      <tbody>
        {sortedResults.map((it, index) => {
          const dateTimeInfo = it.id.split('-');
          const date = dateTimeInfo[0];
          // const time = dateTimeInfo[1];
          const resultText = it.result.slice(0, -3);

          return (
            <tr key={it.id}>
              <td>{index + 1}</td>
              <td>{resultText}</td>
              <td>{date}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

ResultsRankedTable.propTypes = {
  data: PropTypes.shape({
    results: PropTypes.array.isRequired,
  }).isRequired,
};

export default ResultsRankedTable;
