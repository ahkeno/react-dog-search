import React from "react";
import { FiArrowUp,FiArrowDown} from 'react-icons/fi';
import PropTypes from "prop-types";
const Table = (props) => {
  const { data, sortFunc } = props;

  const handleSort = (key,sortType) => {
    return sortFunc({
      sortKey: key,
      sortType: sortType
    });
  };
  return (
    <React.Fragment>
      <div>
        <h3> Show the result of: {data ? data.length : "No results"} </h3>
      </div>

      <table  style={{ display: data.length ? "block" : "none" }}>
        <thead>
          <tr>
            <td className="sort" >
                Name    
                <span onClick={() => handleSort("name","asc")}>
                  <FiArrowUp></FiArrowUp></span>
                <span onClick={() => handleSort("name","desc")}>
                <FiArrowDown></FiArrowDown></span>
             
            </td>
            <td> Image </td>
            <td className="sort" >
           
              Life Span
              <span onClick={() => handleSort("name","asc")}>
                  <FiArrowUp></FiArrowUp></span>
                <span onClick={() => handleSort("name","desc")}>
                <FiArrowDown></FiArrowDown></span>
            </td>
            <td>Breed Group</td>
            <td>Weight (metric)</td>
            <td className="sort" >
           
              height (metric)
              <span onClick={() => handleSort("name","asc")}>
                  <FiArrowUp></FiArrowUp></span>
                <span onClick={() => handleSort("name","desc")}>
                <FiArrowDown></FiArrowDown></span>
            </td>
          </tr>
        </thead>
        <tbody>
          {data.map((pet) => {
            const { id } = pet;
            return (
              <tr key={id}>
                <td>{pet.name ? pet.name : "-"}</td>
                <td><img width='50' height='50' src={pet.image ? pet.image.url : "https://placehold.co/500x500/EEE/31343C"}></img></td>
                <td>{pet.life_span ? pet.life_span : "-"}</td>
                <td>{pet.breed_group ? pet.breed_group : "-"}</td>
                <td>{pet.weight.imperial ? pet.weight.metric : "-"}</td>
                <td>{pet.height.imperial ? pet.height.metric : "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};
Table.propTypes = {
  data: PropTypes.array,
  sortFunc: PropTypes.func
};

export default Table;
