import React from 'react';
import PropTypes from 'prop-types';
import { getSecondsFromTime } from '../../help/util';
import './ResultsTable.scss';

const ResultsTable = ({ data }) => (
  <table className="ResultsTable">
    <caption className="ResultsTable__caption">Результаты</caption>
    <thead className="ResultsTable__header">
      <tr>
        <th>Дата</th>
        <th>Время</th>
        <th>Примечание</th>
      </tr>
    </thead>
    <tbody>
      {data.results.map((it, index, arr) => {
        const dateTimeInfo = it.id.split('-');
        const date = dateTimeInfo[0];
        // const time = dateTimeInfo[1];
        const resultText = it.result.slice(0, -3);
        const resultNumber = getSecondsFromTime(resultText);
        // реализовать фичу, которая отражает результат по сравнению с предыдущей тренировкой
        // (если тренировка не первая)
        // console.log(arr[index + 1]);
        const previousResultText = arr[index + 1] ? arr[index + 1].result.slice(0, -3) : null;
        const previousResultNumber = getSecondsFromTime(previousResultText);
        const difference = previousResultNumber ? resultNumber - previousResultNumber : null;

        return (
          <tr key={it.id}>
            <td>{date}</td>
            <td>{resultText}</td>
            <td className={difference > 0 ? 'green' : 'red'}>
              {
                difference ? (
                  `${difference} сек `
                ) : null

              }
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>

);

ResultsTable.propTypes = {
  data: PropTypes.shape({
    results: PropTypes.array.isRequired,
  }).isRequired,
};

export default ResultsTable;
