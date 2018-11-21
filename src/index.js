import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class AnimalRow extends React.Component {
    render() {
      const animal = this.props.animal;
      return (
        <tr>
          <th colSpan="2">
            {animal}
          </th>
        </tr>
      );
    }
  }
  
  class OwnerRow extends React.Component {
    render() {
      const owner = this.props.owner;
      const name = owner.isHappy ?
        owner.name :
        <span style={{color: 'red'}}>
          {owner.name}
        </span>;
  
      return (
        <tr>
          <td>{name}</td>
          <td>{owner.number}</td>
        </tr>
      );
    }
  }
  
  class OwnerTable extends React.Component {
    render() {
      const filterText = this.props.filterText;
      const happyOnly = this.props.happyOnly;
  
      const rows = [];
      let lastAnimal = null;
  
      this.props.animalOwners.forEach((owner) => {
        if (owner.name.indexOf(filterText) === -1) {
          return;
        }
        if (happyOnly && !owner.isHappy) {
          return;
        }
        if (owner.animal !== lastAnimal) {
          rows.push(
            <AnimalRow
              animal={owner.animal}
              key={owner.animal} />
          );
        }
        rows.push(
          <OwnerRow
            owner={owner}
            key={owner.name}
          />
        );
        lastAnimal = owner.animal;
      });
  
      return (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Number</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    }
  }
  
  class SearchBar extends React.Component {
    constructor(props) {
      super(props);
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
      this.handleHappyChange = this.handleHappyChange.bind(this);
    }
    
    handleFilterTextChange(e) {
      this.props.onFilterTextChange(e.target.value);
    }
    
    handleHappyChange(e) {
      this.props.onHappyChange(e.target.checked);
    }
    
    render() {
      return (
        <form>
          <input
            type="text"
            placeholder="Search..."
            value={this.props.filterText}
            onChange={this.handleFilterTextChange}
          />
          <p>
            <input
              type="checkbox"
              checked={this.props.happyOnly}
              onChange={this.handleHappyChange}
            />
            {' '}
            Only show happy owners
          </p>
        </form>
      );
    }
  }
  
  class FilterableOwnerTable extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        filterText: '',
        happyOnly: false
      };
      
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
      this.handleHappyChange = this.handleHappyChange.bind(this);
    }
  
    handleFilterTextChange(filterText) {
      this.setState({
        filterText: filterText
      });
    }
    
    handleHappyChange(happyOnly) {
      this.setState({
        happyOnly: happyOnly
      })
    }
  
    render() {
      return (
        <div>
          <SearchBar
            filterText={this.state.filterText}
            happyOnly={this.state.happyOnly}
            onFilterTextChange={this.handleFilterTextChange}
            onHappyChange={this.handleHappyChange}
          />
          <OwnerTable
            animalOwners={this.props.animalOwners}
            filterText={this.state.filterText}
            happyOnly={this.state.happyOnly}
          />
        </div>
      );
    }
  }
  
  
  const ANIMALOWNERS = [
    {animal: 'Lion', name: 'Peter', number: 1, isHappy: true, value: 20000},
    {animal: 'Lion', name: 'Andrew', number: 3, isHappy: true, value: 60000}, 
    {animal: 'Monkey', name: 'Mark', number: 2, isHappy: true, value: 10000},
    {animal: 'Monkey', name: 'Jose', number: 4, isHappy: true, value: 20000},  
    {animal: 'Ostrich', name: 'Joe', number: 5, isHappy: false, value: 8000},
    {animal: 'Pigeon', name: 'John', number: 10, isHappy: false, value: 1000}      
  ];
  
  ReactDOM.render(
    <FilterableOwnerTable animalOwners={ANIMALOWNERS} />,
    document.getElementById('root')
  );