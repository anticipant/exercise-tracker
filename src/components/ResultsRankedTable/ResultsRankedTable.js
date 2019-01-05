import React from 'react';
import PropTypes from 'prop-types';
import { comparator } from '../../help/util';

export class ResultsRankedTable extends React.Component {
  render() {
    const { results } = this.props.data;
    const sortedResults = results.slice().sort(comparator);

    return (
      <table>
        <caption>Results Table</caption>
        <thead>
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
  }
}

ResultsRankedTable.propTypes = {
  data: PropTypes.object.isRequired,
};
